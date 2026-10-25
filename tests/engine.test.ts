import { describe, expect, it } from 'vitest';
import { absentDaysIn, addYears, checkTrips, totalAbsent } from '../src/lib/engine/dates';
import { rng, seedOf } from '../src/lib/engine/exam';

describe('comptage des absences (jours entiers seulement : le jour du départ et celui du retour comptent comme présence)', () => {
  it('parti le 22 septembre, revenu le 23 → aucune absence', () => {
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

describe('tirage reproductible', () => {
  it('même graine, même suite', () => {
    const a = rng(seedOf('home')), b = rng(seedOf('home'));
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });
  it('graines différentes pour des pages différentes', () => {
    expect(seedOf('home')).not.toBe(seedOf('us-practice'));
  });
  it('somme des absences sur plusieurs voyages', () => {
    expect(totalAbsent([{ out: '2026-10-05', back: '2026-10-09' }, { out: '2026-11-01', back: '2026-11-03' }], '2026-01-01', '2026-12-31')).toBe(4);
  });
});
