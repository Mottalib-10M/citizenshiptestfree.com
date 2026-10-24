import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'uk-mock',
  group: 'uk',
  order: 13,
  tool: { kind: 'quiz', props: { country: 'uk', mode: 'exam', timed: true } },
  related: ['uk-test', 'uk-practice', 'uk-pass-mark', 'uk-questions', 'uk-cost'],
  sources: ['uk_test', 'uk_booking'],
  en: {
    slug: 'life-in-the-uk-test/mock-test',
    nav: 'Timed mock test',
    card: 'A timed Life in the UK mock test: 24 questions against a 45-minute clock, with your score split by chapter.',
    title: 'Life in the UK Mock Test: Timed 45-Minute Exam, Free',
    description: 'Life in the UK mock test with a real 45-minute clock: 24 mixed questions, no corrections until the end, then your score by chapter to see if you can book.',
    h1: 'Life in the UK mock test against the clock',
    intro: 'This mock runs like the real sitting: a clock counts down, nothing is corrected until you submit, and the review then shows which chapters cost you points.',
    resume: (h) => `A Life in the UK mock test is a full rehearsal of the real sitting: ${h.P.uk.test.questions} questions drawn from all five chapters of the handbook, answered in one go against a ${h.P.uk.test.minutes}-minute clock, with corrections held back until you submit. gov.uk says you must score ${h.pc(0.75)} or more to pass, which on ${h.P.uk.test.questions} questions means ${h.need.uk} correct answers, so you can afford ${h.P.uk.test.questions - h.need.uk} mistakes and no more. The mock on this page draws its questions from our bank of ${h.count.uk}, written by Radif Partners from the handbook's facts, and a new draw gives a different set each time. When the clock stops or you submit, the result shows your score, whether it reaches the mark, and how many points each chapter cost. That breakdown is the useful part: it tells you which chapter to rework before the next mock. Since each real sitting costs ${h.gbp(h.P.uk.test.fee)}, a few clear passes in mock conditions are a sensible threshold before you book.`,
    faqs: (h) => [
      { q: 'How many full mock tests should I sit before booking?', a: `There is no official number. Our own rule of thumb is three or more fresh draws in a row at ${h.need.uk + 2} correct answers or better, sat in one go with the clock running. One good score can be luck with the draw; a run of them shows the knowledge is spread across all five chapters, which is what the real test samples.` },
      { q: 'What should I do if I run out of time in a mock?', a: `First, check whether time was really the problem: ${h.P.uk.test.minutes} minutes for ${h.P.uk.test.questions} questions leaves almost two minutes each, more than most people need. Running out usually means getting stuck on a few hard questions. Next time, answer what you know, leave the rest and come back to them at the end, which the mock lets you do.` },
      { q: 'Is the timed mock harder than the real test?', a: 'It is built to be comparable, not harder. The questions check the same handbook facts, the clock and the number of questions are the same, and the mark is applied in the same way. The wording will differ, because the official questions are not published, so treat your mock result as an estimate rather than a promise.' },
      { q: 'Why do my mock scores go up and down from one draw to the next?', a: `Each draw takes a different mix of questions, and with only ${h.P.uk.test.questions} items a few questions on a weak topic move the score by several points. That swing exists on the day too. Look at the chapter breakdown across several mocks: a chapter that drops points every time is a real gap, a single bad draw is not.` },
    ],
    body: (h) => {
      const perQ = Math.floor((h.P.uk.test.minutes * 60) / h.P.uk.test.questions);
      const mins = Math.floor(perQ / 60), secs = perQ % 60;
      const third = Math.round(h.P.uk.test.questions / 3);
      return `
<h2>Set up real conditions</h2>
<p>A mock only predicts the real result if you sit it the way you will sit the test. Find ${h.P.uk.test.minutes} minutes in which nobody will interrupt you, put the handbook and your notes out of reach, and silence your phone. On the day, gov.uk says you cannot bring children or other family members with you to the centre, so practise alone too.</p>
<p>Choose the correction "At the end" so that nothing is revealed until you submit. Once you start, do not pause and restart: a mock taken in three short bursts measures your memory in three short bursts, not in one sitting.</p>
<h2>Pacing the ${h.P.uk.test.minutes} minutes</h2>
<p>The clock is generous: about ${mins} minute${mins === 1 ? '' : 's'} and ${secs} seconds per question. The aim is not to rush but to avoid getting stuck. Check your progress at a few points in the sitting.</p>
${h.table(['Time elapsed', 'Questions answered', 'If you are behind'], [
  [`${Math.round(h.P.uk.test.minutes / 3)} minutes`, `about ${third}`, 'Stop rereading questions you have already answered'],
  [`${Math.round((h.P.uk.test.minutes * 2) / 3)} minutes`, `about ${third * 2}`, 'Answer the remaining easy ones first'],
  [`${h.P.uk.test.minutes} minutes`, `all ${h.P.uk.test.questions}`, 'Never leave a blank: a guess can still score'],
], 'Checkpoints for a calm pace (Radif Partners suggestion, based on the official time and number of questions).', ['l', 'r', 'l'])}
<p>Most candidates finish well before the end. If you do, use the spare minutes to go back over the questions you flagged, rather than to reopen answers you were sure of.</p>
<h2>Reading your result</h2>
<p>When you submit, three numbers matter. The first is your score against the mark of ${h.need.uk}. The second is the margin: a pass by one point is a warning, a pass by four or five is solid. The third, and most useful, is the split by chapter. The real test can draw from any part of the handbook, so a chapter where you drop half your points is a risk however good your total looks.</p>
<p>After each mock, list the questions you missed and the chapter of each. Then work on that chapter alone in the ${h.a('uk-practice', 'chapter practice')} before your next full sitting. To check a single score quickly against the mark, the ${h.a('uk-pass-mark', 'pass mark page')} has a small calculator.</p>
<h2>A sign that you are ready</h2>
<p>We suggest booking once you clear the mark comfortably on several fresh draws in a row, with no chapter that keeps failing. This is our own advice, not an official rule. If your scores hover around ${h.need.uk}, wait a week and keep practising: a fail is not the end, but each new sitting costs another ${h.gbp(h.P.uk.test.fee)}, and the ${h.a('uk-cost', 'cost page')} shows how that adds to the rest of the citizenship bill.</p>
<h2>What the mock cannot rehearse</h2>
<p>Some parts of the day are only on gov.uk. You book online at least ${h.P.uk.test.bookAtLeastDaysAhead} days in advance and must bring the same original ID you booked with, not a copy or a screenshot. Your photo is taken at the centre to confirm your identity, and gov.uk says you will not be able to sit the test, or get a refund, if your ID is wrong or you refuse the photo. You can cancel or move the test and get your money back if you do so at least ${h.P.uk.test.bookAtLeastDaysAhead} days before; later than that, no refund.</p>
<p>If you pass, you receive a unique reference number, which your citizenship or settlement application asks for. If you fail, gov.uk lets you rebook as many times as you need. For the format of the test as a whole and an untimed version of this mock, see the ${h.a('uk-test', 'Life in the UK Test page')}.</p>`;
    },
  },
});
