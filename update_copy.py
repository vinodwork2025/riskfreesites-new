import glob, re

files = glob.glob('C:/Users/Warrior/riskfreesites/**/index.html', recursive=True)
# Don't re-process home page for the pricing line (already done manually)
files = [f for f in files if 'riskfreesites\\index.html' not in f and 'riskfreesites/index.html' not in f]

updated = 0
for path in files:
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    original = html

    # 1. Add positioning line above pricing heading (all pages except home)
    old_pricing_header = (
        '<p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;'
        'color:var(--text-3);margin-bottom:14px;">Pricing</p>\n'
        '      <h2 style="font-weight:900;letter-spacing:-0.045em;line-height:1.05;'
        'font-size:clamp(1.8rem,4vw,2.8rem);color:var(--text);margin-bottom:16px;">'
        'Simple, Transparent Pricing</h2>\n'
        '      <p style="font-size:1rem;color:var(--text-2);line-height:1.75;max-width:44ch;'
        'margin:0 auto;">Every business is different, so pricing depends on what you need.</p>'
    )
    new_pricing_header = (
        '<p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;'
        'color:var(--text-3);margin-bottom:14px;">Pricing</p>\n'
        '      <h2 style="font-weight:900;letter-spacing:-0.045em;line-height:1.05;'
        'font-size:clamp(1.8rem,4vw,2.8rem);color:var(--text);margin-bottom:16px;">'
        'Simple, Transparent Pricing</h2>\n'
        '      <p style="font-size:1rem;color:var(--text-2);line-height:1.75;max-width:44ch;'
        'margin:0 auto 16px;">Every business is different, so pricing depends on what you need.</p>\n'
        '      <p style="font-size:0.95rem;font-weight:600;color:var(--text);letter-spacing:-0.01em;">'
        'You\'re not paying for a website. You\'re investing in a system that brings you leads.</p>'
    )
    html = html.replace(old_pricing_header, new_pricing_header, 1)

    # 2. Language replacements across all pages
    replacements = [
        ('modern website', 'website that brings inquiries'),
        ('Modern website', 'Website that brings inquiries'),
        ('high-quality website', 'conversion-focused website'),
        ('High-quality website', 'Conversion-focused website'),
        ('professional website', 'lead-generation website'),
        ('Professional website', 'Lead-generation website'),
        ('Here\'s your website', 'Here\'s how your website could bring you more inquiries'),
        ("Here's your website", "Here's how your website could bring you more inquiries"),
    ]
    for old, new in replacements:
        html = html.replace(old, new)

    if html != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f'Updated: {path}')
        updated += 1
    else:
        print(f'No changes: {path}')

print(f'\nDone. {updated} files updated.')
