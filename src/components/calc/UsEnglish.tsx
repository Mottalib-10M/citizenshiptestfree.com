/**
 * English test practice for U.S. naturalization: writing (hear a sentence, type it, compare) and
 * reading (read a question aloud, then check it). Sentences written by Radif Partners with words of
 * the official USCIS reading and writing vocabulary lists only. The browser's own voice reads the
 * sentence (speechSynthesis); nothing is recorded or sent. First render = the first sentence.
 */
import { useState } from 'react';
import VOC from '../../data/us-english.json';
import P from '../../data/params-2026.json';
const P_ENGLISH = P.us.english;

type Lang = 'en' | 'es';
type Mode = 'writing' | 'reading';
const T = {
  en: {
    writing: 'Writing', reading: 'Reading', listen: 'Listen to the sentence', show: 'Show the sentence', type: 'Type what you hear', check: 'Check', next: 'Next sentence',
    readThis: 'Read this sentence aloud, then check yourself', readOk: 'I read it', readKo: 'I stumbled',
    ok: 'Every word is there and spelled right.', ko: (w: string) => `Missing or misspelled: ${w}`,
    head: 'Your practice', tally: (r: number, n: number) => `${r} of ${n} sentences right`, rule: (k: number, n: number) => `Real test: ${k} sentence right out of up to ${n} is enough, for reading and for writing.`,
    noVoice: 'This browser has no voice: use “Show the sentence”, then hide it and write it from memory.',
    note: 'Practice sentences written with the USCIS vocabulary lists. Capital letters and punctuation are not counted here, as in the real test, where small errors that keep the meaning are accepted.',
  },
  es: {
    writing: 'Escritura', reading: 'Lectura', listen: 'Escuchar la oración', show: 'Ver la oración', type: 'Escriba lo que oye (en inglés)', check: 'Comprobar', next: 'Siguiente oración',
    readThis: 'Lea esta oración en voz alta y luego compruebe', readOk: 'La leí bien', readKo: 'Me trabé',
    ok: 'Están todas las palabras, bien escritas.', ko: (w: string) => `Falta o está mal escrito: ${w}`,
    head: 'Su práctica', tally: (r: number, n: number) => `${r} de ${n} oraciones correctas`, rule: (k: number, n: number) => `Examen real: basta ${k} oración correcta de hasta ${n}, en lectura y en escritura.`,
    noVoice: 'Este navegador no tiene voz: use «Ver la oración», luego ocúltela y escríbala de memoria.',
    note: 'Oraciones de práctica escritas con las listas de vocabulario de USCIS. Aquí no cuentan las mayúsculas ni la puntuación, como en el examen real, donde se aceptan errores pequeños que no cambian el sentido.',
  },
} as const;
const words = (s: string) => s.toLowerCase().replace(/’/g, "'").replace(/\b(\d+)\b/g, (m) => ({ '50': 'fifty', '100': 'one hundred' } as Record<string, string>)[m] ?? m).replace(/[^a-z' ]+/g, ' ').split(/\s+/).filter(Boolean);
export function compare(target: string, typed: string): string[] {
  const t = words(target), y = new Set(words(typed));
  return t.filter((w) => !y.has(w));
}

interface Props { lang?: Lang; mode?: Mode; idPrefix?: string }
export default function UsEnglish({ lang = 'en', mode: m0 = 'writing', idPrefix = 'e' }: Props) {
  const L = T[lang];
  const E = P_ENGLISH;
  const [mode, setMode] = useState<Mode>(m0);
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState('');
  const [shown, setShown] = useState(false);
  const [res, setRes] = useState<string[] | null>(null);
  const [tally, setTally] = useState({ r: 0, n: 0 });
  const [noVoice, setNoVoice] = useState(false);
  const list = mode === 'writing' ? VOC.writingSentences : VOC.readingSentences;
  const s = list[i % list.length];
  const speak = () => {
    const w = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
    if (!w) { setNoVoice(true); return; }
    const u = new SpeechSynthesisUtterance(s); u.lang = 'en-US'; u.rate = 0.85; w.cancel(); w.speak(u);
  };
  const check = () => { const miss = compare(s, typed); setRes(miss); setTally((o) => ({ r: o.r + (miss.length ? 0 : 1), n: o.n + 1 })); };
  const next = () => { setI((x) => x + 1); setTyped(''); setShown(false); setRes(null); };
  const selfMark = (ok: boolean) => { setTally((o) => ({ r: o.r + (ok ? 1 : 0), n: o.n + 1 })); next(); };
  const btn = 'h-12 rounded-lg border border-navy-300 px-4 font-medium text-navy-800 hover:bg-navy-50';
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); if (mode === 'writing') check(); }}>
        <span className="inline-grid grid-flow-col auto-cols-fr overflow-hidden rounded-lg border border-navy-300 text-sm" role="group">
          {(['writing', 'reading'] as Mode[]).map((k) => <button key={k} type="button" aria-pressed={mode === k} onClick={() => { setMode(k); setI(0); setTyped(''); setShown(false); setRes(null); }} className={`h-12 px-4 ${mode === k ? 'bg-accent-700 text-white' : 'bg-white text-navy-800'}`}>{L[k]}</button>)}
        </span>
        <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
          {mode === 'writing' ? (
            <>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={speak} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">{L.listen}</button>
                <button type="button" onClick={() => setShown((x) => !x)} className={btn}>{L.show}</button>
              </div>
              {shown && <p className="mt-3 text-lg font-semibold text-navy-900" lang="en">{s}</p>}
              {noVoice && <p className="mt-2 text-sm text-amber-800">{L.noVoice}</p>}
              <label htmlFor={`${idPrefix}-t`} className="mt-4 mb-1 block text-sm font-medium text-navy-700">{L.type}</label>
              <input id={`${idPrefix}-t`} lang="en" autoComplete="off" value={typed} onChange={(e) => setTyped(e.target.value)} className="h-12 w-full rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
              <div className="mt-3 flex flex-wrap gap-3">
                <button type="submit" disabled={!typed.trim() || res !== null} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800 disabled:opacity-50">{L.check}</button>
                <button type="button" onClick={next} className={btn}>{L.next}</button>
              </div>
              {res && <p aria-live="polite" className={`mt-3 text-sm font-medium ${res.length ? 'text-red-700' : 'text-green-800'}`}>{res.length ? L.ko(res.join(', ')) : L.ok} {res.length ? <span className="text-navy-800" lang="en">({s})</span> : null}</p>}
            </>
          ) : (
            <>
              <p className="text-sm text-navy-700">{L.readThis}</p>
              <p className="mt-2 text-2xl font-semibold text-navy-900" lang="en">{s}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" onClick={speak} className={btn}>{L.listen}</button>
                <button type="button" onClick={() => selfMark(true)} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">{L.readOk}</button>
                <button type="button" onClick={() => selfMark(false)} className={btn}>{L.readKo}</button>
              </div>
              {noVoice && <p className="mt-2 text-sm text-amber-800">{L.noVoice}</p>}
            </>
          )}
        </div>
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.head} · {L[mode]}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{tally.r}<span className="text-xl font-semibold text-navy-700"> / {tally.n}</span></p>
        <p className="text-sm text-navy-700">{L.tally(tally.r, tally.n)}</p>
        <p className="mt-3 text-sm text-navy-700">{L.rule(E.readingNeeded, E.readingSentences)}</p>
        <p className="mt-3 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
