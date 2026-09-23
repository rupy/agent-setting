"""Offline integration checks: python3 -m unittest discover -s tests."""
import os
from pathlib import Path
import subprocess
import tempfile
import unittest


SCRIPT = Path(__file__).resolve().parents[1] / "sync.sh"


class SyncTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.remote = self.root / "remote"
        self.checkout = self.root / "checkout"
        self.remote.mkdir()
        self.env = dict(os.environ, CODEX_HOME=str(self.root / "codex"),
                        CLAUDE_CONFIG_DIR=str(self.root / "claude"))
        self.git("init", "-b", "main")
        self.git("config", "user.name", "Sync Test")
        self.git("config", "user.email", "test@example.invalid")
        (self.remote / "install.sh").write_text("#!/bin/bash\nexit 0\n")
        (self.remote / "AGENTS.md").write_text("first\n")
        self.commit()

    def git(self, *args, cwd=None):
        return subprocess.run(["git", *args], cwd=cwd or self.remote,
                              check=True, capture_output=True, text=True).stdout.strip()

    def commit(self):
        self.git("add", ".")
        self.git("commit", "-m", "test update")

    def sync(self, success=True):
        result = subprocess.run(["bash", str(SCRIPT), str(self.checkout),
                                 str(self.remote), "main"], env=self.env,
                                capture_output=True, text=True)
        self.assertEqual(result.returncode == 0, success, result.stdout + result.stderr)
        return result

    def test_update_and_obsolete_owned_links(self):
        self.sync()
        skill_dir = self.root / "codex" / "skills"
        skill_dir.mkdir(parents=True)
        owned = skill_dir / "removed"
        owned.symlink_to(self.checkout / "skills" / "removed")
        unrelated = skill_dir / "unrelated"
        unrelated.symlink_to(self.root / "elsewhere")
        (self.remote / "AGENTS.md").write_text("second\n")
        self.commit()
        self.sync()
        self.assertEqual((self.checkout / "AGENTS.md").read_text(), "second\n")
        self.assertFalse(owned.is_symlink())
        self.assertTrue(unrelated.is_symlink())
        self.sync()

    def test_dirty_checkout_is_preserved(self):
        self.sync()
        (self.checkout / "AGENTS.md").write_text("local edit\n")
        self.assertIn("Local changes", self.sync(success=False).stderr)
        self.assertEqual((self.checkout / "AGENTS.md").read_text(), "local edit\n")

    def test_local_commit_is_preserved(self):
        self.sync()
        self.git("-c", "user.name=Test", "-c", "user.email=test@example.invalid",
                 "commit", "--allow-empty", "-m", "local", cwd=self.checkout)
        before = self.git("rev-parse", "HEAD", cwd=self.checkout)
        self.assertIn("history diverged", self.sync(success=False).stderr)
        self.assertEqual(self.git("rev-parse", "HEAD", cwd=self.checkout), before)

    def test_failed_fetch_keeps_settings(self):
        self.sync()
        self.remote.rename(self.root / "unavailable")
        self.sync(success=False)
        self.assertEqual((self.checkout / "AGENTS.md").read_text(), "first\n")
