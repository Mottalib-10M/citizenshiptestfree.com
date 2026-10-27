/**
 * Checklist (biometrics appointment, Form N-400 part by part, oath ceremony): tick what is ready; the
 * panel counts the required items still missing. Items from `data/us-checklists.ts`, written from
 * USCIS pages. First render = nothing ticked (RECETTE §17.5). Nothing is stored or sent.
 */
import { useState } from 'react';
import type { Checklist } from '../../data/us-checklists';

interface Props { list: Checklist; idPrefix?: string }
export default function UsChecklist({ list, idPrefix = 'c' }: Props) {
  const [on, setOn] = useState<boolean[]>(() => list.items.map(() => false));
  const flip = (i: number) => setOn((o) => o.map((x, j) => (j === i ? !x : x)));
  const must = list.items.map((x, i) => [x, i] as const).filter(([x]) => x.must);
  const missing = must.filter(([, i]) => !on[i]);
  const ready = on.filter(Boolean).length;
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <form className="grid content-start gap-2" onSubmit={(e) => e.preventDefault()}>
        <p className="text-sm text-navy-700">{list.title}: tap each line once it is ready.</p>
        {list.items.map((x, i) => (
          <button key={i} id={`${idPrefix}-${i}`} type="button" aria-pressed={on[i]} onClick={() => flip(i)}
            className={`flex min-h-12 items-start gap-3 rounded-lg border px-4 py-2.5 text-left ${on[i] ? 'border-green-700 bg-green-50' : 'border-navy-300 bg-white hover:border-accent-500 hover:bg-accent-50'}`}>
            <span aria-hidden="true" className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs font-bold ${on[i] ? 'border-green-700 bg-green-700 text-white' : 'border-navy-400 bg-white text-transparent'}`}>✓</span>
            <span className="min-w-0">
              <span className="block text-base font-medium text-navy-900">{x.t}{x.must ? <span className="ml-2 align-middle text-xs font-semibold uppercase tracking-wide text-accent-800">required</span> : null}</span>
              <span className="mt-0.5 block text-sm text-navy-700">{x.d}</span>
            </span>
          </button>
        ))}
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{list.head}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{ready}<span className="text-xl font-semibold text-navy-700"> / {list.items.length}</span></p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded bg-navy-200" aria-hidden="true"><div className="h-2 bg-accent-700" style={{ width: `${(ready / list.items.length) * 100}%` }} /></div>
        <p className={`mt-3 text-base font-semibold ${missing.length ? 'text-amber-800' : 'text-green-800'}`}>{missing.length ? `${missing.length} required item${missing.length === 1 ? '' : 's'} missing` : list.done}</p>
        {missing.length > 0 && <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-navy-800">{missing.slice(0, 4).map(([x]) => <li key={x.t}>{x.t}</li>)}</ul>}
        <p className="mt-3 text-xs text-navy-700">{list.note}</p>
      </div>
    </div>
  );
}
