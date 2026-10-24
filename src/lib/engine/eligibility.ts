/**
 * Date à partir de laquelle on peut demander la citoyenneté : Royaume-Uni (naturalisation, sections 6(1)
 * et 6(2) du British Nationality Act 1981), Canada (présence effective de 1 095 jours) et Australie
 * (general residence requirement, s. 22 de l'Australian Citizenship Act 2007).
 *
 * Moteur pur : toutes les limites viennent de params-2026.json (P), « aujourd'hui » est un argument.
 * Ne juge que la condition de séjour (et l'âge) : caractère, langue, test et impôts sont rappelés
 * comme conditions à remplir, jamais tranchés ici.
 */
import P from '../../data/params-2026.json';
import { Iso, Trip, addDays, addMonths, addYears, dayNum, isAbroadAllDay, maxIso, totalAbsent } from './dates';

export interface Check {
  id: string;
  ok: boolean;
  /** valeur constatée (jours, date…) et limite de la règle, pour l'affichage */
  value?: number | Iso | null;
  limit?: number | Iso;
  /** à moins de `near` jours de la limite : le résultat dépend du relevé exact des dates */
  near?: boolean;
}
export interface Verdict {
  /** date de demande examinée */
  on: Iso;
  ok: boolean;
  checks: Check[];
}
export interface Earliest {
  /** première date de dépôt possible à partir de `today` (null si aucune dans l'horizon) */
  date: Iso | null;
  verdictToday: Verdict;
  verdictAtDate: Verdict | null;
}

const NEAR = 5; // jours : marge sous laquelle on conseille de vérifier les tampons et relevés officiels
const HORIZON_DAYS = 365 * 20;

function search(today: Iso, start: Iso, test: (on: Iso) => Verdict): Earliest {
  const verdictToday = test(today);
  let d = maxIso(today, start);
  const stop = dayNum(today) + HORIZON_DAYS;
  while (dayNum(d) <= stop) {
    const v = test(d);
    if (v.ok) return { date: d, verdictToday, verdictAtDate: v };
    d = addDays(d, 1);
  }
  return { date: null, verdictToday, verdictAtDate: null };
}

/* ------------------------------------------------------------------ Royaume-Uni */
export interface UkInput {
  route: '6(1)' | '6(2)';
  /** premier jour de présence au Royaume-Uni (début du séjour) */
  firstEntry: Iso;
  /** date d'obtention de l'ILR, du settled status ou de l'ILE (null si pas encore) */
  ilr: Iso | null;
  /** date de naissance (facultative : sert au contrôle des 18 ans) */
  birth?: Iso | null;
  trips: Trip[];
}
export function ukVerdict(x: UkInput, on: Iso): Verdict {
  const R = x.route === '6(1)' ? P.uk.naturalisation.route61 : P.uk.naturalisation.route62spouse;
  // Guidance : début de la période = lendemain de la date de demande moins la période (1/9/2022 → 2/9/2017).
  const start = addDays(addYears(on, -R.years), 1);
  const abs = totalAbsent(x.trips, start, on);
  const l12 = totalAbsent(x.trips, addDays(addMonths(on, -12), 1), on);
  const checks: Check[] = [
    { id: 'presentAtStart', ok: x.firstEntry <= start && !isAbroadAllDay(x.trips, start), value: x.firstEntry, limit: start },
    { id: 'absences', ok: abs <= R.maxAbsenceDays, value: abs, limit: R.maxAbsenceDays, near: Math.abs(R.maxAbsenceDays - abs) <= NEAR },
    { id: 'absences12m', ok: l12 <= R.maxAbsenceLast12m, value: l12, limit: R.maxAbsenceLast12m, near: Math.abs(R.maxAbsenceLast12m - l12) <= NEAR },
    {
      id: 'settled',
      ok: x.ilr !== null && x.ilr <= addMonths(on, -R.ilrHeldMonths),
      value: x.ilr,
      limit: addMonths(on, -R.ilrHeldMonths),
    },
  ];
  if (x.birth) checks.push({ id: 'age', ok: addYears(x.birth, P.uk.naturalisation.minAge) <= on, value: x.birth, limit: addYears(on, -P.uk.naturalisation.minAge) });
  return { on, ok: checks.every((c) => c.ok), checks };
}
export function ukEarliest(x: UkInput, today: Iso): Earliest {
  const R = x.route === '6(1)' ? P.uk.naturalisation.route61 : P.uk.naturalisation.route62spouse;
  const starts = [addDays(addYears(x.firstEntry, R.years), -1)];
  if (x.ilr) starts.push(addMonths(x.ilr, R.ilrHeldMonths));
  if (x.birth) starts.push(addYears(x.birth, P.uk.naturalisation.minAge));
  return search(today, maxIso(...starts), (on) => ukVerdict(x, on));
}
/** Dépassement d'au plus 30 jours : la guidance demande d'exercer la discrétion (affiché comme tel, jamais comme acquis). */
export function ukWithinDiscretion(v: Verdict): boolean {
  const a = v.checks.find((c) => c.id === 'absences')!;
  const others = v.checks.filter((c) => c.id !== 'absences').every((c) => c.ok);
  return !a.ok && others && (a.value as number) - (a.limit as number) <= 30;
}

/* ------------------------------------------------------------------ Canada */
export interface CaInput {
  /** date où la résidence permanente a été obtenue */
  pr: Iso;
  /** début du séjour autorisé avant la RP (résident temporaire ou personne protégée), null sinon */
  tempStart: Iso | null;
  birth?: Iso | null;
  trips: Trip[];
}
export interface CaCount { prDays: number; preDays: number; preCredit: number; total: number }
/** Jours crédités dans les 5 ans qui précèdent la date de demande (le jour de la demande ne compte pas). */
export function caCount(x: CaInput, on: Iso): CaCount {
  const C = P.ca.presence;
  const wFrom = addYears(on, -C.windowYears), wTo = addDays(on, -1);
  const span = (a: Iso, b: Iso) => (b >= a ? dayNum(b) - dayNum(a) + 1 - totalAbsent(x.trips, a, b) : 0);
  const prDays = x.pr <= wTo ? span(maxIso(x.pr, wFrom), wTo) : 0;
  const preDays = x.tempStart ? span(maxIso(x.tempStart, wFrom), addDays(x.pr < wTo ? x.pr : addDays(wTo, 1), -1)) : 0;
  const preCredit = Math.min(C.preprMaxCredit, preDays * C.preprFactor);
  return { prDays, preDays, preCredit, total: prDays + preCredit };
}
export function caVerdict(x: CaInput, on: Iso): Verdict {
  const C = P.ca.presence;
  const n = caCount(x, on);
  const checks: Check[] = [
    { id: 'pr', ok: x.pr < on, value: x.pr, limit: on },
    { id: 'presence', ok: n.total >= C.requiredDays, value: n.total, limit: C.requiredDays, near: Math.abs(n.total - C.requiredDays) <= NEAR },
  ];
  if (x.birth) checks.push({ id: 'age', ok: addYears(x.birth, 18) <= on, value: x.birth, limit: addYears(on, -18) });
  return { on, ok: checks.every((c) => c.ok), checks };
}
export function caEarliest(x: CaInput, today: Iso): Earliest {
  // Au mieux 365 jours crédités avant la RP : jamais avant RP + 730 jours.
  const start = addDays(x.pr, P.ca.presence.requiredDays - P.ca.presence.preprMaxCredit);
  return search(today, start, (on) => caVerdict(x, on));
}

/* ------------------------------------------------------------------ Australie */
export interface AuInput {
  /** début de la résidence régulière (premier séjour sur un visa valide) */
  lawfulStart: Iso;
  /** début de la résidence permanente (date de délivrance du visa permanent sur place, ou première entrée avec lui) */
  pr: Iso;
  /** Néo-Zélandais titulaire d'un visa 189 (NZ stream) délivré le 1/1/2023 ou après : pas de 12 mois de RP exigés */
  nz189?: boolean;
  birth?: Iso | null;
  trips: Trip[];
}
export function auVerdict(x: AuInput, on: Iso): Verdict {
  const R = P.au.residence;
  const from4 = addYears(on, -R.lawfulYears), to = addDays(on, -1);
  const abs = totalAbsent(x.trips, from4, to);
  const l12 = totalAbsent(x.trips, addMonths(on, -12), to);
  const prLimit = x.nz189 ? on : addMonths(on, -R.prMonths);
  const checks: Check[] = [
    // La période de 4 ans peut commencer à l'étranger si la personne était déjà venue avant (FOI fa-250801434).
    { id: 'lawful4y', ok: x.lawfulStart <= from4, value: x.lawfulStart, limit: from4 },
    { id: 'pr12m', ok: x.pr <= prLimit, value: x.pr, limit: prLimit },
    { id: 'absences', ok: abs <= R.maxAbsenceDays, value: abs, limit: R.maxAbsenceDays, near: Math.abs(R.maxAbsenceDays - abs) <= NEAR },
    { id: 'absences12m', ok: l12 <= R.maxAbsenceLast12m, value: l12, limit: R.maxAbsenceLast12m, near: Math.abs(R.maxAbsenceLast12m - l12) <= NEAR },
  ];
  if (x.birth) checks.push({ id: 'age', ok: addYears(x.birth, 18) <= on, value: x.birth, limit: addYears(on, -18) });
  return { on, ok: checks.every((c) => c.ok), checks };
}
export function auEarliest(x: AuInput, today: Iso): Earliest {
  const R = P.au.residence;
  const starts = [addYears(x.lawfulStart, R.lawfulYears), x.nz189 ? x.pr : addMonths(x.pr, R.prMonths)];
  if (x.birth) starts.push(addYears(x.birth, 18));
  return search(today, maxIso(...starts), (on) => auVerdict(x, on));
}
