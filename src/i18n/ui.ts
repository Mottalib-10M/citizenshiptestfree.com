import type { Locale } from './routes';
const en = {
  updatedOn: 'Fees and rules checked on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Questions, dates and fees by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Questions applicants ask', relatedCalculators: 'Keep going', sourcesTitle: 'Official pages behind this page', writtenBy: 'Written by',
  asOf: 'Citizenship rules and fees for', lastUpdated: 'read on gov.uk, Home Affairs and IRCC, last checked on',
  footerValidated: 'Every fee and rule links to the official page it was read on',
  footerBrowser: 'Tests and dates run in your browser · nothing you type is sent · free, no account, no premium plan, no email',
  footerDisclaimer: 'Citizenship Test Free is an independent site published by Radif Partners. It is not the Home Office, the Australian Department of Home Affairs or IRCC, it does not book tests or take applications, and its practice questions are not the official ones. Dates and fees are for guidance: confirm with the official page before you apply.',
  footerPopular: 'Practice tests',
  notFound: 'There is no page at this address. The free practice tests for the UK, Australia and Canada start on the home page.',
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
export function t(lang: Locale) { return lang === 'fr' ? fr : en; }
