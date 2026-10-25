/**
 * "When can I file Form N-400?": the first day on which the 90-day early filing date, physical
 * presence (913 days in 5 years, 548 in 3), continuous residence (no trip of 1 year or more, warning
 * for a trip of more than 6 months), the 3 years of marital union (3-year route) and age 18 all hold,
 * counted day by day with every past and planned trip. Rules: params-2026.json (USCIS, Policy Manual).
 * First render = build day and example dates (RECETTE §17.5); today and a shared link after mount.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { usEarliest, type UsEarliest, type UsInput } from '../../lib/engine/us';
import { dayNum, type Trip } from '../../lib/engine/dates';
import { dateL, formatNumberL } from '../../lib/format-l';
import { readParams, updateURL } from '../../lib/url-state';

declare const __BUILD_DAY__: string;
type Lang = 'en' | 'es';
const iso = (s: string | null | undefined) => !!s && /^\d{4}-\d{2}-\d{2}$/.test(s);
const T = {
  en: {
    route: 'Your route', r5: '5 years as a permanent resident', r3: '3 years, married to a U.S. citizen', lpr: '“Resident since” date on your green card', union: 'Marriage date (or the day your spouse became a citizen, if later)', birth: 'Date of birth (optional)',
    trips: 'Trips outside the United States (past and planned)', left: 'Left on', back: 'Back on', add: 'Add a trip', remove: 'Remove',
    head: 'Earliest date to file Form N-400', none: 'Not within 20 years with these trips', now: 'You can file today', inDays: (d: number) => `in ${formatNumberL(d, 'en')} days`,
    anniv: (d: string, e: string) => `Green card anniversary: ${d} · 90-day early filing from ${e}`, checks: 'On that date', today: 'If you filed today',
    k: { early: 'Within the 90-day early filing window', presence: 'Days physically present', break: 'No trip of 1 year or more (or waited after it)', presumption: 'No trip of more than 6 months', union: '3 years of marital union with a citizen', age: 'Aged 18 or over' } as Record<string, string>,
    ok: 'met', ko: 'not met', warn: 'check', need: 'needed', near: 'Within 5 days of the limit: check your dates against your passport stamps or travel history before you file.',
    presumption: 'A trip of more than 6 months but less than 1 year: USCIS presumes continuous residence was broken, unless you show you kept your job, home and ties in the United States. The date above ignores it; read the eligibility page.',
    err: { order: 'A trip comes back before it leaves.', overlap: 'Two trips overlap.' }, rule: 'Counting rule (USCIS Policy Manual): the day you leave and the day you come back count as days in the United States.',
  },
  es: {
    route: 'Su vía', r5: '5 años como residente permanente', r3: '3 años, casado con un ciudadano estadounidense', lpr: 'Fecha «Resident since» de su tarjeta verde', union: 'Fecha de matrimonio (o el día en que su cónyuge se hizo ciudadano, si es posterior)', birth: 'Fecha de nacimiento (opcional)',
    trips: 'Viajes fuera de Estados Unidos (pasados y previstos)', left: 'Salida', back: 'Regreso', add: 'Añadir un viaje', remove: 'Quitar',
    head: 'Primera fecha para presentar el Formulario N-400', none: 'No en los próximos 20 años con estos viajes', now: 'Puede presentarlo hoy', inDays: (d: number) => `dentro de ${formatNumberL(d, 'es')} días`,
    anniv: (d: string, e: string) => `Aniversario de la tarjeta verde: ${d} · presentación anticipada de 90 días desde el ${e}`, checks: 'En esa fecha', today: 'Si lo presentara hoy',
    k: { early: 'Dentro de la ventana de 90 días', presence: 'Días de presencia física', break: 'Ningún viaje de 1 año o más (o espera cumplida)', presumption: 'Ningún viaje de más de 6 meses', union: '3 años de unión conyugal con un ciudadano', age: '18 años o más' } as Record<string, string>,
    ok: 'cumple', ko: 'no cumple', warn: 'revisar', need: 'requeridos', near: 'A menos de 5 días del límite: compare sus fechas con los sellos del pasaporte o su historial de viajes antes de presentar.',
    presumption: 'Un viaje de más de 6 meses y menos de 1 año: USCIS presume que se interrumpió la residencia continua, salvo que demuestre que mantuvo su empleo, su vivienda y sus vínculos en Estados Unidos. La fecha de arriba no lo tiene en cuenta; lea la página de elegibilidad.',
    err: { order: 'Un regreso es anterior a su salida.', overlap: 'Dos viajes se superponen.' }, rule: 'Regla de cálculo (Manual de Políticas de USCIS): el día de salida y el de regreso cuentan como días en Estados Unidos.',
  },
} as const;
const DEF = { lpr: '2021-11-15', union: '2022-06-04', trips: [{ out: '2023-07-01', back: '2023-08-20' }, { out: '2025-12-15', back: '2026-01-10' }] as Trip[] };

interface Props { lang?: Lang; route?: '5' | '3'; idPrefix?: string }
export default function UsDate({ lang = 'en', route: r0 = '5', idPrefix = 'n' }: Props) {
  const L = T[lang];
  const [today, setToday] = useState(__BUILD_DAY__);
  const [route, setRoute] = useState<'5' | '3'>(r0);
  const [lpr, setLpr] = useState(DEF.lpr);
  const [union, setUnion] = useState(DEF.union);
  const [birth, setBirth] = useState('');
  const [trips, setTrips] = useState<Trip[]>(DEF.trips);
  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
    const u = readParams(window.location.search);
    const r = u.get('r'), a = u.get('a'), m = u.get('m'), b = u.get('b'), t = u.get('t');
    if (r === '5' || r === '3') setRoute(r); if (iso(a)) setLpr(a!); if (iso(m)) setUnion(m!); if (iso(b)) setBirth(b!);
    if (t) { const tt = t.split(',').map((x) => x.split('_')).filter(([o, k]) => iso(o) && iso(k)).map(([o, k]) => ({ out: o, back: k })); if (tt.length) setTrips(tt); }
  }, []);
  useEffect(() => { updateURL({ r: route, a: lpr, m: route === '3' ? union : undefined, b: birth || undefined, t: trips.filter((t) => iso(t.out) && iso(t.back)).map((t) => `${t.out}_${t.back}`).join(',') }); }, [route, lpr, union, birth, trips]);
  const valid = trips.filter((t) => iso(t.out) && iso(t.back));
  const err = (() => {
    const s = [...valid].sort((x, y) => (x.out < y.out ? -1 : 1));
    for (let i = 0; i < s.length; i++) { if (s[i].back! < s[i].out) return L.err.order; if (i && s[i - 1].back! > s[i].out) return L.err.overlap; }
    return null;
  })();
  const res: UsEarliest | null = useMemo(() => {
    if (err || !iso(lpr)) return null;
    const x: UsInput = { route, lpr, union: route === '3' && iso(union) ? union : null, birth: iso(birth) ? birth : null, trips: valid };
    return usEarliest(x, today);
  }, [route, lpr, union, birth, trips, today, err]);
  const fmt = (v: unknown) => (typeof v === 'number' ? formatNumberL(v, lang) : '');
  const inputCls = 'h-12 w-full min-w-0 rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20';
  const field = (id: string, label: string, val: string, set: (v: string) => void) => (
    <div className="grid min-w-0 grid-rows-subgrid row-span-3 content-start gap-y-0"><label htmlFor={`${idPrefix}-${id}`} className="mb-1 block text-sm font-medium text-navy-700">{label}</label><input id={`${idPrefix}-${id}`} type="date" value={val} onChange={(e) => set(e.target.value)} className={inputCls} /><span /></div>
  );
  const date = res?.date ?? null;
  const days = date ? dayNum(date) - dayNum(today) : null;
  const v = res?.verdictAtDate ?? res?.verdictToday ?? null;
  const presumption = v?.checks.some((c) => c.id === 'presumption' && !c.ok);
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
          <SelectField id={`${idPrefix}-route`} label={L.route} value={route} onChange={(x) => setRoute(x as '5' | '3')} options={[{ value: '5', label: L.r5 }, { value: '3', label: L.r3 }]} />
          {field('a', L.lpr, lpr, setLpr)}
          {route === '3' && field('m', L.union, union, setUnion)}
          {field('b', L.birth, birth, setBirth)}
        </div>
        <fieldset className="rounded-xl border border-navy-200 bg-white p-4">
          <legend className="px-1 text-sm font-semibold text-navy-900">{L.trips}</legend>
          <div className="space-y-3">
            {trips.map((t, i) => (
              <div key={i} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-end gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                {field(`o${i}`, L.left, t.out, (x) => setTrips((o) => o.map((y, j) => (j === i ? { ...y, out: x } : y))))}
                {field(`r${i}`, L.back, t.back ?? '', (x) => setTrips((o) => o.map((y, j) => (j === i ? { ...y, back: x } : y))))}
                <button type="button" onClick={() => setTrips((o) => o.filter((_, j) => j !== i))} className="col-span-2 h-12 rounded-lg border border-navy-300 px-3 text-sm text-navy-800 hover:bg-navy-50 sm:col-span-1" aria-label={`${L.remove} ${i + 1}`}>×</button>
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
        {res && <p className="mt-1 text-xs text-navy-700">{L.anniv(dateL(res.anniversary, lang), dateL(res.earliestByLaw, lang))}</p>}
        {v && (
          <>
            <p className="mt-3 text-sm font-semibold text-navy-900">{res?.verdictAtDate ? L.checks : L.today}</p>
            <table className="mt-1 w-full text-sm"><tbody className="divide-y divide-navy-200">
              {v.checks.map((c) => (
                <tr key={c.id}><td className="py-1.5 pr-2 text-navy-700">{L.k[c.id] ?? c.id}{c.id === 'presence' ? ` (${fmt(c.value)} / ${L.need} ${fmt(c.limit)})` : ''}</td><td className={`py-1.5 text-right font-medium ${c.ok ? 'text-green-800' : c.warn ? 'text-amber-800' : 'text-red-700'}`}>{c.ok ? L.ok : c.warn ? L.warn : L.ko}</td></tr>
              ))}
            </tbody></table>
            {v.checks.some((c) => c.near) && <p className="mt-2 text-xs text-amber-800">{L.near}</p>}
            {presumption && <p className="mt-2 text-xs text-amber-800">{L.presumption}</p>}
          </>
        )}
      </div>
    </div>
  );
}
