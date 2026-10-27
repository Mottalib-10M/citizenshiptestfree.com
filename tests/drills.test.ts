import { describe, expect, it } from 'vitest';
import { DRILLS, PRESIDENCIES } from '../src/data/us-drills';
import { STATES } from '../src/data/us-states';
import { CHECKLISTS } from '../src/data/us-checklists';

describe('états et sénateurs', () => {
  it('50 États, codes uniques, deux sénateurs chacun, 100 au total', () => {
    expect(STATES).toHaveLength(50);
    expect(new Set(STATES.map((s) => s.code)).size).toBe(50);
    expect(STATES.flatMap((s) => s.senators)).toHaveLength(100);
    expect(new Set(STATES.flatMap((s) => s.senators.map((x) => x.name))).size).toBe(100);
  });
});

describe('quiz par thème', () => {
  for (const d of Object.values(DRILLS)) {
    it(`${d.id} : 4 options distinctes, bonne réponse dans les bornes, au moins ${d.size} questions`, () => {
      expect(d.items.length).toBeGreaterThanOrEqual(d.size);
      for (const q of d.items) {
        expect(q.o, q.q).toHaveLength(4);
        expect(new Set(q.o).size, q.q).toBe(4);
        expect(q.a, q.q).toBeGreaterThanOrEqual(0);
        expect(q.a, q.q).toBeLessThan(4);
        expect(q.why.length, q.q).toBeGreaterThan(10);
      }
      expect(new Set(d.items.map((q) => q.q)).size).toBe(d.items.length);
    });
  }
  it('capitales : la bonne réponse est la capitale de l’État nommé', () => {
    for (const q of DRILLS.capitals.items) {
      const s = STATES.find((x) => q.q === `What is the capital of ${x.name}?`)!;
      expect(q.o[q.a]).toBe(s.capital);
    }
  });
  it('présidents : 47 présidences numérotées sans trou, 45 personnes', () => {
    expect(PRESIDENCIES.map((p) => p.n)).toEqual(Array.from({ length: 47 }, (_, i) => i + 1));
    expect(new Set(PRESIDENCIES.map((p) => p.name)).size).toBe(45);
  });
});

describe('listes de contrôle', () => {
  it('chaque liste a au moins un élément obligatoire', () => {
    for (const c of Object.values(CHECKLISTS)) expect(c.items.some((x) => x.must)).toBe(true);
  });
});
