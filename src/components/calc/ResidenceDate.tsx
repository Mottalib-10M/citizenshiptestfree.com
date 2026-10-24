/**
 * "When can I apply?": the earliest date to apply for citizenship in the UK (naturalisation,
 * 6(1) or 6(2)), Canada (1,095 days of physical presence) or Australia (general residence
 * requirement), counting every past and planned trip day by day with the official rule.
 * First render = build day and example dates (RECETTE §17.5); today and a shared link after mount.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { auEarliest, caCount, caEarliest, ukEarliest, ukWithinDiscretion, type Earliest } from '../../lib/engine/eligibility';
import { dayNum, type Trip } from '../../lib/engine/dates';
import { dateL, formatNumberL } from '../../lib/format-l';
import { readParams, updateURL } from '../../lib/url-state';
import P from '../../data/params-2026.json';

declare const __BUILD_DAY__: string;
type Lang = 'en' | 'fr';
type C = 'uk' | 'au' | 'ca';
const iso = (s: string | null) => !!s && /^\d{4}-\d{2}-\d{2}$/.test(s);
const T = {
  en: {
    route: 'Your route', r61: 'Settled (ILR, EU settled status) for 12 months', r62: 'Married to or civil partner of a British citizen',
    arrival: 'First day you lived in the UK', ilr: 'Date you got ILR or settled status',
    pr: 'Date you became a permanent resident', before: 'Lived in Canada before PR?', beforeNo: 'No', beforeYes: 'Yes, as a temporary resident or protected person', temp: 'First day as a temporary resident',
    lawful: 'First day you lived in Australia on a visa', aupr: 'Date your permanent visa started', nz: 'Visa', nzNo: 'Permanent visa (general case)', nzYes: 'NZ citizen on a subclass 189 (NZ stream) visa',
    trips: 'Trips abroad (past and planned)', left: 'Left on', back: 'Back on', add: 'Add a trip', remove: 'Remove',
    head: 'Earliest date you can apply', none: 'Not within 20 years with these trips', now: 'You can apply today', inDays: (d: number) => `in ${formatNumberL(d, 'en')} days`,
    checks: 'On that date', today: 'If you applied today',
    k: { presentAtStart: 'In the UK on the first day of the period', absences: 'Days abroad in the period', absences12m: 'Days abroad in the last 12 months', settled: 'Settled long enough', presence: 'Days of physical presence credited', pr: 'Permanent resident before applying', lawful4y: 'Four years of lawful residence', pr12m: 'Permanent resident for 12 months', age: 'Aged 18 or over' } as Record<string, string>,
    ok: 'met', ko: 'not met', limit: 'limit', need: 'needed', near: 'Within 5 days of a limit: check your dates against your passport stamps or travel history before you apply.',
    discretion: 'Over the limit by 30 days or less: the Home Office guidance says caseworkers normally use discretion in that case. It is not automatic.',
    err: { order: 'A trip comes back before it leaves.', overlap: 'Two trips overlap.' }, rule: 'Counting rule: the day you leave and the day you come back count as days in the country; only whole days abroad count as absences.',
    pre: (d: number, c: number) => `Days before PR: ${formatNumberL(d, 'en')}, credited half: ${formatNumberL(c, 'en', c % 1 ? 1 : 0)}`,
  },
  fr: {
    route: '', r61: '', r62: '', arrival: '', ilr: '',
    pr: 'Date d’obtention de la résidence permanente', before: 'Au Canada avant la RP ?', beforeNo: 'Non', beforeYes: 'Oui, comme résident temporaire ou personne protégée', temp: 'Premier jour comme résident temporaire',
    lawful: '', aupr: '', nz: '', nzNo: '', nzYes: '',
    trips: 'Voyages hors du Canada (passés et prévus)', left: 'Départ le', back: 'Retour le', add: 'Ajouter un voyage', remove: 'Retirer',
    head: 'Première date pour présenter la demande', none: 'Pas dans les 20 prochaines années avec ces voyages', now: 'Vous pouvez présenter la demande aujourd’hui', inDays: (d: number) => `dans ${formatNumberL(d, 'fr')} jours`,
    checks: 'À cette date', today: 'Si vous déposiez aujourd’hui',
    k: { presence: 'Jours de présence effective crédités', pr: 'Résident permanent avant la demande', age: '18 ans ou plus' } as Record<string, string>,
    ok: 'rempli', ko: 'non rempli', limit: 'plafond', need: 'requis', near: 'À moins de 5 jours du seuil : vérifiez vos dates (tampons, historique des entrées) avant de présenter la demande.',
    discretion: '',
    err: { order: 'Un retour précède son départ.', overlap: 'Deux voyages se chevauchent.' }, rule: 'Règle de calcul : le jour du départ et celui du retour comptent comme jours au Canada ; seule une journée entière à l’étranger est une absence.',
    pre: (d: number, c: number) => `Jours avant la RP : ${formatNumberL(d, 'fr')}, crédités à moitié : ${formatNumberL(c, 'fr', c % 1 ? 1 : 0)}`,
  },
} as const;
const DEF: Record<C, { a: string; b: string; trips: Trip[] }> = {
  uk: { a: '2021-09-01', b: '2026-03-02', trips: [{ out: '2024-07-10', back: '2024-07-31' }, { out: '2025-12-18', back: '2026-01-05' }] },
  ca: { a: '2023-05-15', b: '2021-09-01', trips: [{ out: '2024-12-20', back: '2025-01-10' }, { out: '2026-07-01', back: '2026-07-21' }] },
  au: { a: '2022-02-01', b: '2025-06-01', trips: [{ out: '2023-12-15', back: '2024-01-20' }, { out: '2026-12-10', back: '2026-12-30' }] },
};
interface Props { lang?: Lang; country: C; idPrefix?: string }

export default function ResidenceDate({ lang = 'en', country, idPrefix = 'd' }: Props) {
  const L = T[lang];
  const D = DEF[country];
  const [today, setToday] = useState(__BUILD_DAY__);
  const [a, setA] = useState(D.a);
  const [b, setB] = useState(D.b);
  const [opt, setOpt] = useState(country === 'ca' ? 'yes' : 'no');
  const [trips, setTrips] = useState<Trip[]>(D.trips);
  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
    const u = readParams(window.location.search);
    const ua = u.get('a'), ub = u.get('b'), uo = u.get('o'), ut = u.get('t');
    if (iso(ua)) setA(ua!); if (iso(ub)) setB(ub!); if (uo === 'yes' || uo === 'no') setOpt(uo);
    if (ut) { const tt = ut.split(',').map((x) => x.split('_')).filter(([o, k]) => iso(o) && iso(k)).map(([o, k]) => ({ out: o, back: k })); if (tt.length) setTrips(tt); }
  }, []);
  useEffect(() => { updateURL({ a, b, o: opt, t: trips.filter((t) => iso(t.out) && iso(t.back)).map((t) => `${t.out}_${t.back}`).join(',') }); }, [a, b, opt, trips]);
  const valid = trips.filter((t) => iso(t.out) && iso(t.back));
  const err = (() => {
    const s = [...valid].sort((x, y) => (x.out < y.out ? -1 : 1));
    for (let i = 0; i < s.length; i++) { if (s[i].back! < s[i].out) return L.err.order; if (i && s[i - 1].back! > s[i].out) return L.err.overlap; }
    return null;
  })();
  const res: Earliest | null = useMemo(() => {
    if (err || !iso(a) || (!iso(b) && country !== 'ca')) return null;
    if (country === 'uk') return ukEarliest({ route: opt === 'yes' ? '6(2)' : '6(1)', firstEntry: a, ilr: iso(b) ? b : null, trips: valid }, today);
    if (country === 'ca') return caEarliest({ pr: a, tempStart: opt === 'yes' && iso(b) ? b : null, trips: valid }, today);
    return auEarliest({ lawfulStart: a, pr: b, nz189: opt === 'yes', trips: valid }, today);
  }, [a, b, opt, trips, today, err, country]);
  const fmt = (v: unknown) => (typeof v === 'number' ? formatNumberL(v, lang, v % 1 ? 1 : 0) : typeof v === 'string' && iso(v) ? dateL(v, lang) : '');
  const inputCls = 'h-12 w-full rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20';
  const field = (id: string, label: string, val: string, set: (v: string) => void) => (
    <div className="grid min-w-0 grid-rows-subgrid row-span-3 content-start gap-y-0"><label htmlFor={`${idPrefix}-${id}`} className="mb-1 block text-sm font-medium text-navy-700">{label}</label><input id={`${idPrefix}-${id}`} type="date" value={val} onChange={(e) => set(e.target.value)} className={`${inputCls} min-w-0`} /><span /></div>
  );
  const labels = country === 'uk' ? { a: L.arrival, b: L.ilr } : country === 'ca' ? { a: L.pr, b: L.temp } : { a: L.lawful, b: L.aupr };
  const date = res?.date ?? null;
  const days = date ? dayNum(date) - dayNum(today) : null;
  const v = res?.verdictAtDate ?? res?.verdictToday ?? null;
  const cc = country === 'ca' && iso(a) ? caCount({ pr: a, tempStart: opt === 'yes' && iso(b) ? b : null, trips: valid }, date ?? today) : null;
  const disc = country === 'uk' && res && !res.verdictToday.ok && ukWithinDiscretion(res.verdictToday);
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
          {country === 'uk' && <SelectField id={`${idPrefix}-route`} label={L.route} value={opt} onChange={setOpt} options={[{ value: 'no', label: L.r61 }, { value: 'yes', label: L.r62 }]} />}
          {country === 'au' && <SelectField id={`${idPrefix}-nz`} label={L.nz} value={opt} onChange={setOpt} options={[{ value: 'no', label: L.nzNo }, { value: 'yes', label: L.nzYes }]} />}
          {country === 'ca' && <SelectField id={`${idPrefix}-before`} label={L.before} value={opt} onChange={setOpt} options={[{ value: 'no', label: L.beforeNo }, { value: 'yes', label: L.beforeYes }]} />}
          {field('a', labels.a, a, setA)}
          {(country !== 'ca' || opt === 'yes') && field('b', labels.b, b, setB)}
        </div>
        <fieldset className="rounded-xl border border-navy-200 bg-white p-4">
          <legend className="px-1 text-sm font-semibold text-navy-900">{L.trips}</legend>
          <div className="space-y-3">
            {trips.map((t, i) => (
              <div key={i} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-end gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                {field(`o${i}`, L.left, t.out, (x) => setTrips((o) => o.map((y, j) => (j === i ? { ...y, out: x } : y))))}
                {field(`r${i}`, L.back, t.back ?? '', (x) => setTrips((o) => o.map((y, j) => (j === i ? { ...y, back: x } : y))))}
                <button type="button" onClick={() => setTrips((o) => o.filter((_, j) => j !== i))} className="col-span-2 mb-0 h-12 rounded-lg border border-navy-300 px-3 text-sm text-navy-800 hover:bg-navy-50 sm:col-span-1" aria-label={`${L.remove} ${i + 1}`}>×</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setTrips((o) => [...o, { out: today, back: today }])} className="mt-3 h-12 rounded-lg border border-navy-300 px-4 text-sm font-medium text-navy-800 hover:bg-navy-50">+ {L.add}</button>
          {err && <p role="status" className="mt-2 text-sm font-medium text-red-700">{err}</p>}
          <p className="mt-2 text-xs text-navy-700">{L.rule}</p>
        </fieldset>
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.head}</p>
        <p className="mt-1 text-3xl font-bold text-navy-900">{res ? (date ? (days !== null && days <= 0 ? L.now : dateL(date, lang)) : L.none) : '…'}</p>
        {date && days !== null && days > 0 && <p className="text-sm text-navy-700">{L.inDays(days)}</p>}
        {v && (
          <>
            <p className="mt-3 text-sm font-semibold text-navy-900">{res?.verdictAtDate ? L.checks : L.today}</p>
            <table className="mt-1 w-full text-sm"><tbody className="divide-y divide-navy-200">
              {v.checks.map((c) => (
                <tr key={c.id}><td className="py-1.5 pr-2 text-navy-700">{L.k[c.id] ?? c.id}{typeof c.value === 'number' && typeof c.limit === 'number' ? ` (${fmt(c.value)} / ${c.id === 'presence' ? L.need : L.limit} ${fmt(c.limit)})` : ''}</td><td className={`py-1.5 text-right font-medium ${c.ok ? 'text-green-800' : 'text-red-700'}`}>{c.ok ? L.ok : L.ko}</td></tr>
              ))}
            </tbody></table>
            {cc && cc.preDays > 0 && <p className="mt-2 text-xs text-navy-700">{L.pre(cc.preDays, cc.preCredit)}</p>}
            {v.checks.some((c) => c.near) && <p className="mt-2 text-xs text-amber-800">{L.near}</p>}
            {disc && L.discretion && <p className="mt-2 text-xs text-navy-700">{L.discretion}</p>}
          </>
        )}
      </div>
    </div>
  );
}
