import { describe, expect, it } from 'vitest';
import P from '../src/data/params-2026.json';
import US25 from '../src/data/questions/us-2025.json';
import US08 from '../src/data/questions/us-2008.json';
import VOC from '../src/data/us-english.json';
import {
  versionFor, ruleOf, exemptions, scorable, drawUs, practiceUs, scoreUs, earlyDate, presenceDays,
  usVerdict, usEarliest, isBreak, isPresumption, fpgLimit, feeTier, usFee, type UsQuestion,
} from '../src/lib/engine/us';

const B25 = US25.questions as UsQuestion[];
const B08 = US08.questions as UsQuestion[];
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/^(the|a|an) /, '').trim();
/** The right option either contains an accepted answer, or lists several accepted answers ("Life and liberty"). */
const accepted = (opt: string, answers: string[]) => {
  const A = answers.flatMap((a) => [a, a.replace(/\([^)]*\)/g, '')]).map(norm), o = norm(opt);
  if (A.some((a) => a && (o.includes(a) || a.includes(o)))) return true;
  const parts = opt.split(/,| and /).map(norm).filter(Boolean);
  return parts.length > 1 && parts.every((x) => A.some((a) => a.includes(x) || x.includes(a)));
};

describe('banques USCIS', () => {
  it('128 questions en 2025, 100 en 2008, numérotées sans trou', () => {
    expect(B25.length).toBe(128);
    expect(B08.length).toBe(100);
    expect(B25.map((q) => q.n)).toEqual(Array.from({ length: 128 }, (_, i) => i + 1));
    expect(B08.map((q) => q.n)).toEqual(Array.from({ length: 100 }, (_, i) => i + 1));
  });
  it('20 questions marquées 65/20 dans chaque liste', () => {
    expect(B25.filter((q) => q.star).length).toBe(20);
    expect(B08.filter((q) => q.star).length).toBe(20);
  });
  for (const [name, bank] of [['2025', B25], ['2008', B08]] as const) {
    it(`${name} : chaque question notée a 4 options distinctes, la bonne est une réponse acceptée par USCIS`, () => {
      for (const q of scorable(bank)) {
        for (const l of ['en', 'es'] as const) {
          const o = q[l].o!;
          expect(o, q.id).toHaveLength(4);
          expect(new Set(o.map(norm)).size, q.id).toBe(4);
          expect(q[l].q.length, q.id).toBeGreaterThan(5);
          expect(q[l].a.length, q.id).toBeGreaterThan(0);
        }
        expect(accepted(q.en.o![q.answer!], q.en.a), `${q.id}: ${q.en.o![q.answer!]} / ${q.en.a.join(' | ')}`).toBe(true);
      }
    });
    it(`${name} : la bonne réponse se répartit sur les quatre positions`, () => {
      const pos = [0, 0, 0, 0];
      for (const q of scorable(bank)) pos[q.answer!]++;
      for (const n of pos) expect(n).toBeGreaterThan(scorable(bank).length / 8);
    });
  }
  it('les questions dont la réponse dépend du lieu de résidence ne sont jamais notées', () => {
    const local = B25.filter((q) => q.local);
    expect(local.length).toBeGreaterThan(0);
    for (const q of local) expect(scorable(B25)).not.toContain(q);
  });
});

describe('version et règle d’arrêt', () => {
  it('N-400 reçu la veille du 20 octobre 2025 → 2008, le jour même → 2025', () => {
    expect(versionFor('2025-10-19')).toBe('2008');
    expect(versionFor('2025-10-20')).toBe('2025');
  });
  it('règles officielles : 20/12/9, 10/6/5, 65/20 = 10/6', () => {
    expect(ruleOf('2025')).toMatchObject({ asked: 20, pass: 12, failAt: 9 });
    expect(ruleOf('2008')).toMatchObject({ asked: 10, pass: 6, failAt: 5 });
    expect(ruleOf('2025', '6520')).toMatchObject({ asked: 10, pass: 6 });
  });
  it('un examen 2025 tire 20 questions distinctes et notables, reproductible avec la graine', () => {
    const a = drawUs(B25, '2025', 'full', 42), b = drawUs(B25, '2025', 'full', 42);
    expect(a).toHaveLength(20);
    expect(new Set(a.map((q) => q.id)).size).toBe(20);
    expect(a.map((q) => q.id)).toEqual(b.map((q) => q.id));
    for (const q of a) expect(q.local).toBeFalsy();
  });
  it('le 65/20 ne tire que des questions marquées', () => {
    const a = drawUs(B25, '2025', '6520', 7);
    expect(a).toHaveLength(10);
    for (const q of a) expect(q.star).toBe(true);
  });
  it('l’entraînement par thème reste dans le thème', () => {
    for (const q of practiceUs(B25, 1, 3)) expect(q.theme).toBe(1);
  });
  it('arrêt à 12 bonnes réponses (2025)', () => {
    const qs = drawUs(B25, '2025', 'full', 1);
    const s = scoreUs(qs, qs.map((q) => q.answer!), ruleOf('2025'));
    expect(s).toMatchObject({ status: 'pass', right: 12, wrong: 0, stoppedAt: 12 });
  });
  it('arrêt à 9 erreurs (2025) et à 5 erreurs (2008)', () => {
    const qs = drawUs(B25, '2025', 'full', 2);
    const wrong = qs.map((q) => (q.answer! + 1) % 4);
    expect(scoreUs(qs, wrong, ruleOf('2025'))).toMatchObject({ status: 'fail', wrong: 9, stoppedAt: 9 });
    const q8 = drawUs(B08, '2008', 'full', 2);
    expect(scoreUs(q8, q8.map((q) => (q.answer! + 1) % 4), ruleOf('2008'))).toMatchObject({ status: 'fail', wrong: 5 });
  });
  it('11 bonnes et 8 erreurs : l’examen continue à la 20e question', () => {
    const qs = drawUs(B25, '2025', 'full', 5);
    const ans: Array<number | null> = qs.map((q, i) => (i < 11 ? q.answer! : i < 19 ? (q.answer! + 1) % 4 : null));
    expect(scoreUs(qs, ans, ruleOf('2025'))).toMatchObject({ status: 'running', right: 11, wrong: 8 });
  });
  it('exemptions : 65/20, 55/15, 50/20', () => {
    expect(exemptions(66, 21)).toMatchObject({ e6520: true, civicsInOwnLanguage: true });
    expect(exemptions(56, 15).english).toBe('55/15');
    expect(exemptions(51, 20).english).toBe('50/20');
    expect(exemptions(51, 19)).toMatchObject({ english: null, civicsInOwnLanguage: false });
    expect(exemptions(64, 30).e6520).toBe(false);
  });
});

describe('date du N-400', () => {
  it('exemple USCIS : carte du 4 juillet 2017 → dépôt possible le 5 avril 2022', () => {
    expect(earlyDate('2017-07-04', 5)).toBe('2022-04-05');
    expect(usEarliest({ route: '5', lpr: '2017-07-04', trips: [] }, '2020-01-01').date).toBe('2022-04-05');
  });
  it('exemple de la page N-400 : carte du 15 novembre 2021, deux voyages → 17 août 2026, 1 736 jours dont 74 dehors', () => {
    const trips = [{ out: '2023-07-01', back: '2023-08-20' }, { out: '2025-12-15', back: '2026-01-10' }];
    const r = usEarliest({ route: '5', lpr: '2021-11-15', trips }, '2026-01-01');
    expect(r.date).toBe('2026-08-17');
    expect(presenceDays([], '2021-11-15', '2026-08-16')).toBe(1736);
    expect(1736 - presenceDays(trips, '2021-11-15', '2026-08-16')).toBe(74);
  });
  it('les jours de départ et de retour sont des jours de présence', () => {
    expect(presenceDays([{ out: '2026-01-05', back: '2026-01-09' }], '2026-01-01', '2026-01-31')).toBe(31 - 3);
  });
  it('exemple de la page éligibilité : 213 jours dehors → présomption, pas rupture', () => {
    const t = { out: '2023-03-01', back: '2023-10-01' };
    expect(isPresumption(t, '2025-11-04')).toBe(true);
    expect(isBreak(t, '2025-11-04')).toBe(false);
    const v = usVerdict({ route: '5', lpr: '2021-02-02', trips: [t] }, '2025-11-04');
    expect(v.ok).toBe(true);
    expect(v.checks.find((c) => c.id === 'presumption')?.ok).toBe(false);
  });
  it('voyage de 365 jours ou plus : rupture, nouveau dépôt 4 ans et 1 jour après le retour', () => {
    const t = { out: '2022-01-01', back: '2023-01-10' };
    expect(isBreak(t, '2026-01-01')).toBe(true);
    const r = usEarliest({ route: '5', lpr: '2019-06-01', trips: [t] }, '2024-01-01');
    expect(r.date).toBe('2027-01-11');
  });
  it('voie du conjoint : 3 ans d’union exigés', () => {
    const r = usEarliest({ route: '3', lpr: '2023-03-01', union: '2023-09-01', trips: [] }, '2025-01-01');
    expect(r.earliestByLaw).toBe('2025-12-01');
    expect(r.date).toBe('2026-09-01');
  });
});

describe('frais du N-400', () => {
  it('tarifs officiels : 710 en ligne, 760 papier, 380 réduit', () => {
    expect(usFee({ adults: 1, online: true, tier: 'full' }).each).toBe(710);
    expect(usFee({ adults: 2, online: false, tier: 'full' }).total).toBe(1520);
    expect(usFee({ adults: 1, online: true, tier: 'reduced' })).toMatchObject({ each: 380, online: false, paperOnly: true });
    expect(usFee({ adults: 1, online: false, tier: 'waiver' }).each).toBe(0);
  });
  it('seuils des lignes directrices de pauvreté (tableau USCIS du 13 janvier 2026)', () => {
    expect(P.us.fpg.effective).toBe('2026-01-13');
    expect(fpgLimit('contiguous', 4, 150)).toBe(49500);
    expect(fpgLimit('contiguous', 10, 400)).toBe(222880 + 2 * 22720);
    expect(feeTier('contiguous', 4, 49500)).toBe('waiver');
    expect(feeTier('contiguous', 4, 49501)).toBe('reduced');
    expect(feeTier('contiguous', 4, 132000)).toBe('full');
  });
});

describe('anglais : phrases de pratique', () => {
  const words = (xs: unknown) => new Set(JSON.stringify(xs).toLowerCase().match(/[a-z]+/g));
  it('chaque phrase de dictée n’emploie que des mots de la liste officielle d’écriture', () => {
    const W = words((VOC as { writing: unknown }).writing);
    for (const s of (VOC as { writingSentences: string[] }).writingSentences)
      for (const w of s.toLowerCase().match(/[a-z]+/g)!) expect(W.has(w), `${w} dans « ${s} »`).toBe(true);
  });
});
