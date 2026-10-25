/**
 * Form N-400 fee for a household: full fee online or on paper, reduced fee (household income below
 * 400 % of the federal poverty guidelines, paper only) or fee waiver (I-912, at or below 150 %).
 * Amounts and income limits from params-2026.json (USCIS, read 2026-10-25). First render = defaults.
 */
import { useEffect, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { feeTier, fpgLimit, usFee, type FpgArea } from '../../lib/engine/us';
import { money } from '../../lib/format-l';
import { readParams, updateURL } from '../../lib/url-state';

type Lang = 'en' | 'es';
const T = {
  en: {
    adults: 'People filing an N-400', size: 'Household size', income: 'Household income per year', area: 'Where you live', areas: { contiguous: '48 states, D.C., Puerto Rico, Guam, USVI, CNMI', alaska: 'Alaska', hawaii: 'Hawaii' },
    how: 'How you file', online: 'Online', paper: 'On paper',
    head: 'N-400 fees to pay', each: 'Per application', tier: 'Fee you can ask for', tiers: { full: 'Full fee', reduced: 'Reduced fee (Part 10 of the N-400)', waiver: 'Fee waiver (Form I-912)' },
    lim150: '150% of the poverty guidelines', lim400: '400% of the poverty guidelines', paperOnly: 'Reduced fee and fee waiver: paper filing only, so the online price does not apply.',
    note: 'Biometrics are included in the N-400 fee. A fee waiver can also be granted on a means-tested benefit or financial hardship; USCIS decides on the evidence.',
  },
  es: {
    adults: 'Personas que presentan un N-400', size: 'Tamaño del hogar', income: 'Ingresos del hogar al año', area: 'Dónde vive', areas: { contiguous: '48 estados, D.C., Puerto Rico, Guam, IVEU, CNMI', alaska: 'Alaska', hawaii: 'Hawái' },
    how: 'Cómo presenta', online: 'En línea', paper: 'En papel',
    head: 'Tarifas del N-400 a pagar', each: 'Por solicitud', tier: 'Tarifa que puede pedir', tiers: { full: 'Tarifa completa', reduced: 'Tarifa reducida (Parte 10 del N-400)', waiver: 'Exención de tarifa (Formulario I-912)' },
    lim150: '150 % de las pautas de pobreza', lim400: '400 % de las pautas de pobreza', paperOnly: 'Tarifa reducida y exención: solo en papel, así que no se aplica el precio en línea.',
    note: 'Los datos biométricos están incluidos en la tarifa del N-400. La exención también puede concederse por un beneficio público sujeto a ingresos o por dificultades económicas; USCIS decide según las pruebas.',
  },
} as const;

interface Props { lang?: Lang; idPrefix?: string }
export default function UsFee({ lang = 'en', idPrefix = 'f' }: Props) {
  const L = T[lang];
  const [adults, setAdults] = useState(1);
  const [size, setSize] = useState(3);
  const [income, setIncome] = useState(95000);
  const [area, setArea] = useState<FpgArea>('contiguous');
  const [online, setOnline] = useState('1');
  useEffect(() => {
    const u = readParams(window.location.search);
    const a = Number(u.get('n')), s = Number(u.get('hh')), i = Number(u.get('inc')), ar = u.get('ar'), o = u.get('o');
    if (a) setAdults(a); if (s) setSize(s); if (i) setIncome(i); if (ar === 'contiguous' || ar === 'alaska' || ar === 'hawaii') setArea(ar); if (o === '0' || o === '1') setOnline(o);
  }, []);
  useEffect(() => { updateURL({ n: adults, hh: size, inc: income, ar: area, o: online }); }, [adults, size, income, area, online]);
  const tier = feeTier(area, Math.max(1, size), income);
  const f = usFee({ adults, online: online === '1', tier });
  const m = (n: number) => money(n, 'USD', lang);
  const tag = lang === 'es' ? 'es-US' : 'en-GB';
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form className="grid content-start gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <NumberField id={`${idPrefix}-n`} label={L.adults} value={adults} onChange={setAdults} max={10} tag={tag} />
        <SelectField id={`${idPrefix}-o`} label={L.how} value={online} onChange={setOnline} options={[{ value: '1', label: L.online }, { value: '0', label: L.paper }]} />
        <NumberField id={`${idPrefix}-hh`} label={L.size} value={size} onChange={setSize} max={20} tag={tag} />
        <NumberField id={`${idPrefix}-inc`} label={L.income} value={income} onChange={setIncome} max={10_000_000} unit="$" tag={tag} />
        <SelectField id={`${idPrefix}-ar`} label={L.area} value={area} onChange={(x) => setArea(x as FpgArea)} options={(['contiguous', 'alaska', 'hawaii'] as FpgArea[]).map((k) => ({ value: k, label: L.areas[k] }))} />
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.head}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{m(f.total)}</p>
        <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.tier}</td><td className="py-1.5 text-right font-medium text-navy-900">{L.tiers[tier]}</td></tr>
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.each}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{m(f.each)}</td></tr>
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.lim150}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{m(fpgLimit(area, Math.max(1, size), 150))}</td></tr>
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.lim400}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{m(fpgLimit(area, Math.max(1, size), 400))}</td></tr>
        </tbody></table>
        {f.paperOnly && <p className="mt-2 text-xs text-navy-700">{L.paperOnly}</p>}
        <p className="mt-2 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
