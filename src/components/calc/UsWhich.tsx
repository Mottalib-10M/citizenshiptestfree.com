/**
 * "Which civics test will I take?": the version follows the N-400 filing date (before or on/after
 * 20 October 2025), then age and years as a permanent resident on that date give the 65/20 test and
 * the English exemptions (50/20, 55/15). Rules from params-2026.json, read on uscis.gov.
 * First render = build defaults (RECETTE §17.5).
 */
import { useEffect, useState } from 'react';
import NumberField from '../ui/NumberField';
import { exemptions, ruleOf, versionFor } from '../../lib/engine/us';
import { dateL } from '../../lib/format-l';
import { readParams, updateURL } from '../../lib/url-state';
import P from '../../data/params-2026.json';

type Lang = 'en' | 'es';
const U = P.us;
const iso = (s: string | null) => !!s && /^\d{4}-\d{2}-\d{2}$/.test(s);
const T = {
  en: {
    filed: 'Date you filed (or will file) Form N-400', age: 'Your age on that date', years: 'Years as a permanent resident on that date', yrs: 'yrs',
    head: 'Your civics test', v: (v: string) => `${v} version`, questions: 'Questions asked', pass: 'Right answers to pass', list: 'Official list to study',
    from: (n: number, all: number) => `up to ${n}, from ${all}`, of20: (n: number) => `up to ${n}, from the 20 questions marked ★`,
    english: 'English test (reading, writing, speaking)', engYes: 'Required', engNo: (r: string) => `Exempt (${r} rule)`, lang: 'Language of the civics test', langEn: 'English', langOwn: 'Your language, with an interpreter you bring',
    special: '65/20 special consideration', yes: 'Yes', no: 'No',
    note: 'Age and years as a permanent resident are counted on the day USCIS receives the N-400. A medical disability exception (Form N-648) can waive the English and civics tests whatever the age.',
  },
  es: {
    filed: 'Fecha en que presentó (o presentará) el Formulario N-400', age: 'Su edad en esa fecha', years: 'Años como residente permanente en esa fecha', yrs: 'años',
    head: 'Su examen de educación cívica', v: (v: string) => `Versión ${v}`, questions: 'Preguntas', pass: 'Correctas para aprobar', list: 'Lista oficial para estudiar',
    from: (n: number, all: number) => `hasta ${n}, de ${all}`, of20: (n: number) => `hasta ${n}, de las 20 preguntas marcadas ★`,
    english: 'Examen de inglés (lectura, escritura, conversación)', engYes: 'Obligatorio', engNo: (r: string) => `Exento (regla ${r})`, lang: 'Idioma del examen cívico', langEn: 'Inglés', langOwn: 'Su idioma, con un intérprete que usted lleva',
    special: 'Consideración especial 65/20', yes: 'Sí', no: 'No',
    note: 'La edad y los años como residente permanente se cuentan el día en que USCIS recibe el N-400. Una excepción por discapacidad médica (Formulario N-648) puede eximir de los exámenes de inglés y de educación cívica a cualquier edad.',
  },
} as const;

interface Props { lang?: Lang; idPrefix?: string }
export default function UsWhich({ lang = 'en', idPrefix = 'w' }: Props) {
  const L = T[lang];
  const [filed, setFiled] = useState('2026-03-02');
  const [age, setAge] = useState(42);
  const [years, setYears] = useState(6);
  useEffect(() => {
    const u = readParams(window.location.search);
    const f = u.get('f'), a = Number(u.get('age')), y = Number(u.get('y'));
    if (iso(f)) setFiled(f!); if (a) setAge(a); if (y) setYears(y);
  }, []);
  useEffect(() => { updateURL({ f: filed, age, y: years }); }, [filed, age, years]);
  const v = versionFor(iso(filed) ? filed : U.cutoff);
  const ex = exemptions(age, years);
  const r = ruleOf(v, ex.e6520 ? '6520' : 'full');
  const inputCls = 'h-12 w-full min-w-0 rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20';
  const rows: Array<[string, string]> = [
    [L.questions, ex.e6520 ? L.of20(r.asked) : L.from(r.asked, r.bank)],
    [L.pass, String(r.pass)],
    [L.english, ex.english ? L.engNo(ex.english) : L.engYes],
    [L.lang, ex.civicsInOwnLanguage ? L.langOwn : L.langEn],
    [L.special, ex.e6520 ? L.yes : L.no],
  ];
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form className="grid content-start gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <div className="grid min-w-0 grid-rows-subgrid row-span-3 content-start gap-y-0 sm:col-span-2"><label htmlFor={`${idPrefix}-f`} className="mb-1 block text-sm font-medium text-navy-700">{L.filed}</label><input id={`${idPrefix}-f`} type="date" value={filed} onChange={(e) => setFiled(e.target.value)} className={inputCls} /><span /></div>
        <NumberField id={`${idPrefix}-age`} label={L.age} value={age} onChange={setAge} max={120} unit={L.yrs} tag={lang === 'es' ? 'es-US' : 'en-GB'} />
        <NumberField id={`${idPrefix}-y`} label={L.years} value={years} onChange={setYears} max={90} unit={L.yrs} tag={lang === 'es' ? 'es-US' : 'en-GB'} />
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.head}</p>
        <p className="mt-1 text-3xl font-bold text-navy-900">{L.v(v)}{ex.e6520 ? ' · 65/20' : ''}</p>
        <p className="text-sm text-navy-700">{iso(filed) ? dateL(filed, lang) : ''}</p>
        <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
          {rows.map(([k, x]) => <tr key={k}><td className="py-1.5 pr-2 text-navy-700">{k}</td><td className="py-1.5 text-right font-medium text-navy-900">{x}</td></tr>)}
        </tbody></table>
        <p className="mt-2 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
