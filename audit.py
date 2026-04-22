import re, glob, os, posixpath

base = 'C:/Users/Warrior/riskfreesites'
files = glob.glob(base + '/**/index.html', recursive=True)

def to_url(path):
    return path.replace('\\', '/').replace(base, '').replace('/index.html', '') or '/'

# Build valid set from filesystem
valid_paths = set()
for f in files:
    rel = to_url(f)
    if rel != '/':
        valid_paths.add(rel + '/')
valid_paths.add('/')

print('=== ALL VALID PATHS ===')
for v in sorted(valid_paths):
    print(' ', repr(v))

print()
print('=== BROKEN INTERNAL LINKS ===')
broken = []
for f in files:
    with open(f, encoding='utf-8') as fh:
        content = fh.read()
    links = re.findall(r'href="(/[^"]*)"', content)
    page = to_url(f)
    for link in links:
        path = link.split('#')[0]
        if not path or path == '/':
            continue
        if not path.endswith('/'):
            path_check = path + '/'
        else:
            path_check = path
        if path_check not in valid_paths:
            broken.append((page, link))

seen = set()
for page, link in sorted(broken):
    key = (page, link)
    if key not in seen:
        seen.add(key)
        print('  [' + page + '] -> ' + link)

print()
print('=== SCHEMA TYPES PRESENT ===')
for f in files:
    with open(f, encoding='utf-8') as fh:
        content = fh.read()
    types = re.findall(r'"@type":\s*"([^"]+)"', content)
    page = to_url(f)
    print('  ' + page + ': ' + ', '.join(set(types)))

print()
print('=== PAGES MISSING FAQ SCHEMA ===')
for f in files:
    with open(f, encoding='utf-8') as fh:
        content = fh.read()
    page = to_url(f)
    if 'FAQPage' not in content and ('faq' in content.lower() or 'question' in content.lower()):
        if 'details' in content.lower() or 'accordion' in content.lower() or '<h2' in content:
            print('  ' + page)

print()
print('=== PAGES MISSING LocalBusiness / Service SCHEMA ===')
for f in files:
    with open(f, encoding='utf-8') as fh:
        content = fh.read()
    page = to_url(f)
    has_schema = 'application/ld+json' in content
    has_local = 'LocalBusiness' in content or 'Service' in content or 'Article' in content or 'WebSite' in content or 'Organization' in content or 'WebPage' in content
    if not has_local:
        print('  ' + page + ' -- NO STRUCTURED DATA')

print()
print('=== CANONICAL CHECK ===')
for f in files:
    with open(f, encoding='utf-8') as fh:
        content = fh.read()
    page = to_url(f)
    has_canonical = 'rel="canonical"' in content
    if not has_canonical:
        print('  MISSING CANONICAL: ' + page)

print()
print('DONE')
