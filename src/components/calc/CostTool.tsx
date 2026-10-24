/**
 * Official cost of a citizenship application for a household, line by line (UK: Home Office fees
 * table of 8 October 2026; Canada: IRCC fee list; Australia: form 1298i of July 2026). Costs without
 * an official scale (English test, translations) are typed by the visitor, never estimated.
 */
import { useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import { auCost, caCost, ukCost } from '../../lib/engine/cost';
import { money, langTag, type Cur } from '../../lib/format-l';

type Lang = 'en' | 'fr'; type C = 'uk' | 'au' | 'ca';
const T = {
  en: {
    adults: 'Adults applying', children: 'Children to register', ilr: 'People who still need ILR', attempts: 'Life in the UK test attempts per adult', minors: 'Children under 18', concession: 'Adults with a Pensioner Concession Card', kids: 'Children under 16 on a parent’s form', other: 'Other costs you expect (English test, translations…)',
    head: 'Official cost of the application', l: { naturalisation: 'Naturalisation fee', ceremony: 'Citizenship ceremony', lifeInUkTest: 'Life in the UK test', registrationChild: 'Child registration', ilr: 'Indefinite leave to remain', other: 'Your other costs', adultProcessing: 'Adult processing fee', rightOfCitizenship: 'Right of citizenship fee', minor: 'Minor fee', general: 'Conferral application (adult)', generalConcession: 'Conferral, concession rate', childOnParentForm: 'Child on a parent’s form' } as Record<string, string>,
    each: 'each', free: 'free', note: 'Fees are paid to the government when you apply; this site takes no fee and passes no application.',
  },
  fr: {
    adults: 'Adultes qui demandent', children: '', ilr: '', attempts: '', minors: 'Enfants de moins de 18 ans', concession: '', kids: '', other: 'Autres frais prévus (test de langue, traductions…)',
    head: 'Coût officiel de la demande', l: { adultProcessing: 'Frais de traitement (adulte)', rightOfCitizenship: 'Droit de citoyenneté', minor: 'Frais pour un mineur', other: 'Vos autres frais' } as Record<string, string>,
    each: 'chacun', free: 'gratuit', note: 'Les frais se paient au gouvernement au dépôt de la demande ; ce site ne perçoit aucun frais et ne transmet aucune demande.',
  },
} as const;
interface Props { lang?: Lang; country: C; idPrefix?: string }
export default function CostTool({ lang = 'en', country, idPrefix = 'c' }: Props) {
  const L = T[lang];
  const [v, setV] = useState({ adults: 1, children: 0, ilr: 0, attempts: 1, minors: 0, concession: 0, kids: 0, other: 0 });
  const set = (k: keyof typeof v) => (x: number) => setV((o) => ({ ...o, [k]: Math.round(x) }));
  const cost = useMemo(() => country === 'uk' ? ukCost({ adults: v.adults, children: v.children, ilrToPay: v.ilr, testAttempts: Math.max(1, v.attempts), other: v.other })
    : country === 'ca' ? caCost({ adults: v.adults, minors: v.minors, other: v.other })
    : auCost({ adults: v.adults, concession: Math.min(v.concession, v.adults), childrenUnder16: v.kids, other: v.other }), [v, country]);
  const cur = cost.currency as Cur;
  const tag = langTag(lang);
  const f = (id: keyof typeof v, label: string, max: number, unit = '') => <NumberField key={id} id={`${idPrefix}-${id}`} label={label} value={v[id]} onChange={set(id)} max={max} unit={unit} tag={tag} />;
  const fields = country === 'uk' ? [f('adults', L.adults, 10), f('attempts', L.attempts, 10), f('children', L.children, 10), f('ilr', L.ilr, 10), f('other', L.other, 100000, '£')]
    : country === 'ca' ? [f('adults', L.adults, 10), f('minors', L.minors, 10), f('other', L.other, 100000, '$')]
    : [f('adults', L.adults, 10), f('concession', L.concession, 10), f('kids', L.kids, 10), f('other', L.other, 100000, 'A$')];
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form className="grid content-start gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>{fields}</form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4">
        <p className="text-sm font-medium text-navy-700">{L.head}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{money(cost.total, cur, lang)}</p>
        <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
          {cost.lines.map((l) => <tr key={l.id}><td className="py-1.5 pr-2 text-navy-700">{L.l[l.id] ?? l.id}{l.count && l.count > 1 && l.each ? ` (${l.count} × ${money(l.each, cur, lang)})` : ''}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{l.amount === 0 ? L.free : money(l.amount, cur, lang)}</td></tr>)}
        </tbody></table>
        <p className="mt-2 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
