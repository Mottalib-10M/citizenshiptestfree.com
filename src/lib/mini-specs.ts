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
  usroute: (lang) => {
    const es = lang === 'es';
    return {
      title: es ? '¿Por qué vía y en cuánto tiempo?' : 'Which route, and how long until I can file?', cta: es ? 'Calcular la fecha exacta con mis viajes' : 'Work out the exact date with my trips', ctaPage: 'us-n400',
      inputs: [
        { id: 'm', label: es ? 'Meses desde la fecha de su tarjeta verde' : 'Months since the date on your green card', def: 30, max: 600, unit: es ? 'meses' : 'months' },
        { id: 'sp', label: es ? '¿Casado y viviendo con un ciudadano?' : 'Married to and living with a U.S. citizen?', def: 1, options: yn(lang) },
        { id: 'u', label: es ? 'Meses de vida en común con el cónyuge ya ciudadano' : 'Months living together while your spouse was a citizen', def: 30, max: 600, unit: es ? 'meses' : 'months', help: es ? 'Solo cuentan los meses en que el cónyuge ya era ciudadano.' : 'Only months during which your spouse was already a citizen count.' },
      ],
      run: (v) => {
        const m = clamp(v.m ?? 0, 0, 600), early = P.us.n400.earlyFilingDays / 30.4375;
        const wait = (months: number) => Math.max(0, Math.ceil(months - early - m));
        const w5 = wait(60), u = clamp(v.u ?? 0, 0, 600);
        // Vía de 3 años: 3 años de residente (presentación 90 días antes) y 3 años de unión con un ciudadano (sin adelanto).
        const w3 = v.sp ? Math.max(wait(36), Math.max(0, 36 - u)) : Infinity;
        const best = w3 < w5 ? '3' : '5', w = Math.min(w3, w5);
        const head = w === 0 ? (es ? 'Ya puede presentar' : 'You can file now') : es ? `${N(w, lang)} meses más` : `${N(w, lang)} more months`;
        const R = P.us.n400.routes[best];
        return { head: [es ? `Vía de ${best} años` : `${best}-year route`, head], rows: [[es ? 'Vía de 5 años' : '5-year route', w5 === 0 ? (es ? 'ya' : 'now') : `${N(w5, lang)} ${es ? 'meses' : 'months'}`], [es ? 'Vía de 3 años (cónyuge)' : '3-year route (spouse)', v.sp ? (w3 === 0 ? (es ? 'ya' : 'now') : `${N(w3, lang)} ${es ? 'meses' : 'months'}`) : (es ? 'no aplica' : 'not open')], [es ? 'Presencia física exigida' : 'Physical presence required', `${N(R.presenceDays, lang)} ${es ? 'días' : 'days'}`]], note: es ? `Estimación en meses, con la presentación anticipada de ${P.us.n400.earlyFilingDays} días. Los viajes largos y la residencia continua pueden retrasar la fecha.` : `Estimate in months, with the ${P.us.n400.earlyFilingDays}-day early filing. Long trips and continuous residence can push the date back.` };
      },
    };
  },
  usderive: (lang) => {
    const es = lang === 'es';
    const C = P.us.forms.cca;
    return {
      title: es ? '¿Me hice ciudadano por mis padres (INA 320)?' : 'Did I become a citizen through a parent (INA 320)?', cta: es ? 'Ver las tarifas del N-600' : 'See the N-600 fees', ctaPage: 'us-n600',
      inputs: [
        { id: 'b', label: es ? `¿Tenía menos de ${C.childAgeUnder} años el 27/02/2001 o nació después?` : `Under ${C.childAgeUnder} on 2/27/2001, or born after?`, def: 1, options: yn(lang) },
        { id: 'p', label: es ? `Un padre o madre ciudadano antes de sus ${C.childAgeUnder} años` : `A parent was a citizen before you turned ${C.childAgeUnder}`, def: 1, options: yn(lang) },
        { id: 'g', label: es ? `Tarjeta verde antes de sus ${C.childAgeUnder} años` : `Green card before you turned ${C.childAgeUnder}`, def: 1, options: yn(lang) },
        { id: 'c', label: es ? 'Vivía en EE. UU. bajo la custodia de ese padre' : 'Lived in the U.S. in that parent’s custody', def: 1, options: yn(lang), help: es ? `Custodia legal y física, todo a la vez antes de los ${C.childAgeUnder} años.` : `Legal and physical custody, all at the same time before age ${C.childAgeUnder}.` },
      ],
      run: (v) => {
        const ok = !!(v.b && v.p && v.g && v.c);
        const F = P.us.forms.n600;
        return { head: [es ? 'Según INA 320' : 'Under INA 320', ok ? (es ? 'Probablemente sí' : 'Likely yes') : (es ? 'No por esta vía' : 'Not this way')], rows: [[es ? 'Certificado (N-600), en línea' : 'Certificate (N-600), online', money(F.online, 'USD', lang)], [es ? 'Certificado (N-600), en papel' : 'Certificate (N-600), paper', money(F.paper, 'USD', lang)], [es ? 'Siguiente paso' : 'Next step', ok ? (es ? 'N-600 o pasaporte' : 'N-600 or passport') : !v.b ? (es ? 'leyes anteriores' : 'older laws apply') : (es ? 'N-400 o N-600K' : 'N-400 or N-600K')]], note: es ? `Las cuatro condiciones deben cumplirse al mismo tiempo antes de los ${C.childAgeUnder} años. Si nació antes, rigen las leyes anteriores: consulte a un abogado o representante acreditado.` : `All four conditions must be met at the same time before age ${C.childAgeUnder}. If you were older on that date, earlier laws apply: ask an immigration attorney or accredited representative.` };
      },
    };
  },
  usn648: (lang) => {
    const es = lang === 'es';
    const M = P.us.forms.n648;
    return {
      title: es ? '¿Mi Formulario N-648 es válido?' : 'Will my Form N-648 be accepted on form?', cta: es ? 'Ver las exenciones por edad' : 'See the age-based exemptions', ctaPage: 'us-exemptions',
      inputs: [
        { id: 'who', label: es ? 'Quién firma la certificación' : 'Who certifies the form', def: 1, options: es ? [{ value: '1', label: 'Médico (MD) con licencia en EE. UU.' }, { value: '2', label: 'Osteópata (DO) con licencia en EE. UU.' }, { value: '3', label: 'Psicólogo clínico con licencia en EE. UU.' }, { value: '0', label: 'Otro profesional' }] : [{ value: '1', label: 'Medical doctor (MD) licensed in the U.S.' }, { value: '2', label: 'Doctor of osteopathy (DO) licensed in the U.S.' }, { value: '3', label: 'Clinical psychologist licensed in the U.S.' }, { value: '0', label: 'Another professional' }] },
        { id: 'd', label: es ? 'Días entre la firma del médico y la presentación del N-400' : 'Days between the doctor’s signature and filing the N-400', def: 60, max: 3650, unit: es ? 'días' : 'days' },
        { id: 'l', label: es ? `¿Afección de ${M.minMonths} meses o más (o prevista)?` : `Condition lasting ${M.minMonths} months or more (or expected to)?`, def: 1, options: yn(lang) },
      ],
      run: (v) => {
        const okWho = (v.who ?? 0) > 0, okD = clamp(v.d ?? 0, 0, 3650) <= M.maxDaysBeforeFiling, okL = !!v.l;
        const ok = okWho && okD && okL;
        const y = es ? 'cumple' : 'met', n = es ? 'no cumple' : 'not met';
        return { head: [es ? 'Requisitos de forma' : 'Formal conditions', ok ? (es ? 'Cumplidos' : 'All met') : (es ? 'Falta uno' : 'One is missing')], rows: [[es ? 'Profesional autorizado' : 'Authorized professional', okWho ? y : n], [es ? `Firmado ≤ ${M.maxDaysBeforeFiling} días antes` : `Signed ≤ ${M.maxDaysBeforeFiling} days before filing`, okD ? y : n], [es ? `Duración ≥ ${M.minMonths} meses` : `Lasts ≥ ${M.minMonths} months`, okL ? y : n], [es ? 'Tarifa de USCIS' : 'USCIS fee', money(M.fee, 'USD', lang)]], note: es ? 'Cumplir la forma no basta: el oficial revisa si la explicación del médico relaciona la afección con la incapacidad de aprender inglés o educación cívica.' : 'Meeting the form rules is not enough: the officer checks that the doctor links the condition to the inability to learn English or civics.' };
      },
    };
  },
  usn565: (lang) => {
    const es = lang === 'es';
    const F = P.us.forms.n565;
    const reasons = es
      ? [{ value: '1', label: 'Perdido, robado o destruido' }, { value: '2', label: 'Dañado (mutilado)' }, { value: '3', label: 'Error de USCIS en el certificado' }, { value: '4', label: 'Cambio de nombre (matrimonio, divorcio, tribunal)' }, { value: '5', label: 'Certificado especial para un país extranjero' }]
      : [{ value: '1', label: 'Lost, stolen or destroyed' }, { value: '2', label: 'Damaged (mutilated)' }, { value: '3', label: 'USCIS error on the certificate' }, { value: '4', label: 'Name change (marriage, divorce, court order)' }, { value: '5', label: 'Special certificate for a foreign country' }];
    const docs: Record<number, [string, string]> = {
      1: ['police report and/or sworn statement, copy if you have one', 'denuncia policial o declaración jurada, y una copia si la tiene'],
      2: ['the damaged certificate itself', 'el propio certificado dañado'],
      3: ['the original incorrect certificate (Part 5)', 'el certificado original con el error (Parte 5)'],
      4: ['original certificate and proof of the new name (Part 6)', 'certificado original y prueba del nuevo nombre (Parte 6)'],
      5: ['details of the foreign official who asks (Part 8)', 'datos del funcionario extranjero que lo pide (Parte 8)'],
    };
    return {
      title: es ? 'Tarifa del N-565 según el motivo' : 'N-565 fee for my reason', cta: es ? 'Nunca recibió certificado: Formulario N-600' : 'Never had a certificate? See Form N-600', ctaPage: 'us-n600',
      inputs: [{ id: 'r', label: es ? 'Motivo del reemplazo' : 'Reason for the replacement', def: 1, options: reasons }, { id: 'o', label: es ? '¿En línea?' : 'Online?', def: 1, options: yn(lang) }],
      run: (v) => {
        const r = clamp(v.r ?? 1, 1, 5), fee = r === 3 ? F.uscisError : v.o ? F.online : F.paper;
        return { head: [es ? 'Tarifa a pagar' : 'Fee to pay', money(fee, 'USD', lang)], rows: [[es ? 'En línea' : 'Online', money(F.online, 'USD', lang)], [es ? 'En papel' : 'Paper', money(F.paper, 'USD', lang)], [es ? 'Con error de USCIS' : 'USCIS error', money(F.uscisError, 'USD', lang)], [es ? 'Prueba que adjuntar' : 'Evidence to attach', docs[r][es ? 1 : 0]]], note: es ? 'Una exención de tarifa (I-912) obliga a presentar en papel. Tarifas de la tabla G-1055 de USCIS.' : 'A fee waiver request (I-912) means filing on paper. Fees from the USCIS G-1055 schedule.' };
      },
    };
  },
  usdual: (lang) => {
    const es = lang === 'es';
    const acts = es
      ? [{ value: '0', label: 'Nada: solo tengo otra nacionalidad' }, { value: '1', label: 'Me naturalizo en otro país' }, { value: '2', label: 'Juro lealtad a otro país' }, { value: '3', label: 'Cargo público en otro país' }, { value: '4', label: 'Oficial en un ejército extranjero' }, { value: '5', label: 'Renuncio ante un cónsul de EE. UU.' }]
      : [{ value: '0', label: 'Nothing: I simply hold another nationality' }, { value: '1', label: 'I naturalize in another country' }, { value: '2', label: 'I swear allegiance to another country' }, { value: '3', label: 'I take a government job abroad' }, { value: '4', label: 'I serve as an officer in a foreign army' }, { value: '5', label: 'I renounce before a U.S. consul' }];
    return {
      title: es ? '¿Este acto me hace perder la ciudadanía?' : 'Does this act cost me U.S. citizenship?', cta: es ? 'Ver la ceremonia y el juramento' : 'See the oath ceremony', ctaPage: 'us-oath',
      inputs: [{ id: 'a', label: es ? 'Lo que hace (o piensa hacer)' : 'What you do (or plan to do)', def: 1, options: acts }, { id: 'i', label: es ? '¿Con la intención de dejar de ser estadounidense?' : 'With the intent to give up U.S. citizenship?', def: 0, options: yn(lang) }],
      run: (v) => {
        const a = clamp(v.a ?? 0, 0, 5), intent = !!v.i;
        const lost = a === 5 || (a > 0 && intent);
        const law = a === 0 ? (es ? 'ninguno' : 'none') : `349(a)(${[0, 1, 2, 4, 3, 5][a]})`;
        return { head: [es ? 'Ciudadanía de EE. UU.' : 'U.S. citizenship', lost ? (es ? 'Se pierde' : 'Lost') : (es ? 'Se conserva' : 'Kept')], rows: [[es ? 'Sección de la INA' : 'INA section', law], [es ? 'Pasaporte para entrar y salir de EE. UU.' : 'Passport to enter and leave the U.S.', lost ? (es ? 'el extranjero' : 'foreign') : (es ? 'el estadounidense' : 'U.S.')], [es ? 'Tarifa consular de renuncia' : 'Consular renunciation fee', money(P.us.forms.renunciationFee, 'USD', lang)]], note: es ? 'La ley exige un acto voluntario y la intención de renunciar; la renuncia formal ante un cónsul la expresa por sí misma. No es asesoría legal: consulte a un abogado si su caso es dudoso.' : 'The law requires a voluntary act done with the intent to give up citizenship; a formal renunciation before a consul expresses that intent itself. Not legal advice: ask an attorney if your case is unclear.' };
      },
    };
  },
  // English-only pages (2026-10-27): the two specs below have no Spanish page, their labels are English.
  uscert: () => {
    const N6 = P.us.forms.n600, N5 = P.us.forms.n565;
    const how = [{ value: '1', label: 'I naturalized (N-400 and the oath)' }, { value: '2', label: 'As a child, through a citizen parent' }, { value: '3', label: 'At birth abroad, to a U.S. citizen parent' }, { value: '4', label: 'I was born in the United States' }];
    return {
      title: 'Which citizenship document do I have, and what does it cost?', cta: 'Replace a lost certificate with Form N-565', ctaPage: 'us-n565',
      inputs: [{ id: 'h', label: 'How you became a U.S. citizen', def: 1, options: how }, { id: 'l', label: 'Is the certificate lost, stolen or damaged?', def: 0, options: yn('en') }],
      run: (v) => {
        const h = clamp(v.h ?? 1, 1, 4), lost = !!v.l;
        if (h === 4) return { head: ['Your proof of citizenship', 'Birth certificate or U.S. passport'], rows: [['USCIS certificate', 'none: you never need one'], ['Form to file', 'none at USCIS']], note: 'A person born in the United States is a citizen from birth (14th Amendment) and proves it with a birth certificate or a passport, not with a USCIS certificate.' };
        const nat = h === 1;
        const doc = nat ? 'Certificate of Naturalization' : 'Certificate of Citizenship';
        const get = nat ? 'given at the oath ceremony (N-400 fee)' : `Form N-600, ${money(N6.online, 'USD', 'en')} online`;
        return { head: ['Your USCIS document', doc], rows: [['How you get it', get], ['If lost or damaged', `Form N-565, ${money(N5.online, 'USD', 'en')} online, ${money(N5.paper, 'USD', 'en')} on paper`], ['Your situation', lost ? 'file Form N-565 for a replacement' : 'keep the original safe'], ...(h === 3 ? [['Other proof', 'Consular Report of Birth Abroad, U.S. passport'] as [string, string]] : [])], note: nat ? 'Naturalized citizens never file an N-600: the certificate comes with the oath. A passport also proves citizenship.' : 'You were already a citizen: the N-600 only documents it. A valid U.S. passport is also proof of citizenship.' };
      },
    };
  },
  usgmc: () => {
    const kinds = [
      { value: '1', label: 'Conviction for murder' }, { value: '2', label: 'Aggravated felony conviction (since 29 Nov 1990)' },
      { value: '3', label: 'Conviction for a crime involving moral turpitude' }, { value: '4', label: 'Drug offense (other than one small marijuana possession)' },
      { value: '5', label: 'False testimony to get an immigration benefit' }, { value: '6', label: '180 days or more in jail after a conviction' },
      { value: '7', label: 'Did not support my dependents' }, { value: '8', label: 'Traffic ticket or other minor offense' },
    ];
    return {
      title: 'Is this event inside my good moral character period?', cta: 'Prepare the N-400 interview questions', ctaPage: 'us-interview',
      inputs: [
        { id: 'r', label: 'Route', def: 5, options: [{ value: '5', label: '5 years as a permanent resident' }, { value: '3', label: '3 years, married to a U.S. citizen' }] },
        { id: 'k', label: 'What happened', def: 8, options: kinds },
        { id: 'm', label: 'Months between the event and your filing date', def: 30, max: 600, unit: 'months' },
      ],
      run: (v) => {
        const yrs = v.r === 3 ? 3 : 5, k = clamp(v.k ?? 8, 1, 8), m = clamp(v.m ?? 0, 0, 600), inside = m < yrs * 12;
        const head = k <= 2 ? 'Permanent bar' : k === 8 ? 'Case by case' : inside ? (k === 7 ? 'Bar unless extenuating circumstances' : 'Bar during the period') : 'Outside the period';
        return { head: ['Good moral character', head], rows: [['Statutory period', `${yrs} years before filing, up to the oath`], ['Your event', inside ? `inside (${m} of ${yrs * 12} months)` : `before it (${m} months)`], ['Rule (8 CFR 316.10)', k <= 2 ? '(b)(1): at any time' : k === 7 ? '(b)(3)' : k === 8 ? 'officer’s discretion' : '(b)(2)']], note: 'Not legal advice. Conduct before the period can still count if it shows no reform; an arrest without conviction must still be disclosed. Ask an immigration attorney or accredited representative.' };
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
