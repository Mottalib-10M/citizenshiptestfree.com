/**
 * Coût officiel d'une demande de citoyenneté, poste par poste. Montants : params-2026.json
 * (UK : tableau des frais du Home Office du 8 octobre 2026 ; CA : liste des frais d'IRCC ;
 * AU : formulaire 1298i de juillet 2026). Tout ce qui n'a pas de barème officiel (test d'anglais,
 * traductions, photos) est saisi par l'utilisateur, jamais estimé ici.
 */
import P from '../../data/params-2026.json';

export interface Line { id: string; amount: number; each?: number; count?: number }
export interface Cost { currency: 'GBP' | 'CAD' | 'AUD'; lines: Line[]; total: number }
const sum = (lines: Line[]) => lines.reduce((s, l) => s + l.amount, 0);

export interface UkCostInput {
  adults: number;
  /** enfants enregistrés comme citoyens britanniques (registration) */
  children: number;
  /** ILR encore à demander (frais de l'ILR pour chaque adulte et enfant) */
  ilrToPay: number;
  /** passages du Life in the UK test par adulte (1 = réussi du premier coup) */
  testAttempts: number;
  /** frais saisis par l'utilisateur (test d'anglais, traductions…) */
  other: number;
}
export function ukCost(x: UkCostInput): Cost {
  const F = P.uk.fees;
  const lines: Line[] = [
    { id: 'naturalisation', each: F.naturalisation, count: x.adults, amount: F.naturalisation * x.adults },
    { id: 'ceremony', each: F.ceremony, count: x.adults, amount: F.ceremony * x.adults },
    { id: 'lifeInUkTest', each: F.lifeInUkTest, count: x.adults * x.testAttempts, amount: F.lifeInUkTest * x.adults * x.testAttempts },
  ];
  if (x.children > 0) lines.push({ id: 'registrationChild', each: F.registrationChild, count: x.children, amount: F.registrationChild * x.children });
  if (x.ilrToPay > 0) lines.push({ id: 'ilr', each: F.ilr, count: x.ilrToPay, amount: F.ilr * x.ilrToPay });
  if (x.other > 0) lines.push({ id: 'other', amount: x.other });
  return { currency: 'GBP', lines, total: sum(lines) };
}

export interface CaCostInput { adults: number; minors: number; other: number }
export function caCost(x: CaCostInput): Cost {
  const F = P.ca.fees;
  const lines: Line[] = [
    { id: 'adultProcessing', each: F.adultProcessing, count: x.adults, amount: F.adultProcessing * x.adults },
    { id: 'rightOfCitizenship', each: F.rightOfCitizenship, count: x.adults, amount: F.rightOfCitizenship * x.adults },
  ];
  if (x.minors > 0) lines.push({ id: 'minor', each: F.minor, count: x.minors, amount: F.minor * x.minors });
  if (x.other > 0) lines.push({ id: 'other', amount: x.other });
  return { currency: 'CAD', lines, total: sum(lines) };
}

export interface AuCostInput {
  adults: number;
  /** adultes titulaires d'une Pensioner Concession Card (seule carte acceptée pour le tarif réduit) */
  concession: number;
  /** enfants de 15 ans ou moins sur le formulaire d'un parent : gratuit */
  childrenUnder16: number;
  other: number;
}
export function auCost(x: AuCostInput): Cost {
  const F = P.au.fees;
  const full = Math.max(0, x.adults - x.concession);
  const lines: Line[] = [{ id: 'general', each: F.general, count: full, amount: F.general * full }];
  if (x.concession > 0) lines.push({ id: 'generalConcession', each: F.generalConcession, count: x.concession, amount: F.generalConcession * x.concession });
  if (x.childrenUnder16 > 0) lines.push({ id: 'childOnParentForm', each: F.childOnParentForm, count: x.childrenUnder16, amount: 0 });
  if (x.other > 0) lines.push({ id: 'other', amount: x.other });
  return { currency: 'AUD', lines, total: sum(lines) };
}
