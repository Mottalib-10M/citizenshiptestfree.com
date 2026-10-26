/**
 * N-400 interview practice: the officer goes over the yes/no questions of Part 9 again, under oath.
 * The questions are copied from Form N-400 (edition 01/20/25, public domain); the form's own glosses
 * (words in parentheses) are shown as key words. A “Yes” to an “EVER” question must be explained in
 * Part 14 with evidence; a “No” to an oath question sends you to the Oath of Allegiance instructions.
 * Nothing is stored or sent: the answers stay in the browser. First render = question 1 (RECETTE §17.5).
 */
import { useState } from 'react';
import { N400_INTERVIEW as QS } from '../../data/us-n400-interview';

type Lang = 'en' | 'es';
const T = {
  en: {
    q: (i: number, n: number, it: string) => `Question ${i} of ${n} · Part 9, item ${it}`, yes: 'Yes', no: 'No', next: 'Next question', prev: 'Previous', again: 'Start again',
    key: 'Key words, as the form explains them:', say: 'Answer aloud first, in a full sentence, then click.',
    fbEverNo: 'Say it in a full sentence: “No, I have not.” The officer may ask a follow-up question to check that you understood.',
    fbEverYes: 'A “Yes” is not a refusal by itself, but the form asks you to explain it in Part 14 and to bring evidence. Ask an immigration attorney or an accredited representative before the interview.',
    fbOathYes: 'This is the answer the oath expects.', fbOathNo: 'A “No” here sends you to the Oath of Allegiance section of the instructions: modifications exist only in limited cases. Get legal advice before the interview.',
    head: 'Your practice interview', done: (k: number, n: number) => `${k} of ${n} answered`, toExplain: '“Yes” answers to explain (Part 14)', oathNo: 'Oath answers to review', status: { start: 'Answer the first question', run: 'Keep going', clean: 'No answer needs an explanation', flag: 'Prepare explanations and documents' },
    note: 'Questions: Form N-400, Part 9 (edition 01/20/25), USCIS. A selection of 24 items. Your answers stay in your browser.',
  },
  es: {
    q: (i: number, n: number, it: string) => `Pregunta ${i} de ${n} · Parte 9, punto ${it}`, yes: 'Sí (Yes)', no: 'No', next: 'Siguiente pregunta', prev: 'Anterior', again: 'Volver a empezar',
    key: 'Palabras clave, como las explica el formulario:', say: 'Responda primero en voz alta, en inglés y con una frase completa; luego haga clic.',
    fbEverNo: 'Dígalo con una frase completa: «No, I have not.» El oficial puede hacer otra pregunta para comprobar que entendió.',
    fbEverYes: 'Un «Sí» no es una negativa en sí, pero el formulario pide explicarlo en la Parte 14 y llevar pruebas. Consulte a un abogado de inmigración o a un representante acreditado antes de la entrevista.',
    fbOathYes: 'Es la respuesta que espera el juramento.', fbOathNo: 'Un «No» aquí remite a la sección del Juramento de Lealtad de las instrucciones: solo hay modificaciones en casos limitados. Pida asesoría legal antes de la entrevista.',
    head: 'Su entrevista de práctica', done: (k: number, n: number) => `${k} de ${n} respondidas`, toExplain: 'Respuestas «Sí» que explicar (Parte 14)', oathNo: 'Respuestas del juramento que revisar', status: { start: 'Responda la primera pregunta', run: 'Siga adelante', clean: 'Ninguna respuesta requiere explicación', flag: 'Prepare explicaciones y documentos' },
    note: 'Preguntas: Formulario N-400, Parte 9 (edición 01/20/25), USCIS; 24 puntos seleccionados. El oficial las hace en inglés; la traducción es nuestra y no es oficial. Sus respuestas no salen de su navegador.',
  },
} as const;

interface Props { lang?: Lang; idPrefix?: string }
export default function UsInterview({ lang = 'en', idPrefix = 'i' }: Props) {
  const L = T[lang];
  const n = QS.length;
  const [ans, setAns] = useState<Array<boolean | null>>(() => QS.map(() => null));
  const [cur, setCur] = useState(0);
  const q = QS[cur], a = ans[cur];
  const pick = (v: boolean) => setAns((o) => o.map((x, j) => (j === cur ? v : x)));
  const answered = ans.filter((x) => x !== null).length;
  const explain = QS.filter((x, i) => x.kind === 'ever' && ans[i] === true).length;
  const oathNo = QS.filter((x, i) => x.kind === 'oath' && ans[i] === false).length;
  const status: keyof typeof L.status = !answered ? 'start' : explain || oathNo ? 'flag' : answered === n ? 'clean' : 'run';
  const fb = a === null ? '' : q.kind === 'ever' ? (a ? L.fbEverYes : L.fbEverNo) : a ? L.fbOathYes : L.fbOathNo;
  const warn = a !== null && ((q.kind === 'ever' && a) || (q.kind === 'oath' && !a));
  const btn = (on: boolean) => `min-h-12 rounded-lg border px-4 py-2.5 text-left text-base font-medium ${on ? 'border-accent-700 bg-accent-50 text-navy-900' : 'border-navy-300 bg-white text-navy-900 hover:border-accent-500 hover:bg-accent-50'}`;
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
          <p className="text-sm text-navy-700">{L.q(cur + 1, n, q.item)}</p>
          <fieldset className="mt-3">
            <legend className="text-lg font-semibold leading-snug text-navy-900" lang="en">{q.en}</legend>
            {lang === 'es' && <p className="mt-1 text-sm text-navy-700">{q.es}</p>}
            {q.gloss && <p className="mt-2 text-sm text-navy-700">{L.key} <em lang="en">{q.gloss[lang === 'es' ? 1 : 0]}</em></p>}
            <p className="mt-2 text-xs text-navy-600">{L.say}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button id={`${idPrefix}-yes`} type="button" aria-pressed={a === true} onClick={() => pick(true)} className={btn(a === true)}>{L.yes}</button>
              <button id={`${idPrefix}-no`} type="button" aria-pressed={a === false} onClick={() => pick(false)} className={btn(a === false)}>{L.no}</button>
            </div>
            {a !== null && (
              <div className={`mt-4 border-l-4 px-4 py-3 text-sm text-navy-800 ${warn ? 'border-amber-600 bg-amber-50' : 'border-green-700 bg-green-50'}`}>
                <p>{fb}</p>
                {q.note && <p className="mt-1">{q.note[lang === 'es' ? 1 : 0]}</p>}
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-3">
              {cur > 0 && <button type="button" onClick={() => setCur(cur - 1)} className="h-12 rounded-lg border border-navy-300 px-5 font-medium text-navy-800 hover:bg-navy-50">{L.prev}</button>}
              {cur < n - 1 && <button type="button" onClick={() => setCur(cur + 1)} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">{L.next}</button>}
              {answered > 0 && <button type="button" onClick={() => { setAns(QS.map(() => null)); setCur(0); }} className="h-12 rounded-lg border border-navy-300 px-5 font-medium text-navy-800 hover:bg-navy-50">{L.again}</button>}
            </div>
          </fieldset>
        </div>
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.head}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{answered}<span className="text-xl font-semibold text-navy-700"> / {n}</span></p>
        <p className="text-sm text-navy-700">{L.done(answered, n)}</p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded bg-navy-200" aria-hidden="true"><div className="h-2 bg-accent-700" style={{ width: `${(answered / n) * 100}%` }} /></div>
        <p className={`mt-3 text-base font-semibold ${status === 'flag' ? 'text-amber-800' : status === 'clean' ? 'text-green-800' : 'text-navy-700'}`}>{L.status[status]}</p>
        <table className="mt-2 w-full text-sm"><tbody className="divide-y divide-navy-200">
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.toExplain}</td><td className="tabular-nums py-1.5 text-right font-medium text-navy-900">{explain}</td></tr>
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.oathNo}</td><td className="tabular-nums py-1.5 text-right font-medium text-navy-900">{oathNo}</td></tr>
        </tbody></table>
        <p className="mt-3 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
