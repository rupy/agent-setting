import tempfile
import unittest
from pathlib import Path

from check_html import check


class HTMLChecks(unittest.TestCase):
    def test_site_templates(self):
        site = Path(__file__).resolve().parents[1] / "assets" / "site"
        paths = list(site.rglob("*.html"))
        self.assertEqual(len(paths), 35)
        self.assertEqual(check(paths, template=True), [])
        self.assertEqual(sum("reference example remains" in e for e in check(paths)), 34)

    def test_real_templates(self):
        assets = Path(__file__).resolve().parents[1] / "assets"
        paths = list(assets.glob("*.html"))
        self.assertEqual(len(paths), 3)
        self.assertEqual(check(paths, template=True), [])
        self.assertEqual(sum("reference example remains" in e for e in check(paths)), 3)

    def test_failures_and_cross_file_anchors(self):
        with tempfile.TemporaryDirectory() as folder:
            a, b = Path(folder) / "a.html", Path(folder) / "b.html"
            b.write_text('<html lang="ja"><head><title>B</title></head><body><p id="FR-001">要件</p></body></html>', encoding="utf-8")
            def write(body):
                a.write_text('<html lang="ja"><head><title>A</title></head><body>' + body + '</body></html>', encoding="utf-8")
            write('<a href="b.html#FR-001">参照</a>')
            self.assertEqual(check([a, b]), [])
            for body, message in [
                ('<p id="x"></p><p id="x"></p>', "duplicate id"),
                ('<a href="b.html#missing">参照</a>', "missing anchor"),
                ('<a href="missing.html">参照</a>', "missing link target"),
                ('<link rel="stylesheet" href="missing.css">', "missing local dependency"),
                ('<script src="missing.js"></script>', "missing local dependency"),
                ('<img src="missing.svg" alt="図">', "missing local dependency"),
                ('<div><p></div>', "mismatched closing tag"),
                ('<script src="https://example.invalid/lib.js"></script>', "dependency"),
                ('<button onclick="run()">実行</button>', "inline event"),
                ('<a href="javascript:run()">実行</a>', "unsafe URL"),
            ]:
                with self.subTest(body=body):
                    write(body)
                    self.assertTrue(any(message in error for error in check([a])))


if __name__ == "__main__":
    unittest.main()
