/**
 * United States: naturalization civics test (2008 and 2025 versions, 65/20 special consideration),
 * N-400 eligibility date and N-400 fee. Pure functions; every rule comes from params-2026.json (P.us),
 * read on uscis.gov on 2026-10-25. "Today" is always an argument (hydration, RECETTE §17.5).
 */
import P from '../../data/params-2026.json';
import { rng } from './exam';
import { type Iso, type Trip, addDays, addMonths, addYears, dayNum, maxIso, absentDaysIn, isoOf } from './dates';

const U = P.us;
export type UsVersion = '2025' | '2008';
export type UsMode = 'full' | '6520';
export interface UsText { q: string; a: string[]; o?: string[]; note?: string }
export interface UsQuestion { id: string; n: number; theme: number; star: boolean; local?: boolean; current?: boolean; answer?: number; en: UsText; es: UsText }
export interface UsBankFile { meta: Record<string, string | boolean>; themes: { en: string[]; es: string[] }; questions: UsQuestion[] }

/* ------------------------------------------------------------------ which test */
/** The version follows the N-400 filing date: before 20 October 2025 → 2008 test, on or after → 2025 test. */
export const versionFor = (filed: Iso): UsVersion => (filed < U.cutoff ? '2008' : '2025');

export interface Rule { asked: number; pass: number; failAt: number; bank: number }
export function ruleOf(v: UsVersion, mode: UsMode = 'full'): Rule {
  if (mode === '6520') return { asked: U.s6520.asked, pass: U.s6520.passCorrect, failAt: U.s6520.failWrong, bank: U.s6520.bank };
  const t = v === '2025' ? U.test2025 : U.test2008;
  return { asked: t.asked, pass: t.passCorrect, failAt: t.failWrong, bank: t.bank };
}

export interface Exemptions { e6520: boolean; english: '50/20' | '55/15' | null; civicsInOwnLanguage: boolean }
/** Age and years as a permanent resident, both counted on the day the N-400 is filed. */
export function exemptions(age: number, lprYears: number): Exemptions {
  const e6520 = age >= U.s6520.age && lprYears >= U.s6520.years;
  const e = U.englishExempt.find((x) => age >= x.age && lprYears >= x.years);
  const english = e ? (`${e.age}/${e.years}` as '50/20' | '55/15') : null;
  return { e6520, english: e6520 ? (english ?? '55/15') : english, civicsInOwnLanguage: e6520 || !!english };
}

/* ------------------------------------------------------------------ the test */
function shuffle<T>(xs: T[], r: () => number): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
/** Questions that can be scored: answers that depend on where the applicant lives are never drawn. */
export const scorable = (bank: UsQuestion[]) => bank.filter((q) => !q.local && q.answer !== undefined);

/** A mock test: as many questions as the officer may ask, from the full list or from the 20 marked 65/20. */
export function drawUs(bank: UsQuestion[], v: UsVersion, mode: UsMode, seed: number): UsQuestion[] {
  const pool = scorable(bank).filter((q) => mode === 'full' || q.star);
  return shuffle(pool, rng(seed)).slice(0, ruleOf(v, mode).asked);
}
/** Practice set: `n` questions of one theme (or of the whole list when theme is null). */
export function practiceUs(bank: UsQuestion[], theme: number | null, seed: number, n = 10): UsQuestion[] {
  const pool = scorable(bank).filter((q) => theme === null || q.theme === theme);
  return shuffle(pool, rng(seed)).slice(0, Math.min(n, pool.length));
}

export interface UsScore { right: number; wrong: number; asked: number; status: 'running' | 'pass' | 'fail'; stoppedAt: number | null }
/**
 * The officer stops as soon as the result is settled: 12 right or 9 wrong (2025), 6 right or 5 wrong
 * (2008 and 65/20). `answers[i]` is the option chosen for question i, or null if not answered yet.
 */
export function scoreUs(qs: UsQuestion[], answers: Array<number | null>, rule: Rule): UsScore {
  let right = 0, wrong = 0;
  for (let i = 0; i < qs.length; i++) {
    const a = answers[i];
    if (a === null || a === undefined) break;
    if (a === qs[i].answer) right++; else wrong++;
    if (right >= rule.pass) return { right, wrong, asked: i + 1, status: 'pass', stoppedAt: i + 1 };
    if (wrong >= rule.failAt) return { right, wrong, asked: i + 1, status: 'fail', stoppedAt: i + 1 };
  }
  return { right, wrong, asked: right + wrong, status: 'running', stoppedAt: null };
}

/* ------------------------------------------------------------------ N-400 date */
export interface UsInput {
  route: '5' | '3';
  /** "Resident since" date printed on the green card */
  lpr: Iso;
  /** route 3 only: first day of marital union with a spouse who was already a U.S. citizen (marriage date, or the day the spouse naturalized if later) */
  union?: Iso | null;
  birth?: Iso | null;
  trips: Trip[];
}
export interface UsCheck { id: string; ok: boolean; value?: number | Iso | null; limit?: number | Iso; near?: boolean; warn?: boolean }
export interface UsVerdict { on: Iso; ok: boolean; checks: UsCheck[] }
export interface UsEarliest { date: Iso | null; anniversary: Iso; earliestByLaw: Iso; verdictToday: UsVerdict; verdictAtDate: UsVerdict | null }

/** 90-day early filing: the anniversary of the green card date minus 90 calendar days (USCIS example: card 4 July 2017 → 5 April 2022). */
export const earlyDate = (lpr: Iso, years: number) => addDays(addYears(lpr, years), -U.n400.earlyFilingDays);
/** Days in the United States from `from` to `to`, both included: departure and return days count as presence (Policy Manual 12 D.4). */
export function presenceDays(trips: Trip[], from: Iso, to: Iso): number {
  if (to < from) return 0;
  const span = dayNum(to) - dayNum(from) + 1;
  return span - trips.reduce((s, t) => s + absentDaysIn(t, from, to), 0);
}
/** Longest part of a single trip that falls inside the statutory period (whole days abroad). */
export function longestAbsence(trips: Trip[], from: Iso, to: Iso): number {
  return trips.reduce((m, t) => Math.max(m, absentDaysIn(t, from, to)), 0);
}
const NEAR = 5;
/** Last day of a trip for the absence rules: the return day, or `to` while still abroad. */
const endOf = (t: Trip, to: Iso) => t.back ?? to;
/** Whole days abroad of a trip (departure and return days are days of presence). */
const tripDays = (t: Trip, to: Iso) => absentDaysIn({ out: t.out, back: t.back ?? addDays(to, 1) }, t.out, endOf(t, to));
/** Absence of 1 year or more (365 days or more, Policy Manual 12 D.3): continuity is broken. */
export const isBreak = (t: Trip, to: Iso) => tripDays(t, to) >= U.n400.absenceBreakDays;
/** Absence of more than 6 months (more than 180 days) but less than 1 year: continuity is presumed broken, the applicant may rebut it. */
export const isPresumption = (t: Trip, to: Iso) => !isBreak(t, to) && tripDays(t, to) > U.n400.absencePresumptionDays;
export function usVerdict(x: UsInput, on: Iso): UsVerdict {
  const R = U.n400.routes[x.route];
  const from = maxIso(addYears(on, -R.years), x.lpr); // statutory period, counted as a permanent resident only
  const to = addDays(on, -1);
  const early = earlyDate(x.lpr, R.years);
  const pres = presenceDays(x.trips, from, to);
  const inPeriod = x.trips.filter((t) => t.out <= to && endOf(t, to) >= addYears(on, -R.years));
  const longest = longestAbsence(x.trips, addYears(on, -R.years), to);
  // After a break of 1 year or more, USCIS accepts an application 4 years and 1 day (3 years route: 2 years and 1 day) after the return.
  const breaks = inPeriod.filter((t) => isBreak(t, to));
  const lastBreakBack = breaks.length ? breaks.map((t) => endOf(t, to)).reduce((a, b) => (a > b ? a : b)) : null;
  const breakOk = !lastBreakBack || (!!x.trips.find((t) => endOf(t, to) === lastBreakBack)?.back && on >= addDays(addYears(lastBreakBack, R.years - 1), 1));
  // Presumption of a break: a trip of more than 6 months, or a break of 1 year or more whose return is less than
  // 4 years and 6 months ago (3-year route: 2 years and 6 months), Policy Manual 12 D.3 table.
  const presumption = inPeriod.some((t) => isPresumption(t, to) || (isBreak(t, to) && on < addMonths(addYears(endOf(t, to), R.years - 1), 6)));
  const checks: UsCheck[] = [
    { id: 'early', ok: on >= early, value: on, limit: early },
    { id: 'presence', ok: pres >= R.presenceDays, value: pres, limit: R.presenceDays, near: Math.abs(pres - R.presenceDays) <= NEAR },
    { id: 'break', ok: breakOk, value: longest },
    { id: 'presumption', ok: !presumption, value: longest, warn: true },
  ];
  if (x.route === '3') {
    const u = x.union ?? null;
    const lim = addYears(on, -U.n400.routes['3'].unionYears);
    checks.push({ id: 'union', ok: !!u && u <= lim, value: u, limit: lim });
  }
  if (x.birth) checks.push({ id: 'age', ok: addYears(x.birth, U.n400.minAge) <= on, value: x.birth, limit: addYears(on, -U.n400.minAge) });
  return { on, ok: checks.every((c) => c.ok || c.warn), checks };
}
const HORIZON = 365 * 20;
export function usEarliest(x: UsInput, today: Iso): UsEarliest {
  const R = U.n400.routes[x.route];
  const anniversary = addYears(x.lpr, R.years);
  const earliestByLaw = earlyDate(x.lpr, R.years);
  const starts = [earliestByLaw];
  if (x.route === '3' && x.union) starts.push(addYears(x.union, U.n400.routes['3'].unionYears));
  if (x.birth) starts.push(addYears(x.birth, U.n400.minAge));
  const verdictToday = usVerdict(x, today);
  let d = maxIso(today, ...starts);
  const stop = dayNum(today) + HORIZON;
  while (dayNum(d) <= stop) {
    const v = usVerdict(x, d);
    if (v.ok) return { date: d, anniversary, earliestByLaw, verdictToday, verdictAtDate: v };
    d = isoOf(dayNum(d) + 1);
  }
  return { date: null, anniversary, earliestByLaw, verdictToday, verdictAtDate: null };
}

/* ------------------------------------------------------------------ N-400 fee */
export type FpgArea = 'contiguous' | 'alaska' | 'hawaii';
/** Income limit (USD a year) at `pct` (150 or 400) of the poverty guidelines for a household size, per USCIS table effective 13 Jan 2026. */
export function fpgLimit(area: FpgArea, size: number, pct: 150 | 400): number {
  const t = U.fpg[area];
  const list = pct === 150 ? t.p150 : t.p400, add = pct === 150 ? t.p150Add : t.p400Add;
  const s = Math.max(1, Math.round(size));
  return s <= list.length ? list[s - 1] : list[list.length - 1] + add * (s - list.length);
}
export type FeeTier = 'full' | 'reduced' | 'waiver';
/** Which N-400 fee a household can ask for: at or below 150 % → fee waiver (I-912); below 400 % → reduced fee; else full. */
export function feeTier(area: FpgArea, size: number, income: number): FeeTier {
  if (income <= fpgLimit(area, size, 150)) return 'waiver';
  if (income < fpgLimit(area, size, 400)) return 'reduced';
  return 'full';
}
export interface UsFeeInput { adults: number; online: boolean; tier: FeeTier }
export interface UsFee { each: number; total: number; online: boolean; paperOnly: boolean }
/** Online filing is cheaper but impossible with a reduced fee or a waiver (paper N-400 only). */
export function usFee(x: UsFeeInput): UsFee {
  const F = U.fees;
  const paperOnly = x.tier !== 'full';
  const online = x.online && !paperOnly;
  const each = x.tier === 'waiver' ? F.waiver : x.tier === 'reduced' ? F.reduced : online ? F.online : F.paper;
  const n = Math.max(0, Math.round(x.adults));
  return { each, total: each * n, online, paperOnly };
}

/* ------------------------------------------------------------------ processing time and timeline */
const PT = U.processing;
/** Latest national median N-400 processing time (months) from the USCIS fact sheet. */
export const nationalMedianMonths = (PT.medianMonths as Record<string, number>)[PT.latestFy];
/** A processing time in months (decimals allowed) added to a date, at 365.25 / 12 days a month. */
export const afterMonths = (d: Iso, months: number) => addDays(d, Math.round((Math.max(0, months) * 365.25) / 12));
export interface UsTimelineInput {
  filed: Iso;
  /** months shown by the USCIS processing times tool for the field office, or the national median */
  months: number;
  interview?: Iso | null;
  ceremony?: Iso | null;
}
export interface UsTimeline { decisionBy: Iso; legalDecisionBy: Iso | null; hearingBy: Iso | null; hearingByMailed: Iso | null; ssaFrom: Iso | null }
/**
 * Dates that follow from public rules: the processing time read on USCIS counted from the filing date;
 * 120 days after the interview for the decision (after which the applicant may go to district court);
 * 30 days (33 if the denial notice was mailed) to request an N-400 hearing with Form N-336, counted from
 * a decision on the interview day; and at least 10 days after the oath before updating Social Security.
 */
export function usTimeline(x: UsTimelineInput): UsTimeline {
  const iv = x.interview ?? null;
  return {
    decisionBy: afterMonths(x.filed, x.months),
    legalDecisionBy: iv ? addDays(iv, PT.decisionDaysAfterInterview) : null,
    hearingBy: iv ? addDays(iv, PT.hearingRequestDays) : null,
    hearingByMailed: iv ? addDays(iv, PT.hearingRequestDaysMailed) : null,
    ssaFrom: x.ceremony ? addDays(x.ceremony, PT.ssaWaitDays) : null,
  };
}
