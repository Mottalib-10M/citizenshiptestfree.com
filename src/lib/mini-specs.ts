/**
 * Mini-tools of the pages (RECETTE §9.3): one subject = one calculation, always read from
 * params-2026.json or the site's engines, never a second formula. English and French here.
 */
import type { MiniSpec } from './mini-types';
import P from '../data/params-2026.json';
import { caCost, auCost, ukCost } from './engine/cost';
import { money, formatNumberL, pct } from './format-l';
import { passNeeded } from './engine/exam';
import { exemptions, ruleOf, usFee } from './engine/us';

type L = 'en' | 'fr' | 'es';
const yn = (lang: L) => (lang === 'fr' ? [{ value: '0', label: 'Non' }, { value: '1', label: 'Oui' }] : lang === 'es' ? [{ value: '0', label: 'No' }, { value: '1', label: 'Sí' }] : [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]);
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, Math.round(x)));
const N = (v: number, lang: L) => formatNumberL(v, lang);

const SPECS: Record<string, (lang: L) => MiniSpec> = {
  ukpass: (lang) => ({
    title: 'Did I pass the Life in the UK Test?', cta: 'Take a full mock test', ctaPage: 'uk-mock',
    inputs: [{ id: 'right', label: 'Correct answers', def: 19, max: P.uk.test.questions, unit: `/ ${P.uk.test.questions}` }],
    run: (v) => {
      const n = P.uk.test.questions, need = P.uk.test.passCorrect, r = clamp(v.right ?? 0, 0, n);
      return { head: ['Result', r >= need ? 'Pass' : 'Fail'], rows: [['Pass mark', `${need} of ${n} (${pct(need / n, lang)})`], ['Your score', pct(r / n, lang)], [r >= need ? 'Margin' : 'Missing', r >= need ? `${r - need} answer${r - need === 1 ? '' : 's'} above the mark` : `${need - r} more correct answer${need - r === 1 ? '' : 's'}`]] };
    },
  }),
  ukexempt: (lang) => ({
    title: 'Do I need to take the Life in the UK Test?', cta: 'See the exemption rules', ctaPage: 'uk-exemption',
    inputs: [{ id: 'age', label: 'Age on the day you apply', def: 40, max: 120, unit: 'yrs' }, { id: 'before', label: 'Already passed it (for settlement)?', def: 0, options: yn(lang) }, { id: 'cond', label: 'Long-term physical or mental condition?', def: 0, options: yn(lang) }],
    run: (v) => {
      const a = v.age ?? 0;
      const ex = a < P.uk.test.exemptUnder ? `Exempt: under ${P.uk.test.exemptUnder}` : a >= P.uk.test.exemptFromAge ? `Exempt: aged ${P.uk.test.exemptFromAge} or over` : v.before ? 'No new test: use your earlier pass' : v.cond ? 'Exempt only with a form or doctor’s letter' : 'You need to pass the test';
      return { head: ['Life in the UK Test', ex], rows: [['Age band exempt', `under ${P.uk.test.exemptUnder}, ${P.uk.test.exemptFromAge} or over`], ['Test fee if you sit it', money(P.uk.test.fee, 'GBP', lang)], ['Book at least', `${P.uk.test.bookAtLeastDaysAhead} days ahead`]] };
    },
  }),
  ukattempts: (lang) => ({
    title: 'What a retake adds to the bill', cta: 'Full cost of British citizenship', ctaPage: 'uk-cost',
    inputs: [{ id: 'n', label: 'Times you sit the test', def: 2, max: 10 }],
    run: (v) => {
      const n = clamp(v.n ?? 1, 1, 10); const c = ukCost({ adults: 1, children: 0, ilrToPay: 0, testAttempts: n, other: 0 });
      return { head: ['Test fees paid', money(P.uk.test.fee * n, 'GBP', lang)], rows: [['Fee per sitting', money(P.uk.test.fee, 'GBP', lang)], ['Naturalisation + ceremony + tests', money(c.total, 'GBP', lang)]], note: 'Each sitting is paid again; gov.uk sets no limit on the number of attempts.' };
    },
  }),
  aupass: (lang) => ({
    title: 'Did I pass the Australian citizenship test?', cta: 'Take a full practice test', ctaPage: 'au-test',
    inputs: [{ id: 'right', label: 'Correct answers in total', def: 16, max: P.au.test.questions, unit: `/ ${P.au.test.questions}` }, { id: 'vals', label: 'Of which values questions', def: 5, max: P.au.test.valuesQuestions, unit: `/ ${P.au.test.valuesQuestions}` }],
    run: (v) => {
      const n = P.au.test.questions, need = passNeeded('au'), vq = P.au.test.valuesQuestions;
      const vals = clamp(v.vals ?? 0, 0, vq), r = Math.max(vals, clamp(v.right ?? 0, 0, n));
      const ok = r >= need && vals === vq;
      return { head: ['Result', ok ? 'Pass' : 'Fail'], rows: [['Pass mark', `${pct(P.au.test.passPercent / 100, lang)} (${need} of ${n})`], ['Values questions', `${vals} of ${vq} (all needed)`], ['Why', ok ? 'Both rules met' : vals < vq ? 'A values question was missed' : `${need - r} more correct answer${need - r === 1 ? '' : 's'} needed`]] };
    },
  }),
  auproc: (lang) => ({
    title: 'Where my application stands against the official time', cta: 'Check my residence dates', ctaPage: 'au-residence',
    inputs: [{ id: 'w', label: 'Weeks since you applied', def: 12, max: 520, unit: 'wks' }],
    run: (v) => {
      const w = clamp(v.w ?? 0, 0, 520), mark = Math.round((5 * 365.25) / 12 / 7);
      return { head: ['Against the 90% mark', w >= mark ? 'Past it' : `${mark - w} weeks to go`], rows: [['90% of applications decided in', P.au.processing.conferral90pct], ['Same mark in weeks', `about ${mark}`], ['Ceremony (90%)', 'within 6 months of approval']], note: `Home Affairs processing times, page updated ${P.au.processing.pageUpdated}. One in ten applications takes longer.` };
    },
  }),
  aufee: (lang) => ({
    title: 'Australian citizenship fee for my family', cta: 'Full cost calculator', ctaPage: 'au-cost',
    inputs: [{ id: 'a', label: 'Adults applying', def: 2, max: 10 }, { id: 'k', label: 'Children under 16 on a parent’s form', def: 1, max: 10 }],
    run: (v) => {
      const c = auCost({ adults: clamp(v.a ?? 1, 0, 10), concession: 0, childrenUnder16: clamp(v.k ?? 0, 0, 10), other: 0 });
      return { head: ['Fees to pay', money(c.total, 'AUD', lang)], rows: [['Per adult (general)', money(P.au.fees.general, 'AUD', lang)], ['Pensioner concession', money(P.au.fees.generalConcession, 'AUD', lang)], ['Child on a parent’s form', 'free']], note: `Form ${P.au.fees.form}.` };
    },
  }),
  capass: (lang) => ({
    title: lang === 'fr' ? 'Ai-je réussi l’examen de citoyenneté ?' : 'Did I pass the Canadian citizenship test?', cta: lang === 'fr' ? 'Faire un examen blanc complet' : 'Take a full practice test', ctaPage: lang === 'fr' ? 'home' : 'ca-test',
    inputs: [{ id: 'right', label: lang === 'fr' ? 'Bonnes réponses' : 'Correct answers', def: 16, max: P.ca.test.questions, unit: `/ ${P.ca.test.questions}` }],
    run: (v) => {
      const n = P.ca.test.questions, need = P.ca.test.passCorrect, r = clamp(v.right ?? 0, 0, n), ok = r >= need;
      return lang === 'fr'
        ? { head: ['Résultat', ok ? 'Réussi' : 'Échoué'], rows: [['Note de passage', `${need} sur ${n} (${pct(need / n, lang)})`], ['Votre note', pct(r / n, lang)], [ok ? 'Marge' : 'Il manque', ok ? `${r - need} au-dessus de la note` : `${need - r} bonne${need - r > 1 ? 's' : ''} réponse${need - r > 1 ? 's' : ''}`]] }
        : { head: ['Result', ok ? 'Pass' : 'Fail'], rows: [['Pass mark', `${need} of ${n} (${pct(need / n, lang)})`], ['Your score', pct(r / n, lang)], [ok ? 'Margin' : 'Missing', ok ? `${r - need} above the mark` : `${need - r} more correct answer${need - r === 1 ? '' : 's'}`]] };
    },
  }),
  cadays: (lang) => ({
    title: lang === 'fr' ? 'Combien de jours me manque-t-il ?' : 'How many days am I missing?', cta: lang === 'fr' ? 'Calculer ma date jour par jour' : 'Work out my date day by day', ctaPage: 'ca-presence',
    inputs: [{ id: 'pr', label: lang === 'fr' ? 'Jours au Canada comme RP (5 dernières années)' : 'Days in Canada as a PR (last 5 years)', def: 900, max: 1826, unit: lang === 'fr' ? 'j' : 'days' }, { id: 'pre', label: lang === 'fr' ? 'Jours au Canada avant la RP' : 'Days in Canada before PR', def: 300, max: 1826, unit: lang === 'fr' ? 'j' : 'days' }],
    run: (v) => {
      const C = P.ca.presence, pre = Math.min(C.preprMaxCredit, (v.pre ?? 0) * C.preprFactor), tot = (v.pr ?? 0) + pre, miss = Math.max(0, Math.ceil(C.requiredDays - tot));
      return lang === 'fr'
        ? { head: ['Jours manquants', miss ? N(miss, lang) : 'Aucun'], rows: [['Jours crédités', N(Math.floor(tot), lang)], ['Crédit avant la RP (moitié, plafond 365)', N(Math.floor(pre), lang)], ['Exigés', N(C.requiredDays, lang)]] }
        : { head: ['Days missing', miss ? N(miss, lang) : 'None'], rows: [['Days credited', N(Math.floor(tot), lang)], ['Credit before PR (half, max 365)', N(Math.floor(pre), lang)], ['Required', N(C.requiredDays, lang)]] };
    },
  }),
  cafee: (lang) => ({
    title: lang === 'fr' ? 'Frais de citoyenneté pour ma famille' : 'Canadian citizenship fees for my family', cta: lang === 'fr' ? 'Voir le détail' : 'See every line', ctaPage: 'ca-fee',
    inputs: [{ id: 'a', label: lang === 'fr' ? 'Adultes' : 'Adults (18 or over)', def: 2, max: 10 }, { id: 'm', label: lang === 'fr' ? 'Mineurs' : 'Minors', def: 1, max: 10 }],
    run: (v) => {
      const c = caCost({ adults: clamp(v.a ?? 0, 0, 10), minors: clamp(v.m ?? 0, 0, 10), other: 0 });
      return { head: [lang === 'fr' ? 'Total des frais' : 'Total fees', money(c.total, 'CAD', lang)], rows: [[lang === 'fr' ? 'Par adulte' : 'Per adult', money(P.ca.fees.adult, 'CAD', lang)], [lang === 'fr' ? 'Par mineur' : 'Per minor', money(P.ca.fees.minor, 'CAD', lang)]] };
    },
  }),
  catestage: (lang) => ({
    title: lang === 'fr' ? 'Dois-je passer l’examen ?' : 'Do I have to take the test?', cta: lang === 'fr' ? 'Faire l’examen blanc' : 'Take the practice test', ctaPage: lang === 'fr' ? 'home' : 'ca-test',
    inputs: [{ id: 'age', label: lang === 'fr' ? 'Âge à la signature de la demande' : 'Age when you sign the application', def: 35, max: 120, unit: lang === 'fr' ? 'ans' : 'yrs' }],
    run: (v) => {
      const [lo, hi] = P.ca.test.ages, a = v.age ?? 0, need = a >= lo && a <= hi;
      return lang === 'fr'
        ? { head: ['Examen et preuve de langue', need ? 'Oui, les deux' : 'Non exigés'], rows: [['Âges visés', `${lo} à ${hi} ans`], ['Questions', `${P.ca.test.questions}, ${P.ca.test.passCorrect} bonnes pour réussir`], ['Durée', `${P.ca.test.minutes} minutes`]] }
        : { head: ['Test and language proof', need ? 'Yes, both' : 'Not required'], rows: [['Ages concerned', `${lo} to ${hi}`], ['Questions', `${P.ca.test.questions}, ${P.ca.test.passCorrect} right to pass`], ['Time', `${P.ca.test.minutes} minutes`]] };
    },
  }),
  compare: (lang) => ({
    title: 'The three citizenship tests side by side', cta: 'Practise for this test', ctaPage: 'home',
    inputs: [{ id: 'c', label: 'Country', def: 0, options: [{ value: '0', label: 'United Kingdom' }, { value: '1', label: 'Australia' }, { value: '2', label: 'Canada' }] }],
    run: (v) => {
      const c = ['uk', 'au', 'ca'][clamp(v.c ?? 0, 0, 2)] as 'uk' | 'au' | 'ca';
      if (c === 'uk') return { head: ['Life in the UK Test', `${P.uk.test.questions} questions`], rows: [['Pass mark', `${P.uk.test.passCorrect} correct`], ['Time', `${P.uk.test.minutes} minutes`], ['Test fee', money(P.uk.test.fee, 'GBP', lang)], ['Who sits it', `${P.uk.test.exemptUnder} to ${P.uk.test.exemptFromAge - 1}`]] };
      if (c === 'au') return { head: ['Australian citizenship test', `${P.au.test.questions} questions`], rows: [['Pass mark', `${pct(P.au.test.passPercent / 100, lang)} and all ${P.au.test.valuesQuestions} values questions`], ['Time', `${P.au.test.minutes} minutes`], ['Test fee', 'in the application fee'], ['Who sits it', `${P.au.test.ages[0]} to ${P.au.test.ages[1]}`]] };
      return { head: ['Canadian citizenship test', `${P.ca.test.questions} questions`], rows: [['Pass mark', `${P.ca.test.passCorrect} correct`], ['Time', `${P.ca.test.minutes} minutes`], ['Test fee', 'no separate fee listed'], ['Who sits it', `${P.ca.test.ages[0]} to ${P.ca.test.ages[1]}`]] };
    },
  }),
  /* ----------------------------------------------------------- United States (English and Spanish) */
  uspass: (lang) => {
    const es = lang === 'es';
    return {
      title: es ? '¿Aprobé el examen cívico de 2025?' : 'Did I pass the 2025 civics test?', cta: es ? 'Hacer un examen de práctica completo' : 'Take a full mock civics test', ctaPage: 'us-test',
      inputs: [{ id: 'right', label: es ? 'Respuestas correctas' : 'Right answers', def: 11, max: 20 }, { id: 'wrong', label: es ? 'Respuestas incorrectas' : 'Wrong answers', def: 3, max: 20 }],
      run: (v) => {
        const R = ruleOf('2025'), r = clamp(v.right ?? 0, 0, R.asked), w = clamp(v.wrong ?? 0, 0, R.asked - r);
        const st = r >= R.pass ? 'pass' : w >= R.failAt ? 'fail' : 'on';
        const head = es ? { pass: 'Aprobado', fail: 'No aprobado', on: 'La entrevista sigue' }[st] : { pass: 'Pass', fail: 'Fail', on: 'The officer keeps asking' }[st];
        return { head: [es ? 'Resultado' : 'Result', head], rows: [[es ? 'Para aprobar' : 'To pass', `${R.pass} ${es ? 'correctas' : 'right'}`], [es ? 'Faltan' : 'Still needed', `${Math.max(0, R.pass - r)}`], [es ? 'Errores aún posibles' : 'Mistakes still allowed', `${Math.max(0, R.failAt - 1 - w)}`]], note: es ? `Hasta ${R.asked} preguntas de ${R.bank}; el oficial se detiene con ${R.pass} correctas o ${R.failAt} incorrectas.` : `Up to ${R.asked} questions from ${R.bank}; the officer stops at ${R.pass} right or ${R.failAt} wrong.` };
      },
    };
  },
  usexempt: (lang) => {
    const es = lang === 'es';
    return {
      title: es ? '¿Qué examen me toca según mi edad?' : 'Which test do I get at my age?', cta: es ? 'Ver las exenciones' : 'See the exemptions', ctaPage: 'us-exemptions',
      inputs: [{ id: 'age', label: es ? 'Edad al presentar el N-400' : 'Age when you file the N-400', def: 56, max: 120, unit: es ? 'años' : 'yrs' }, { id: 'y', label: es ? 'Años de residente permanente' : 'Years as a permanent resident', def: 16, max: 90, unit: es ? 'años' : 'yrs' }],
      run: (v) => {
        const e = exemptions(v.age ?? 0, v.y ?? 0);
        const head = e.e6520 ? (es ? 'Examen 65/20 en su idioma' : '65/20 test in your language') : e.english ? (es ? `Sin examen de inglés (${e.english})` : `No English test (${e.english})`) : (es ? 'Examen completo en inglés' : 'Full test in English');
        return { head: [es ? 'Su caso' : 'Your case', head], rows: [[es ? 'Examen de inglés' : 'English test', e.english ? (es ? 'exento' : 'exempt') : (es ? 'obligatorio' : 'required')], [es ? 'Examen cívico' : 'Civics test', e.civicsInOwnLanguage ? (es ? 'en su idioma, con intérprete' : 'in your language, with an interpreter') : (es ? 'en inglés' : 'in English')], [es ? 'Preguntas para estudiar' : 'Questions to study', e.e6520 ? (es ? '20 (marcadas ★)' : '20 (marked ★)') : (es ? 'la lista completa' : 'the full list')]] };
      },
    };
  },
  uspresence: (lang) => {
    const es = lang === 'es';
    return {
      title: es ? '¿Tengo los días de presencia física?' : 'Do I have enough days in the United States?', cta: es ? 'Calcular mi fecha día por día' : 'Work out my date day by day', ctaPage: 'us-eligibility',
      inputs: [{ id: 'r', label: es ? 'Vía' : 'Route', def: 5, options: [{ value: '5', label: es ? '5 años' : '5 years' }, { value: '3', label: es ? '3 años (cónyuge de ciudadano)' : '3 years (spouse of a citizen)' }] }, { id: 'abs', label: es ? 'Días completos fuera del país en el periodo' : 'Whole days abroad in the period', def: 400, max: 1826, unit: es ? 'días' : 'days' }],
      run: (v) => {
        const R = P.us.n400.routes[v.r === 3 ? '3' : '5'], span = Math.round(R.years * 365.25), pres = Math.max(0, span - clamp(v.abs ?? 0, 0, span)), miss = Math.max(0, R.presenceDays - pres);
        return { head: [es ? 'Días que faltan' : 'Days missing', miss ? N(miss, lang) : (es ? 'Ninguno' : 'None')], rows: [[es ? 'Días presentes (aprox.)' : 'Days present (approx.)', N(pres, lang)], [es ? 'Mínimo exigido' : 'Minimum required', `${N(R.presenceDays, lang)} (${R.presenceMonths} ${es ? 'meses' : 'months'})`]], note: es ? `Periodo de ${R.years} años contado en días (${N(span, lang)}); el día de salida y el de regreso cuentan como presencia.` : `${R.years}-year period counted in days (${N(span, lang)}); the day you leave and the day you return count as presence.` };
      },
    };
  },
  usfee: (lang) => {
    const es = lang === 'es';
    return {
      title: es ? 'Tarifa del N-400 para mi familia' : 'N-400 fee for my household', cta: es ? 'Ver la tarifa reducida y la exención' : 'Check the reduced fee and the waiver', ctaPage: 'us-fee',
      inputs: [{ id: 'n', label: es ? 'Personas que presentan' : 'People filing', def: 2, max: 10 }, { id: 'o', label: es ? '¿En línea?' : 'Online?', def: 1, options: yn(lang) }],
      run: (v) => {
        const f = usFee({ adults: clamp(v.n ?? 1, 0, 10), online: !!v.o, tier: 'full' });
        return { head: [es ? 'Total a pagar' : 'Total to pay', money(f.total, 'USD', lang)], rows: [[es ? 'En línea, por solicitud' : 'Online, per application', money(P.us.fees.online, 'USD', lang)], [es ? 'En papel, por solicitud' : 'On paper, per application', money(P.us.fees.paper, 'USD', lang)], [es ? 'Tarifa reducida (en papel)' : 'Reduced fee (paper)', money(P.us.fees.reduced, 'USD', lang)]] };
      },
    };
  },
};
export function getSpec(kind: string, lang: L): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown mini-tool: ${kind}`);
  return f(lang);
}
export const SPEC_KINDS = Object.keys(SPECS);
