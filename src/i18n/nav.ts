import { route, hasRoute, type Locale } from './routes';
import { PAGES, pageById } from '../lib/guides';
import type { Group } from '../lib/guide-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  en: { home: 'All four tests', method: 'How the questions and dates are built', about: 'About', widget: 'Embed a test', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
  fr: { home: 'Examen de citoyenneté canadienne', method: 'Méthode', about: 'À propos', widget: 'Intégrer l’examen', contact: 'Contact', editorial: 'Politique éditoriale', privacy: 'Confidentialité', terms: 'Mentions légales', cookies: 'Témoins (cookies)' },
  es: { home: 'Examen de ciudadanía americana', method: 'Método', about: 'Quiénes somos', widget: 'Insertar un examen', contact: 'Contacto', editorial: 'Política editorial', privacy: 'Privacidad', terms: 'Aviso legal', cookies: 'Cookies' },
};
const GROUP_LABEL: Record<Locale, Record<Group, string>> = {
  en: { all: 'All countries', uk: 'United Kingdom', us: 'United States', au: 'Australia', ca: 'Canada' },
  fr: { all: 'Tous les pays', uk: 'Royaume-Uni', us: 'États-Unis', au: 'Australie', ca: 'Canada' },
  es: { all: 'Todos los países', uk: 'Reino Unido', us: 'Estados Unidos', au: 'Australia', ca: 'Canadá' },
};
export const GROUPS_ORDER: Group[] = ['us', 'uk', 'au', 'ca', 'all'];
export const groupLabel = (g: Group, lang: Locale) => GROUP_LABEL[lang][g];
export const label = (id: string, lang: Locale = 'en') => CORE[lang][id] ?? (lang === 'fr' ? pageById(id)?.fr?.nav : lang === 'es' ? pageById(id)?.es?.nav : undefined) ?? pageById(id)?.en.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
const inGroup = (g: Group, lang: Locale) => PAGES.filter((p) => p.group === g && hasRoute(p.id, lang)).map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  if (lang === 'fr') return [{ label: 'Citoyenneté canadienne', links: [link('home', 'fr'), ...inGroup('ca', 'fr')] }];
  if (lang === 'es') { const l = inGroup('us', 'es'); return [{ label: 'El examen cívico', links: [link('home', 'es'), ...l.filter((x) => !/n-400|elegibilidad|tarifa/.test(x.href))] }, { label: 'Formulario N-400', links: l.filter((x) => /n-400|elegibilidad|tarifa/.test(x.href)) }]; }
  return GROUPS_ORDER.filter((g) => g !== 'all').map((g) => ({ label: GROUP_LABEL[lang][g], links: inGroup(g, lang) })).filter((c) => c.links.length);
}
export const navDirect = (lang: Locale): NavLink[] => (lang === 'en' ? inGroup('all', 'en') : []);
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...navCategories(lang),
  { label: lang === 'fr' ? 'Ce site' : lang === 'es' ? 'Este sitio' : 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].filter((i) => hasRoute(i, lang)).map((i) => link(i, lang)) },
];
export const popularLinks = (_lang: Locale): NavLink[] => [];
