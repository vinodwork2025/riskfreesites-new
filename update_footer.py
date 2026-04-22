import glob, re

NEW_FOOTER = '''<footer style="background:#1a1918;color:#fff;padding:64px 24px 0;">
  <div style="max-width:1200px;margin:0 auto;">

    <div class="grid grid-cols-1 gap-10 md:grid-cols-3" style="padding-bottom:48px;border-bottom:1px solid rgba(255,255,255,0.1);">

      <div>
        <a href="/"><img src="/logo.png" alt="RiskFreeSites" style="height:28px;width:auto;display:block;margin-bottom:20px;filter:brightness(0) invert(1);" /></a>
        <p style="font-size:0.95rem;color:rgba(255,255,255,0.55);line-height:1.75;max-width:28ch;">Experience your website before you commit. We build it first. You decide.</p>
      </div>

      <div>
        <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:16px;">Explore</p>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <a href="/" style="font-size:14px;color:rgba(255,255,255,0.65);text-decoration:none;font-weight:500;">Home</a>
          <a href="/#how-it-works" style="font-size:14px;color:rgba(255,255,255,0.65);text-decoration:none;font-weight:500;">How it works</a>
          <a href="/#examples" style="font-size:14px;color:rgba(255,255,255,0.65);text-decoration:none;font-weight:500;">Examples</a>
          <a href="/#form" style="font-size:14px;color:rgba(255,255,255,0.65);text-decoration:none;font-weight:500;">Get a demo</a>
        </div>
      </div>

      <div>
        <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:16px;">Contact</p>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <a href="mailto:info@riskfreesites.com" style="font-size:14px;color:rgba(255,255,255,0.65);text-decoration:none;font-weight:500;">info@riskfreesites.com</a>
          <a href="tel:+917397225523" style="font-size:14px;color:rgba(255,255,255,0.65);text-decoration:none;font-weight:500;">+91 7397225523</a>
          <p style="font-size:12px;color:rgba(255,255,255,0.3);margin:0;">Typically responds within a few hours</p>
        </div>
      </div>

    </div>

    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding:20px 0;">
      <p style="font-size:12px;color:rgba(255,255,255,0.3);margin:0;">© 2026 RiskFreeSites. All rights reserved.</p>
      <div style="display:flex;gap:20px;">
        <a href="/privacy/" style="font-size:12px;color:rgba(255,255,255,0.3);text-decoration:none;">Privacy Policy</a>
        <a href="/terms/" style="font-size:12px;color:rgba(255,255,255,0.3);text-decoration:none;">Terms</a>
      </div>
    </div>

  </div>
</footer>'''

files = glob.glob('C:/Users/Warrior/riskfreesites/**/index.html', recursive=True)
files += ['C:/Users/Warrior/riskfreesites/index.html']

updated = 0
for path in files:
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    new_html = re.sub(r'<footer[\s\S]*?</footer>', NEW_FOOTER, html)
    if new_html != html:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_html)
        print(f'Updated: {path}')
        updated += 1
    else:
        print(f'No footer found: {path}')

print(f'\nDone. {updated} files updated.')
