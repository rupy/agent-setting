"""Conservative checks for this skill's static HTML; not a browser or full validator."""

import argparse
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


VOID = set("area base br col embed hr img input link meta param source track wbr".split())


class Document(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.ids = []
        self.links = []
        self.errors = []
        self.lang = False
        self.title = False
        self.example = False
        self.feed(text)
        self.close()
        if self.stack:
            self.errors.append("unclosed tags: " + ", ".join(self.stack))
        self.errors.extend("duplicate id: " + key for key, n in Counter(self.ids).items() if n > 1)
        if not self.lang or not self.title:
            self.errors.append("html lang and title are required")

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag not in VOID:
            self.stack.append(tag)
        if tag == "html":
            self.lang = bool(attrs.get("lang"))
        if tag == "title":
            self.title = True
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if "data-reference-example" in attrs:
            self.example = True
        if tag == "base":
            self.errors.append("base changes relative-link semantics")
        for name, value in attrs.items():
            if name.startswith("on"):
                self.errors.append("inline event attribute: " + name)
            if name in ("href", "src") and value:
                url = urlsplit(value)
                if url.scheme.lower() in ("javascript", "vbscript", "file"):
                    self.errors.append("unsafe URL: " + name)
                elif name == "href" and tag == "a":
                    self.links.append(value)
                elif url.scheme or url.netloc:
                    self.errors.append("external/embedded dependency: " + tag)

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if not self.stack or self.stack[-1] != tag:
            self.errors.append("mismatched closing tag: " + tag)
        else:
            self.stack.pop()


def check(paths, template=False):
    errors = []
    cache = {}

    def read(path):
        if path not in cache:
            cache[path] = Document(path.read_text(encoding="utf-8"))
        return cache[path]

    for path in paths:
        path = Path(path).resolve()
        try:
            doc = read(path)
        except (OSError, UnicodeError) as exc:
            errors.append(f"{path}: {exc}")
            continue
        errors.extend(f"{path}: {error}" for error in doc.errors)
        if doc.example and not template:
            errors.append(f"{path}: reference example remains")
        for href in doc.links:
            url = urlsplit(href)
            if url.scheme or url.netloc:
                continue
            target = (path.parent / unquote(url.path)).resolve() if url.path else path
            if not target.is_file():
                errors.append(f"{path}: missing link target: {href}")
                continue
            if url.fragment and target.suffix.lower() in (".html", ".htm"):
                try:
                    if unquote(url.fragment) not in read(target).ids:
                        errors.append(f"{path}: missing anchor: {href}")
                except (OSError, UnicodeError) as exc:
                    errors.append(f"{path}: {exc}")
    return errors


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("paths", nargs="+", type=Path)
    parser.add_argument("--template", action="store_true", help="Allow marked reference examples")
    args = parser.parse_args()
    failures = check(args.paths, args.template)
    for failure in failures:
        print(failure)
    if failures:
        raise SystemExit(1)
    print(f"Checked {len(args.paths)} HTML file(s). No structural/link errors detected.")
