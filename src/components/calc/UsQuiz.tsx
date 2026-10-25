/**
 * U.S. civics test, as the officer gives it: questions read from the official USCIS lists (2025: 20 of
 * 128, 12 right to pass, stop at 12 right or 9 wrong; 2008: 10 of 100, 6 right, stop at 6 or 5 wrong;
 * 65/20: 10 of the 20 starred questions). Practice mode: 10 questions of one theme, no stop.
 * First render = the questions drawn at build time (RECETTE §17.5). Nothing leaves the browser.
 */
import { useEffect, useRef, useState } from 'react';
import SelectField from '../ui/SelectField';
import { drawUs, practiceUs, ruleOf, scoreUs, type UsMode, type UsQuestion, type UsVersion, type UsBankFile } from '../../lib/engine/us';
import { readParams, updateURL } from '../../lib/url-state';

type Lang = 'en' | 'es';
export type QuizMode = 'exam' | 'practice' | '6520';
async function loadUs(v: UsVersion): Promise<UsBankFile> {
  const m = v === '2025' ? await import('../../data/questions/us-2025.json') : await import('../../data/questions/us-2008.json');
  return m.default as unknown as UsBankFile;
}
const T = {
  en: {
    version: 'Test version', v2025: '2025 test (N-400 filed on or after 20 Oct 2025)', v2008: '2008 test (N-400 filed before 20 Oct 2025)',
    theme: 'Theme', allThemes: 'All themes (mixed)', q: (i: number, n: number) => `Question ${i} of ${n}`,
    next: 'Next question', prev: 'Previous', again: 'New test, new questions', loading: 'Loading the questions…',
    right: 'Correct.', wrong: 'Not quite.', accepted: 'USCIS accepts:', current: 'Current answer as listed on the USCIS test updates page.',
    score: 'Your interview', mode: { exam: 'Mock civics test', practice: 'Practice by theme', '6520': '65/20 test' },
    rule: (p: number, a: number, f: number) => `Pass: ${p} right out of up to ${a}. The officer stops at ${p} right or ${f} wrong.`,
    practiceRule: (n: number) => `Practice set of ${n} questions, no stop rule`,
    status: { start: 'Pick an answer to start', running: 'Keep going', pass: 'Passed: the officer would stop here', fail: 'Failed: the officer would stop here', done: 'Set finished' },
    tally: (r: number, w: number) => `${r} right · ${w} wrong`, toPass: (k: number) => `${k} more right answer${k === 1 ? '' : 's'} to pass`, canMiss: (k: number) => (k <= 0 ? 'No more mistakes allowed' : `You can still miss ${k}`),
    stopped: (n: number) => `Stopped after ${n} question${n === 1 ? '' : 's'}`, review: 'Questions you missed', none: 'No mistakes.',
    showEn: '', note: 'Questions and accepted answers: official USCIS list (public domain). The four answer choices are ours: at the interview the officer asks aloud and you answer in your own words.',
  },
  es: {
    version: 'Versión del examen', v2025: 'Examen 2025 (N-400 presentado desde el 20 oct. 2025)', v2008: 'Examen 2008 (N-400 presentado antes del 20 oct. 2025)',
    theme: 'Tema', allThemes: 'Todos los temas (mezclados)', q: (i: number, n: number) => `Pregunta ${i} de ${n}`,
    next: 'Siguiente pregunta', prev: 'Anterior', again: 'Nuevo examen, otras preguntas', loading: 'Cargando las preguntas…',
    right: 'Correcto.', wrong: 'No exactamente.', accepted: 'USCIS acepta:', current: 'Respuesta actual según la página de actualizaciones del examen de USCIS.',
    score: 'Su entrevista', mode: { exam: 'Examen cívico de práctica', practice: 'Práctica por tema', '6520': 'Examen 65/20' },
    rule: (p: number, a: number, f: number) => `Para aprobar: ${p} correctas de hasta ${a}. El oficial se detiene con ${p} correctas o ${f} incorrectas.`,
    practiceRule: (n: number) => `Serie de práctica de ${n} preguntas, sin regla de parada`,
    status: { start: 'Elija una respuesta para empezar', running: 'Siga adelante', pass: 'Aprobado: el oficial se detendría aquí', fail: 'No aprobado: el oficial se detendría aquí', done: 'Serie terminada' },
    tally: (r: number, w: number) => `${r} correctas · ${w} incorrectas`, toPass: (k: number) => `Faltan ${k} correcta${k === 1 ? '' : 's'} para aprobar`, canMiss: (k: number) => (k <= 0 ? 'No puede fallar ninguna más' : `Puede fallar ${k} más`),
    stopped: (n: number) => `Detenido después de ${n} pregunta${n === 1 ? '' : 's'}`, review: 'Preguntas falladas', none: 'Ningún error.',
    showEn: 'En la entrevista, en inglés:', note: 'Preguntas y respuestas aceptadas: lista oficial de USCIS (dominio público); versión 2008 en la traducción oficial de USCIS, versión 2025 en nuestra traducción no oficial. Las cuatro opciones son nuestras: en la entrevista el oficial pregunta en voz alta y usted responde con sus palabras.',
  },
} as const;

interface Props { lang?: Lang; version: UsVersion; mode?: QuizMode; theme?: number | null; initial: UsQuestion[]; themes: string[]; seed: number; versionSelect?: boolean; idPrefix?: string }

export default function UsQuiz({ lang = 'en', version: v0, mode = 'exam', theme: th0 = null, initial, themes: themes0, seed: s0, versionSelect = false, idPrefix = 'u' }: Props) {
  const L = T[lang];
  const [version, setVersion] = useState<UsVersion>(v0);
  const [theme, setTheme] = useState<number | null>(th0);
  const [themes, setThemes] = useState<string[]>(themes0);
  const [qs, setQs] = useState<UsQuestion[]>(initial);
  const [answers, setAnswers] = useState<Array<number | null>>(() => initial.map(() => null));
  const [cur, setCur] = useState(0);
  const [loading, setLoading] = useState(false);
  const seedRef = useRef(s0);
  const um: UsMode = mode === '6520' ? '6520' : 'full';
  const rule = ruleOf(version, um);

  const draw = async (v: UsVersion, th: number | null, seed: number) => {
    setLoading(true);
    const b = await loadUs(v);
    const next = mode === 'practice' ? practiceUs(b.questions, th, seed, 10) : drawUs(b.questions, v, um, seed);
    seedRef.current = seed;
    setThemes(b.themes[lang]); setQs(next); setAnswers(next.map(() => null)); setCur(0); setLoading(false);
  };
  useEffect(() => { // shared link (?seed=…&v=…): after the first render only
    const u = readParams(window.location.search);
    const s = Number(u.get('seed')); const v = u.get('v');
    const vv = versionSelect && (v === '2008' || v === '2025') ? (v as UsVersion) : v0;
    if ((s && s !== s0) || vv !== v0) { if (vv !== v0) setVersion(vv); draw(vv, th0, s || s0); }
  }, []);

  const n = qs.length;
  const sc = scoreUs(qs, answers, mode === 'practice' ? { ...rule, pass: n + 1, failAt: n + 1 } : rule);
  const answeredN = answers.filter((a) => a !== null).length;
  const stopped = mode !== 'practice' && sc.status !== 'running';
  const finished = stopped || answeredN === n;
  const q = qs[cur];
  const a = answers[cur];
  const choose = (i: number) => { if (a !== null || (stopped && cur >= (sc.stoppedAt ?? 0))) return; setAnswers((o) => o.map((x, j) => (j === cur ? i : x))); };
  const newTest = () => { const s = Math.floor(Math.random() * 2 ** 31); updateURL({ seed: s, v: versionSelect && version !== v0 ? version : undefined }); draw(version, theme, s); };
  const status: keyof typeof L.status = !answeredN ? 'start' : mode === 'practice' ? (finished ? 'done' : 'running') : sc.status;
  const tone = status === 'pass' || status === 'done' ? 'text-green-800' : status === 'fail' ? 'text-red-700' : 'text-navy-700';
  const T_ = (x: UsQuestion) => (lang === 'es' ? x.es : x.en);
  const sep = lang === 'es' ? '; ' : '; ';

  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {(versionSelect || mode === 'practice') && (
          <div className="grid gap-3 sm:grid-cols-2">
            {versionSelect && <SelectField id={`${idPrefix}-v`} label={L.version} value={version} onChange={(x) => { const v = x as UsVersion; setVersion(v); setTheme(null); updateURL({ v: v === v0 ? undefined : v }); draw(v, null, seedRef.current); }} options={[{ value: '2025', label: L.v2025 }, { value: '2008', label: L.v2008 }]} />}
            {mode === 'practice' && <SelectField id={`${idPrefix}-theme`} label={L.theme} value={theme === null ? '' : String(theme)} onChange={(x) => { const t = x === '' ? null : Number(x); setTheme(t); draw(version, t, seedRef.current); }} options={[{ value: '', label: L.allThemes }, ...themes.map((t, i) => ({ value: String(i), label: t }))]} />}
          </div>
        )}
        <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
          <p className="text-sm text-navy-700">{L.q(cur + 1, n)}{q ? ` · n° ${q.n}` : ''}</p>
          {loading && <p className="mt-3 text-navy-700">{L.loading}</p>}
          {q && !loading && (
            <fieldset className="mt-3">
              <legend className="text-lg font-semibold leading-snug text-navy-900">{T_(q).q}</legend>
              {lang === 'es' && <p className="mt-1 text-sm text-navy-700" lang="en">{L.showEn} <em>{q.en.q}</em></p>}
              <div className="mt-4 grid gap-2">
                {(T_(q).o ?? []).map((o, i) => {
                  const picked = a === i, isRight = i === q.answer, shown = a !== null;
                  const cls = !shown ? 'border-navy-300 bg-white hover:border-accent-500 hover:bg-accent-50' : isRight ? 'border-green-700 bg-green-50 text-green-900' : picked ? 'border-red-700 bg-red-50 text-red-900' : 'border-navy-200 bg-white text-navy-600';
                  return <button key={i} type="button" onClick={() => choose(i)} aria-pressed={picked} className={`min-h-12 rounded-lg border px-4 py-2.5 text-left text-base ${cls}`}>{o}</button>;
                })}
              </div>
              {a !== null && (
                <div className="mt-4 border-l-4 border-accent-700 bg-accent-50 px-4 py-3 text-sm text-navy-800" aria-live="polite">
                  <p><strong>{a === q.answer ? L.right : L.wrong}</strong> {L.accepted} {T_(q).a.join(sep)}.</p>
                  {q.current && <p className="mt-1 text-xs text-navy-700">{L.current}</p>}
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                {cur > 0 && <button type="button" onClick={() => setCur(cur - 1)} className="h-12 rounded-lg border border-navy-300 px-5 font-medium text-navy-800 hover:bg-navy-50">{L.prev}</button>}
                {cur < n - 1 && !(stopped && cur + 1 >= (sc.stoppedAt ?? n)) && <button type="button" onClick={() => setCur(cur + 1)} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">{L.next}</button>}
                <button type="button" onClick={newTest} className="h-12 rounded-lg border border-navy-300 px-5 font-medium text-navy-800 hover:bg-navy-50">{L.again}</button>
              </div>
            </fieldset>
          )}
        </div>
        {finished && (
          <div className="rounded-xl border border-navy-200 bg-white p-4 text-sm">
            <p className="font-semibold text-navy-900">{L.review}</p>
            {qs.every((x, i) => answers[i] === null || answers[i] === x.answer) ? <p className="mt-2 text-navy-700">{L.none}</p> : (
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-navy-800">{qs.map((x, i) => (answers[i] !== null && answers[i] !== x.answer ? <li key={x.id}><span className="font-medium">{T_(x).q}</span> {L.accepted} {T_(x).a.join(sep)}.</li> : null))}</ol>
            )}
          </div>
        )}
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.score} · {L.mode[mode]} {version}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{sc.right}<span className="text-xl font-semibold text-navy-700"> / {mode === 'practice' ? n : rule.pass}</span></p>
        <p className="text-sm text-navy-700">{L.tally(sc.right, sc.wrong)}</p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded bg-navy-200" aria-hidden="true"><div className="h-2 bg-accent-700" style={{ width: `${(Math.min(sc.right, mode === 'practice' ? n : rule.pass) / Math.max(1, mode === 'practice' ? n : rule.pass)) * 100}%` }} /></div>
        <p className={`mt-3 text-base font-semibold ${tone}`}>{L.status[status]}</p>
        <table className="mt-2 w-full text-sm"><tbody className="divide-y divide-navy-200">
          <tr><td className="py-1.5 text-navy-700">{mode === 'practice' ? L.practiceRule(n) : L.rule(rule.pass, rule.asked, rule.failAt)}</td></tr>
          {mode !== 'practice' && !stopped && answeredN > 0 && <tr><td className="py-1.5 text-navy-700">{L.toPass(rule.pass - sc.right)} · {L.canMiss(rule.failAt - 1 - sc.wrong)}</td></tr>}
          {stopped && sc.stoppedAt && <tr><td className="py-1.5 text-navy-700">{L.stopped(sc.stoppedAt)}</td></tr>}
        </tbody></table>
        <p className="mt-3 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
