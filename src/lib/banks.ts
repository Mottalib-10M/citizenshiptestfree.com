/**
 * Question banks. `BANKS` (static import) is for the build only: pages, helpers and the first render
 * of each tool. In the browser, `loadBank` fetches a bank on demand (one chunk per bank), so a page
 * ships only the questions it shows until the visitor asks for a new draw.
 */
import type { Country, Question } from './engine/exam';
export type BankKey = 'uk' | 'au' | 'ca-en' | 'ca-fr';
export const bankKey = (c: Country, lang: 'en' | 'fr'): BankKey => (c === 'ca' ? (lang === 'fr' ? 'ca-fr' : 'ca-en') : c);
export async function loadBank(k: BankKey): Promise<Question[]> {
  const m = k === 'uk' ? await import('../data/questions/uk.json') : k === 'au' ? await import('../data/questions/au.json') : k === 'ca-en' ? await import('../data/questions/ca-en.json') : await import('../data/questions/ca-fr.json');
  return (m.default as { questions: Question[] }).questions;
}
/** Chapters in the order of the official guide. */
export const CHAPTERS: Record<BankKey, string[]> = {
  uk: ['The values and principles of the UK', 'What is the UK?', 'A long and illustrious history', 'A modern, thriving society', 'The UK government, the law and your role'],
  au: ['Part 1: Australia and its people', 'Part 2: Democratic beliefs, rights and liberties', 'Part 3: Government and the law in Australia', 'Part 4: Australian values'],
  'ca-en': ['Rights and Responsibilities of Citizenship', 'Who We Are', "Canada's History", 'Modern Canada', 'How Canadians Govern Themselves', 'Federal Elections', 'The Justice System', 'Canadian Symbols', "Canada's Economy", "Canada's Regions"],
  'ca-fr': ['Les droits et responsabilités liés à la citoyenneté', 'Qui sommes-nous\u00a0?', 'L’histoire du Canada', 'Le Canada moderne', 'Le mode de gouvernement canadien', 'Les élections fédérales', 'Le système judiciaire', 'Les symboles canadiens', 'L’économie canadienne', 'Les régions du Canada'],
};
