import { describe, expect, it } from 'vitest';
import { BANKS } from '../src/lib/banks-build';
import { CHAPTERS, type BankKey } from '../src/lib/banks';
import { buildExam, buildPractice, lintBank, seedOf } from '../src/lib/engine/exam';
import P from '../src/data/params-2026.json';

const keys: BankKey[] = ['uk', 'au', 'ca-en', 'ca-fr'];
describe('banques complètes', () => {
  for (const k of keys) {
    it(`${k} : banque propre, chaque question dans un chapitre connu`, () => {
      expect(lintBank(BANKS[k])).toEqual([]);
      for (const q of BANKS[k]) expect(CHAPTERS[k]).toContain(q.chapter);
      for (const c of CHAPTERS[k]) expect(BANKS[k].some((q) => q.chapter === c)).toBe(true);
    });
    it(`${k} : aucun tiret cadratin, réponses réparties`, () => {
      const txt = JSON.stringify(BANKS[k]);
      expect(txt.includes('—')).toBe(false);
      const by = [0, 0, 0, 0]; BANKS[k].forEach((q) => by[q.answer]++);
      expect(Math.max(...by) / BANKS[k].length).toBeLessThan(0.4);
    });
  }
  it('Australie : 5 questions de valeurs dans chaque tirage', () => {
    for (let s = 1; s < 50; s++) {
      const e = buildExam(BANKS.au, 'au', s);
      expect(e.questions).toHaveLength(P.au.test.questions);
      expect(e.questions.filter((q) => q.values)).toHaveLength(P.au.test.valuesQuestions);
    }
  });
  it('tirage reproductible et série par chapitre', () => {
    const a = buildExam(BANKS.uk, 'uk', seedOf('uk-test')).questions.map((q) => q.id);
    const b = buildExam(BANKS.uk, 'uk', seedOf('uk-test')).questions.map((q) => q.id);
    expect(a).toEqual(b);
    expect(new Set(a).size).toBe(P.uk.test.questions);
    const p = buildPractice(BANKS['ca-fr'], CHAPTERS['ca-fr'][3], 7, 10);
    expect(p).toHaveLength(10);
    expect(p.every((q) => q.chapter === CHAPTERS['ca-fr'][3])).toBe(true);
  });
});
