import type { Locale } from './routes';
const en = {
  updatedOn: 'Fees and rules checked on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Questions, dates and fees by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Questions applicants ask', relatedCalculators: 'Keep going', sourcesTitle: 'Official pages behind this page', writtenBy: 'Written by',
  asOf: 'Citizenship rules and fees for', lastUpdated: 'read on gov.uk, uscis.gov, Home Affairs and IRCC, last checked on',
  footerValidated: 'Every fee and rule links to the official page it was read on',
  footerBrowser: 'Tests and dates run in your browser · nothing you type is sent · free, no account, no premium plan, no email',
  footerDisclaimer: 'Citizenship Test Free is an independent site published by Radif Partners. It is not the Home Office, USCIS, the Australian Department of Home Affairs or IRCC, it does not book tests or take applications, and its practice questions are not the official tests (the U.S. civics questions are the public USCIS list, the answer choices are ours). Dates and fees are for guidance: confirm with the official page before you apply.',
  footerPopular: 'Practice tests',
  notFound: 'There is no page at this address. The free practice tests for the UK, the US, Australia and Canada start on the home page.',
  readMore: 'Read more', back: 'Home',
};
const fr: typeof en = {
  updatedOn: 'Frais et règles vérifiés le', editorialPolicy: 'Politique éditoriale', contactLabel: 'Contact', reviewedBy: 'Questions, dates et frais par',
  skipToContent: 'Aller au contenu', mainNav: 'Navigation principale', breadcrumbLabel: 'Fil d’Ariane', breadcrumbHome: 'Accueil', menuOpen: 'Ouvrir le menu',
  faqTitle: 'Questions des candidats', relatedCalculators: 'Pour continuer', sourcesTitle: 'Pages officielles consultées pour cette page', writtenBy: 'Rédigé par',
  asOf: 'Règles et frais de la citoyenneté canadienne', lastUpdated: 'relus sur le site d’IRCC, dernière vérification le',
  footerValidated: 'Chaque frais et chaque règle renvoie à la page officielle où il a été lu',
  footerBrowser: 'Examens et calculs faits dans votre navigateur · rien de ce que vous saisissez n’est transmis · gratuit, sans compte, sans abonnement, sans courriel',
  footerDisclaimer: 'Examen de citoyenneté gratuit est un site indépendant publié par Radif Partners. Ce n’est pas IRCC ni le gouvernement du Canada : il ne reçoit aucune demande, ne convoque à aucun examen, et ses questions d’entraînement ne sont pas celles de l’examen officiel. Les dates et les frais sont indicatifs : vérifiez-les sur la page officielle avant de présenter votre demande.',
  footerPopular: 'Examens blancs',
  notFound: 'Aucune page à cette adresse. L’examen blanc gratuit pour la citoyenneté canadienne est sur la page d’accueil.',
  readMore: 'Lire la suite', back: 'Accueil',
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
export function t(lang: Locale) { return lang === 'fr' ? fr : lang === 'es' ? es : en; }
