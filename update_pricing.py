import glob, re

PRICING_SECTION = '''
<section style="padding:96px 24px;background:var(--sand);border-top:1px solid var(--border);">
  <div style="max-width:720px;margin:0 auto;text-align:center;">

    <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-3);margin-bottom:16px;">Pricing</p>
    <h2 style="font-weight:900;letter-spacing:-0.045em;line-height:1.05;font-size:clamp(2rem,5vw,3rem);color:var(--text);margin-bottom:16px;">Simple, Transparent Pricing</h2>
    <p style="font-size:1.05rem;color:var(--text-2);line-height:1.75;max-width:46ch;margin:0 auto 52px;">Every business is different, so pricing depends on what you need.</p>

    <div class="grid grid-cols-1 sm:grid-cols-2" style="gap:1px;background:var(--border);border-radius:16px;overflow:hidden;max-width:560px;margin:0 auto 56px;">
      <div style="background:#fff;padding:32px 28px;text-align:left;">
        <p style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-3);margin-bottom:12px;">India</p>
        <p style="font-size:1.75rem;font-weight:900;letter-spacing:-0.04em;color:var(--text);line-height:1.1;">&#8377;20,000<br/><span style="font-size:1rem;font-weight:500;color:var(--text-3);">to</span> &#8377;70,000</p>
      </div>
      <div style="background:#fff;padding:32px 28px;text-align:left;">
        <p style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-3);margin-bottom:12px;">US &middot; UK &middot; Canada &middot; Australia</p>
        <p style="font-size:1.75rem;font-weight:900;letter-spacing:-0.04em;color:var(--text);line-height:1.1;">$600<br/><span style="font-size:1rem;font-weight:500;color:var(--text-3);">to</span> $3,000</p>
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:20px;max-width:480px;margin:0 auto 52px;text-align:left;">
      <div style="display:flex;gap:16px;align-items:flex-start;">
        <div style="width:26px;height:26px;border-radius:50%;background:var(--text);color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:3px;">1</div>
        <p style="font-size:0.97rem;color:var(--text-2);line-height:1.65;margin:0;">We don't ask for payment upfront.</p>
      </div>
      <div style="display:flex;gap:16px;align-items:flex-start;">
        <div style="width:26px;height:26px;border-radius:50%;background:var(--text);color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:3px;">2</div>
        <p style="font-size:0.97rem;color:var(--text-2);line-height:1.65;margin:0;">We build your website first. You review it. If it feels right, we move forward. If not, there is no obligation.</p>
      </div>
      <div style="display:flex;gap:16px;align-items:flex-start;">
        <div style="width:26px;height:26px;border-radius:50%;background:var(--text);color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:3px;">3</div>
        <p style="font-size:0.97rem;color:var(--text-2);line-height:1.65;margin:0;">You don't need to decide based on price. You will see your website first.</p>
      </div>
    </div>

    <a href="/#form" style="display:inline-flex;align-items:center;gap:8px;padding:16px 34px;background:var(--text);color:#fff;font-weight:700;font-size:15px;border-radius:100px;text-decoration:none;letter-spacing:-0.01em;">Request a Free Demo</a>
    <p style="font-size:13px;color:var(--text-3);margin-top:16px;">No upfront cost. No contracts. No risk.</p>

  </div>
</section>
'''

files = glob.glob('C:/Users/Warrior/riskfreesites/**/index.html', recursive=True)
files += ['C:/Users/Warrior/riskfreesites/index.html']

updated = 0
for path in files:
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    if PRICING_SECTION.strip()[:40] in html:
        print(f'Already has pricing: {path}')
        continue
    new_html = html.replace('<footer style="background:#1a1918', PRICING_SECTION + '\n<footer style="background:#1a1918', 1)
    if new_html != html:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_html)
        print(f'Updated: {path}')
        updated += 1
    else:
        print(f'No footer anchor found: {path}')

print(f'\nDone. {updated} files updated.')
