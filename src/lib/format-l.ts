/** Formatting by page language (RECETTE §4: one locale per language). English pages: en-GB; French pages: fr-CA; Spanish pages (United States only): es-US. */
export type L = 'en' | 'fr' | 'es';
export type Cur = 'GBP' | 'AUD' | 'CAD' | 'USD';
const TAG: Record<L, string> = { en: 'en-GB', fr: 'fr-CA', es: 'es-US' };
export const langTag = (lang: L) => TAG[lang];
const cache = new Map<string, Intl.NumberFormat>();
function nf(lang: L, o: Intl.NumberFormatOptions) {
  const k = lang + JSON.stringify(o);
  if (!cache.has(k)) cache.set(k, new Intl.NumberFormat(TAG[lang], o));
  return cache.get(k)!;
}
export const formatNumberL = (v: number, lang: L, d = 0) => nf(lang, { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
/** £1,709 · A$595 · C$653 · $760 in English (the US dollar is the only bare $: it appears on US pages only); 653 $ in French; $760 in US Spanish. */
export const money = (v: number, cur: Cur, lang: L) => {
  const cents = Math.round(v * 100) % 100 !== 0;
  const n = formatNumberL(v, lang, cents ? 2 : 0);
  if (lang === 'fr') return `${n} $`;
  return cur === 'GBP' ? `£${n}` : cur === 'AUD' ? `A$${n}` : cur === 'USD' ? `$${n}` : `C$${n}`;
};
// « 75% » en anglais, « 75 % » en français canadien (2026-10-24 : l'anglais affichait « 75 % »).
export const pct = (v: number, lang: L, d = 0) => `${formatNumberL(v * 100, lang, d)}${lang === 'en' ? '' : '\u00a0'}%`;
/** "2026-10-24" → "24 October 2026" / "24 octobre 2026" / "24 de octubre de 2026" (UTC, never shifts a day). */
export const dateL = (iso: string, lang: L) => {
  const s = new Date(`${iso}T00:00:00Z`).toLocaleDateString(TAG[lang], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  return lang === 'fr' ? s.replace(/^1 /, '1er ') : s;
};
