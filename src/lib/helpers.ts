/** Writing helpers handed to every page: links, figures read from params-2026.json, tables, banks. */
import { route, ROUTES, type Locale } from '../i18n/routes';
import { formatNumberL, money, pct, dateL, type Cur } from './format-l';
import { BANKS } from './banks-build';
import { CHAPTERS } from './banks';
import { passNeeded } from './engine/exam';
import P from '../data/params-2026.json';

export type SourceKey = keyof typeof P.sources;
const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption: string | undefined, align: Array<'l' | 'r'>, lang: Locale) {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy-700 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumberL(c, lang)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

export function helpers(lang: Locale, strict = false) {
  const a = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (strict) throw new Error(`Unknown page id in a link: ${id}`); return text; }
    return `<a href="${route(id, lang)}">${text}</a>`;
  };
  const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
  const src = (k: SourceKey, text: string) => ext(P.sources[k].url, text);
  const gbp = (n: number) => money(n, 'GBP', lang), aud = (n: number) => money(n, 'AUD', lang), cad = (n: number) => money(n, 'CAD', lang);
  const num = (n: number, d = 0) => formatNumberL(n, lang, d);
  const pc = (x: number, d = 0) => pct(x, lang, d);
  const ca = lang === 'fr' ? 'ca-fr' : 'ca-en';
  return {
    lang, a, ext, src, gbp, aud, cad, num, pc, P,
    m: (n: number, c: Cur) => money(n, c, lang),
    date: (iso: string) => dateL(iso, lang),
    table: (h: string[], r: Array<Array<string | number>>, c?: string, al: Array<'l' | 'r'> = []) => table(h, r, c, al, lang),
    /** Size of each bank and of each chapter, read from the JSON (never typed in a page). */
    count: { uk: BANKS.uk.length, au: BANKS.au.length, auValues: BANKS.au.filter((q) => q.values).length, ca: BANKS[ca].length, caEn: BANKS['ca-en'].length, caFr: BANKS['ca-fr'].length },
    chapters: { uk: CHAPTERS.uk, au: CHAPTERS.au, ca: CHAPTERS[ca] },
    inChapter: (bank: 'uk' | 'au' | 'ca', i: number) => (bank === 'ca' ? BANKS[ca] : BANKS[bank]).filter((q) => q.chapter === (bank === 'ca' ? CHAPTERS[ca] : CHAPTERS[bank])[i]).length,
    /** A sample question of the bank (by id), for a worked example in the text. */
    q: (id: string) => [...BANKS.uk, ...BANKS.au, ...BANKS['ca-en'], ...BANKS['ca-fr']].find((x) => x.id === id),
    need: { uk: passNeeded('uk'), au: passNeeded('au'), ca: passNeeded('ca') },
    ukTotal: P.uk.fees.naturalisation + P.uk.fees.ceremony + P.uk.fees.lifeInUkTest,
  };
}
export type Helpers = ReturnType<typeof helpers>;
