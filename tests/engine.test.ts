import { describe, expect, it } from 'vitest';
import P from '../src/data/params-2026.json';
import { absentDaysIn, addYears, checkTrips, totalAbsent } from '../src/lib/engine/dates';
import { auEarliest, auVerdict, caCount, caEarliest, caVerdict, ukEarliest, ukVerdict, ukWithinDiscretion } from '../src/lib/engine/eligibility';
import { buildExam, lintBank, passNeeded, score, type Question } from '../src/lib/engine/exam';
import { auCost, caCost, ukCost } from '../src/lib/engine/cost';
import UK from '../src/data/questions/uk.json';
import AU from '../src/data/questions/au.json';
import CAEN from '../src/data/questions/ca-en.json';
import CAFR from '../src/data/questions/ca-fr.json';

describe('comptage des absences (jours entiers seulement, dans les trois pays)', () => {
  it('UK guidance : parti le 22 septembre, revenu le 23 → aucune absence', () => {
    expect(absentDaysIn({ out: '2025-09-22', back: '2025-09-23' }, '2020-01-01', '2030-01-01')).toBe(0);
  });
  it('lundi → vendredi : mardi, mercredi, jeudi', () => {
    expect(absentDaysIn({ out: '2026-10-05', back: '2026-10-09' }, '2020-01-01', '2030-01-01')).toBe(3);
  });
  it('coupe le voyage aux bornes de la fenêtre', () => {
    expect(absentDaysIn({ out: '2026-01-01', back: '2026-01-31' }, '2026-01-10', '2026-01-19')).toBe(10);
  });
  it('voyage sans retour = dehors jusqu’au bout de la fenêtre', () => {
    expect(absentDaysIn({ out: '2026-01-01', back: null }, '2026-01-01', '2026-01-10')).toBe(9);
  });
  it('29 février → 28 février', () => {
    expect(addYears('2024-02-29', 1)).toBe('2025-02-28');
  });
  it('refuse les voyages qui se chevauchent', () => {
    expect(checkTrips([{ out: '2026-01-01', back: '2026-01-10' }, { out: '2026-01-05', back: '2026-01-07' }])).toMatch(/chevauchent/);
    expect(checkTrips([{ out: '2026-01-01', back: '2026-01-10' }, { out: '2026-01-10', back: '2026-01-12' }])).toBeNull();
  });
});

describe('Royaume-Uni, naturalisation 6(1) et 6(2)', () => {
  it('exemple de la guidance : demande du 1/9/2022 → présence exigée le 2/9/2017', () => {
    const v = ukVerdict({ route: '6(1)', firstEntry: '2017-09-02', ilr: '2021-01-01', trips: [] }, '2022-09-01');
    expect(v.checks.find((c) => c.id === 'presentAtStart')!.limit).toBe('2017-09-02');
    expect(v.ok).toBe(true);
    expect(ukVerdict({ route: '6(1)', firstEntry: '2017-09-03', ilr: '2021-01-01', trips: [] }, '2022-09-01').ok).toBe(false);
  });
  it('ILR détenu depuis 12 mois, sauf conjoint de Britannique', () => {
    const base = { firstEntry: '2018-01-01', ilr: '2026-03-01', trips: [] };
    expect(ukEarliest({ route: '6(1)', ...base }, '2026-10-24').date).toBe('2027-03-01');
    expect(ukEarliest({ route: '6(2)', ...base }, '2026-10-24').date).toBe('2026-10-24');
  });
  it('451 jours d’absence sur 5 ans → refus strict, mais dans la marge de 30 jours de la guidance', () => {
    // 451 jours entiers dehors : départ le 2019-01-01, retour 452 jours plus tard
    const trips = [{ out: '2019-01-01', back: '2020-03-28' }];
    expect(totalAbsent(trips, '2018-01-01', '2026-01-01')).toBe(451);
    const v = ukVerdict({ route: '6(1)', firstEntry: '2015-01-01', ilr: '2020-06-01', trips }, '2023-10-01');
    expect(v.ok).toBe(false);
    expect(ukWithinDiscretion(v)).toBe(true);
  });
  it('plus de 90 jours dehors dans les 12 derniers mois repousse la date', () => {
    const trips = [{ out: '2026-06-01', back: '2026-09-15' }]; // 105 jours
    const r = ukEarliest({ route: '6(1)', firstEntry: '2018-01-01', ilr: '2023-01-01', trips }, '2026-10-24');
    expect(r.verdictToday.ok).toBe(false);
    expect(r.date).not.toBeNull();
    expect(ukVerdict({ route: '6(1)', firstEntry: '2018-01-01', ilr: '2023-01-01', trips }, r.date!).ok).toBe(true);
    expect(ukVerdict({ route: '6(1)', firstEntry: '2018-01-01', ilr: '2023-01-01', trips }, '2026-10-24').checks.find((c) => c.id === 'absences12m')!.value).toBe(105);
  });
  it('limites lues dans le fichier de paramètres', () => {
    expect(P.uk.naturalisation.route61.maxAbsenceDays).toBe(450);
    expect(P.uk.naturalisation.route62spouse.maxAbsenceDays).toBe(270);
  });
});

describe('Canada, présence effective de 1 095 jours', () => {
  it('RP depuis exactement 1 095 jours sans voyage → admissible le lendemain du 1 095e jour', () => {
    // 2021, 2022 et 2023 ne sont pas bissextiles ; le jour de la demande ne compte pas
    const x = { pr: '2021-01-01', tempStart: null, trips: [] };
    expect(caCount(x, '2023-12-31').total).toBe(1094);
    expect(caCount(x, '2024-01-01').total).toBe(1095);
    expect(caEarliest(x, '2023-06-01').date).toBe('2024-01-01');
  });
  it('les jours avant la RP comptent pour moitié, 365 au plus', () => {
    const x = { pr: '2024-01-01', tempStart: '2021-01-01', trips: [] };
    const n = caCount(x, '2026-01-01');
    expect(n.preCredit).toBe(365); // 1 095 jours avant la RP dans la fenêtre → plafonné
    expect(n.prDays).toBe(731);
    expect(caVerdict(x, '2026-01-01').ok).toBe(true);
  });
  it('un voyage retire seulement les jours entiers passés dehors', () => {
    const x = { pr: '2021-01-01', tempStart: null, trips: [{ out: '2022-07-01', back: '2022-07-11' }] };
    expect(caCount(x, '2024-01-01').total).toBe(1095 - 9);
    expect(caEarliest(x, '2023-06-01').date).toBe('2024-01-10');
  });
  it('jamais avant RP + 730 jours', () => {
    const x = { pr: '2025-01-01', tempStart: '2015-01-01', trips: [] };
    expect(caEarliest(x, '2025-01-02').date).toBe('2027-01-01');
  });
});

describe('Australie, general residence requirement', () => {
  it('exemple du document FOI (Mr Barnaby) : admissible le 1/1/2020', () => {
    const x = {
      lawfulStart: '2016-01-01',
      pr: '2019-01-01',
      trips: [
        { out: '2017-09-07', back: '2018-06-30' },
        { out: '2019-03-23', back: '2019-05-29' },
      ],
    };
    const v = auVerdict(x, '2020-01-01');
    expect(v.ok).toBe(true);
    // 296 + 67 jours selon le décompte de l'exemple, 295 + 66 en jours entiers : sous 365 dans les deux cas
    expect(v.checks.find((c) => c.id === 'absences')!.value).toBe(361);
  });
  it('4 ans de séjour régulier et 12 mois de RP', () => {
    const r = auEarliest({ lawfulStart: '2023-03-15', pr: '2026-08-01', trips: [] }, '2026-10-24');
    expect(r.date).toBe('2027-08-01');
    const r2 = auEarliest({ lawfulStart: '2023-03-15', pr: '2025-01-01', trips: [] }, '2026-10-24');
    expect(r2.date).toBe('2027-03-15');
  });
  it('Néo-Zélandais visa 189 délivré après le 1/1/2023 : pas de 12 mois de RP', () => {
    const r = auEarliest({ lawfulStart: '2020-01-01', pr: '2026-09-01', nz189: true, trips: [] }, '2026-10-24');
    expect(r.date).toBe('2026-10-24');
  });
  it('plus de 90 jours dehors l’année précédente repousse la date', () => {
    const x = { lawfulStart: '2018-01-01', pr: '2020-01-01', trips: [{ out: '2026-05-01', back: '2026-08-31' }] };
    const r = auEarliest(x, '2026-10-24');
    expect(r.verdictToday.ok).toBe(false);
    expect(auVerdict(x, r.date!).ok).toBe(true);
  });
});

describe('examens blancs', () => {
  const synth = (country: 'uk' | 'au' | 'ca', n: number, values = 0): Question[] =>
    Array.from({ length: n }, (_, i) => ({
      id: `${country}-${i}`, country, lang: 'en', chapter: 'x', values: i < values,
      q: `q${i}`, options: ['a', 'b', 'c', 'd'], answer: i % 4, explain: 'explication suffisamment longue',
      ref: { doc: 'd', section: 's', url: 'https://example.org' },
    }));
  it('taille et note de passage de chaque pays', () => {
    expect(buildExam(synth('uk', 60), 'uk', 1).questions).toHaveLength(24);
    expect(passNeeded('uk')).toBe(18);
    expect(passNeeded('ca')).toBe(15);
    expect(passNeeded('au')).toBe(15);
  });
  it('même graine, même examen', () => {
    const b = synth('ca', 80);
    expect(buildExam(b, 'ca', 42).questions.map((q) => q.id)).toEqual(buildExam(b, 'ca', 42).questions.map((q) => q.id));
    expect(buildExam(b, 'ca', 42).questions.map((q) => q.id)).not.toEqual(buildExam(b, 'ca', 43).questions.map((q) => q.id));
  });
  it('Australie : 5 questions de valeurs, toutes à réussir', () => {
    const e = buildExam(synth('au', 60, 15), 'au', 7);
    expect(e.questions.filter((q) => q.values)).toHaveLength(5);
    const all = e.questions.map((q) => q.answer);
    expect(score(e, all).pass).toBe(true);
    const oneValueWrong = e.questions.map((q) => (q.values ? (q.answer + 1) % 4 : q.answer));
    oneValueWrong.forEach((_, i) => { if (e.questions[i].values && i !== e.questions.findIndex((q) => q.values)) oneValueWrong[i] = e.questions[i].answer; });
    const s = score(e, oneValueWrong);
    expect(s.correct).toBe(19);
    expect(s.pass).toBe(false);
    expect(s.reason).toBe('values');
  });
  it('UK : 18 sur 24 passe, 17 échoue', () => {
    const e = buildExam(synth('uk', 40), 'uk', 3);
    const ans = e.questions.map((q, i) => (i < 18 ? q.answer : null));
    expect(score(e, ans).pass).toBe(true);
    ans[17] = null;
    expect(score(e, ans)).toMatchObject({ pass: false, correct: 17, reason: 'score' });
  });
  it('les banques d’amorce sont propres', () => {
    for (const b of [UK, AU, CAEN, CAFR]) expect(lintBank(b.questions as Question[])).toEqual([]);
  });
});

describe('coûts officiels', () => {
  it('UK : 1 709 £ + 130 £ de cérémonie + 50 £ de test = 1 889 £ pour un adulte', () => {
    expect(ukCost({ adults: 1, children: 0, ilrToPay: 0, testAttempts: 1, other: 0 }).total).toBe(1889);
  });
  it('Canada : 653 $ par adulte (530 + 123), 100 $ par mineur', () => {
    expect(caCost({ adults: 2, minors: 1, other: 0 }).total).toBe(2 * 653 + 100);
  });
  it('Australie : 595 $, 85 $ avec la Pensioner Concession Card, enfants de moins de 16 ans gratuits', () => {
    expect(auCost({ adults: 2, concession: 1, childrenUnder16: 2, other: 0 }).total).toBe(595 + 85);
  });
});
