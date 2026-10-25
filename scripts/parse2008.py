import re, json, zipfile, html, sys
# English PDF
lines = [l.replace('\t', ' ') for l in open('../uscis/raw/OoC_100_Questions_2008_Civics_Test_V1.txt', encoding='utf-8')]
clean = []
skip = False
for l in lines:
    s = re.sub(r'\s+', ' ', l).strip()
    if re.fullmatch(r'-\d+-', s) or s == 'www.uscis.gov' or s.startswith('* If you are 65') or s.startswith('may study just the questions'): continue
    clean.append(s)
start = next(i for i, l in enumerate(clean) if l == 'AMERICAN GOVERNMENT')
qs = []; cat = sub = None; cur = None; inq = False
for s in clean[start:]:
    if not s: continue
    if s in ('AMERICAN GOVERNMENT', 'AMERICAN HISTORY', 'INTEGRATED CIVICS'): cat = s; continue
    m = re.match(r'^([A-C]): (.+)$', s)
    if m: sub = m.group(2); continue
    m = re.match(r'^(\d{1,3})\. ?(.*)$', s)
    if m and (not qs and m.group(1) == '1' or qs and int(m.group(1)) == qs[-1]['n'] + 1):
        cur = {'n': int(m.group(1)), 'cat': cat, 'sub': sub, 'q': m.group(2), 'a': [], 'star': False}; qs.append(cur); inq = True; continue
    if cur is None: continue
    if s.startswith('▪'):
        inq = False; cur['a'].append(s[1:].strip()); continue
    if inq: cur['q'] += ' ' + s
    elif cur['a']: cur['a'][-1] += ' ' + s
for q in qs:
    q['q'] = re.sub(r'\s+', ' ', q['q']).strip()
    if q['q'].endswith('*'): q['star'] = True; q['q'] = q['q'][:-1].strip()
    q['a'] = [re.sub(r'\s+', ' ', a).replace('’ s', '’s').strip() for a in q['a']]
print('en', len(qs), sum(q['star'] for q in qs), [q['n'] for q in qs if q['star']], file=sys.stderr)
json.dump(qs, open('q2008-en.json', 'w'), ensure_ascii=False, indent=1)
# Spanish docx
x = zipfile.ZipFile('../uscis/raw/100q_Spanish_2021_SPA.docx').read('word/document.xml').decode()
es = []; cat = sub = None
for p in re.findall(r'<w:p[ >].*?</w:p>', x, re.S):
    t = re.sub(r'\s+', ' ', html.unescape(''.join(re.findall(r'<w:t[^>]*>([^<]*)</w:t>', p)))).strip()
    if not t: continue
    il = re.search(r'<w:ilvl w:val="(\d)"', p)
    if il is None:
        if t.isupper() and len(t) > 8: cat = t; continue
        m = re.match(r'^([A-C]): (.+)$', t)
        if m: sub = m.group(2); continue
        if es and es[-1]['a'] and not t.startswith('Preguntas'): es[-1]['a'][-1] += ' ' + t  # continuation
        continue
    if il.group(1) == '0':
        es.append({'n': len(es) + 1, 'cat': cat, 'sub': sub, 'q': t, 'a': [], 'star': False})
    else:
        es[-1]['a'].append(t)
for q in es:
    if q['q'].endswith('*'): q['star'] = True; q['q'] = q['q'][:-1].strip()
print('es', len(es), sum(q['star'] for q in es), [q['n'] for q in es if q['star']], file=sys.stderr)
json.dump(es, open('q2008-es.json', 'w'), ensure_ascii=False, indent=1)
