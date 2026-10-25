/**
 * Mini-tools of the pages (RECETTE §9.3): one subject = one calculation, always read from
 * params-2026.json or the site's engines, never a second formula. English and Spanish (United States only).
 */
import type { MiniSpec } from './mini-types';
import P from '../data/params-2026.json';
import { money, formatNumberL } from './format-l';
import { exemptions, ruleOf, usFee } from './engine/us';

type L = 'en' | 'es';
const yn = (lang: L) => (lang === 'es' ? [{ value: '0', label: 'No' }, { value: '1', label: 'Sí' }] : [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]);
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, Math.round(x)));
const N = (v: number, lang: L) => formatNumberL(v, lang);

const SPECS: Record<string, (lang: L) => MiniSpec> = {
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
