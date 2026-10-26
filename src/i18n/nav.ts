import { route, hasRoute, type Locale } from './routes';
import { PAGES, pageById, sectionOf, SECTION_LABELS, type Section } from '../lib/guides';
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
export function navCategories(lang: Locale): NavCategory[] {
  // Même partage que l'accueil : le test (ordre < 90), le Formulaire N-400 (90 à 129), les autres formulaires (130 et plus).
  const of = (sec: Section) => PAGES.filter((p) => hasRoute(p.id, lang) && sectionOf(p) === sec).map((p) => link(p.id, lang));
  const test = lang === 'es' ? [link('home', 'es'), ...of('test')] : of('test');
  return [{ label: SECTION_LABELS[lang].test, links: test }, { label: SECTION_LABELS[lang].n400, links: of('n400') }, { label: SECTION_LABELS[lang].more, links: of('more') }].filter((c) => c.links.length);
}
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...navCategories(lang),
  { label: lang === 'es' ? 'Este sitio' : 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].filter((i) => hasRoute(i, lang)).map((i) => link(i, lang)) },
];
export const popularLinks = (_lang: Locale): NavLink[] => [];
