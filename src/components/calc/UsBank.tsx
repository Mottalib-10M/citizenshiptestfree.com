/**
 * The official USCIS civics questions with every accepted answer, one theme at a time (or the 20
 * questions marked for the 65/20 test), readable without JavaScript (native <details>). First render
 * = the theme chosen for the page at build time; another theme or version loads on demand.
 */
import { useState } from 'react';
import SelectField from '../ui/SelectField';
import type { UsBankFile, UsQuestion, UsVersion } from '../../lib/engine/us';

type Lang = 'en' | 'es';
async function loadUs(v: UsVersion): Promise<UsBankFile> {
  const m = v === '2025' ? await import('../../data/questions/us-2025.json') : await import('../../data/questions/us-2008.json');
  return m.default as unknown as UsBankFile;
}
const T = {
  en: { version: 'Version', theme: 'Theme', star: 'The 20 questions for the 65/20 test', count: (n: number, all: number) => `${n} questions shown, ${all} on the official list`, answers: 'Accepted answers', local: 'Your answer depends on where you live: look up your own officials.', current: 'As listed on the USCIS test updates page.', loading: 'Loading…', starNote: '★ marked for the 65/20 test', en: '' },
  es: { version: 'Versión', theme: 'Tema', star: 'Las 20 preguntas del examen 65/20', count: (n: number, all: number) => `${n} preguntas en pantalla, ${all} en la lista oficial`, answers: 'Respuestas aceptadas', local: 'La respuesta depende de dónde vive: busque sus propios representantes.', current: 'Según la página de actualizaciones del examen de USCIS.', loading: 'Cargando…', starNote: '★ marcada para el examen 65/20', en: 'En inglés:' },
} as const;

interface Props { lang?: Lang; version: UsVersion; theme: number | 'star'; initial: UsQuestion[]; themes: string[]; total: number; versionSelect?: boolean; idPrefix?: string }
export default function UsBank({ lang = 'en', version: v0, theme: th0, initial, themes: themes0, total: total0, versionSelect = false, idPrefix = 'ub' }: Props) {
  const L = T[lang];
  const [version, setVersion] = useState<UsVersion>(v0);
  const [theme, setTheme] = useState<string>(String(th0));
  const [themes, setThemes] = useState(themes0);
  const [total, setTotal] = useState(total0);
  const [qs, setQs] = useState<UsQuestion[]>(initial);
  const [loading, setLoading] = useState(false);
  const pick = async (v: UsVersion, t: string) => {
    setVersion(v); setTheme(t); setLoading(true);
    const b = await loadUs(v);
    setThemes(b.themes[lang]); setTotal(b.questions.length);
    setQs(b.questions.filter((q) => (t === 'star' ? q.star : q.theme === Number(t)))); setLoading(false);
  };
  const tx = (q: UsQuestion) => (lang === 'es' ? q.es : q.en);
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          {versionSelect && <SelectField id={`${idPrefix}-v`} label={L.version} value={version} onChange={(x) => pick(x as UsVersion, '0')} options={[{ value: '2025', label: '2025 (128)' }, { value: '2008', label: '2008 (100)' }]} />}
          <SelectField id={`${idPrefix}-theme`} label={L.theme} value={theme} onChange={(x) => pick(version, x)} options={[...themes.map((t, i) => ({ value: String(i), label: t })), { value: 'star', label: L.star }]} />
        </form>
        {loading ? <p className="mt-4 text-navy-700">{L.loading}</p> : (
          <ol className="mt-4 space-y-2">
            {qs.map((q) => (
              <li key={q.id}>
                <details className="group rounded-lg border border-navy-200 bg-white">
                  <summary className="cursor-pointer px-4 py-3 font-medium text-navy-900"><span className="tabular-nums mr-2 text-navy-600">{q.n}.</span>{tx(q).q}{q.star ? ' ★' : ''}</summary>
                  <div className="px-4 pb-4 text-sm text-navy-800">
                    {lang === 'es' && <p className="mb-2 text-navy-700" lang="en">{L.en} <em>{q.en.q}</em></p>}
                    <p className="font-medium text-navy-900">{L.answers}</p>
                    <ul className="mt-1 list-disc space-y-0.5 pl-5">{tx(q).a.map((x, j) => <li key={j}>{x}</li>)}</ul>
                    {q.local && <p className="mt-2 text-xs text-navy-700">{L.local}</p>}
                    {q.current && <p className="mt-2 text-xs text-navy-700">{L.current}</p>}
                  </div>
                </details>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div data-resultat className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{theme === 'star' ? L.star : themes[Number(theme)]} · {version}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{qs.length}</p>
        <p className="text-sm text-navy-700">{L.count(qs.length, total)}</p>
        <p className="mt-2 text-xs text-navy-700">{L.starNote}</p>
      </div>
    </div>
  );
}
