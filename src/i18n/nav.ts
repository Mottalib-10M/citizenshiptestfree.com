import { route, hasRoute, type Locale } from './routes';
import { PAGES, pageById } from '../lib/guides';
import type { Group } from '../lib/guide-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  en: { home: 'U.S. citizenship test', method: 'How the questions and dates are built', about: 'About', widget: 'Embed the test', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
  es: { home: 'Examen de ciudadanía americana', method: 'Método', about: 'Quiénes somos', widget: 'Insertar un examen', contact: 'Contacto', editorial: 'Política editorial', privacy: 'Privacidad', terms: 'Aviso legal', cookies: 'Cookies' },
};
/** Libellé du pays, en surtitre des pages (« kicker »). */
export const groupLabel = (_g: Group, lang: Locale) => (lang === 'es' ? 'Estados Unidos' : 'United States');
export const label = (id: string, lang: Locale = 'en') => CORE[lang][id] ?? (lang === 'es' ? pageById(id)?.es?.nav : undefined) ?? pageById(id)?.en.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
/** Toutes les pages sont américaines depuis le 2026-10-25 (Royaume-Uni, Australie et Canada ont chacun leur site). */
const pagesIn = (lang: Locale) => PAGES.filter((p) => hasRoute(p.id, lang)).map((p) => link(p.id, lang));
const N400 = /n-400|elegibilidad|tarifa|cuanto-tarda|juramento/;
export function navCategories(lang: Locale): NavCategory[] {
  const l = pagesIn(lang);
  if (lang === 'es') return [{ label: 'El examen cívico', links: [link('home', 'es'), ...l.filter((x) => !N400.test(x.href))] }, { label: 'Formulario N-400', links: l.filter((x) => N400.test(x.href)) }];
  // Même partage que l'accueil : le test (ordre < 90), puis le Formulaire N-400 (ordre ≥ 90).
  const test = PAGES.filter((p) => p.order < 90).map((p) => link(p.id, 'en'));
  const n400 = PAGES.filter((p) => p.order >= 90).map((p) => link(p.id, 'en'));
  return [{ label: 'The citizenship test', links: test }, { label: 'Form N-400', links: n400 }].filter((c) => c.links.length);
}
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...navCategories(lang),
  { label: lang === 'es' ? 'Este sitio' : 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].filter((i) => hasRoute(i, lang)).map((i) => link(i, lang)) },
];
export const popularLinks = (_lang: Locale): NavLink[] => [];
