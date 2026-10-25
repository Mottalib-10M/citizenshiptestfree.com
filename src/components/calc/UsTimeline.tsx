/**
 * N-400 processing time, naturalization timeline and oath ceremony, three modes of one tool:
 * - processing: filing date + processing time read on the USCIS tool for your field office (or the
 *   national median of the USCIS fact sheet) → date by which the decision is expected;
 * - timeline: the same, plus interview and ceremony dates when known → every dated step (120-day
 *   decision rule, 30 or 33 days for an N-336 hearing request, Social Security update after 10 days);
 * - oath: ceremony date and the form of the oath (standard, without the military clauses, affirmation)
 *   → the exact words to say (8 CFR 337.1, text published by USCIS) and the day Social Security can be updated.
 * Rules: params-2026.json (P.us.processing). First render = build day and example dates (RECETTE §17.5).
 */
import { useEffect, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import P from '../../data/params-2026.json';
import { nationalMedianMonths, usTimeline } from '../../lib/engine/us';
import { dayNum } from '../../lib/engine/dates';
import { dateL, formatNumberL } from '../../lib/format-l';
import { readParams, updateURL } from '../../lib/url-state';

declare const __BUILD_DAY__: string;
type Lang = 'en' | 'es';
type Mode = 'processing' | 'timeline' | 'oath';
type OathForm = 'standard' | 'modified' | 'affirm';
const PT = P.us.processing;
const iso = (s: string | null | undefined) => !!s && /^\d{4}-\d{2}-\d{2}$/.test(s);
const m1 = (n: number, lang: Lang) => formatNumberL(n, lang, Number.isInteger(n) ? 0 : 1);

/** Oath of Allegiance as published by USCIS (8 CFR 337.1), in clauses so that the modified forms can drop some. */
const OATH = {
  open: { standard: 'I hereby declare, on oath, that', affirm: 'I hereby declare, solemnly affirm, that' },
  clauses: [
    'I absolutely and entirely renounce and abjure all allegiance and fidelity to any foreign prince, potentate, state, or sovereignty, of whom or which I have heretofore been a subject or citizen;',
    'that I will support and defend the Constitution and laws of the United States of America against all enemies, foreign and domestic;',
    'that I will bear true faith and allegiance to the same;',
    'that I will bear arms on behalf of the United States when required by the law;',
    'that I will perform noncombatant service in the Armed Forces of the United States when required by the law;',
    'that I will perform work of national importance under civilian direction when required by the law;',
    'and that I take this obligation freely, without any mental reservation or purpose of evasion',
  ],
  close: { standard: '; so help me God.', affirm: '.' },
};

const T = {
  en: {
    filed: 'Date USCIS received your N-400', months: 'Processing time (months)', monthsHelp: (m: string, fy: string) => `National median ${m} months (FY ${fy}). Replace it with the figure the USCIS tool shows for your field office.`,
    interview: 'Interview date, if scheduled', ceremony: 'Oath ceremony date, if scheduled', form: 'Form of the oath',
    forms: { standard: 'Standard oath', modified: 'Without the two military clauses (religious or moral objection)', affirm: 'Affirmation instead of “on oath”' },
    headP: 'Decision expected by', headT: 'Your naturalization timeline', headO: 'The oath you will take',
    inDays: (d: number) => (d > 0 ? `in ${formatNumberL(d, 'en')} days` : d === 0 ? 'today' : `${formatNumberL(-d, 'en')} days ago`),
    basis: (m: string) => `Filing date + ${m} months. Half of the N-400s nationally (median) or most cases at your office (USCIS tool) are decided by then; yours can take longer.`,
    ceremonyP: 'Oath ceremony: on the interview day when a same-day ceremony is available, otherwise on the date of the Form N-445 notice USCIS mails you. USCIS publishes no waiting time for ceremonies.',
    steps: { filed: 'N-400 received by USCIS', receipt: 'Receipt notice, then biometrics appointment if USCIS needs your fingerprints', interview: 'Interview, English test and civics test', decision: 'Decision (Form N-652): granted, continued or denied', legal: 'Latest legal decision date (120 days after the interview)', hearing: 'If denied: request a hearing with Form N-336 by', oath: 'Oath ceremony: you become a citizen', ssa: 'Update your Social Security record from' },
    est: 'estimate', unknown: 'date set by USCIS', mailed: (d: string) => `(${d} if the denial notice was mailed)`,
    ssa: 'Update Social Security from', ssaNote: (n: number) => `USCIS advises waiting at least ${n} days after the ceremony.`, bring: 'Bring the completed N-445 questionnaire and your green card, which you hand in at check-in.',
  },
  es: {
    filed: 'Fecha en que USCIS recibió su N-400', months: 'Tiempo de trámite (meses)', monthsHelp: (m: string, fy: string) => `Mediana nacional: ${m} meses (año fiscal ${fy}). Reemplácela por la cifra que muestra la herramienta de USCIS para su oficina.`,
    interview: 'Fecha de la entrevista, si ya la tiene', ceremony: 'Fecha de la ceremonia, si ya la tiene', form: 'Forma del juramento',
    forms: { standard: 'Juramento estándar', modified: 'Sin las dos cláusulas militares (objeción religiosa o moral)', affirm: 'Afirmación en lugar de «on oath»' },
    headP: 'Decisión prevista hacia el', headT: 'Su calendario de naturalización', headO: 'El juramento que pronunciará (en inglés)',
    inDays: (d: number) => (d > 0 ? `dentro de ${formatNumberL(d, 'es')} días` : d === 0 ? 'hoy' : `hace ${formatNumberL(-d, 'es')} días`),
    basis: (m: string) => `Fecha de presentación + ${m} meses. La mitad de los N-400 del país (mediana) o la mayoría de los casos de su oficina (herramienta de USCIS) se deciden antes; el suyo puede tardar más.`,
    ceremonyP: 'Ceremonia de juramento: el mismo día de la entrevista si hay una ceremonia ese día; si no, en la fecha del aviso N-445 que USCIS le envía. USCIS no publica tiempos de espera para las ceremonias.',
    steps: { filed: 'USCIS recibe el N-400', receipt: 'Aviso de recibo y, si USCIS necesita sus huellas, cita de datos biométricos', interview: 'Entrevista, examen de inglés y examen cívico', decision: 'Decisión (Formulario N-652): aprobada, continuada o denegada', legal: 'Fecha límite legal de la decisión (120 días después de la entrevista)', hearing: 'Si es denegada: pedir una audiencia con el Formulario N-336 antes del', oath: 'Ceremonia de juramento: se convierte en ciudadano', ssa: 'Actualizar su registro del Seguro Social desde el' },
    est: 'estimación', unknown: 'fecha que fija USCIS', mailed: (d: string) => `(${d} si el aviso de denegación llegó por correo)`,
    ssa: 'Actualizar el Seguro Social desde el', ssaNote: (n: number) => `USCIS aconseja esperar al menos ${n} días después de la ceremonia.`, bring: 'Lleve el cuestionario N-445 completado y su tarjeta verde, que entrega al registrarse.',
  },
} as const;

interface Props { lang?: Lang; mode?: Mode; idPrefix?: string }
export default function UsTimeline({ lang = 'en', mode = 'processing', idPrefix = 't' }: Props) {
  const L = T[lang];
  const [today, setToday] = useState(__BUILD_DAY__);
  const [filed, setFiled] = useState('2026-03-02');
  const [months, setMonths] = useState(nationalMedianMonths);
  const [interview, setInterview] = useState(mode === 'timeline' ? '2026-07-20' : '');
  const [ceremony, setCeremony] = useState(mode === 'oath' ? '2026-11-19' : '');
  const [form, setForm] = useState<OathForm>('standard');
  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
    const u = readParams(window.location.search);
    const f = u.get('f'), m = Number(u.get('mo')), i = u.get('i'), c = u.get('c'), o = u.get('o');
    if (iso(f)) setFiled(f!); if (m > 0) setMonths(m); if (iso(i)) setInterview(i!); if (iso(c)) setCeremony(c!);
    if (o === 'standard' || o === 'modified' || o === 'affirm') setForm(o);
  }, []);
  useEffect(() => {
    if (mode === 'oath') updateURL({ c: ceremony || undefined, o: form });
    else updateURL({ f: filed, mo: months, i: interview || undefined, c: ceremony || undefined });
  }, [mode, filed, months, interview, ceremony, form]);
  const t = usTimeline({ filed: iso(filed) ? filed : today, months, interview: iso(interview) ? interview : null, ceremony: iso(ceremony) ? ceremony : null });
  const d = (x: string) => dateL(x, lang);
  const rel = (x: string) => L.inDays(dayNum(x) - dayNum(today));
  const inputCls = 'h-12 w-full min-w-0 rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20';
  const field = (id: string, label: string, val: string, set: (v: string) => void) => (
    <div className="grid min-w-0 grid-rows-subgrid row-span-3 content-start gap-y-0"><label htmlFor={`${idPrefix}-${id}`} className="mb-1 block text-sm font-medium text-navy-700">{label}</label><input id={`${idPrefix}-${id}`} type="date" value={val} onChange={(e) => set(e.target.value)} className={inputCls} /><span /></div>
  );
  const tag = lang === 'es' ? 'es-US' : 'en-GB';
  const monthsField = <NumberField id={`${idPrefix}-mo`} label={L.months} value={months} onChange={setMonths} max={60} decimals={1} tag={tag} help={L.monthsHelp(m1(nationalMedianMonths, lang), PT.latestFy)} />;
  const box = 'h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20';

  if (mode === 'oath') {
    const clauses = OATH.clauses.filter((_, i) => !(form === 'modified' && (i === 3 || i === 4)));
    const text = `${form === 'affirm' ? OATH.open.affirm : OATH.open.standard} ${clauses.join(' ')}${form === 'affirm' ? OATH.close.affirm : OATH.close.standard}`;
    return (
      <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
        <form className="grid content-start gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          {field('c', L.ceremony, ceremony, setCeremony)}
          <SelectField id={`${idPrefix}-o`} label={L.form} value={form} onChange={(x) => setForm(x as OathForm)} options={(['standard', 'modified', 'affirm'] as OathForm[]).map((k) => ({ value: k, label: L.forms[k] }))} />
          <blockquote lang="en" className="sm:col-span-2 rounded-lg border-l-4 border-accent-500 bg-white p-4 text-sm leading-relaxed text-navy-900">{text}</blockquote>
        </form>
        <div data-resultat aria-live="polite" className={box}>
          <p className="text-sm font-medium text-navy-700">{L.ssa}</p>
          <p className="mt-1 text-3xl font-bold text-navy-900">{t.ssaFrom ? d(t.ssaFrom) : '…'}</p>
          {t.ssaFrom && <p className="text-sm text-navy-700">{rel(t.ssaFrom)}</p>}
          <p className="mt-2 text-xs text-navy-700">{L.ssaNote(PT.ssaWaitDays)}</p>
          <p className="mt-2 text-xs text-navy-700">{L.bring}</p>
          <p className="mt-2 text-xs font-medium text-navy-800">{L.headO}: {L.forms[form]}</p>
        </div>
      </div>
    );
  }

  if (mode === 'timeline') {
    const rows: Array<[string, string, string]> = [
      [L.steps.filed, iso(filed) ? d(filed) : '…', ''],
      [L.steps.receipt, L.unknown, ''],
      [L.steps.interview, iso(interview) ? d(interview) : L.unknown, ''],
      [L.steps.decision, `${L.est}: ${d(t.decisionBy)}`, ''],
      ...(t.legalDecisionBy ? [[L.steps.legal, d(t.legalDecisionBy), ''] as [string, string, string]] : []),
      ...(t.hearingBy && t.hearingByMailed ? [[L.steps.hearing, d(t.hearingBy), L.mailed(d(t.hearingByMailed))] as [string, string, string]] : []),
      [L.steps.oath, iso(ceremony) ? d(ceremony) : L.unknown, ''],
      ...(t.ssaFrom ? [[L.steps.ssa, d(t.ssaFrom), ''] as [string, string, string]] : []),
    ];
    return (
      <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
        <form className="grid content-start gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          {field('f', L.filed, filed, setFiled)}
          {monthsField}
          {field('i', L.interview, interview, setInterview)}
          {field('c', L.ceremony, ceremony, setCeremony)}
        </form>
        <div data-resultat aria-live="polite" className={box}>
          <p className="text-sm font-medium text-navy-700">{L.headT}</p>
          <ol className="mt-2 space-y-2 text-sm">
            {rows.map(([k, v, n], i) => (
              <li key={i} className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-2"><span className="tabular-nums font-semibold text-accent-700">{i + 1}.</span><span><span className="block text-navy-700">{k}</span><span className="block font-semibold text-navy-900">{v}</span>{n && <span className="block text-xs text-navy-700">{n}</span>}</span></li>
            ))}
          </ol>
          <p className="mt-3 text-xs text-navy-700">{L.basis(m1(months, lang))}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form className="grid content-start gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        {field('f', L.filed, filed, setFiled)}
        {monthsField}
      </form>
      <div data-resultat aria-live="polite" className={box}>
        <p className="text-sm font-medium text-navy-700">{L.headP}</p>
        <p className="mt-1 text-3xl font-bold text-navy-900">{d(t.decisionBy)}</p>
        <p className="text-sm text-navy-700">{rel(t.decisionBy)}</p>
        <p className="mt-2 text-xs text-navy-700">{L.basis(m1(months, lang))}</p>
        <p className="mt-2 text-xs text-navy-700">{L.ceremonyP}</p>
      </div>
    </div>
  );
}
