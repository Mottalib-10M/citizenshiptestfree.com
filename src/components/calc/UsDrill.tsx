/**
 * Topic drill (Bill of Rights, amendments, branches, state capitals, presidents): sets of 10
 * multiple-choice questions from `data/us-drills.ts`, with the reason shown after each answer.
 * First render = the set drawn at build time (`initial`, RECETTE §17.5); “New set” draws another one
 * in the browser. Nothing is stored or sent.
 */
import { useState } from 'react';
import type { DrillItem } from '../../data/us-drills';

interface Props { items: DrillItem[]; initial: number[]; size: number; title: string; note: string; idPrefix?: string }

function draw(n: number, k: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a.slice(0, k);
}

export default function UsDrill({ items, initial, size, title, note, idPrefix = 'd' }: Props) {
  const [set, setSet] = useState<number[]>(initial);
  const [ans, setAns] = useState<Array<number | null>>(() => initial.map(() => null));
  const [cur, setCur] = useState(0);
  const n = set.length;
  const q = items[set[cur]];
  const a = ans[cur];
  const answered = ans.filter((x) => x !== null).length;
  const right = set.filter((ix, i) => ans[i] === items[ix].a).length;
  const done = answered === n;
  const choose = (i: number) => { if (a === null) setAns((o) => o.map((x, j) => (j === cur ? i : x))); };
  const fresh = () => { const s = draw(items.length, size); setSet(s); setAns(s.map(() => null)); setCur(0); };
  const status = !answered ? 'Pick an answer to start' : done ? (right === n ? 'Set finished without a mistake' : `Set finished: ${n - right} to review below`) : 'Keep going';
  const tone = done ? (right === n ? 'text-green-800' : 'text-amber-800') : 'text-navy-700';
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
          <p className="text-sm text-navy-700">{title} · question {cur + 1} of {n}{q.uscis ? ` · USCIS n° ${q.uscis}` : ''}</p>
          <fieldset className="mt-3">
            <legend className="text-lg font-semibold leading-snug text-navy-900">{q.q}</legend>
            <div className="mt-4 grid gap-2">
              {q.o.map((o, i) => {
                const picked = a === i, isRight = i === q.a, shown = a !== null;
                const cls = !shown ? 'border-navy-300 bg-white hover:border-accent-500 hover:bg-accent-50' : isRight ? 'border-green-700 bg-green-50 text-green-900' : picked ? 'border-red-700 bg-red-50 text-red-900' : 'border-navy-200 bg-white text-navy-600';
                return <button key={i} id={`${idPrefix}-o${i}`} type="button" onClick={() => choose(i)} aria-pressed={picked} className={`min-h-12 rounded-lg border px-4 py-2.5 text-left text-base ${cls}`}>{o}</button>;
              })}
            </div>
            {a !== null && (
              <div className="mt-4 border-l-4 border-accent-700 bg-accent-50 px-4 py-3 text-sm text-navy-800">
                <p><strong>{a === q.a ? 'Correct.' : `Not quite: ${q.o[q.a]}.`}</strong> {q.why}</p>
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-3">
              {cur > 0 && <button type="button" onClick={() => setCur(cur - 1)} className="h-12 rounded-lg border border-navy-300 px-5 font-medium text-navy-800 hover:bg-navy-50">Previous</button>}
              {cur < n - 1 && <button type="button" onClick={() => setCur(cur + 1)} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">Next question</button>}
              <button type="button" onClick={fresh} className="h-12 rounded-lg border border-navy-300 px-5 font-medium text-navy-800 hover:bg-navy-50">New set of {size}</button>
            </div>
          </fieldset>
        </div>
        {done && (
          <div className="rounded-xl border border-navy-200 bg-white p-4 text-sm">
            <p className="font-semibold text-navy-900">Questions you missed</p>
            {right === n ? <p className="mt-2 text-navy-700">No mistakes.</p> : (
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-navy-800">{set.map((ix, i) => (ans[i] !== items[ix].a ? <li key={ix}><span className="font-medium">{items[ix].q}</span> {items[ix].o[items[ix].a]}.</li> : null))}</ol>
            )}
          </div>
        )}
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">Your score</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{right}<span className="text-xl font-semibold text-navy-700"> / {n}</span></p>
        <p className="text-sm text-navy-700">{answered} answered · {answered - right} wrong</p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded bg-navy-200" aria-hidden="true"><div className="h-2 bg-accent-700" style={{ width: `${(right / n) * 100}%` }} /></div>
        <p className={`mt-3 text-base font-semibold ${tone}`}>{status}</p>
        <p className="mt-2 text-sm text-navy-700">{items.length} questions in this quiz; each set draws {size}.</p>
        <p className="mt-3 text-xs text-navy-700">{note}</p>
      </div>
    </div>
  );
}
