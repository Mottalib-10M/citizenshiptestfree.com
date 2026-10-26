/** Registry of pages: every file of `src/content/pages/` is loaded here. */
import type { PageDef } from './guide-types';
const mods = import.meta.glob<{ default: PageDef }>('../content/pages/*.ts', { eager: true });
export const PAGES: PageDef[] = Object.entries(mods)
  .map(([file, m]) => {
    const g = m.default;
    const base = file.split('/').pop()!.replace(/\.ts$/, '');
    if (g.id !== base) throw new Error(`${file}: id “${g.id}” differs from the file name`);
    return g;
  })
  .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
export const pageById = (id: string) => PAGES.find((p) => p.id === id);
export const statePageId = (code: string) => `state-${code.toLowerCase()}`;
/** Menu and home sections: the test (order < 90), Form N-400 (90 to 129), then the other citizenship forms (130 and above). */
export type Section = 'test' | 'n400' | 'more';
export const sectionOf = (p: PageDef): Section => (p.order < 90 ? 'test' : p.order < 130 ? 'n400' : 'more');
export const SECTION_LABELS: Record<'en' | 'es', Record<Section, string>> = {
  en: { test: 'The citizenship test', n400: 'Form N-400', more: 'Other forms' },
  es: { test: 'El examen cívico', n400: 'Formulario N-400', more: 'Otros formularios' },
};
