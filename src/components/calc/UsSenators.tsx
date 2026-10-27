/**
 * “Who is my senator?”: pick a state, see its two U.S. senators (Congress.gov member data, date in
 * `read`) and its capital, as the civics test asks (2025 questions 23, 29 and 62). The representative
 * depends on the congressional district of the street address: the tool links to the House’s own
 * ZIP code lookup rather than guessing. First render = the build default (RECETTE §17.5).
 */
import { useState } from 'react';
import SelectField from '../ui/SelectField';
import type { UsState } from '../../data/us-states';

const PARTY: Record<string, string> = { D: 'Democrat', R: 'Republican', I: 'Independent' };
interface Props { states: UsState[]; read: string; houseUrl: string; def?: string; idPrefix?: string }
export default function UsSenators({ states, read, houseUrl, def = 'CA', idPrefix = 'sen' }: Props) {
  const [code, setCode] = useState(def);
  const s = states.find((x) => x.code === code) ?? states[0];
  const [a, b] = s.senators;
  const say = `My senators are ${a.name} and ${b.name}.`;
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${idPrefix}-state`} label="Your state" value={code} onChange={setCode} options={states.map((x) => ({ value: x.code, label: x.name }))} help="Residents of Washington, D.C. and of the territories have no U.S. senators: USCIS accepts that answer." />
        <div className="rounded-xl border border-navy-200 bg-white p-4 text-sm text-navy-800">
          <p className="font-semibold text-navy-900">Your U.S. representative</p>
          <p className="mt-1">It depends on your congressional district, so on your street address, not only your state. Type your ZIP code on the House of Representatives’ lookup, then learn the name for USCIS question 29.</p>
          <a href={houseUrl} target="_blank" rel="nofollow noopener noreferrer" className="mt-3 inline-flex h-12 items-center rounded-lg border border-navy-300 px-4 font-medium text-navy-800 hover:bg-navy-50">Find my representative on house.gov →</a>
        </div>
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">U.S. senators for {s.name}</p>
        <ul className="mt-2 space-y-2">
          {[a, b].map((x) => <li key={x.name}><p className="text-xl font-bold text-navy-900">{x.name}</p><p className="text-sm text-navy-700">{PARTY[x.party]} · in the Senate since {x.since}</p></li>)}
        </ul>
        <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
          <tr><td className="py-1.5 pr-2 text-navy-700">State capital (question 62)</td><td className="py-1.5 text-right font-medium text-navy-900">{s.capital}</td></tr>
          <tr><td className="py-1.5 pr-2 text-navy-700">Say it at the interview</td><td className="py-1.5 text-right font-medium text-navy-900">{say}</td></tr>
        </tbody></table>
        <p className="mt-3 text-xs text-navy-700">Senators in office according to Congress.gov member data, read on {read}. One name is enough for question 23. A seat can change after a resignation or an appointment: check the Senate’s list before your interview.</p>
      </div>
    </div>
  );
}
