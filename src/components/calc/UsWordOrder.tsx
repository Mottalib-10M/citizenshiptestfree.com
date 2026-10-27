/**
 * Writing test drill: the words of a practice sentence are shuffled; tap them in order to rebuild it,
 * then type it from memory. Sentences written by Radif Partners with the words of the official USCIS
 * writing vocabulary only (`us-english.json`). First render = sentence 1 with a shuffle fixed at build
 * time (RECETTE §17.5). Nothing is stored or sent.
 */
import { useState } from 'react';
import VOC from '../../data/us-english.json';
import P from '../../data/params-2026.json';

const E = P.us.english;

const SENT = VOC.writingSentences as string[];
const toks = (s: string) => s.replace(/[.?!]$/, '').split(' ');
function shuffle(n: number, seed: number) {
  let x = seed >>> 0 || 1;
  const r = () => { x = (x * 1664525 + 1013904223) >>> 0; return x / 4294967296; };
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  if (a.every((v, i) => v === i) && n > 1) [a[0], a[1]] = [a[1], a[0]];
  return a;
}
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();

interface Props { idPrefix?: string }
export default function UsWordOrder({ idPrefix = 'wo' }: Props) {
  const [k, setK] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const [typed, setTyped] = useState('');
  const [score, setScore] = useState({ built: 0, tries: 0 });
  const words = toks(SENT[k]);
  const order = shuffle(words.length, k * 97 + 13);
  const built = picked.map((i) => words[i]).join(' ');
  const complete = picked.length === words.length;
  const right = complete && norm(built) === norm(SENT[k]);
  const typedOk = typed.trim() !== '' && norm(typed) === norm(SENT[k]);
  const tap = (i: number) => {
    if (picked.includes(i) || complete) return;
    const next = [...picked, i];
    setPicked(next);
    if (next.length === words.length) setScore((s) => ({ built: s.built + (norm(next.map((j) => words[j]).join(' ')) === norm(SENT[k]) ? 1 : 0), tries: s.tries + 1 }));
  };
  const nextSentence = () => { setK((k + 1) % SENT.length); setPicked([]); setTyped(''); };
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
          <p className="text-sm text-navy-700">Sentence {k + 1} of {SENT.length} · tap the words in the right order</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {order.map((i) => (
              <button key={i} id={`${idPrefix}-w${i}`} type="button" aria-pressed={picked.includes(i)} onClick={() => tap(i)} disabled={picked.includes(i)}
                className={`min-h-12 rounded-lg border px-4 py-2 text-base font-medium ${picked.includes(i) ? 'border-navy-200 bg-navy-50 text-navy-400' : 'border-navy-300 bg-white text-navy-900 hover:border-accent-500 hover:bg-accent-50'}`}>{words[i]}</button>
            ))}
          </div>
          <p className="mt-4 min-h-12 rounded-lg border border-dashed border-navy-300 bg-navy-50 px-4 py-3 text-lg text-navy-900">{built || <span className="text-navy-500">Your sentence appears here</span>}</p>
          {complete && <p className={`mt-2 text-sm font-medium ${right ? 'text-green-800' : 'text-red-700'}`}>{right ? 'Right order. Now hide it and write it from memory below.' : `Not this order. The sentence is: “${SENT[k]}”`}</p>}
          <label htmlFor={`${idPrefix}-type`} className="mt-4 mb-1 block text-sm font-medium text-navy-700">Write the sentence from memory</label>
          <input id={`${idPrefix}-type`} type="text" autoComplete="off" spellCheck={false} value={typed} onChange={(e) => setTyped(e.target.value)} className="h-12 w-full rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
          {typedOk && <p className="mt-2 text-sm font-medium text-green-800">Spelled right, word for word.</p>}
          <div className="mt-4 flex flex-wrap gap-3">
            {picked.length > 0 && !complete && <button type="button" onClick={() => setPicked(picked.slice(0, -1))} className="h-12 rounded-lg border border-navy-300 px-5 font-medium text-navy-800 hover:bg-navy-50">Undo</button>}
            <button type="button" onClick={nextSentence} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">Next sentence</button>
          </div>
        </div>
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">Sentences rebuilt</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{score.built}<span className="text-xl font-semibold text-navy-700"> / {score.tries}</span></p>
        <p className="mt-3 text-base font-semibold text-navy-700">{!score.tries ? 'Tap the first word' : score.built === score.tries ? 'Every sentence in order' : 'Retry the missed ones'}</p>
        <p className="mt-3 text-xs text-navy-700">Practice sentences written with the USCIS writing vocabulary list only. At the test the officer reads a sentence aloud and you write it; {E.writingNeeded} right sentence out of up to {E.writingSentences} is enough.</p>
      </div>
    </div>
  );
}
