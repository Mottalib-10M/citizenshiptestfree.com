/**
 * N-400 early filing calculator: the first day USCIS accepts the application under the 90-day early
 * filing rule (green card anniversary minus 90 days), combined with the 3 months of residence in the
 * state and, on the 3-year route, 3 years of marriage to a citizen (no early filing for that one).
 * Physical presence and long trips are not checked here: the full calculator on the N-400 page does it.
 * Rules: params-2026.json (`us.n400`). First render = build day and example dates (RECETTE §17.5).
 */
import { useEffect, useState } from 'react';
import SelectField from '../ui/SelectField';
import P from '../../data/params-2026.json';
import { addDays, addMonths, addYears, dayNum, maxIso } from '../../lib/engine/dates';
import { dateL, formatNumberL } from '../../lib/format-l';

declare const __BUILD_DAY__: string;
const N = P.us.n400;
const iso = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);
const d = (x: string) => dateL(x, 'en');

interface Props { idPrefix?: string }
export default function UsEarly({ idPrefix = 'ef' }: Props) {
  const [today, setToday] = useState(__BUILD_DAY__);
  const [route, setRoute] = useState<'5' | '3'>('5');
  const [lpr, setLpr] = useState('2021-12-01');
  const [moved, setMoved] = useState('2024-03-15');
  const [union, setUnion] = useState('2023-05-20');
  useEffect(() => { setToday(new Date().toISOString().slice(0, 10)); }, []);
  const R = N.routes[route];
  const ok = iso(lpr) && iso(moved) && (route === '5' || iso(union));
  const anniversary = ok ? addYears(lpr, R.years) : '';
  const early = ok ? addDays(anniversary, -N.earlyFilingDays) : '';
  const state = ok ? addMonths(moved, N.stateMonths) : '';
  const marriage = ok && route === '3' ? addYears(union, R.years) : '';
  const first = ok ? maxIso(early, state, ...(marriage ? [marriage] : [])) : '';
  const wait = ok ? dayNum(first) - dayNum(today) : 0;
  const limit = !ok ? '' : first === early ? 'the 90-day early filing window' : first === state ? `${N.stateMonths} months of residence in your state` : `${R.years} years of marriage to a citizen`;
  const inputCls = 'h-12 w-full min-w-0 rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20';
  const field = (id: string, label: string, val: string, set: (v: string) => void, help?: string) => (
    <div className="grid min-w-0 grid-rows-subgrid row-span-3 content-start gap-y-0"><label htmlFor={`${idPrefix}-${id}`} className="mb-1 block text-sm font-medium text-navy-700">{label}</label><input id={`${idPrefix}-${id}`} type="date" value={val} onChange={(e) => set(e.target.value)} className={inputCls} />{help ? <p className="mt-1 text-xs text-navy-500">{help}</p> : <span />}</div>
  );
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form className="grid content-start gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${idPrefix}-route`} label="Your route" value={route} onChange={(x) => setRoute(x as '5' | '3')} options={[{ value: '5', label: '5 years as a permanent resident' }, { value: '3', label: '3 years, married to a U.S. citizen' }]} />
        {field('lpr', '“Resident since” date on your green card', lpr, setLpr)}
        {field('st', 'Date you moved to your current state', moved, setMoved)}
        {route === '3' && field('m', 'Marriage date (or spouse’s naturalization, if later)', union, setUnion)}
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">First day USCIS accepts your N-400</p>
        <p className="mt-1 text-3xl font-bold text-navy-900">{ok ? (wait <= 0 ? 'Today: you can file' : d(first)) : '…'}</p>
        {ok && wait > 0 && <p className="text-sm text-navy-700">in {formatNumberL(wait, 'en')} days · set by {limit}</p>}
        {ok && (
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            <tr><td className="py-1.5 pr-2 text-navy-700">{R.years}-year anniversary</td><td className="py-1.5 text-right font-medium text-navy-900">{d(anniversary)}</td></tr>
            <tr><td className="py-1.5 pr-2 text-navy-700">{N.earlyFilingDays} days earlier</td><td className="py-1.5 text-right font-medium text-navy-900">{d(early)}</td></tr>
            <tr><td className="py-1.5 pr-2 text-navy-700">{N.stateMonths} months in your state</td><td className="py-1.5 text-right font-medium text-navy-900">{d(state)}</td></tr>
            {marriage && <tr><td className="py-1.5 pr-2 text-navy-700">{R.years} years of marriage</td><td className="py-1.5 text-right font-medium text-navy-900">{d(marriage)}</td></tr>}
          </tbody></table>
        )}
        <p className="mt-3 text-xs text-navy-700">USCIS rejects an N-400 filed even one day too early. Trips abroad can push the date back: check physical presence ({formatNumberL(R.presenceDays, 'en')} days) with the full calculator before filing.</p>
      </div>
    </div>
  );
}
