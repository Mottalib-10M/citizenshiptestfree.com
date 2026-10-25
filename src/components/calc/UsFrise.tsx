/**
 * Naturalization frieze (RECETTE §17.6) for the United States, built on the trame's Frise component.
 * Every duration comes from params-2026.json (P.us): the national median N-400 processing time of the
 * USCIS fact sheet, the 5-year wait minus the 90-day early filing window, the 120-day decision rule
 * after the interview, the 10 days USCIS advises before updating Social Security. A step with no
 * published duration (receipt notice, oath ceremony) is a milestone (0/0).
 */
import Frise, { type FriseStep, type FriseLabels } from '../ui/Frise';
import P from '../../data/params-2026.json';

type Lang = 'en' | 'es';
export type FriseVariant = 'processing' | 'timeline' | 'steps' | 'oath';
const U = P.us, PT = U.processing, S = P.sources as Record<string, { url: string; label: Record<string, string> }>;
const median = (PT.medianMonths as Record<string, number>)[PT.latestFy];
const medianDays = Math.round((median * 365.25) / 12);
const waitDays = Math.round(U.n400.routes['5'].years * 365.25) - U.n400.earlyFilingDays;
const src = (k: string, lang: Lang) => ({ label: S[k].label[lang], href: S[k].url });

const LABELS: Record<Lang, Omit<FriseLabels, 'start' | 'startHelp' | 'caption'>> = {
  en: { end: 'Estimated end', between: 'between', and: 'and', today: 'Today', done: 'Done', current: 'In progress', upcoming: 'Upcoming', day: 'day', days: 'days', week: 'week', weeks: 'weeks', month: 'month', months: 'months', milestone: 'milestone' },
  es: { end: 'Fin estimado', between: 'entre el', and: 'y el', today: 'Hoy', done: 'Hecho', current: 'En curso', upcoming: 'Pendiente', day: 'día', days: 'días', week: 'semana', weeks: 'semanas', month: 'mes', months: 'meses', milestone: 'hito' },
};

function build(v: FriseVariant, lang: Lang): { steps: FriseStep[]; start: string; help: string; caption: string; def: string | undefined } {
  const en = lang === 'en';
  const m = median.toLocaleString(en ? 'en-GB' : 'es-US');
  const filed: FriseStep = { id: 'filed', title: en ? 'Form N-400 received by USCIS' : 'USCIS recibe el Formulario N-400', detail: en ? 'Online or by mail; USCIS sends a receipt notice, then a biometrics appointment if it needs your fingerprints.' : 'En línea o por correo; USCIS envía un aviso de recibo y, si necesita sus huellas, una cita de datos biométricos.', minDays: 0, maxDays: 0, source: src('us_10steps', lang) };
  const proc: FriseStep = { id: 'proc', title: en ? 'Biometrics, interview, English and civics tests' : 'Biometría, entrevista y exámenes de inglés y cívico', detail: en ? `National median from receipt to decision: ${m} months (USCIS, FY ${PT.latestFy}). Your field office can be faster or slower.` : `Mediana nacional del recibo a la decisión: ${m} meses (USCIS, año fiscal ${PT.latestFy}). Su oficina puede ir más rápido o más lento.`, minDays: medianDays, maxDays: medianDays, source: src('us_hist_pt', lang) };
  const decision: FriseStep = { id: 'decision', title: en ? 'Decision on Form N-652' : 'Decisión en el Formulario N-652', detail: en ? `Granted, continued or denied. USCIS has ${PT.decisionDaysAfterInterview} days from the interview to decide.` : `Aprobada, continuada o denegada. USCIS tiene ${PT.decisionDaysAfterInterview} días desde la entrevista para decidir.`, minDays: 0, maxDays: 0, source: src('us_pm_b4', lang) };
  const decision120: FriseStep = { ...decision, detail: en ? `Often on the interview day; at the latest ${PT.decisionDaysAfterInterview} days after it, or you may ask a district court to decide.` : `A menudo el mismo día de la entrevista; a más tardar ${PT.decisionDaysAfterInterview} días después, o puede pedir a un tribunal federal que decida.`, minDays: 0, maxDays: PT.decisionDaysAfterInterview };
  const oath: FriseStep = { id: 'oath', title: en ? 'Oath of Allegiance: you become a citizen' : 'Juramento de Lealtad: se convierte en ciudadano', detail: en ? 'The same day as the interview when a ceremony is available, otherwise on the Form N-445 notice. USCIS publishes no waiting time.' : 'El mismo día de la entrevista si hay ceremonia; si no, en la fecha del aviso N-445. USCIS no publica tiempos de espera.', minDays: 0, maxDays: 0, source: src('us_ceremonies', lang) };
  const ssa: FriseStep = { id: 'ssa', title: en ? 'Update your Social Security record' : 'Actualizar su registro del Seguro Social', detail: en ? `USCIS advises waiting at least ${PT.ssaWaitDays} days after the ceremony.` : `USCIS aconseja esperar al menos ${PT.ssaWaitDays} días después de la ceremonia.`, minDays: PT.ssaWaitDays, maxDays: PT.ssaWaitDays, source: src('us_ceremonies', lang) };
  const wait: FriseStep = { id: 'wait', title: en ? '5 years as a permanent resident, minus 90 days' : '5 años como residente permanente, menos 90 días', detail: en ? `You may file ${U.n400.earlyFilingDays} days before the fifth anniversary of your green card (third if married to a citizen), with ${U.n400.routes['5'].presenceDays} days of physical presence.` : `Puede presentar ${U.n400.earlyFilingDays} días antes del quinto aniversario de su tarjeta verde (tercero si está casado con un ciudadano), con ${U.n400.routes['5'].presenceDays} días de presencia física.`, minDays: waitDays, maxDays: waitDays, source: src('us_n400', lang) };
  const interview: FriseStep = { id: 'interview', title: en ? 'Interview, English and civics tests' : 'Entrevista y exámenes de inglés y cívico', detail: en ? 'At a USCIS field office, with the officer who reviews your N-400.' : 'En una oficina de USCIS, con el oficial que revisa su N-400.', minDays: 0, maxDays: 0, source: src('us_10steps', lang) };
  const def: string | undefined = '2026-08-03'; // fixed example (no date computed at render, RECETTE §17.5)
  if (v === 'timeline') return { steps: [wait, proc, decision, oath, ssa], start: en ? '“Resident since” date on your green card' : 'Fecha «Resident since» de su tarjeta verde', help: en ? '5-year route; the spouse of a citizen files two years earlier.' : 'Vía de 5 años; el cónyuge de un ciudadano presenta dos años antes.', caption: en ? 'From green card to citizenship: each bar is proportional to the official duration of the step; the marker shows where you are today.' : 'De la tarjeta verde a la ciudadanía: cada barra es proporcional a la duración oficial de la etapa; el marcador indica dónde está hoy.', def: '2021-11-15' };
  if (v === 'oath') return { steps: [interview, decision120, oath, ssa], start: en ? 'Date of your naturalization interview' : 'Fecha de su entrevista de naturalización', help: en ? 'The decision window is the legal maximum, not a typical wait.' : 'La ventana de decisión es el máximo legal, no una espera típica.', caption: en ? 'From interview to oath: the decision can come on the day or up to 120 days later, then the ceremony and the Social Security update.' : 'De la entrevista al juramento: la decisión puede llegar el mismo día o hasta 120 días después; luego la ceremonia y el Seguro Social.', def: '2026-07-20' };
  if (v === 'steps') return { steps: [filed, proc, decision, oath, ssa], start: en ? 'Date USCIS received your N-400' : 'Fecha en que USCIS recibió su N-400', help: en ? 'Printed on the receipt notice (Form I-797C).' : 'Figura en el aviso de recibo (Formulario I-797C).', caption: en ? 'Form N-400 from filing to oath: the processing bar uses the national median published by USCIS; steps without an official duration are milestones.' : 'El N-400 de la presentación al juramento: la barra de trámite usa la mediana nacional de USCIS; las etapas sin duración oficial son hitos.', def };
  return { steps: [filed, proc, decision, oath], start: en ? 'Date USCIS received your N-400' : 'Fecha en que USCIS recibió su N-400', help: en ? 'Printed on the receipt notice (Form I-797C).' : 'Figura en el aviso de recibo (Formulario I-797C).', caption: en ? `N-400 processing: half of the applications were decided within ${m} months nationally (USCIS, FY ${PT.latestFy}); the marker shows where you are today.` : `Trámite del N-400: la mitad de las solicitudes se decidieron en ${m} meses en todo el país (USCIS, año fiscal ${PT.latestFy}); el marcador indica dónde está hoy.`, def };
}

interface Props { lang?: Lang; variant?: FriseVariant; id?: string }
export default function UsFrise({ lang = 'en', variant = 'processing', id = 'frise' }: Props) {
  const b = build(variant, lang);
  return <Frise steps={b.steps} labels={{ ...LABELS[lang], start: b.start, startHelp: b.help, caption: b.caption }} locale={lang === 'es' ? 'es-US' : 'en-GB'} defaultStart={b.def} id={id} />;
}
