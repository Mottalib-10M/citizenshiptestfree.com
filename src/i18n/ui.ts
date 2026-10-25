import type { Locale } from './routes';
const en = {
  updatedOn: 'Fees and rules checked on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Questions, dates and fees by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Questions applicants ask', relatedCalculators: 'Keep going', sourcesTitle: 'Official pages behind this page', writtenBy: 'Written by',
  asOf: 'U.S. naturalization rules and fees for', lastUpdated: 'read on uscis.gov, last checked on',
  footerValidated: 'Every fee and rule links to the official page it was read on',
  footerBrowser: 'Tests and dates run in your browser · nothing you type is sent · free, no account, no premium plan, no email',
  footerDisclaimer: 'Citizenship Test Free is an independent site published by Radif Partners. It is not USCIS or the U.S. government, it does not schedule interviews, take applications or give legal advice. The civics questions are the public USCIS list; the answer choices and the English practice sentences are ours. Dates and fees are for guidance: confirm with the official page before you file.',
  footerPopular: 'Practice tests',
  notFound: 'There is no page at this address. The free U.S. citizenship practice test starts on the home page.',
  readMore: 'Read more', back: 'Home',
};
const es: typeof en = {
  updatedOn: 'Tarifas y reglas verificadas el', editorialPolicy: 'Política editorial', contactLabel: 'Contacto', reviewedBy: 'Preguntas, fechas y tarifas por',
  skipToContent: 'Ir al contenido', mainNav: 'Navegación principal', breadcrumbLabel: 'Ruta de navegación', breadcrumbHome: 'Inicio', menuOpen: 'Abrir el menú',
  faqTitle: 'Preguntas de los solicitantes', relatedCalculators: 'Para seguir', sourcesTitle: 'Páginas oficiales consultadas para esta página', writtenBy: 'Escrito por',
  asOf: 'Reglas y tarifas de la naturalización en Estados Unidos', lastUpdated: 'leídas en uscis.gov, última verificación el',
  footerValidated: 'Cada tarifa y cada regla remite a la página oficial donde se leyó',
  footerBrowser: 'Exámenes y cálculos hechos en su navegador · nada de lo que escribe se envía · gratis, sin cuenta, sin suscripción, sin correo',
  footerDisclaimer: 'Examen de ciudadanía gratis es un sitio independiente publicado por Radif Partners. No es USCIS ni el gobierno de Estados Unidos: no recibe solicitudes, no cita a entrevistas y no ofrece asesoría legal. Las preguntas cívicas son la lista pública de USCIS; las opciones de respuesta y la traducción de la versión 2025 son nuestras. Las fechas y tarifas son orientativas: confírmelas en la página oficial antes de presentar su solicitud.',
  footerPopular: 'Exámenes de práctica',
  notFound: 'No hay ninguna página en esta dirección. El examen de práctica gratuito de ciudadanía estadounidense está en la página de inicio.',
  readMore: 'Leer más', back: 'Inicio',
};
export function t(lang: Locale) { return lang === 'es' ? es : en; }
