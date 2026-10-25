/** Formatting by page language (RECETTE §4: one locale per language). English pages: en-GB; Spanish pages: es-US.
 *  Le site est purement américain depuis le 2026-10-25 : plus de pages françaises (fr-CA) ni de livre, dollar australien ou canadien. */
export type L = 'en' | 'es';
export type Cur = 'USD';
const TAG: Record<L, string> = { en: 'en-GB', es: 'es-US' };
export const langTag = (lang: L) => TAG[lang];
const cache = new Map<string, Intl.NumberFormat>();
function nf(lang: L, o: Intl.NumberFormatOptions) {
  const k = lang + JSON.stringify(o);
  if (!cache.has(k)) cache.set(k, new Intl.NumberFormat(TAG[lang], o));
  return cache.get(k)!;
}
export const formatNumberL = (v: number, lang: L, d = 0) => nf(lang, { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
/** $760 in English and in US Spanish. */
export const money = (v: number, _cur: Cur, lang: L) => {
  const cents = Math.round(v * 100) % 100 !== 0;
  return `$${formatNumberL(v, lang, cents ? 2 : 0)}`;
};
// « 75% » en anglais, « 75 % » en espagnol (2026-10-24 : l'anglais affichait « 75 % »).
export const pct = (v: number, lang: L, d = 0) => `${formatNumberL(v * 100, lang, d)}${lang === 'en' ? '' : ' '}%`;
/** "2026-10-24" → "24 October 2026" / "24 de octubre de 2026" (UTC, never shifts a day). */
export const dateL = (iso: string, lang: L) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString(TAG[lang], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
