import glob, re

OLD_SECTION = re.compile(r'<section style="padding:96px 24px;background:var\(--sand\);border-top:1px solid var\(--border\);">[\s\S]*?</section>\n', re.MULTILINE)

NEW_SECTION = '''<section style="padding:96px 24px;background:var(--sand);border-top:1px solid var(--border);">
  <div style="max-width:860px;margin:0 auto;">

    <div style="text-align:center;margin-bottom:52px;">
      <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-3);margin-bottom:14px;">Pricing</p>
      <h2 style="font-weight:900;letter-spacing:-0.045em;line-height:1.05;font-size:clamp(1.8rem,4vw,2.8rem);color:var(--text);margin-bottom:16px;">Simple, Transparent Pricing</h2>
      <p style="font-size:1rem;color:var(--text-2);line-height:1.75;max-width:44ch;margin:0 auto;">Every business is different, so pricing depends on what you need.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2" style="gap:16px;margin-bottom:40px;">

      <div style="background:#fff;border:1.5px solid var(--border);border-radius:16px;padding:32px 28px;display:flex;flex-direction:column;">
        <p style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-3);margin-bottom:10px;">Landing Page</p>
        <p style="font-size:0.95rem;color:var(--text-2);line-height:1.65;margin-bottom:24px;">A single, sharp page built to convert. Perfect for service businesses, freelancers, and local shops.</p>
        <ul style="list-style:none;padding:0;margin:0 0 28px;display:flex;flex-direction:column;gap:10px;">
          <li style="font-size:0.9rem;color:var(--text-2);display:flex;align-items:center;gap:10px;"><span style="color:#16a34a;font-weight:700;font-size:1rem;">&#10003;</span> 1 fully designed page</li>
          <li style="font-size:0.9rem;color:var(--text-2);display:flex;align-items:center;gap:10px;"><span style="color:#16a34a;font-weight:700;font-size:1rem;">&#10003;</span> Contact form, leads to your inbox</li>
          <li style="font-size:0.9rem;color:var(--text-2);display:flex;align-items:center;gap:10px;"><span style="color:#16a34a;font-weight:700;font-size:1rem;">&#10003;</span> Mobile optimised</li>
          <li style="font-size:0.9rem;color:var(--text-2);display:flex;align-items:center;gap:10px;"><span style="color:#16a34a;font-weight:700;font-size:1rem;">&#10003;</span> Google-ready with basic SEO</li>
          <li style="font-size:0.9rem;color:var(--text-2);display:flex;align-items:center;gap:10px;"><span style="color:#16a34a;font-weight:700;font-size:1rem;">&#10003;</span> Live in 48 hours</li>
        </ul>
        <div style="margin-top:auto;padding-top:20px;border-top:1px solid var(--border);">
          <p style="font-size:0.85rem;color:var(--text-3);margin-bottom:6px;">India</p>
          <p style="font-size:1.5rem;font-weight:900;letter-spacing:-0.04em;color:var(--text);margin-bottom:12px;">from &#8377;20,000</p>
          <p style="font-size:0.85rem;color:var(--text-3);margin-bottom:6px;">US &middot; UK &middot; Canada &middot; Australia</p>
          <p style="font-size:1.5rem;font-weight:900;letter-spacing:-0.04em;color:var(--text);">from $600</p>
        </div>
      </div>

      <div style="background:#fff;border:1.5px solid var(--text);border-radius:16px;padding:32px 28px;display:flex;flex-direction:column;position:relative;">
        <div style="position:absolute;top:-12px;left:28px;background:var(--text);color:#fff;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:4px 12px;border-radius:100px;">Most popular</div>
        <p style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-3);margin-bottom:10px;">Full Website</p>
        <p style="font-size:0.95rem;color:var(--text-2);line-height:1.65;margin-bottom:24px;">Multiple pages, more reach. For businesses that need a portfolio, listings, or separate service pages.</p>
        <ul style="list-style:none;padding:0;margin:0 0 28px;display:flex;flex-direction:column;gap:10px;">
          <li style="font-size:0.9rem;color:var(--text-2);display:flex;align-items:center;gap:10px;"><span style="color:#16a34a;font-weight:700;font-size:1rem;">&#10003;</span> Multiple pages (typically 4&ndash;8)</li>
          <li style="font-size:0.9rem;color:var(--text-2);display:flex;align-items:center;gap:10px;"><span style="color:#16a34a;font-weight:700;font-size:1rem;">&#10003;</span> Everything in the landing page</li>
          <li style="font-size:0.9rem;color:var(--text-2);display:flex;align-items:center;gap:10px;"><span style="color:#16a34a;font-weight:700;font-size:1rem;">&#10003;</span> Blog, portfolio, or listings section</li>
          <li style="font-size:0.9rem;color:var(--text-2);display:flex;align-items:center;gap:10px;"><span style="color:#16a34a;font-weight:700;font-size:1rem;">&#10003;</span> Additional custom sections</li>
          <li style="font-size:0.9rem;color:var(--text-2);display:flex;align-items:center;gap:10px;"><span style="color:#16a34a;font-weight:700;font-size:1rem;">&#10003;</span> Full local SEO setup</li>
        </ul>
        <div style="margin-top:auto;padding-top:20px;border-top:1px solid var(--border);">
          <p style="font-size:0.85rem;color:var(--text-3);margin-bottom:6px;">India</p>
          <p style="font-size:1.5rem;font-weight:900;letter-spacing:-0.04em;color:var(--text);margin-bottom:12px;">from &#8377;50,000</p>
          <p style="font-size:0.85rem;color:var(--text-3);margin-bottom:6px;">US &middot; UK &middot; Canada &middot; Australia</p>
          <p style="font-size:1.5rem;font-weight:900;letter-spacing:-0.04em;color:var(--text);">from $1,500</p>
        </div>
      </div>

    </div>

    <div style="text-align:center;background:var(--text);border-radius:16px;padding:36px 28px;">
      <p style="font-size:1.1rem;font-weight:800;color:#fff;letter-spacing:-0.02em;margin-bottom:8px;">No upfront cost. No contracts. No risk.</p>
      <p style="font-size:0.9rem;color:rgba(255,255,255,0.6);margin-bottom:24px;">We build your website first. You pay only if you like what you see.</p>
      <a href="/#form" style="display:inline-flex;align-items:center;gap:8px;padding:14px 30px;background:#fff;color:var(--text);font-weight:700;font-size:14px;border-radius:100px;text-decoration:none;letter-spacing:-0.01em;">Request a Free Demo</a>
    </div>

  </div>
</section>
'''

files = glob.glob('C:/Users/Warrior/riskfreesites/**/index.html', recursive=True)
files += ['C:/Users/Warrior/riskfreesites/index.html']
files = list(set(files))

updated = 0
for path in files:
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    new_html = OLD_SECTION.sub(NEW_SECTION, html, count=1)
    if new_html != html:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_html)
        print(f'Updated: {path}')
        updated += 1
    else:
        print(f'Skipped (no match): {path}')

print(f'\nDone. {updated} files updated.')
