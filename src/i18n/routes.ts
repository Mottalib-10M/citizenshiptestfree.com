import { makeRouter, type RouteDef } from './routes-core';
import { PAGES } from '../lib/guides';
export const LOCALES = ['en', 'fr', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
const R = (id: string, en: string, fr: string, es: string | null, noindex = false): RouteDef<Locale> => ({ id, paths: { en: `/en/${en}/`, fr: `/fr/${fr}/`, ...(es ? { es: `/es/${es}/` } : {}) }, ...(noindex ? { noindex } : {}) });
const CORE: RouteDef<Locale>[] = [
  { id: 'home', paths: { en: '/en/', fr: '/fr/', es: '/es/' } },
  R('method', 'method', 'methode', 'metodologia'),
  R('about', 'about', 'a-propos', 'sobre-nosotros'),
  R('widget', 'widget', 'widget', null, true),
  R('contact', 'contact', 'contact', 'contacto', true),
  R('editorial', 'editorial-policy', 'politique-editoriale', 'politica-editorial', true),
  R('privacy', 'privacy', 'confidentialite', 'privacidad', true),
  R('terms', 'legal-notice', 'mentions-legales', 'aviso-legal', true),
  R('cookies', 'cookies', 'cookies', 'cookies', true),
];
const fromPage = (p: (typeof PAGES)[number]): RouteDef<Locale> => ({ id: p.id, paths: { en: `/en/${p.en.slug}/`, ...(p.fr ? { fr: `/fr/${p.fr.slug}/` } : {}), ...(p.es ? { es: `/es/${p.es.slug}/` } : {}) } });
export const ROUTES: RouteDef<Locale>[] = [CORE[0], ...PAGES.map(fromPage), ...CORE.slice(1)];
export const { NOINDEX_PATHS, route, hasRoute, altPaths } = makeRouter(LOCALES, ROUTES);
