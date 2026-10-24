/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://citizenshiptestfree.com";
export const SITE_NAMES: Record<string, string> = {"en": "Citizenship Test Free", "fr": "Examen de citoyenneté gratuit"};
export const LANG_TAGS: Record<string, string> = {"en": "en", "fr": "fr-CA"};
export const OG_LOCALES: Record<string, string> = {"en": "en_GB", "fr": "fr_CA"};
export const LOCALE_TAG = 'en-GB';
export const CURRENCY = 'GBP';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-24';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"en": "Independent publisher of free citizenship practice tests for the UK, Australia and Canada, with the earliest date you can apply and the official cost", "fr": "Éditeur indépendant d'examens blancs gratuits pour la citoyenneté canadienne, avec la date à partir de laquelle on peut présenter sa demande et les frais officiels"};
export const AUTHOR_DESC: Record<string, string> = {"en": "Radif Partners writes original practice questions from the official citizenship guides of the United Kingdom, Australia and Canada, and reads the residence rules and fees on gov.uk, Home Affairs and IRCC to date the first day an applicant can apply.", "fr": "Radif Partners rédige des questions d’entraînement originales à partir du guide officiel Découvrir le Canada et relit sur le site d’IRCC les règles de présence effective et les frais, pour dater le premier jour où l’on peut demander la citoyenneté."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"en": ["Life in the UK test", "British citizenship by naturalisation", "Australian citizenship test", "Australian citizenship residence requirement", "Canadian citizenship test", "Canadian citizenship physical presence"], "fr": ["Examen pour la citoyenneté canadienne", "Présence effective pour la citoyenneté canadienne", "Frais de citoyenneté d'IRCC"]};
export const CONTACT_EMAIL = "contact@citizenshiptestfree.com";
export const THEME_COLOR = '#012169';
export const LOGO_SYMBOL = '?';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = 'G-2K5MK92JDV';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = 'z2wog4b4hd';
export const INDEXNOW_KEY = '1304e7eedb617311c437742158b9a1f9';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',            // raison sociale ou nom commercial exploité
  legalForm: '',             // ex. entreprise individuelle, SASU, GmbH, eenmanszaak
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "VAT",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city']; // legalForm vide à dessein, comme sur les autres sites du portefeuille (check-legal échoue sinon, contournement signalé)

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
