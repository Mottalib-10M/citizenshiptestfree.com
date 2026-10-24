/**
 * Examens blancs : tirage reproductible (graine dans l'URL partagée) et correction selon la règle
 * de chaque pays, lue dans params-2026.json. Les questions sont écrites par Radif Partners à partir
 * des faits des guides officiels (data/questions/*.json) ; aucune n'est copiée d'un livre ni d'une appli.
 */
import P from '../../data/params-2026.json';

export type Country = 'uk' | 'au' | 'ca';
export interface Question {
  id: string;
  country: Country;
  lang: 'en' | 'fr';
  /** chapitre ou partie du guide officiel où se trouve le fait */
  chapter: string;
  /** Australie : question sur les valeurs (5 par examen, toutes à réussir) */
  values?: boolean;
  q: string;
  options: string[];
  answer: number;
  explain: string;
  /** où vérifier le fait : document officiel + section */
  ref: { doc: string; section: string; url: string };
}
export interface Exam { country: Country; seed: number; questions: Question[] }
export interface Score {
  correct: number;
  total: number;
  valuesCorrect?: number;
  valuesTotal?: number;
  pass: boolean;
  /** 'ok' | 'score' (pas assez de bonnes réponses) | 'values' (une question de valeurs manquée) */
  reason: 'ok' | 'score' | 'values';
  needed: number;
}

/** Générateur pseudo-aléatoire mulberry32 : même graine, même examen (lien partageable, hydratation). */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pick<T>(xs: T[], n: number, r: () => number): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

export function examSize(c: Country): number {
  return c === 'uk' ? P.uk.test.questions : c === 'au' ? P.au.test.questions : P.ca.test.questions;
}
export function passNeeded(c: Country): number {
  if (c === 'uk') return P.uk.test.passCorrect;
  if (c === 'ca') return P.ca.test.passCorrect;
  return Math.ceil((P.au.test.passPercent / 100) * P.au.test.questions);
}

export function buildExam(bank: Question[], country: Country, seed: number): Exam {
  const r = rng(seed);
  const own = bank.filter((q) => q.country === country);
  const n = examSize(country);
  let questions: Question[];
  if (country === 'au') {
    const v = P.au.test.valuesQuestions;
    const vals = own.filter((q) => q.values), rest = own.filter((q) => !q.values);
    if (vals.length < v || rest.length < n - v) throw new Error('banque australienne trop petite');
    questions = pick([...pick(vals, v, r), ...pick(rest, n - v, r)], n, r);
  } else {
    if (own.length < n) throw new Error(`banque ${country} trop petite`);
    questions = pick(own, n, r);
  }
  return { country, seed, questions };
}

/** answers[i] = index choisi pour la question i, ou null si sans réponse (compte comme faux). */
export function score(exam: Exam, answers: (number | null)[]): Score {
  const qs = exam.questions;
  const correct = qs.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);
  const needed = passNeeded(exam.country);
  if (exam.country === 'au') {
    const vi = qs.map((q, i) => (q.values ? i : -1)).filter((i) => i >= 0);
    const valuesCorrect = vi.filter((i) => answers[i] === qs[i].answer).length;
    const valuesOk = valuesCorrect === vi.length;
    const scoreOk = correct >= needed;
    return {
      correct, total: qs.length, valuesCorrect, valuesTotal: vi.length, needed,
      pass: valuesOk && scoreOk,
      reason: !valuesOk ? 'values' : scoreOk ? 'ok' : 'score',
    };
  }
  return { correct, total: qs.length, needed, pass: correct >= needed, reason: correct >= needed ? 'ok' : 'score' };
}

/** Contrôle d'une banque : identifiants uniques, réponse dans les options, source renseignée. */
export function lintBank(bank: Question[]): string[] {
  const errs: string[] = [];
  const seen = new Set<string>();
  for (const q of bank) {
    if (seen.has(q.id)) errs.push(`${q.id} : identifiant en double`);
    seen.add(q.id);
    if (q.options.length < 2 || q.answer < 0 || q.answer >= q.options.length) errs.push(`${q.id} : réponse hors des options`);
    if (new Set(q.options).size !== q.options.length) errs.push(`${q.id} : options en double`);
    if (!q.ref?.doc || !q.ref?.section || !q.ref?.url) errs.push(`${q.id} : source manquante`);
    if (!q.explain || q.explain.length < 20) errs.push(`${q.id} : explication trop courte`);
  }
  return errs;
}

/** Practice set: `n` questions of one chapter (or of the whole bank when `chapter` is null), same seed → same set. */
export function buildPractice(bank: Question[], chapter: string | null, seed: number, n = 10): Question[] {
  const own = chapter ? bank.filter((q) => q.chapter === chapter) : bank;
  return pick(own, Math.min(n, own.length), rng(seed));
}
/** Stable seed from a text (page id): the build and the browser draw the same first test. */
export function seedOf(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0;
  return h;
}
