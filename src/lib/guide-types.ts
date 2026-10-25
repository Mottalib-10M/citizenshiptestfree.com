/**
 * One page = ONE data file in `src/content/pages/<id>.ts`, with an English version and, when the
 * page has a Spanish query, a Spanish one. The site covers the United States only since 2026-10-25. How to add a page: CONTRIBUTING-PAGES.md.
 */
import type { Helpers } from './helpers';

export type Lang = 'en' | 'es';
/** Country group of a page. Only 'us' remains: the UK, Australia and Canada moved to their own sites on 2026-10-25. */
export type Group = 'us';
export interface FAQ { q: string; a: string }
/**
 * `usquiz` (mock interview or practice, props: version, mode, theme, versionSelect), `usbank`,
 * `uswhich`, `usenglish`, `usdate`, `usfee`, `usfrise`, `ustime` or `mini:<spec>` from `lib/mini-specs.ts`.
 */
export interface ToolDef { kind: string; props?: Record<string, string | number | boolean> }
export interface PageText {
  /** Path after /en/ or /es/, without slashes at the ends; may hold one "/". */
  slug: string; nav: string; card: string;
  /** 50–60 characters, key term first (RECETTE §11). */
  title: string;
  /** 150–160 characters. */
  description: string;
  h1: string; intro: string;
  /** Citable block, one paragraph of 120 words or more (RECETTE §21), folded after its first sentence. */
  resume: (h: Helpers) => string;
  faqs: (h: Helpers) => FAQ[];
  /** HTML; `<!--tool:mini:spec-->` or `<!--tool:usdate|{"route":"3"}-->` places a tool in the body. */
  body: (h: Helpers) => string;
}
export interface PageDef {
  id: string; group: Group; order: number;
  tool?: ToolDef; mini?: ToolDef;
  related: string[];
  /** Keys of `data/params-2026.json` sources. */
  sources: string[];
  en: PageText; es?: PageText;
}
export const definePage = (g: PageDef): PageDef => g;
