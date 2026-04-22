"""
Comprehensive fix script for RiskFreeSites:
1. Add FAQPage JSON-LD to 5 existing pages with <details> FAQ content
2. Add Blog schema to blog index
3. Add WebSite schema to home page
4. Add FAQ sections + FAQPage schema to 15 new pages
5. Add LocalBusiness schema to home page
"""

import re, os

base = 'C:/Users/Warrior/riskfreesites'

def read(path):
    with open(path, encoding='utf-8') as f:
        return f.read()

def write(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('  UPDATED: ' + path.replace(base, ''))

def inject_schema(html, schema_json):
    """Inject a new JSON-LD script block just before </head>"""
    block = '\n  <script type="application/ld+json">\n  ' + schema_json + '\n  </script>\n'
    return html.replace('</head>', block + '</head>', 1)

def extract_faq_from_details(html):
    """Extract Q&A pairs from <details> elements"""
    faqs = []
    details_blocks = re.findall(r'<details[^>]*>(.*?)</details>', html, re.DOTALL)
    for d in details_blocks:
        summary = re.findall(r'<summary[^>]*>(.*?)</summary>', d, re.DOTALL)
        if not summary: continue
        q = re.sub(r'<[^>]+>', '', summary[0]).strip()
        body = re.sub(r'<summary[^>]*>.*?</summary>', '', d, flags=re.DOTALL)
        # get the answer div
        answer_divs = re.findall(r'<div[^>]*>(.*?)</div>', body, re.DOTALL)
        a = ''
        for div in answer_divs:
            text = re.sub(r'<[^>]+>', '', div).strip()
            if len(text) > 20:
                a = text
                break
        if q and a:
            faqs.append({'q': q, 'a': a})
    return faqs

def build_faqpage_schema(faqs):
    items = []
    for faq in faqs:
        q = faq['q'].replace('"', '\\"')
        a = faq['a'].replace('"', '\\"')
        items.append('    {\n      "@type": "Question",\n      "name": "' + q + '",\n      "acceptedAnswer": { "@type": "Answer", "text": "' + a + '" }\n    }')
    return '{\n    "@context": "https://schema.org",\n    "@type": "FAQPage",\n    "mainEntity": [\n' + ',\n'.join(items) + '\n    ]\n  }'

FAQ_SECTION_TEMPLATE = '''
  <!-- FAQ -->
  <section style="padding:56px 24px;background:var(--sand);border-top:1px solid var(--border);">
    <div style="max-width:640px;margin:0 auto;">
      <h2 style="font-size:1.4rem;font-weight:800;letter-spacing:-0.03em;color:var(--text);margin-bottom:24px;">Common questions</h2>
      <div style="display:flex;flex-direction:column;gap:8px;">
QUESTIONS_PLACEHOLDER
      </div>
    </div>
  </section>
'''

def build_faq_item(q, a, delay=''):
    d = ' d' + delay if delay else ''
    return (
        '        <details class="faq-item" style="background:#fff;border:1px solid var(--border);border-radius:16px;overflow:hidden;">\n'
        '          <summary style="padding:18px 20px;font-size:14px;font-weight:600;color:var(--text);cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;list-style:none;">'
        + q +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;transition:transform 0.2s;"><polyline points="6 9 12 15 18 9"/></svg></summary>\n'
        '          <div style="padding:0 20px 18px;font-size:14px;color:var(--text-2);line-height:1.75;">' + a + '</div>\n'
        '        </details>'
    )

def add_faq_details_style(html):
    """Add details marker suppression CSS if not already present"""
    if 'details summary::-webkit-details-marker' not in html:
        style_add = '\n    details summary::-webkit-details-marker{display:none;}\n    details[open] summary svg{transform:rotate(180deg);}'
        html = html.replace('</style>', style_add + '\n  </style>', 1)
    return html

# ─── 1. ADD FAQPage SCHEMA TO 5 EXISTING PAGES ───────────────────────────────

print('\n=== 1. Adding FAQPage schema to pages with <details> FAQs ===\n')

pages_with_details = [
    'clinic-website-design/index.html',
    'interior-designer-website/index.html',
    'real-estate-website-design/index.html',
    'compare/index.html',
    'website-vs-facebook-page/index.html',
]

for rel_path in pages_with_details:
    path = base + '/' + rel_path
    html = read(path)
    if 'FAQPage' in html:
        print('  SKIP (already has FAQPage): /' + rel_path)
        continue
    faqs = extract_faq_from_details(html)
    if not faqs:
        print('  NO FAQs FOUND: /' + rel_path)
        continue
    schema = build_faqpage_schema(faqs)
    html = inject_schema(html, schema)
    write(path, html)
    print('    Added ' + str(len(faqs)) + ' FAQ items')

# ─── 2. ADD Blog SCHEMA TO BLOG INDEX ────────────────────────────────────────

print('\n=== 2. Adding Blog schema to /blog/ ===\n')

blog_path = base + '/blog/index.html'
html = read(blog_path)
if 'Blog' not in html and 'ItemList' not in html:
    schema = '''{
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "RiskFreeSites Blog",
    "description": "Practical advice for small business owners on websites, local SEO, and getting more customers online.",
    "url": "https://riskfreesites.com/blog/",
    "publisher": { "@type": "Organization", "name": "RiskFreeSites", "url": "https://riskfreesites.com" },
    "blogPost": [
      { "@type": "BlogPosting", "headline": "How Much Does a Website Cost for a Small Business? (2025)", "url": "https://riskfreesites.com/blog/how-much-does-a-website-cost/", "datePublished": "2025-04-11" },
      { "@type": "BlogPosting", "headline": "Do You Need a Website for Your Business? (Honest Answer)", "url": "https://riskfreesites.com/blog/do-you-need-a-website-for-business/", "datePublished": "2025-04-11" },
      { "@type": "BlogPosting", "headline": "Why Your Website Is Not Getting Leads (And How to Fix It)", "url": "https://riskfreesites.com/blog/why-your-website-is-not-getting-leads/", "datePublished": "2025-04-11" }
    ]
  }'''
    html = inject_schema(html, schema)
    write(blog_path, html)
else:
    print('  SKIP: blog already has schema')

# ─── 3. ADD WebSite SCHEMA TO HOME PAGE ──────────────────────────────────────

print('\n=== 3. Adding WebSite schema to home page ===\n')

home_path = base + '/index.html'
html = read(home_path)
if '"WebSite"' not in html:
    schema = '''{
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "RiskFreeSites",
    "url": "https://riskfreesites.com",
    "description": "We build your website before you pay. See the finished result first. No upfront cost. Ready in 48 hours.",
    "publisher": { "@type": "Organization", "name": "RiskFreeSites", "url": "https://riskfreesites.com" }
  }'''
    html = inject_schema(html, schema)
    # Also add LocalBusiness schema
    lb_schema = '''{
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "RiskFreeSites",
    "url": "https://riskfreesites.com",
    "description": "Custom website design for small businesses. See your finished website before you pay. Delivered in 48 hours. No upfront cost.",
    "priceRange": "$$",
    "serviceType": "Web Design",
    "areaServed": "Worldwide",
    "sameAs": []
  }'''
    html = inject_schema(html, lb_schema)
    write(home_path, html)
else:
    print('  SKIP: home already has WebSite schema')

# ─── 4. ADD FAQ SECTIONS + FAQPage SCHEMA TO 15 NEW PAGES ────────────────────

print('\n=== 4. Adding FAQ sections to 15 new pages ===\n')

NEW_PAGES_FAQS = {
    'interior-designer-website-bangalore/index.html': {
        'faqs': [
            ('How long does it take to build my website?', 'We build your complete website and send you a link within 48 hours of receiving your form submission.'),
            ('Do I need to pay anything to see my website?', 'No. You see the finished website before you pay a single rupee. Only pay if you are satisfied with what we built.'),
            ('Will my website appear on Google for interior designer searches in Bangalore?', 'Yes. We set up your website with local SEO so it can rank when people search for interior designers in Bangalore, Whitefield, Indiranagar, and nearby areas.'),
            ('What if I do not like the website?', 'You walk away with no charge. No contracts, no obligations. The only way you pay is if you like what you see.'),
        ]
    },
    'interior-designer-website-hyderabad/index.html': {
        'faqs': [
            ('How quickly will my website be ready?', 'We send you a link to your completed website within 48 hours of receiving your form.'),
            ('Do I pay anything before I see my website?', 'Nothing. You review the finished site first. If you like it, you pay. If not, you walk away at zero cost.'),
            ('Will the website help me get clients searching in Hyderabad?', 'Yes. The site is built with local SEO so it can appear when people search for interior designers in Hyderabad, Gachibowli, Kondapur, and nearby areas.'),
            ('Can I request changes after I see the demo?', 'Yes. Once you review the site, let us know what you want adjusted. We make the changes before you pay.'),
        ]
    },
    'clinic-website-hyderabad/index.html': {
        'faqs': [
            ('How long does it take to build a clinic website?', 'We build your website and send you a review link within 48 hours.'),
            ('Do I need to pay before seeing the website?', 'No. You see the completed clinic website first. Pay only if you are happy with the result.'),
            ('Will the website appear when patients search for clinics in Hyderabad?', 'Yes. We set up local SEO so your clinic can show up in searches across Hyderabad, including Banjara Hills, Kukatpally, Jubilee Hills, and your specific area.'),
            ('Can I update the website after it is live?', 'Yes. Doctor profiles, services, hours, and contact details can all be updated. We keep the system simple so your team can do it without technical help.'),
        ]
    },
    'clinic-website-bangalore/index.html': {
        'faqs': [
            ('How quickly will my clinic website be built?', 'Within 48 hours. We send you a link to review the complete website before anything goes live.'),
            ('Is there any cost to see my website first?', 'No upfront cost at all. You see the finished site, then decide. Only pay if you approve it.'),
            ('Will patients in Bangalore be able to find my clinic on Google?', 'Yes. The site is built with local SEO for Bangalore. We place your clinic name, specialty, and location in the right places so Google knows exactly what you offer and where.'),
            ('What if we have multiple doctors in the clinic?', 'We include a profile section for each doctor with name, photo, qualifications, and specialty. Let us know how many doctors when you fill in the form.'),
        ]
    },
    'real-estate-website-mumbai/index.html': {
        'faqs': [
            ('How quickly can I see my real estate website?', 'We build and send you a link to the completed website within 48 hours of your form submission.'),
            ('Do I need to pay anything before seeing the site?', 'Nothing upfront. You see the finished website first. Pay only if you are satisfied with what we built.'),
            ('Will my website appear when buyers search for agents in Mumbai?', 'Yes. The site is set up with local SEO so it can rank for searches in your focus areas across Mumbai, whether that is Andheri, Powai, Thane, Navi Mumbai, or elsewhere.'),
            ('I already have listings on 99acres and MagicBricks. Do I still need this?', 'Portals put you in a list alongside hundreds of other agents. Your own website lets buyers contact you directly and builds your personal brand. Both work together, not against each other.'),
        ]
    },
    'real-estate-website-hyderabad/index.html': {
        'faqs': [
            ('How long does it take to get my website?', 'We build your complete real estate website and send you the link within 48 hours.'),
            ('Is there anything to pay before I see the website?', 'No. You see the finished website first and pay only if you are happy with it.'),
            ('Will the site help me get leads in Hyderabad?', 'Yes. We build it with local SEO for Hyderabad so it can rank when buyers or sellers search for agents in Financial District, Kokapet, Bachupally, Narsingi, and other areas you cover.'),
            ('Can I show my current property listings on the website?', 'Yes. We include a listings section where you can showcase properties for sale or rent with photos, details, and a contact button on each one.'),
        ]
    },
    'why-interior-designers-need-a-website/index.html': {
        'faqs': [
            ('Can I use both Instagram and a website?', 'Yes. Both work well together. Instagram is good for staying in front of people who already know you. A website helps you reach people who are searching for a designer and do not know you yet.'),
            ('How much does a website for an interior designer cost?', 'At RiskFreeSites, we build your website before you pay anything. You see the finished site first. The monthly cost after approval is straightforward with no hidden fees.'),
            ('What if I only take local projects? Do I still need a website?', 'Yes. Even if you only work locally, clients in your city still search Google before they contact any designer. A website with local SEO helps them find you specifically.'),
        ]
    },
    'why-clinics-need-websites/index.html': {
        'faqs': [
            ('My clinic already has a Google listing. Is that enough?', 'A Google listing gets you on the map. But it cannot tell patients about your doctors, explain your specialties in detail, or let them submit a booking request. A website does all of that.'),
            ('How much does a clinic website cost?', 'At RiskFreeSites, you see your completed clinic website before paying anything. Fill in a short form and we build it in 48 hours. You pay only if you like what you see.'),
            ('Will a website bring in patients without paid advertising?', 'Yes. A website set up with local SEO can appear in organic Google searches over time. That brings in enquiries without any ongoing ad spend.'),
        ]
    },
    'website-vs-instagram-for-business/index.html': {
        'faqs': [
            ('Should I close my Instagram if I get a website?', 'No. Keep your Instagram. Use it to stay active with your existing audience. Use your website to reach people who are searching for what you do but do not follow you yet. They work together.'),
            ('Can my Instagram profile rank on Google?', 'Rarely. Instagram profiles almost never appear in Google search results for service-based queries. A website can rank for those searches and bring in new clients from outside your follower base.'),
            ('Which one should I focus on first?', 'Get the website first. It is the thing that brings in people who are actively searching. Instagram is better for maintaining relationships once you already have an audience.'),
        ]
    },
    'therapist-website-design-usa/index.html': {
        'faqs': [
            ('How long does it take to build a therapist website?', 'We build your complete therapy practice website and send you a review link within 48 hours.'),
            ('Do I pay anything before I see my website?', 'No. You see the finished website first and only pay if you are satisfied with the result.'),
            ('Will the website help me get found on Google in my area?', 'Yes. We set up local SEO so your site can rank when people search for a therapist in your city or state. We also optimize for your specialties so the right clients find you.'),
            ('Can I include information about telehealth sessions?', 'Yes. We include a section explaining whether you offer in-person sessions, online sessions, or both. We also note the states where you are licensed if you offer telehealth across state lines.'),
        ]
    },
    'dentist-website-design-uk/index.html': {
        'faqs': [
            ('How quickly can I see my dental practice website?', 'We build and send you a review link within 48 hours of receiving your form.'),
            ('Is there a cost to see my website before I decide?', 'No. You see the finished website first. Pay only if you are happy with it. No obligation.'),
            ('Will the website help new patients find my practice on Google?', 'Yes. We build with local SEO so your practice can show up when people search for a dentist in your town or city across the UK.'),
            ('Can I show both NHS and private treatment information?', 'Yes. We include a clear section explaining whether you take NHS patients, private only, or a mix. We also list your treatments with descriptions so patients know what you offer before they call.'),
        ]
    },
    'real-estate-agent-website-canada/index.html': {
        'faqs': [
            ('How quickly will my website be built?', 'We send you a link to your completed real estate website within 48 hours.'),
            ('Do I pay anything to see the website first?', 'Nothing upfront. You review the finished site, then decide. Only pay if you like it.'),
            ('Will the site help buyers and sellers find me on Google?', 'Yes. We set up local SEO so you can rank when people search for a real estate agent in your city or neighbourhood, whether you work in Toronto, Vancouver, Calgary, Ottawa, or elsewhere in Canada.'),
            ('Do I still need my own site if I have a brokerage website?', 'Your brokerage site promotes the brokerage. Your personal website promotes you. Buyers and sellers choose individual agents based on who they trust. A personal site builds that trust and brings enquiries directly to you.'),
        ]
    },
    'fitness-coach-website-australia/index.html': {
        'faqs': [
            ('How long does it take to build a fitness coach website?', 'We build your website and send you a link to review within 48 hours.'),
            ('Do I need to pay before I see my website?', 'No. You see the complete website first. Pay only if you are satisfied with the result.'),
            ('Will the website help me get clients searching for a trainer in my area?', 'Yes. We set up local SEO so your site can rank when people search for a personal trainer in your suburb or city, whether you are in Sydney, Melbourne, Brisbane, Perth, or elsewhere in Australia.'),
            ('Can I include information about online coaching as well as in-person training?', 'Yes. We can include both your local in-person training information and a section about remote coaching for clients anywhere in Australia or internationally.'),
        ]
    },
    'website-for-small-business-usa/index.html': {
        'faqs': [
            ('How long does it take to get my small business website?', 'We build your website and send you a review link within 48 hours of your form submission.'),
            ('Is there anything to pay before I see my website?', 'Nothing upfront. You see the finished website first. You pay only if you like what we built.'),
            ('Will the website help me get found on Google in my city?', 'Yes. Every website we build is set up with local SEO. Your business name, services, and location are placed correctly so Google understands what you do and where you are.'),
            ('What types of small businesses do you build websites for?', 'All types. Restaurants, contractors, salons, law firms, clinics, gyms, consultants, accountants, real estate agents, photographers, retail shops, and more. If you have a local service business, we can build your site.'),
        ]
    },
    'do-you-need-a-website-for-business/index.html': {
        'faqs': [
            ('Can I use just a Google Business Profile instead of a website?', 'A Google Business Profile helps people find your location and hours. But it cannot explain your services in detail, let people submit a contact form, or rank for service-specific searches. A website does all of that. Both together is better than either alone.'),
            ('What if most of my customers come from referrals?', 'Referrals are great. But even referral clients check your website before they call. And a website opens you up to entirely new customers who do not know anyone who has used you. It extends your reach beyond your personal network.'),
            ('How do I know if I need a website right now?', 'If competitors with worse services are getting more customers than you, if people cannot easily find you on Google, or if you have no way to take enquiries outside of business hours, you need a website.'),
            ('How do I get started with RiskFreeSites?', 'Fill in the short form on this page. We build your website and send you the link within 48 hours. You see the full site before paying anything.'),
        ]
    },
}

def build_faq_html_section(faqs):
    items_html = ''
    for i, (q, a) in enumerate(faqs):
        items_html += build_faq_item(q, a) + '\n'
    return FAQ_SECTION_TEMPLATE.replace('QUESTIONS_PLACEHOLDER', items_html)

for rel_path, config in NEW_PAGES_FAQS.items():
    path = base + '/' + rel_path
    html = read(path)

    if 'FAQPage' in html:
        print('  SKIP (already has FAQPage): /' + rel_path)
        continue

    faqs = config['faqs']

    # Build FAQ HTML section
    faq_html = build_faq_html_section(faqs)

    # Build FAQPage JSON-LD
    schema_faqs = [{'q': q, 'a': a} for q, a in faqs]
    schema = build_faqpage_schema(schema_faqs)

    # Add FAQ styles
    html = add_faq_details_style(html)

    # Inject FAQ section before <!-- FORM --> or before <section id="form"
    if '<!-- FORM -->' in html:
        html = html.replace('<!-- FORM -->', faq_html + '\n  <!-- FORM -->', 1)
    elif '<section id="form"' in html:
        html = html.replace('<section id="form"', faq_html + '\n  <section id="form"', 1)
    else:
        print('  WARNING: Could not find form anchor in ' + rel_path)
        continue

    # Inject schema
    html = inject_schema(html, schema)
    write(path, html)
    print('    Added ' + str(len(faqs)) + ' FAQ items')

# ─── 5. ADD BreadcrumbList TO ALL PAGES ──────────────────────────────────────

print('\n=== 5. Done ===')
print('\nAll fixes applied.')
