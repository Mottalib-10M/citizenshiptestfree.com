/**
 * Inline SVG diagram (RECETTE §17.6): which civics test applies, by the date USCIS received the N-400.
 * Figures from params-2026.json and the bank sizes; colours from the site tokens; no external image.
 */
import P from '../data/params-2026.json';

type Lang = 'en' | 'es';
const U = P.us;
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function versionsSvg(lang: Lang, n25: number, n08: number, cutoffLabel: string): string {
  const en = lang === 'en';
  const t = en
    ? { title: 'Which civics test applies', before: 'N-400 received before', after: 'N-400 received on or after', v08: '2008 test', v25: '2025 test', l08: `${n08} questions, up to ${U.test2008.asked} asked, ${U.test2008.passCorrect} right to pass`, l25: `${n25} questions, up to ${U.test2025.asked} asked, ${U.test2025.passCorrect} right to pass`, stop08: `stops at ${U.test2008.passCorrect} right or ${U.test2008.failWrong} wrong`, stop25: `stops at ${U.test2025.passCorrect} right or ${U.test2025.failWrong} wrong`, axis: 'Date on your receipt notice (Form I-797C)', cap: `The interview date does not matter: only the date USCIS received the N-400. Rules read on uscis.gov.` }
    : { title: 'Qué examen cívico le corresponde', before: 'N-400 recibido antes del', after: 'N-400 recibido desde el', v08: 'Examen de 2008', v25: 'Examen de 2025', l08: `${n08} preguntas, hasta ${U.test2008.asked} preguntadas, ${U.test2008.passCorrect} para aprobar`, l25: `${n25} preguntas, hasta ${U.test2025.asked} preguntadas, ${U.test2025.passCorrect} para aprobar`, stop08: `termina con ${U.test2008.passCorrect} correctas o ${U.test2008.failWrong} incorrectas`, stop25: `termina con ${U.test2025.passCorrect} correctas o ${U.test2025.failWrong} incorrectas`, axis: 'Fecha del aviso de recibo (Formulario I-797C)', cap: `La fecha de la entrevista no cuenta: solo la fecha en que USCIS recibió el N-400. Reglas leídas en uscis.gov.` };
  const aria = `${t.title}: ${t.before} ${cutoffLabel}, ${t.v08} (${t.l08}); ${t.after} ${cutoffLabel}, ${t.v25} (${t.l25}).`;
  return `<figure class="not-prose my-8 rounded-2xl border border-navy-200 bg-white p-4 sm:p-6">
<svg viewBox="0 0 640 250" class="h-auto w-full" role="img" aria-label="${esc(aria)}" style="font-family: inherit">
<text x="320" y="22" text-anchor="middle" font-size="16" font-weight="700" fill="var(--color-navy-900)">${esc(t.title)}</text>
<rect x="20" y="96" width="290" height="14" rx="7" fill="var(--color-navy-300)"/>
<rect x="330" y="96" width="290" height="14" rx="7" fill="var(--color-accent-500)"/>
<line x1="320" y1="52" x2="320" y2="150" stroke="var(--color-navy-900)" stroke-width="2" stroke-dasharray="4 3"/>
<rect x="220" y="40" width="200" height="26" rx="13" fill="var(--color-navy-900)"/>
<text x="320" y="58" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">${esc(cutoffLabel)}</text>
<text x="165" y="86" text-anchor="middle" font-size="12" fill="var(--color-navy-600)">${esc(t.before)}</text>
<text x="475" y="86" text-anchor="middle" font-size="12" fill="var(--color-navy-600)">${esc(t.after)}</text>
<text x="165" y="140" text-anchor="middle" font-size="18" font-weight="700" fill="var(--color-navy-800)">${esc(t.v08)}</text>
<text x="475" y="140" text-anchor="middle" font-size="18" font-weight="700" fill="var(--color-accent-500)">${esc(t.v25)}</text>
<text x="165" y="164" text-anchor="middle" font-size="12" fill="var(--color-navy-700)">${esc(t.l08)}</text>
<text x="475" y="164" text-anchor="middle" font-size="12" fill="var(--color-navy-700)">${esc(t.l25)}</text>
<text x="165" y="184" text-anchor="middle" font-size="12" fill="var(--color-navy-700)">${esc(t.stop08)}</text>
<text x="475" y="184" text-anchor="middle" font-size="12" fill="var(--color-navy-700)">${esc(t.stop25)}</text>
<line x1="20" y1="214" x2="620" y2="214" stroke="var(--color-navy-400)" stroke-width="1"/>
<polygon points="620,214 612,210 612,218" fill="var(--color-navy-400)"/>
<text x="320" y="236" text-anchor="middle" font-size="12" fill="var(--color-navy-600)">${esc(t.axis)}</text>
</svg>
<figcaption class="mt-3 text-sm text-navy-600">${esc(t.cap)}</figcaption>
</figure>`;
}
