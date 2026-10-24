/**
 * Mock exam and practice (main tool). First render = the questions drawn at build time for this page
 * (RECETTE §17.5); a new draw, another country or a shared link only change things after mount.
 * The score panel applies each country's rule from params-2026.json (UK 18/24, Canada 15/20,
 * Australia 75 % and all five values questions). Nothing leaves the browser.
 */
import { useEffect, useRef, useState } from 'react';
import SelectField from '../ui/SelectField';
import { buildExam, buildPractice, passNeeded, type Country, type Question } from '../../lib/engine/exam';
import { loadBank, bankKey, CHAPTERS } from '../../lib/banks';
import { readParams, updateURL } from '../../lib/url-state';
import P from '../../data/params-2026.json';

type Lang = 'en' | 'fr';
const T = {
  en: {
    country: 'Country', countries: { uk: 'United Kingdom: Life in the UK', au: 'Australia', ca: 'Canada' } as Record<Country, string>,
    chapter: 'Chapter', allChapters: 'All chapters (mixed)', q: (i: number, n: number) => `Question ${i} of ${n}`,
    next: 'Next', prev: 'Previous', finish: 'See my result', again: 'New test, new questions', loading: 'Loading the questions…',
    right: 'Correct.', wrong: 'Not quite.', answer: 'Right answer:', score: 'Your score', answered: 'answered',
    feedback: 'Answers', asYouGo: 'As I go', atEnd: 'At the end', hidden: 'Answer recorded. The correction comes at the end, as in the real test.',
    pass: (need: number, n: number) => `Pass mark: ${need} of ${n}`, practice: (n: number) => `Practice set of ${n} questions`,
    values: (r: number, n: number) => `Values questions: ${r} of ${n} (all ${n} must be right)`,
    status: { start: 'Pick an answer to start', on: 'On track to pass', risk: 'One more mistake fails it', pass: 'Passed', fail: 'Below the pass mark', values: 'Failed on a values question' },
    canMiss: (k: number) => (k <= 0 ? 'No more mistakes allowed' : `You can still miss ${k}`),
    byChapter: 'Result by chapter', review: 'Questions you missed', none: 'No mistakes.', timeLeft: 'Time left', timeUp: 'Time is up: the test is marked as it stands.',
    note: 'Practice questions written by Radif Partners from the facts of the official guide. Not the official test.',
  },
  fr: {
    country: 'Pays', countries: { uk: 'Royaume-Uni', au: 'Australie', ca: 'Canada' } as Record<Country, string>,
    chapter: 'Chapitre', allChapters: 'Tous les chapitres (mélangés)', q: (i: number, n: number) => `Question ${i} sur ${n}`,
    next: 'Suivante', prev: 'Précédente', finish: 'Voir mon résultat', again: 'Nouvel examen, autres questions', loading: 'Chargement des questions…',
    right: 'Bonne réponse.', wrong: 'Pas tout à fait.', answer: 'Bonne réponse :', score: 'Votre résultat', answered: 'répondues',
    feedback: 'Correction', asYouGo: 'Au fur et à mesure', atEnd: 'À la fin', hidden: 'Réponse enregistrée. La correction vient à la fin, comme à l’examen.',
    pass: (need: number, n: number) => `Note de passage : ${need} sur ${n}`, practice: (n: number) => `Série d’entraînement de ${n} questions`,
    values: (r: number, n: number) => `Questions sur les valeurs : ${r} sur ${n}`,
    status: { start: 'Choisissez une réponse pour commencer', on: 'En bonne voie de réussir', risk: 'Une erreur de plus et c’est l’échec', pass: 'Réussi', fail: 'Sous la note de passage', values: 'Échec sur une question de valeurs' },
    canMiss: (k: number) => (k <= 0 ? 'Plus aucune erreur permise' : `Vous pouvez encore manquer ${k} question${k > 1 ? 's' : ''}`),
    byChapter: 'Résultat par chapitre', review: 'Questions manquées', none: 'Aucune erreur.', timeLeft: 'Temps restant', timeUp: 'Temps écoulé : l’examen est noté tel quel.',
    note: 'Questions d’entraînement rédigées par Radif Partners à partir des faits du guide officiel. Ce n’est pas l’examen officiel.',
  },
} as const;

interface Props {
  lang?: Lang; country: Country; mode?: 'exam' | 'practice'; chapter?: string | null; timed?: boolean;
  initial: Question[]; seed: number; countrySelect?: boolean; idPrefix?: string; pages?: Partial<Record<Country, string>>;
}
const minutesOf = (c: Country) => (c === 'uk' ? P.uk.test.minutes : c === 'au' ? P.au.test.minutes : P.ca.test.minutes);

export default function CitizenQuiz({ lang = 'en', country: c0, mode = 'exam', chapter: ch0 = null, timed = false, initial, seed: s0, countrySelect = false, idPrefix = 'q', pages = {} }: Props) {
  const L = T[lang];
  const [country, setCountry] = useState<Country>(c0);
  const [chapter, setChapter] = useState<string | null>(ch0);
  const [qs, setQs] = useState<Question[]>(initial);
  const [answers, setAnswers] = useState<Array<number | null>>(() => initial.map(() => null));
  const [cur, setCur] = useState(0);
  const [instant, setInstant] = useState(mode === 'practice');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const started = useRef<number | null>(null);
  const seedRef = useRef(s0);

  const draw = async (c: Country, chap: string | null, seed: number) => {
    setLoading(true);
    const bank = await loadBank(bankKey(c, lang));
    const next = mode === 'practice' ? buildPractice(bank, chap, seed, 10) : buildExam(bank, c, seed).questions;
    seedRef.current = seed;
    setQs(next); setAnswers(next.map(() => null)); setCur(0); setDone(false); setLoading(false); started.current = null; setLeft(null);
  };
  useEffect(() => { // shared link (?seed=…&country=…): applied after the first render only
    const u = readParams(window.location.search);
    const s = Number(u.get('seed')); const c = u.get('country') as Country | null;
    const cc = countrySelect && c && ['uk', 'au', 'ca'].includes(c) ? c : c0;
    if ((s && s !== s0) || cc !== c0) { if (cc !== c0) setCountry(cc); draw(cc, ch0, s || s0); }
  }, []);
  useEffect(() => { // timer of the mock test: starts on the first answer
    if (!timed || done) return;
    const id = window.setInterval(() => {
      if (started.current == null) return;
      const rem = minutesOf(country) * 60 - Math.floor((Date.now() - started.current) / 1000);
      setLeft(Math.max(0, rem)); if (rem <= 0) setDone(true);
    }, 1000);
    return () => window.clearInterval(id);
  }, [timed, done, country]);

  const n = qs.length;
  const isExam = mode === 'exam';
  const need = isExam ? passNeeded(country) : Math.ceil(n * 0.75);
  const answeredN = answers.filter((a) => a !== null).length;
  const right = qs.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);
  const wrongN = answeredN - right;
  const vIdx = country === 'au' && isExam ? qs.map((q, i) => (q.values ? i : -1)).filter((i) => i >= 0) : [];
  const vRight = vIdx.filter((i) => answers[i] === qs[i].answer).length;
  const vWrong = vIdx.filter((i) => answers[i] !== null && answers[i] !== qs[i].answer).length;
  const canMiss = n - need - wrongN;
  const showAll = instant || done;
  const status: keyof typeof L.status = !answeredN ? 'start'
    : (showAll && vWrong > 0) ? 'values'
    : (done || answeredN === n) ? (right >= need && vWrong === 0 ? 'pass' : 'fail')
    : !showAll ? 'start' : canMiss < 0 ? 'fail' : canMiss === 0 ? 'risk' : 'on';
  const q = qs[cur];
  const a = answers[cur];
  const choose = (i: number) => {
    if (done || (showAll && a !== null)) return;
    if (started.current == null) started.current = Date.now();
    setAnswers((o) => o.map((x, j) => (j === cur ? i : x)));
  };
  const newTest = () => { const s = Math.floor(Math.random() * 2 ** 31); updateURL({ seed: s, country: countrySelect && country !== c0 ? country : undefined }); draw(country, chapter, s); };
  const chapters = CHAPTERS[bankKey(country, lang)];
  const byChapter = chapters.map((name) => {
    const idx = qs.map((x, i) => (x.chapter === name ? i : -1)).filter((i) => i >= 0);
    return { name, n: idx.length, r: idx.filter((i) => answers[i] === qs[i].answer).length };
  }).filter((x) => x.n);
  const mm = left == null ? minutesOf(country) * 60 : left;
  const clock = `${Math.floor(mm / 60)}:${String(mm % 60).padStart(2, '0')}`;
  const good = status === 'pass' || status === 'on';
  const tone = status === 'start' ? 'text-navy-700' : good ? 'text-green-800' : 'text-red-700';

  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {(countrySelect || mode === 'practice') && (
          <div className="grid gap-3 sm:grid-cols-2">
            {countrySelect && <SelectField id={`${idPrefix}-country`} label={L.country} value={country} onChange={(v) => { const c = v as Country; setCountry(c); setChapter(null); updateURL({ country: c === c0 ? undefined : c }); draw(c, null, seedRef.current); }} options={(['uk', 'au', 'ca'] as Country[]).map((k) => ({ value: k, label: L.countries[k] }))} />}
            {mode === 'practice' && <SelectField id={`${idPrefix}-chapter`} label={L.chapter} value={chapter ?? ''} onChange={(v) => { const chp = v || null; setChapter(chp); draw(country, chp, seedRef.current); }} options={[{ value: '', label: L.allChapters }, ...chapters.map((x) => ({ value: x, label: x }))]} />}
          </div>
        )}
        <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-navy-700">
            <span>{L.q(cur + 1, n)}</span>
            {isExam && (
              <span className="inline-grid grid-flow-col auto-cols-fr overflow-hidden rounded-lg border border-navy-300 text-xs" role="group" aria-label={L.feedback}>
                <button type="button" aria-pressed={instant} onClick={() => setInstant(true)} className={`h-full px-2.5 py-1.5 ${instant ? 'bg-accent-700 text-white' : 'bg-white text-navy-800'}`}>{L.asYouGo}</button>
                <button type="button" aria-pressed={!instant} onClick={() => setInstant(false)} className={`h-full px-2.5 py-1.5 ${!instant ? 'bg-accent-700 text-white' : 'bg-white text-navy-800'}`}>{L.atEnd}</button>
              </span>
            )}
          </div>
          {loading && <p className="mt-3 text-navy-700">{L.loading}</p>}
          {q && !loading && (
            <fieldset className="mt-3">
              <legend className="text-lg font-semibold leading-snug text-navy-900">{q.q}</legend>
              <div className="mt-4 grid gap-2">
                {q.options.map((o, i) => {
                  const picked = a === i, isRight = i === q.answer, shown = showAll && a !== null;
                  const cls = !shown ? (picked ? 'border-accent-700 bg-accent-50 text-navy-900' : 'border-navy-300 bg-white hover:border-accent-500 hover:bg-accent-50') : isRight ? 'border-green-700 bg-green-50 text-green-900' : picked ? 'border-red-700 bg-red-50 text-red-900' : 'border-navy-200 bg-white text-navy-600';
                  return <button key={i} type="button" onClick={() => choose(i)} aria-pressed={picked} className={`min-h-12 rounded-lg border px-4 py-2.5 text-left text-base ${cls}`}>{o}</button>;
                })}
              </div>
              {a !== null && (
                <div className="mt-4 border-l-4 border-accent-700 bg-accent-50 px-4 py-3 text-sm text-navy-800" aria-live="polite">
                  {showAll ? <p><strong>{a === q.answer ? L.right : L.wrong}</strong>{a !== q.answer && <> {L.answer} {q.options[q.answer]}.</>} {q.explain}</p> : <p>{L.hidden}</p>}
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                {cur > 0 && <button type="button" onClick={() => setCur(cur - 1)} className="h-12 rounded-lg border border-navy-300 px-5 font-medium text-navy-800 hover:bg-navy-50">{L.prev}</button>}
                {cur < n - 1 && <button type="button" onClick={() => setCur(cur + 1)} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">{L.next}</button>}
                {!done && answeredN > 0 && (cur === n - 1 || answeredN === n) && <button type="button" onClick={() => setDone(true)} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">{L.finish}</button>}
                <button type="button" onClick={newTest} className="h-12 rounded-lg border border-navy-300 px-5 font-medium text-navy-800 hover:bg-navy-50">{L.again}</button>
              </div>
            </fieldset>
          )}
        </div>
        {done && (
          <div className="rounded-xl border border-navy-200 bg-white p-4 text-sm">
            {left === 0 && <p className="mb-2 font-medium text-red-700">{L.timeUp}</p>}
            <p className="font-semibold text-navy-900">{L.review}</p>
            {qs.every((x, i) => answers[i] === x.answer) ? <p className="mt-2 text-navy-700">{L.none}</p> : (
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-navy-800">{qs.map((x, i) => (answers[i] !== x.answer ? <li key={x.id}><span className="font-medium">{x.q}</span> {L.answer} {x.options[x.answer]}. <span className="text-navy-700">{x.explain}</span></li> : null))}</ol>
            )}
          </div>
        )}
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.score} · {L.countries[country]}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{showAll ? right : answeredN}<span className="text-xl font-semibold text-navy-700"> / {showAll ? answeredN : n}</span></p>
        <p className="text-sm text-navy-700">{answeredN} / {n} {L.answered}</p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded bg-navy-200" aria-hidden="true"><div className="h-2 bg-accent-700" style={{ width: `${(answeredN / Math.max(1, n)) * 100}%` }} /></div>
        <p className={`mt-3 text-base font-semibold ${tone}`}>{L.status[status]}</p>
        <table className="mt-2 w-full text-sm"><tbody className="divide-y divide-navy-200">
          <tr><td className="py-1.5 text-navy-700">{isExam ? L.pass(need, n) : L.practice(n)}</td></tr>
          {showAll && <tr><td className="py-1.5 text-navy-700">{L.canMiss(canMiss)}</td></tr>}
          {vIdx.length > 0 && showAll && <tr><td className="py-1.5 text-navy-700">{L.values(vRight, vIdx.length)}</td></tr>}
          {timed && <tr><td className="tabular-nums py-1.5 text-navy-700">{L.timeLeft}{lang === 'fr' ? '\u00a0: ' : ': '}{clock}</td></tr>}
        </tbody></table>
        {done && byChapter.length > 1 && (
          <div className="mt-3"><p className="text-sm font-semibold text-navy-900">{L.byChapter}</p>
            <ul className="mt-1 space-y-1 text-xs text-navy-700">{byChapter.map((b) => <li key={b.name} className="flex justify-between gap-2"><span>{b.name}</span><span className="tabular-nums">{b.r}/{b.n}</span></li>)}</ul></div>
        )}
        {countrySelect && pages[country] && <a href={pages[country]} className="mt-3 inline-block text-sm font-medium text-accent-700 underline">{L.countries[country]} →</a>}
        <p className="mt-3 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
