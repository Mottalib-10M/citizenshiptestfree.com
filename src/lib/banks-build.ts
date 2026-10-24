/** Build-time access to every bank (never imported by a client component). */
import UK from '../data/questions/uk.json';
import AU from '../data/questions/au.json';
import CAEN from '../data/questions/ca-en.json';
import CAFR from '../data/questions/ca-fr.json';
import type { Question } from './engine/exam';
import type { BankKey } from './banks';
export const BANKS: Record<BankKey, Question[]> = {
  uk: UK.questions as Question[], au: AU.questions as Question[], 'ca-en': CAEN.questions as Question[], 'ca-fr': CAFR.questions as Question[],
};
