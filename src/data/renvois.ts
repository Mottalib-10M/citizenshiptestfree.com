/**
 * Renvois des anciennes pages Royaume-Uni, Australie et Canada (décision de l'éditeur du 2026-10-25 :
 * un site par pays). citizenshiptestfree.com ne garde que les États-Unis, en anglais et en espagnol.
 *
 * GitHub Pages ne sait pas répondre 301 : chaque ancien chemin devient une petite page avec
 * `rel="canonical"` vers la page équivalente du nouveau site, `meta refresh` à 0 seconde,
 * `noindex, follow` et un lien visible (src/pages/[...renvoi].astro). Ces pages sont hors du sitemap
 * (astro.config.mjs), hors des menus et sans hreflang. Ce sont les SEULES pages du site qui pointent
 * vers les nouveaux sites : aucune page indexable n'y renvoie (règle du portefeuille).
 *
 * Chemins anciens et cibles : brief reports/BRIEF-CTF-RENVOIS-2026-10-25.md ; cibles vérifiées
 * dans le dist des nouveaux sites le 2026-10-25. Toujours avec la barre finale.
 *
 * 2026-10-27 (décision de l'éditeur) : les 14 renvois de l'ancien arbre français (/fr/… et
 * /embed/examen-citoyennete/) sont retirés pour libérer le plafond de 100 pages (RECETTE §3) au profit
 * de 13 pages anglaises. Ces adresses répondent désormais 404, ce qui est accepté.
 */
export interface Renvoi { from: string; to: string; lang: 'en' }

const UK = 'https://lifeinukexam.co.uk';
const AU = 'https://australiacitizenshipquiz.com';
const CA = 'https://canadiancitizenshipquiz.com';

const en = (from: string, base: string, to: string): Renvoi => ({ from, to: `${base}${to}`, lang: 'en' });

export const RENVOIS: Renvoi[] = [
  // Royaume-Uni → lifeinukexam.co.uk
  en('/en/british-citizenship-test/', UK, '/en/british-citizenship-test/'),
  en('/en/life-in-the-uk-test/', UK, '/en/'),
  en('/en/life-in-the-uk-test/cost/', UK, '/en/life-in-the-uk-test/cost/'),
  en('/en/life-in-the-uk-test/exemption/', UK, '/en/life-in-the-uk-test/exemptions/'),
  en('/en/life-in-the-uk-test/handbook/', UK, '/en/life-in-the-uk-test/handbook/'),
  en('/en/life-in-the-uk-test/mock-test/', UK, '/en/life-in-the-uk-test/mock-test/'),
  en('/en/life-in-the-uk-test/pass-mark/', UK, '/en/life-in-the-uk-test/pass-mark/'),
  en('/en/life-in-the-uk-test/practice/', UK, '/en/life-in-the-uk-test/practice/'),
  en('/en/life-in-the-uk-test/questions/', UK, '/en/life-in-the-uk-test/questions/'),
  en('/embed/british-citizenship-date/', UK, '/embed/british-citizenship-date/'),
  en('/embed/life-in-the-uk-test/', UK, '/embed/life-in-the-uk-test/'),
  // Australie → australiacitizenshipquiz.com
  en('/en/australian-citizenship-test/', AU, '/en/australian-citizenship-test/'),
  en('/en/australian-citizenship-test/practice/', AU, '/en/citizenship-mock-test/'),
  en('/en/australian-citizenship-test/questions/', AU, '/en/citizenship-test-questions/'),
  en('/en/australian-citizenship/cost/', AU, '/en/australian-citizenship-cost/'),
  en('/en/australian-citizenship/eligibility/', AU, '/en/australian-citizenship-requirements/'),
  en('/en/australian-citizenship/processing-time/', AU, '/en/citizenship-processing-times/'),
  en('/en/australian-citizenship/residence-calculator/', AU, '/en/residence-requirement-calculator/'),
  en('/en/our-common-bond/', AU, '/en/our-common-bond/'),
  // Canada, anglais → canadiancitizenshipquiz.com
  en('/en/canadian-citizenship-test/', CA, '/en/'),
  en('/en/canadian-citizenship-test/practice/', CA, '/en/canadian-citizenship-test/practice/'),
  en('/en/canadian-citizenship-test/questions/', CA, '/en/canadian-citizenship-test/questions-and-answers/'),
  en('/en/canadian-citizenship/eligibility/', CA, '/en/canadian-citizenship/'),
  en('/en/canadian-citizenship/fee/', CA, '/en/canadian-citizenship/fees/'),
  en('/en/canadian-citizenship/physical-presence-calculator/', CA, '/en/canadian-citizenship/days-calculator/'),
  en('/en/discover-canada/', CA, '/en/discover-canada-study-guide/'),
];

export const RENVOI_PATHS = RENVOIS.map((r) => r.from);
