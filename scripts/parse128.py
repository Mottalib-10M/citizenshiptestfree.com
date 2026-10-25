import re, json, sys
src = sys.argv[1]
lines = [l.rstrip() for l in open(src, encoding='utf-8')]
# drop page headers
clean = []
for l in lines:
    s = l.strip()
    if re.fullmatch(r'\d+ of 19', s) or s == 'uscis.gov/citizenship': continue
    clean.append(s)
start = next(i for i, l in enumerate(clean) if l.startswith('AMERICAN GOVERNMENT'))
clean = clean[start:]
qs = []; cat = sub = None; cur = None
for l in clean:
    if l in ('AMERICAN GOVERNMENT', 'AMERICAN HISTORY', 'SYMBOLS AND HOLIDAYS'):
        cat = l; continue
    m = re.match(r'^([A-C]): (.+)$', l)
    if m:
        sub = m.group(2); continue
    m = re.match(r'^(\d{1,3})\.\s+(.*)$', l)
    if m and (not qs or int(m.group(1)) == qs[-1]['n'] + 1):
        cur = {'n': int(m.group(1)), 'cat': cat, 'sub': sub, 'q': m.group(2), 'a': [], 'star': False, '_inq': True}
        qs.append(cur); continue
    if cur is None: continue
    if l == '*' or l == '* ':
        cur['star'] = True; continue
    if l.startswith('•'):
        cur['_inq'] = False; cur['a'].append(l[1:].strip()); continue
    if l.startswith('For a complete list'): cur['note'] = l; continue
    if cur['_inq']: cur['q'] += ' ' + l
    elif cur['a']:
        # continuation of answer (e.g. superscript th)
        sep = '' if re.fullmatch(r'(th|st|nd|rd)( .*)?', l) else ' '
        cur['a'][-1] += sep + l
for q in qs:
    q['q'] = re.sub(r'\s+', ' ', q['q']).strip()
    if q['q'].endswith('*'):
        q['star'] = True; q['q'] = q['q'][:-1].strip()
    q['a'] = [re.sub(r'\s+', ' ', a).strip() for a in q['a']]
    q.pop('_inq')
print(len(qs), sum(q['star'] for q in qs), [q['n'] for q in qs if q['star']], file=sys.stderr)
json.dump(qs, open(sys.argv[2], 'w'), ensure_ascii=False, indent=1)
