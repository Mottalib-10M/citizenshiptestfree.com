/**
 * Question bank browser: one chapter at a time, every question with its answer and explanation in
 * the HTML (native <details>, readable without JavaScript). First render = the chapter chosen for the
 * page at build time; another chapter is loaded only when the visitor picks it.
 */
import { useState } from 'react';
import SelectField from '../ui/SelectField';
import { loadBank, CHAPTERS, type BankKey } from '../../lib/banks';
import type { Question } from '../../lib/engine/exam';

const T = {
  en: { chapter: 'Chapter of the official guide', count: (n: number, all: number) => `${n} questions in this chapter, ${all} in the bank`, answer: 'Answer', src: 'Where to check', show: 'Show the answer', loading: 'Loading…' },
  fr: { chapter: 'Chapitre du guide officiel', count: (n: number, all: number) => `${n} questions dans ce chapitre, ${all} au total`, answer: 'Réponse', src: 'Où vérifier', show: 'Voir la réponse', loading: 'Chargement…' },
} as const;

interface Props { lang?: 'en' | 'fr'; bank: BankKey; chapter: string; initial: Question[]; total: number; idPrefix?: string }
export default function QuestionBank({ lang = 'en', bank, chapter: ch0, initial, total, idPrefix = 'b' }: Props) {
  const L = T[lang];
  const [chapter, setChapter] = useState(ch0);
  const [qs, setQs] = useState<Question[]>(initial);
  const [loading, setLoading] = useState(false);
  const pickChapter = async (c: string) => {
    setChapter(c); setLoading(true);
    const all = await loadBank(bank);
    setQs(all.filter((q) => q.chapter === c)); setLoading(false);
  };
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <SelectField id={`${idPrefix}-chapter`} label={L.chapter} value={chapter} onChange={pickChapter} options={CHAPTERS[bank].map((c) => ({ value: c, label: c }))} />
        </form>
        {loading ? <p className="mt-4 text-navy-700">{L.loading}</p> : (
          <ol className="mt-4 space-y-2">
            {qs.map((q, i) => (
              <li key={q.id}>
                <details className="group rounded-lg border border-navy-200 bg-white">
                  <summary className="cursor-pointer px-4 py-3 font-medium text-navy-900"><span className="tabular-nums mr-2 text-navy-600">{i + 1}.</span>{q.q}</summary>
                  <div className="px-4 pb-4 text-sm text-navy-800">
                    <ul className="mb-2 space-y-1">{q.options.map((o, j) => <li key={j} className={j === q.answer ? 'font-semibold text-green-800' : 'text-navy-700'}>{j === q.answer ? '✓ ' : '· '}{o}</li>)}</ul>
                    <p>{q.explain}</p>
                    <p className="mt-1 text-xs text-navy-600">{L.src}{lang === 'fr' ? ' : ' : ': '}{q.ref.section}</p>
                  </div>
                </details>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div data-resultat className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{chapter}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{qs.length}</p>
        <p className="text-sm text-navy-700">{L.count(qs.length, total)}</p>
      </div>
    </div>
  );
}
