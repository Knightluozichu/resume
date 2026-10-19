#!/usr/bin/env python3
"""Candidate only. Reviewed source spec -> local production contract -> public comparison.
No retry, no proxy environment, no redirect, no test/network bypass CLI.
Fixed Next App Router HTML layout; unsupported shapes are unavailable, never PASS.
"""
import argparse
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import signal
import stat
import sys
import time
import platform
import shutil
import unicodedata
from html.parser import HTMLParser
from urllib.parse import urlsplit
from urllib.request import Request, build_opener, ProxyHandler, HTTPRedirectHandler

ROLES = ('home', 'map', 'first', 'mid', 'last', 'review')
SHA = re.compile(r'[0-9a-f]{64}')
MAX_HTML = 8 * 1024 * 1024
MAX_ASSET = 16 * 1024 * 1024
MAX_TOTAL = 128 * 1024 * 1024
# Local generated inventories are hashes, not buffered HTML/network responses.
# Current app inventory is 2,114,488,574 bytes; bound each full scan to 4 GiB.
MAX_LOCAL_HASH_BYTES = 4 * 1024 * 1024 * 1024
HASH_CHUNK = 1024 * 1024
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())
EXCLUDE = set('script style template nav header footer'.split())
BLOCKS = {'p', 'pre', 'li', 'blockquote', 'dd', 'td'}


def need(condition, message):
    if not condition:
        raise ValueError(message)


def sha(data):
    return hashlib.sha256(data).hexdigest()


def canonical(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode()


def text(value):
    return ' '.join(unicodedata.normalize('NFC', value).split())


def pairs(items):
    out = {}
    for k, v in items:
        need(k not in out, 'duplicate JSON key: ' + k)
        out[k] = v
    return out


def parse_json(data):
    return json.loads(data.decode('utf-8'), object_pairs_hook=pairs,
                      parse_constant=lambda v: (_ for _ in ()).throw(ValueError('nonfinite JSON')))


def keys(value, expected):
    need(isinstance(value, dict) and set(value) == set(expected.split()), 'unknown/missing schema fields')


def relative(name):
    need(isinstance(name, str) and name and '\\' not in name and '%' not in name and
         '?' not in name and '#' not in name and not name.startswith('/') and
         all(p not in ('', '.', '..') for p in name.split('/')), 'unsafe relative path')
    return name


def local(root, name):
    relative(name)
    p = root
    for part in PurePosixPath(name).parts:
        p = p / part
        need(not p.is_symlink(), 'symlink input: ' + name)
    need(p.is_file() and stat.S_ISREG(p.stat().st_mode), 'missing/nonregular: ' + name)
    return p


def read(root, name, cap=MAX_ASSET):
    p = local(root, name)
    need(p.stat().st_size <= cap, 'local byte budget: ' + name)
    data = p.read_bytes()
    need(len(data) <= cap, 'local byte budget after read')
    return data


def route_path(path):
    need(isinstance(path, str) and (path == '/' or
         re.fullmatch(r'/[a-zA-Z0-9_-]+(?:/[a-zA-Z0-9_-]+)*', path)), 'unsafe route')
    return path


def stream_hash(root, name, remaining):
    """Hash every byte with bounded memory; reject replacement or concurrent writes."""
    started = time.monotonic()
    p = local(root, name)
    before = p.stat()
    visited = 0
    def identity(st):
        return (st.st_dev, st.st_ino, st.st_mode, st.st_size, st.st_mtime_ns, st.st_ctime_ns)
    try:
        need(before.st_size <= remaining, 'local inventory total byte budget')
        fd = os.open(p, os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK)
        with os.fdopen(fd, 'rb') as f:
            need(stat.S_ISREG(os.fstat(f.fileno()).st_mode) and
                 identity(os.fstat(f.fileno())) == identity(before), 'local hash open identity changed')
            digest = hashlib.sha256()
            while True:
                data = f.read(min(HASH_CHUNK, before.st_size - visited + 1))
                if not data:
                    break
                visited += len(data)
                need(visited <= before.st_size and visited <= remaining, 'local hash size changed')
                digest.update(data)
            need(visited == before.st_size and identity(os.fstat(f.fileno())) == identity(before),
                 'local hash file changed')
        need(identity(p.lstat()) == identity(before), 'local hash path changed')
        return digest.hexdigest(), visited
    except Exception as exc:
        raise ValueError('local-hash phase=inventory path=' + name +
                         ' visited=' + str(visited) + ' remaining=' + str(remaining) +
                         ' elapsed=' + format(time.monotonic() - started, '.6f') + ': ' + str(exc)) from exc


def inventory(root, subtree, cap=MAX_ASSET, *, hash_only=False, sizes=None):
    relative(subtree)
    base = root / subtree
    need(base.is_dir() and not base.is_symlink(), 'missing inventory root: ' + subtree)
    for parent in base.parents:
        if parent == root:
            break
        need(not parent.is_symlink(), 'inventory parent symlink')
    result = {}
    visited = 0
    for directory, dirs, files in os.walk(base, followlinks=False):
        for name in sorted(dirs + files):
            p = Path(directory) / name
            need(not p.is_symlink(), 'inventory symlink: ' + str(p))
        for name in sorted(files):
            rel = (Path(directory) / name).relative_to(root).as_posix()
            need(len(result) < 50000, 'inventory file budget')
            if hash_only:
                result[rel], size = stream_hash(root, rel, MAX_LOCAL_HASH_BYTES - visited)
                visited += size
                if sizes is not None:
                    sizes[rel] = size
            else:
                result[rel] = sha(read(root, rel, cap))
    need(result, 'empty inventory: ' + subtree)
    return result


class Markup(HTMLParser):
    """Strict balanced HTML (not browser error recovery), fixed visible body selector.
    Digest covers selected teaching DOM text/structure plus substantive blocks.
    Not a claim about browser-computed visibility, interaction or excluded navigation.
    Classes/scripts/React payload are NOT content evidence. Code whitespace retained.
    """
    def __init__(self, role):
        super().__init__(convert_charrefs=True)
        self.role = role
        self.stack = []
        self.main_count = self.target_count = 0
        self.depth = None
        self.capture = None
        self.blocks = []
        self.teaching = []
        self.section = ''
        self.ids = set()
        self.assets = set()
        self.external_hints = set()
        self.head = self.body = 0
        self.html = 0
        self.cards = []
        self.card = None
        self.card_fields = []

    def handle_startendtag(self, tag, attrs):
        need(tag in VOID, 'unsupported self-closing tag')
        self.handle_starttag(tag, attrs)

    def handle_starttag(self, tag, attrs):
        names = [k for k, _ in attrs]
        need(len(names) == len(set(names)), 'duplicate HTML attribute')
        a = dict(attrs)
        if tag == 'html': self.html += 1
        if tag == 'head': self.head += 1
        if tag == 'body': self.body += 1
        need(tag != 'base', 'base URL changes unsupported')
        # All referenced executable/style assets, not an arbitrary find-first file.
        asset = None
        if tag == 'script' and a.get('src'):
            asset = a['src']
        if tag == 'link' and ('stylesheet' in (a.get('rel') or '').split() or
                              a.get('as') in ('script', 'style') or a.get('rel') == 'modulepreload'):
            asset = a.get('href')
            need(asset, 'asset link missing href')
        # A resource hint is not an executable same-release asset. Preserve the one
        # observed analytics preload exactly; never fetch it or claim its integrity.
        # External executable scripts/styles and all other external hints stay fatal.
        if (tag == 'link' and a.get('rel') == 'preload' and a.get('as') == 'script' and
                asset == 'https://static.cloudflareinsights.com/beacon.min.js'):
            self.external_hints.add(asset)
            asset = None
        if asset:
            need(asset.startswith('/_next/static/'), 'external/unknown script or style')
            relative(asset[len('/_next/static/'):])
            need(asset.endswith(('.js', '.css')), 'unsupported static asset type')
            self.assets.add(asset)
        hidden = bool(self.stack and self.stack[-1][1]) or tag in EXCLUDE or 'hidden' in a or a.get('aria-hidden') == 'true'
        style = (a.get('style') or '').replace(' ', '').lower()
        hidden = hidden or 'display:none' in style or 'visibility:hidden' in style
        hidden = hidden or bool({'hidden', 'invisible', 'sr-only'} & set((a.get('class') or '').split()))
        if tag == 'main': self.main_count += 1
        select = (self.role == 'home' and tag == 'main') or (
            self.role != 'home' and tag == 'div' and 'prose' in (a.get('class') or '').split() and
            [v[0] for v in self.stack[-2:]] == ['main', 'article'])
        if select:
            need(not hidden and self.depth is None, 'hidden/overlapping body selector')
            self.target_count += 1
            self.depth = len(self.stack)
        if self.role == 'home' and self.depth is not None and not hidden:
            if tag == 'article':
                need(self.card is None, 'nested visible home article unsupported')
                self.card = {'depth': len(self.stack), 'fields': []}
            if self.card is not None and tag in ('h3', 'a', 'p'):
                self.card_fields.append({'depth': len(self.stack), 'tag': tag,
                                         'href': a.get('href', ''), 'parts': []})
        if self.depth is not None and not hidden:
            self.teaching.append(['start', tag, a.get('id', ''), a.get('alt', '')])
            if a.get('id'):
                need(a['id'] not in self.ids, 'ambiguous body ID')
                self.ids.add(a['id'])
            if tag in ('h2', 'h3', 'h4', 'h5', 'h6'):
                need(self.capture is None, 'heading inside body block')
                self.section = a.get('id', '')
                self.blocks.append({'tag': tag, 'section': self.section, 'text': ''})
            if tag in BLOCKS and self.capture is None:
                self.capture = {'depth': len(self.stack), 'tag': tag, 'section': self.section, 'parts': []}
        if tag == 'br' and self.capture and not hidden:
            self.capture['parts'].append('\n')
        if tag not in VOID:
            need(len(self.stack) < 256, 'HTML nesting budget')
            self.stack.append((tag, hidden))

    def handle_endtag(self, tag):
        need(self.stack and self.stack[-1][0] == tag, 'unbalanced HTML: ' + tag)
        depth = len(self.stack) - 1
        if self.depth is not None and not self.stack[-1][1]:
            self.teaching.append(['end', tag])
        if self.capture and self.capture['depth'] == depth:
            c = self.capture
            value = ''.join(c['parts']).replace('\r\n', '\n').replace('\r', '\n')
            value = unicodedata.normalize('NFC', value) if c['tag'] == 'pre' else text(value)
            self.blocks.append({'tag': c['tag'], 'section': c['section'], 'text': value})
            self.capture = None
        if self.card is not None:
            for field in self.card_fields[:]:
                if field['depth'] == depth:
                    self.card['fields'].append({'tag': field['tag'], 'href': field['href'],
                                                'text': text(''.join(field['parts']))})
                    self.card_fields.remove(field)
            if self.card['depth'] == depth:
                need(not self.card_fields, 'unfinished home card field')
                self.cards.append(self.card['fields'])
                self.card = None
        if self.depth == depth:
            self.depth = None
        self.stack.pop()

    def handle_data(self, data):
        if self.stack and not self.stack[-1][1]:
            for field in self.card_fields:
                field['parts'].append(data)
        if self.depth is not None and self.stack and not self.stack[-1][1]:
            value = unicodedata.normalize('NFC', data) if any(t == 'pre' for t, _ in self.stack) else text(data)
            if value:
                self.teaching.append(['text', value])
        if self.capture and self.stack and not self.stack[-1][1]:
            self.capture['parts'].append(data)

    def finish(self, data):
        need(len(data) <= MAX_HTML, 'HTML byte budget')
        self.feed(data.decode('utf-8', errors='strict'))
        self.close()
        need(not self.stack and self.capture is None and self.depth is None, 'truncated HTML')
        need(self.html == self.head == self.body == self.main_count == self.target_count == 1,
             'missing/ambiguous html/head/body/main/content')
        need(self.assets and any(v.endswith('.css') for v in self.assets) and
             any(v.endswith('.js') for v in self.assets), 'missing CSS/JS')
        return {'bodySha256': sha(canonical({'blocks': self.blocks, 'teaching': self.teaching})), 'blocks': self.blocks,
                'assets': sorted(self.assets), 'externalPreloadHints': sorted(self.external_hints), 'homeCards': self.cards}


def assertion_fields(a):
    base = 'section text source expectationId' if 'expectationId' in a else 'section text source'
    keys(a, base + (' wholeBlockContext' if 'wholeBlockContext' in a else ''))
    need('wholeBlockContext' not in a or a.get('expectationId') == 'review-02',
         'whole-block context only supported for review-02')


def check_assertions(parsed, assertions):
    need(isinstance(assertions, list) and 2 <= len(assertions) <= 8, 'need 2..8 substantive source assertions')
    seen = set()
    total = 0
    for a in assertions:
        assertion_fields(a)
        value = text(a['wholeBlockContext']['visibleText'] if 'wholeBlockContext' in a else a['text'])
        need(len(value) >= 32 and value not in seen, 'short/duplicate substantive assertion')
        seen.add(value)
        total += len(value)
        matches = [b for b in parsed['blocks'] if b['tag'] in ({'p'} if 'wholeBlockContext' in a else BLOCKS) and
                   b['section'] == a['section'] and text(b['text']) == value]
        need(len(matches) == 1, 'missing/ambiguous substantive explanation: ' + value[:64])
    need(total >= 96, 'insufficient substantive explanation length')


def search_tools(project):
    for key in ('PAGEFIND_BINARY_PATH', 'PAGEFIND_EXTENDED_BINARY_PATH', 'npm_config_arch'):
        need(not os.environ.get(key), 'unsupported search tool override: ' + key)
    pf = (project / 'node_modules/pagefind').resolve(strict=True)
    cpu = {'arm64':'arm64', 'aarch64':'arm64', 'x86_64':'x64', 'AMD64':'x64'}.get(platform.machine())
    need(cpu is not None and sys.platform in ('darwin', 'linux', 'freebsd'), 'unsupported search platform')
    name = '@pagefind/' + sys.platform + '-' + cpu
    native = (pf.parent / name).resolve(strict=True)
    def files(base):
        rel = base.relative_to(project).as_posix()
        need(rel.startswith('node_modules/'), 'search tool escapes dependencies')
        return {k.removeprefix(rel + '/'):v for k,v in inventory(project, rel, 128 * 1024 * 1024).items()}
    pkg = parse_json((pf/'package.json').read_bytes())
    meta = parse_json((native/'package.json').read_bytes())
    need(pkg['name'] == 'pagefind' and meta['name'] == name and
         pkg['version'] == meta['version'] == pkg['optionalDependencies'][name], 'Pagefind package identity mismatch')
    binary = next((n for n in ('bin/pagefind_extended','bin/pagefind') if (native/n).is_file()), None)
    need(binary is not None, 'missing installed search binary')
    node = shutil.which('node')
    need(node is not None, 'node identity unavailable')
    return {'pagefindRoot':pf.relative_to(project).as_posix(), 'nativeRoot':native.relative_to(project).as_posix(),
            'name':name, 'version':pkg['version'], 'binary':binary,
            'pagefindFiles':files(pf), 'nativeFiles':files(native), 'nodeSha256':sha(Path(node).resolve(strict=True).read_bytes())}


def generated_search(project, expected):
    record = parse_json(read(project, '.next/pagefind-provenance.json', 32 * 1024 * 1024))
    keys(record, 'schema tools htmlFiles buildIdSha256 scriptSha256 lockSha256 files')
    need(record['schema'] == 1, 'search receipt schema')
    need(record['tools'] == expected['searchTools'] == search_tools(project), 'search tool binding drift')
    need(record['scriptSha256'] == expected['sourceFiles']['scripts/build-search-index.mjs'] and
         record['lockSha256'] == expected['sourceFiles']['pnpm-lock.yaml'], 'search script/lock binding mismatch')
    need(record['buildIdSha256'] == sha(read(project, '.next/BUILD_ID')), 'search BUILD_ID binding mismatch')
    html = {k.removeprefix('.next/server/app/'):v for k,v in inventory(project,'.next/server/app', hash_only=True).items() if k.endswith('.html')}
    need(html and record['htmlFiles'] == html, 'search HTML input drift')
    def output(base):
        data = inventory(project,base)
        for name in data:
            need(local(project,name).stat().st_nlink == 1, 'search output shared hardlink')
        return {k.removeprefix(base + '/'):v for k,v in data.items()}
    files = output('.next/pagefind')
    need({'pagefind.js','pagefind-entry.json'} <= set(files), 'search entry missing')
    need(record['files'] == files, 'generated search manifest drift')
    need(output('.next/standalone/public/pagefind') == files, 'assembled search manifest mismatch')
    authored = {k.removeprefix('public/'):v for k,v in expected['sourceFiles'].items() if k.startswith('public/')}
    assembled = {k.removeprefix('.next/standalone/public/'):v for k,v in inventory(project,'.next/standalone/public').items()}
    need(assembled == {**authored, **{'pagefind/' + k:v for k,v in files.items()}}, 'assembled public manifest mismatch')
    return {'receiptSha256':sha(read(project,'.next/pagefind-provenance.json',32 * 1024 * 1024)),
            'files':files, 'tools':record['tools'], 'htmlFiles':html,
            'buildIdSha256':record['buildIdSha256'], 'remoteSearchBehaviorVerified':False}


def home_card(parsed, expected):
    """Explicit-visible structural projection only, not computed CSS visibility."""
    cards = [c for c in parsed['homeCards'] if any(
        f['tag'] == 'h3' and f['text'] == expected['title'] for f in c)]
    need(len(cards) == 1, 'missing/ambiguous home book article')
    fields = cards[0]
    titles = [f for f in fields if f['tag'] == 'h3']
    need(len(titles) == 1 and titles[0]['text'] == expected['title'], 'ambiguous book title')
    # Other links (e.g. whole-book review) are allowed, but conflicting reading
    # labels/hrefs are not. Never borrow fields from another card or its parent.
    links = [f for f in fields if f['tag'] == 'a' and
             (f['text'] == expected['label'] or f['href'] == expected['href'] or
              '开始阅读' in f['text'])]
    need(len(links) == 1 and links[0]['text'] == expected['label'] and
         links[0]['href'] == expected['href'], 'missing/conflicting same-card reading link')
    counts = [f['text'] for f in fields if f['tag'] == 'p' and
              re.search(r'个分区|\d+\s*章', f['text'])]
    pattern = re.escape(str(expected['sections']) + ' 个分区 · ' + str(expected['chapters']) + ' 章')
    need(len(counts) == 1 and re.fullmatch(pattern + r'(?: · [0-9]+ 道复习题)?', counts[0]),
         'missing/conflicting same-card chapter count')
    projection = {**expected, 'countText': counts[0]}
    return {'projection': projection, 'sha256': sha(canonical(projection))}


# Reviewed fixed inline-Term semantics: visible termText button, initially hidden tooltip/arrow.
# This is deliberately NOT a general MDX renderer or a public-response-derived expectation.
REVIEW_CONTEXT_COMPONENTS = {
    'src/components/mdx/term.tsx': '5aa8183a40cb352b07c5ba69e9c6a5e6f57df47ff8e058a450f50ab516c999d5',
    'src/components/mdx/mdx-components.tsx': '9fb58b1659a31e62b6d4b61bc021a8c1894881e40aea3223bbf8913acc07d7ca',
}
REVIEW_SOURCE = 'content/go-web-programming/06-review/gwp-final-review.mdx'
REVIEW_SECTION = '发布一致性先证明送检的是同一份再谈上线'


def review_block_context(project, original):
    need(original['id'] == 'review-02' and original['sourceLineStart'] ==
         original['sourceLineEnd'] == 189 and original['sourceColumnStart'] == 1,
         'unsupported whole-block selected span')
    lines = read(project, REVIEW_SOURCE).decode('utf-8').splitlines()
    need(len(lines) > 189 and lines[185] == '## 发布一致性：先证明送检的是同一份，再谈上线' and
         lines[186] == lines[189] == '', 'whole-block boundary/section mismatch')
    term = '<Term def="把候选文件逐一绑定到明确预期摘要的本地一致性检查">产物绑定</Term>'
    need(lines[187] == term and lines[188] == original['rawSourceLine'] ==
         original['rawParagraph'] == original['expectedVisibleText'] and
         sha(lines[188].encode()) == original['rawParagraphSha256'], 'whole-block raw selection mismatch')
    for path, digest in REVIEW_CONTEXT_COMPONENTS.items():
        need(sha(read(project, path)) == digest, 'whole-block component semantic binding: ' + path)
    raw = '\n'.join(lines[187:189])
    return {'sourceLineStart': 188, 'sourceLineEnd': 189, 'rawSourceBlock': raw,
            'rawSha256': sha(raw.encode()), 'visibleText': '产物绑定 ' + original['expectedVisibleText'],
            'semanticId': 'mdx-inline-Term-visible-button-hidden-tooltip-v1',
            'componentSources': dict(REVIEW_CONTEXT_COMPONENTS)}


def reviewed_expectations(project, spec):
    """Exact reviewed raw/visible pairs; no Markdown guesser, no output oracle.
    Current contract supports exactly22 single-line Unicode-character spans.
    A new document SHA still needs controller review; SHA is not reviewer identity.
    """
    ref = spec['expectations']; keys(ref, 'path sha256')
    need(isinstance(ref['sha256'], str) and SHA.fullmatch(ref['sha256']), 'expectations SHA')
    raw = read(project, ref['path'])
    need(sha(raw) == ref['sha256'] == spec['sourceFiles'].get(ref['path']), 'expectations pin mismatch')
    doc = parse_json(raw)
    need(doc['book'] == spec['book'] == 'go-web-programming', 'expectations book mismatch')
    pins = {}
    for row in doc['sourceInventory'] + doc['supportingSources']:
        path = row['path']
        need(path not in pins, 'duplicate reviewed source pin')
        pins[path] = row['sha256']
        need(spec['sourceFiles'].get(path) == row['sha256'] == sha(read(project, path)),
             'reviewed source/supporting pin mismatch: ' + path)
    pages = doc['pages']
    rename = {'firstformal': 'first', 'middleformal': 'mid', 'lastformal': 'last'}
    need(len(pages) == 6 and sorted(rename.get(p['role'], p['role']) for p in pages) == sorted(ROLES),
         'reviewed six roles required')
    ids = set()
    for page in pages:
        role = rename.get(page['role'], page['role'])
        route = next(r for r in spec['routes'] if r['role'] == role)
        need(route['path'] == page['route'], 'reviewed route mismatch')
        source = page['sourcePath']
        need(source == 'src/app/page.tsx' if role == 'home' else
             source.startswith('content/' + spec['book'] + '/') and source.endswith('.mdx'),
             'unsupported/shadow reviewed source')
        need(pins.get(source) == page['sourceSha256'], 'page source pin mismatch')
        lines = read(project, source).decode('utf-8').splitlines()
        originals = page['assertions']
        need(2 <= len(originals) <= 8 and len(route['assertions']) == len(originals), 'reviewed selection changed')
        selected = {a['expectationId']: a for a in route['assertions']}
        need(len(selected) == len(originals) and set(selected) == {a['id'] for a in originals},
             'missing/duplicate/cross-route expectation ID')
        for original in originals:
            ident = original['id']
            need(ident not in ids, 'duplicate reviewed ID'); ids.add(ident)
            a = selected[ident]
            start, end, col = (original[k] for k in ('sourceLineStart', 'sourceLineEnd', 'sourceColumnStart'))
            need(all(type(n) is int for n in (start, end, col)) and 1 <= start == end <= len(lines) and col >= 1,
                 'unsupported reviewed source span')
            line, paragraph = lines[start - 1], original['rawParagraph']
            need(isinstance(paragraph, str) and paragraph and line == original['rawSourceLine'] and
                 line[col - 1: col - 1 + len(paragraph)] == paragraph and
                 sha(paragraph.encode()) == original['rawParagraphSha256'], 'reviewed raw span/SHA mismatch')
            need(a['source'] == source and a['text'] == original['expectedVisibleText'],
                 'reviewed source/visible mapping mismatch')
            if ident == 'review-02':
                need(source == REVIEW_SOURCE and a['section'] == REVIEW_SECTION, 'whole-block source/section')
                context = review_block_context(project, original)
                need(original.get('wholeBlockContext') == a.get('wholeBlockContext') == context,
                     'reviewed whole-block context missing/drift')
                need(all(spec['sourceFiles'].get(k) == v for k, v in REVIEW_CONTEXT_COMPONENTS.items()),
                     'component semantic sources not frozen')
            else:
                need('wholeBlockContext' not in a and 'wholeBlockContext' not in original,
                     'unexpected whole-block context')
    need(len(ids) == 22, 'all22 reviewed assertions required')
    home = doc['homeBookVisibility']
    need(home['required'] is True and len(home['assertions']) == 3, 'home book structure required')
    title, link, count = home['assertions']
    need([r['kind'] for r in (title, link, count)] ==
         ['visible-book-card-title', 'same-card-start-link', 'same-card-source-projected-count'], 'home structure schema')
    expected = {'title': title['expected'], 'href': link['expectedHref'], 'label': link['expectedLabel'],
                'sections': count['expectedSections'], 'chapters': count['expectedChapters']}
    need(expected['title'] == 'Go Web 编程' and expected['sections'] == 7 and expected['chapters'] == 12 and
         type(expected['sections']) is int and type(expected['chapters']) is int and
         expected['href'] == next(r['path'] for r in spec['routes'] if r['role'] == 'map') and
         isinstance(expected['label'], str) and expected['label'], 'home book projection mismatch')
    return expected


def source_binding(project, spec):
    need(not os.path.lexists(project / "public/pagefind"), "fresh source must not contain generated public/pagefind")
    keys(spec, 'schema book commit review sourceRoots sourceFiles routes expectations' if spec.get('schema') == 2 else
         'schema book commit review sourceRoots sourceFiles routes')
    need(type(spec['schema']) is int and spec['schema'] in (1, 2) and isinstance(spec['review'], str) and len(spec['review']) >= 8, 'reviewed spec required')
    need(re.fullmatch('[a-z0-9][a-z0-9-]*', spec['book']), 'book slug')
    need(spec['book'] != 'go-web-programming' or spec['schema'] == 2, 'Go book requires reviewed mapping schema2')
    need(re.fullmatch('[0-9a-f]{40}', spec['commit']), 'commit SHA')
    roots, expected = spec['sourceRoots'], spec['sourceFiles']
    need(isinstance(roots, list) and len(roots) == len(set(roots)) and
         {'src', 'content', 'public', 'scripts'} <= set(roots), 'incomplete source roots')
    need(isinstance(expected, dict) and len(expected) <= 50000 and {'package.json', 'pnpm-lock.yaml', 'tsconfig.json'} <= set(expected) and
         any(k in expected for k in ('next.config.ts', 'next.config.mjs', 'next.config.js')), 'missing build configuration bindings')
    actual = {}
    for root in roots:
        need(root in ('src', 'content', 'public', 'scripts') or root.startswith('quality/'), 'unexpected source root')
        actual.update(inventory(project, root))
    for name, digest in expected.items():
        need(isinstance(digest, str) and SHA.fullmatch(digest), 'invalid source hash')
        actual[name] = sha(read(project, name))
    need(actual == expected, 'frozen source inventory changed')
    need(isinstance(spec['routes'], list) and len(spec['routes']) == 6, 'exact six role routes required')
    need(sorted(r['role'] for r in spec['routes']) == sorted(ROLES), 'missing/duplicate route role')
    paths = set()
    for r in spec['routes']:
        keys(r, 'role path assertions')
        path = route_path(r['path'])
        need(path not in paths, 'ambiguous duplicate role route')
        paths.add(path)
        need(path == '/' if r['role'] == 'home' else path.startswith('/learn/' + spec['book'] + '/'), 'role path/book mismatch')
        need(isinstance(r['assertions'], list) and 2 <= len(r['assertions']) <= 8, 'assertions list budget')
        for a in r['assertions']:
            assertion_fields(a)
            need(('expectationId' in a) == (spec['schema'] == 2), 'assertion schema version')
            need(a['source'] in expected, 'assertion source not frozen')
            if spec['schema'] == 1:
                need(text(a['text']) in text(read(project, a['source']).decode('utf-8')), 'assertion absent from reviewed source')
            need(isinstance(a['section'], str) and (r['role'] == 'home' or a['section']), 'chapter assertion section required')
    if spec['schema'] == 2:
        reviewed_expectations(project, spec)
    return actual


def build_input(project, spec_data, spec_hash, release, commit, book, smoke_paths):
    need(sha(spec_data) == spec_hash, 'reviewed spec SHA mismatch')
    spec = parse_json(spec_data)
    sources = source_binding(project, spec)
    need(spec['commit'] == commit and spec['book'] == book, 'reviewed commit/book mismatch')
    need(re.fullmatch(r'release-[0-9]{8}T[0-9]{6}Z-' + commit[:12] + r'-[0-9a-f-]{36}', release), 'release identity mismatch')
    need(sorted(smoke_paths) == sorted(r['path'] for r in spec['routes']), 'smoke paths must equal six reviewed role routes')
    return {'schema': 1, 'project': str(project), 'specSha256': spec_hash,
            'checkerSha256': sha(Path(__file__).read_bytes()), 'release': release,
            'commit': commit, 'book': book, 'smokePaths': sorted(smoke_paths),
            'sourceFiles': sources, 'freshOutputRequired': True, 'searchTools': search_tools(project)}


def local_contract(project, spec_data, spec_hash, release, commit, book, smoke_paths, build_input_data, build_input_sha):
    expected = build_input(project, spec_data, spec_hash, release, commit, book, smoke_paths)
    need(sha(build_input_data) == build_input_sha and parse_json(build_input_data) == expected,
         'prebuild source binding changed/missing; cannot bind current source to prior build')
    spec = parse_json(spec_data)
    sources = expected['sourceFiles']
    artifacts = {}
    def artifact(name):
        b = read(project, name)
        artifacts[name] = sha(b)
        return b
    build = artifact('.next/BUILD_ID').decode('utf-8').strip()
    need(re.fullmatch(r'[a-zA-Z0-9_-]{1,128}', build), 'invalid BUILD_ID')
    need(artifact('.next/standalone/.next/BUILD_ID').decode().strip() == build, 'standalone BUILD_ID mismatch')
    artifact('.next/standalone/server.js')
    manifest = parse_json(artifact('.next/prerender-manifest.json'))
    need(manifest.get('version') == 4, 'unsupported prerender manifest version')
    app_manifest = parse_json(artifact('.next/server/app-paths-manifest.json'))
    need(app_manifest.get('/page') == 'app/page.js' and
         app_manifest.get('/learn/[...slug]/page') == 'app/learn/[...slug]/page.js', 'unsupported app routing manifest')
    sizes, assembled_sizes = {}, {}
    static = inventory(project, '.next/static', hash_only=True, sizes=sizes)
    assembled = inventory(project, '.next/standalone/.next/static', hash_only=True, sizes=assembled_sizes)
    need({k.removeprefix('.next/static/'): v for k, v in sizes.items()} ==
         {k.removeprefix('.next/standalone/.next/static/'): v for k, v in assembled_sizes.items()},
         'assembled static sizes mismatch')
    need({k.removeprefix('.next/static/'): v for k, v in static.items()} ==
         {k.removeprefix('.next/standalone/.next/static/'): v for k, v in assembled.items()}, 'assembled static manifest mismatch')
    search = generated_search(project, expected)
    routes = []
    for r in spec['routes']:
        path = r['path']
        row = manifest.get('routes', {}).get(path)
        need(isinstance(row, dict) and row.get('initialRevalidateSeconds') is False and
             row.get('initialStatus', 200) == 200 and path not in manifest.get('notFoundRoutes', []),
             'missing/dynamic/non-200 production route: ' + path)
        need(row.get('dataRoute') == ('/index.rsc' if path == '/' else path + '.rsc'), 'unsupported route data mapping')
        src = row.get('srcRoute')
        need(src == ('/' if path == '/' else '/learn/[...slug]'), 'unsupported source route')
        if isinstance(src, str) and '[' in src:
            need(manifest.get('dynamicRoutes', {}).get(src, {}).get('fallback') is False, 'dynamic fallback unavailable')
        html_name = 'index' if path == '/' else path[1:]
        html = artifact('.next/server/app/' + html_name + '.html')
        need(artifact('.next/standalone/.next/server/app/' + html_name + '.html') == html, 'assembled HTML mismatch')
        parsed = Markup(r['role']).finish(html)
        check_assertions(parsed, r['assertions'])
        for asset in parsed['assets']:
            need('.next/static/' + asset.removeprefix('/_next/static/') in static, 'referenced asset absent')
        card = {'homeBookCard': home_card(parsed, reviewed_expectations(project, spec))} if spec['schema'] == 2 and r['role'] == 'home' else {}
        routes.append({**r, **card, 'htmlSha256': sha(html), 'bodySha256': parsed['bodySha256'], 'assets': parsed['assets'], 'externalPreloadHints': parsed['externalPreloadHints']})
    need(source_binding(project, spec) == sources, 'source changed during prepare')
    binding = {'expectations': spec['expectations'], 'homeBookVisibility': reviewed_expectations(project, spec)} if spec['schema'] == 2 else {}
    return {'schema': 3 if spec['schema'] == 2 else 2, **binding, 'buildInputSha256': build_input_sha, 'specSha256': spec_hash, 'checkerSha256': sha(Path(__file__).read_bytes()),
            'release': release, 'commit': commit, 'book': book, 'buildId': build,
            'sourceFiles': sources, 'generatedSearch':search, 'staticFiles': static, 'staticSizes': sizes, 'artifactFiles': artifacts, 'routes': routes}


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        raise ValueError('redirect forbidden')


def fetch_url(url, limit, remaining):
    opener = build_opener(ProxyHandler({}), NoRedirect())
    req = Request(url, headers={'Accept-Encoding': 'identity', 'User-Agent': 'Remuse-PreMark/1'})
    with opener.open(req, timeout=min(10, remaining)) as response:
        data = response.read(limit + 1)
        return response.status, dict(response.headers.items()), data


def response_headers(status, headers, path, size, kind):
    h = {}
    for key, value in headers.items():
        need(key.lower() not in h, 'duplicate response header')
        h[key.lower()] = value
    need(status == 200, 'HTTP status not 200')
    need(h.get('content-encoding', 'identity').lower() == 'identity', 'encoded response unsupported')
    need('content-length' not in h or h['content-length'] == str(size), 'truncated/invalid content length')
    mime = h.get('content-type', '').split(';')[0].lower()
    need(mime in ({'text/html'} if kind == 'html' else
                 ({'text/css'} if path.endswith('.css') else {'application/javascript', 'text/javascript'})),
         'wrong response MIME')


def hash_asset_response(response, path, expected_size, deadline):
    """Bounded memory, exact local size plus EOF, every response byte hashed; no buffering fallback."""
    need(type(expected_size) is int and 0 <= expected_size <= MAX_TOTAL, 'invalid expected asset size')
    response_headers(response.status, response.headers, path, expected_size, 'asset')
    count = 0
    digest = hashlib.sha256()
    while True:
        need(time.monotonic() < deadline, 'global deadline during asset stream')
        chunk = response.read(min(HASH_CHUNK, expected_size - count + 1))
        need(time.monotonic() < deadline, 'global deadline after asset read')
        if not chunk:
            break
        count += len(chunk)
        need(count <= expected_size, 'asset longer than exact expected size')
        digest.update(chunk)
    need(count == expected_size, 'asset shorter than exact expected size')
    return {'sha256': digest.hexdigest(), 'size': count}


def fetch_asset_url(url, expected_size, remaining):
    deadline = time.monotonic() + remaining
    opener = build_opener(ProxyHandler({}), NoRedirect())
    req = Request(url, headers={'Accept-Encoding': 'identity', 'User-Agent': 'Remuse-PreMark/1'})
    with opener.open(req, timeout=min(10, remaining)) as response:
        return hash_asset_response(response, urlsplit(url).path, expected_size, deadline)


def public_check(contract, origin, fetch, deadline, evidence):
    u = urlsplit(origin)
    need(u.scheme == 'https' and u.hostname and not u.username and not u.password and
         not u.query and not u.fragment and u.path in ('', '/') and u.port in (None, 443), 'explicit HTTPS origin required')
    origin = origin.rstrip('/')
    total = 0
    def request(path, cap, kind):
        nonlocal total
        remaining = deadline - time.monotonic()
        need(remaining > 0, 'global deadline')
        evidence['phase'] = 'public-' + kind
        evidence['currentPath'] = path
        status, headers, data = fetch(origin + path, cap, remaining)
        total += len(data)
        need(len(data) <= cap and total <= MAX_TOTAL, 'response byte budget')
        need(time.monotonic() < deadline, 'global deadline after HTML read')
        response_headers(status, headers, path, len(data), kind)
        return data
    assets = set()
    evidence['routes'] = []
    evidence['assets'] = []
    for r in contract['routes']:
        data = request(r['path'], MAX_HTML, 'html')
        parsed = Markup(r['role']).finish(data)
        evidence['routes'].append({'role': r['role'], 'path': r['path'], 'rawResponseSha256': sha(data),
                                   'bodySha256': parsed['bodySha256'], 'expectedBodySha256': r['bodySha256']})
        check_assertions(parsed, r['assertions'])
        if contract['schema'] == 3 and r['role'] == 'home':
            observed = home_card(parsed, contract['homeBookVisibility'])
            evidence['routes'][-1]['homeBookCard'] = observed
            need(observed == r['homeBookCard'], 'production home card differs')
        need(parsed['bodySha256'] == r['bodySha256'], 'production body differs: ' + r['role'])
        need(parsed['assets'] == r['assets'], 'referenced assets differ: ' + r['role'])
        need(parsed['externalPreloadHints'] == r['externalPreloadHints'], 'external resource hints differ')
        assets.update(parsed['assets'])
    need(1 <= len(assets) <= 64, 'asset count budget')
    for asset in sorted(assets):
        key = '.next/static/' + asset.removeprefix('/_next/static/')
        expected = contract['staticFiles'][key]
        size = contract['staticSizes'][key]
        need(type(size) is int and 0 <= size <= MAX_TOTAL - total, 'total response byte budget before stream')
        remaining = deadline - time.monotonic()
        need(remaining > 0, 'global deadline')
        evidence.update(phase='public-asset', currentPath=asset, expectedSize=size, bytesRead=total)
        observed = fetch_asset_url(origin + asset, size, remaining)
        need(time.monotonic() < deadline, 'global deadline after asset stream')
        need(observed['size'] == size, 'public asset exact size differs')
        total += observed['size']
        evidence['assets'].append({'path': asset, 'actualSha256': observed['sha256'],
                                   'expectedSha256': expected, 'expectedSize': size, 'actualSize': observed['size']})
        need(observed['sha256'] == expected, 'public asset bytes differ')
    evidence['bytesRead'] = total


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('mode', choices=('bind', 'prepare', 'verify'))
    for name in ('project', 'spec', 'spec-sha256', 'checker-sha256', 'release', 'commit', 'book', 'contract', 'report'):
        ap.add_argument('--' + name, required=True)
    ap.add_argument('--smoke-path', action='append', required=True)
    ap.add_argument('--contract-sha256')
    ap.add_argument('--origin')
    ap.add_argument('--build-input', required=True)
    ap.add_argument('--build-input-sha256')
    args = ap.parse_args(argv)
    started = time.monotonic()
    evidence = {'status': 'FAIL', 'phase': 'arguments', 'mode': args.mode,
                'release': args.release, 'commit': args.commit, 'specSha256': args.spec_sha256}
    report = Path(args.report)
    # No overwriting prior evidence. Alarm also covers DNS/local IO; no owned subprocesses.
    need(not report.exists() and report.parent.is_dir(), 'report must be new in existing directory')
    def timed_out(signum, frame):
        raise TimeoutError('90s hard wall-clock deadline')
    old = signal.signal(signal.SIGALRM, timed_out)
    signal.setitimer(signal.ITIMER_REAL, 90)
    try:
        need(sha(Path(__file__).read_bytes()) == args.checker_sha256, 'checker hash mismatch')
        project = Path(args.project).resolve(strict=True)
        need(Path(args.spec).stat().st_size <= 32 * 1024 * 1024, 'spec byte budget')
        spec_data = Path(args.spec).read_bytes()
        evidence['phase'] = 'prebuild-source-binding'
        if args.mode == 'bind':
            need(args.origin is None and args.contract_sha256 is None and args.build_input_sha256 is None,
                 'bind must be local and create new provenance')
            need(not os.path.lexists(project / '.next'), 'fresh build required: existing .next is unproven')
            receipt = build_input(project, spec_data, args.spec_sha256, args.release, args.commit, args.book, args.smoke_path)
            data = canonical(receipt) + b'\n'
            with Path(args.build_input).open('xb') as f: f.write(data)
            evidence.update(buildInputSha256=sha(data), sourceFileCount=len(receipt['sourceFiles']), status='PASS', phase='complete')
            print(sha(data))
            return 0
        need(args.build_input_sha256 is not None, 'prebuild binding SHA required')
        need(Path(args.build_input).stat().st_size <= 32 * 1024 * 1024, 'build input byte budget')
        input_data = Path(args.build_input).read_bytes()
        evidence['buildInputSha256'] = args.build_input_sha256
        evidence['phase'] = 'local-contract'
        c = local_contract(project, spec_data, args.spec_sha256, args.release, args.commit, args.book, args.smoke_path, input_data, args.build_input_sha256)
        data = canonical(c) + b'\n'
        digest = sha(data)
        evidence.update(contractSha256=digest, buildId=c['buildId'], sourceFileCount=len(c['sourceFiles']), staticFileCount=len(c['staticFiles']))
        if args.mode == 'prepare':
            need(args.contract_sha256 is None and args.origin is None, 'prepare cannot access public origin')
            with Path(args.contract).open('xb') as f:
                f.write(data)
            print(digest)
        else:
            need(args.contract_sha256 == digest and Path(args.contract).read_bytes() == data, 'frozen contract/local output drift')
            need(args.origin is not None, 'missing public origin')
            public_check(c, args.origin, fetch_url, started + 90, evidence)
            evidence['phase'] = 'after-public-local-stability'
            after = local_contract(project, Path(args.spec).read_bytes(), args.spec_sha256, args.release, args.commit, args.book, args.smoke_path, input_data, args.build_input_sha256)
            need(after == c and Path(args.contract).read_bytes() == data and Path(args.build_input).read_bytes() == input_data, 'inputs changed during public verification')
        evidence['phase'] = 'complete'
        evidence['status'] = 'PASS'
        code = 0
    except Exception as exc:
        evidence['error'] = type(exc).__name__ + ': ' + str(exc)
        print(evidence['error'], file=sys.stderr)
        code = 1
    finally:
        signal.setitimer(signal.ITIMER_REAL, 0)
        signal.signal(signal.SIGALRM, old)
        evidence['elapsedSeconds'] = round(time.monotonic() - started, 6)
        with report.open('x') as f:
            json.dump(evidence, f, indent=2, ensure_ascii=False)
            f.write('\n')
    return code


if __name__ == '__main__':
    sys.exit(main())
