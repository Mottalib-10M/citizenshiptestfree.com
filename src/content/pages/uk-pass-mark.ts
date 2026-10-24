import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'uk-pass-mark',
  group: 'uk',
  order: 15,
  tool: { kind: 'mini:ukpass' },
  mini: { kind: 'mini:ukattempts' },
  related: ['uk-mock', 'uk-test', 'uk-cost', 'uk-practice', 'uk-citizenship'],
  sources: ['uk_test', 'uk_booking'],
  en: {
    slug: 'life-in-the-uk-test/pass-mark',
    nav: 'Pass mark',
    card: 'The Life in the UK Test pass mark explained: 24 questions, 18 correct answers, and what happens after a pass or a fail.',
    title: 'Life in the UK Test Pass Mark: 18 of 24 Questions Needed',
    description: 'Life in the UK Test pass mark: 24 questions in 45 minutes, 75 % or more to pass, so 18 right answers. Check a score and see what a pass or a fail leads to.',
    h1: 'Life in the UK Test pass mark',
    intro: 'Type the number of answers you got right in a mock: the box tells you whether that is a pass and by how much. The page then explains what each outcome means on the real day.',
    resume: (h) => `The Life in the UK Test has ${h.P.uk.test.questions} questions and you have ${h.P.uk.test.minutes} minutes to answer them. gov.uk states that you must score ${h.pc(0.75)} or more to pass, and on ${h.P.uk.test.questions} questions that threshold is ${h.need.uk} correct answers: ${h.need.uk - 1} is a fail, however close. Put the other way, you can get up to ${h.P.uk.test.questions - h.need.uk} questions wrong and still pass. A pass gives you a unique reference number, which the Home Office uses to check your result when you apply for settlement or citizenship; there is no grade beyond pass or fail, so a narrow pass serves exactly like a perfect score. After a fail, gov.uk lets you rebook as many times as you need, but each sitting is paid again at ${h.gbp(h.P.uk.test.fee)} and must be booked at least ${h.P.uk.test.bookAtLeastDaysAhead} days ahead. The calculator above turns a mock score into a pass or fail with the margin, and the one below shows what extra sittings add to the bill.`,
    faqs: (h) => [
      { q: 'Is the pass mark the same for every candidate?', a: `Yes. gov.uk gives one rule for everyone: a score of ${h.pc(0.75)} or more. There is no lower mark for older candidates, no curve based on how others did on the day and no separate threshold per chapter. Since every sitting has ${h.P.uk.test.questions} questions, the mark always works out at ${h.need.uk} correct answers.` },
      { q: 'What is the unique reference number I get after passing?', a: 'It is the proof of your pass. You enter it in your citizenship or settlement application, and the Home Office uses it to check that you passed. People who sat the test before 17 December 2019 have a letter with a "test reference ID" instead. If that letter is lost, gov.uk says to send a letter explaining so with your application.' },
      { q: 'How soon can I rebook after failing the test?', a: `gov.uk sets no waiting period after a fail: you can rebook as many times as you need. The only timing rule is the general one for every booking, at least ${h.P.uk.test.bookAtLeastDaysAhead} days in advance. In practice, give yourself enough time to work on the chapters that cost you points, so that the next ${h.gbp(h.P.uk.test.fee)} is not spent on the same gaps.` },
      { q: 'Does it matter how far above the mark I score?', a: `Not for your application. The result is a pass or a fail, and the Home Office checks only that you passed. Where the margin matters is before the test: a mock score just at ${h.need.uk} means one unlucky draw could become a fail, while a few answers to spare give you room for nerves and unfamiliar wording.` },
    ],
    body: (h) => {
      const n = h.P.uk.test.questions, need = h.need.uk;
      const rows = [n, need + 3, need + 1, need, need - 1, need - 3].map((r) => [String(r), h.pc(r / n), r >= need ? 'Pass' : 'Fail', r >= need ? `${r - need} to spare` : `${need - r} short`]);
      return `
<h2>The rule in three numbers</h2>
<p>Three figures define the test: ${n} questions, ${h.P.uk.test.minutes} minutes and a pass threshold of ${h.pc(0.75)}. The first two are printed on the gov.uk booking page, and the third appears in the part of the same guide that explains what happens at the test. Multiply them out and you get the figure most candidates remember: ${need} correct answers.</p>
<p>Because ${need} of ${n} is exactly ${h.pc(need / n)}, there is no rounding to worry about. A score of ${need - 1} is ${h.pc((need - 1) / n, 1)}, below the line, and gov.uk does not mention any appeal or re-marking for a near miss.</p>
<h2>Scores and outcomes</h2>
${h.table(['Correct answers', 'Score', 'Outcome', 'Margin'], rows, `How a score of correct answers out of ${n} translates against the threshold of ${h.pc(0.75)}.`, ['r', 'r', 'l', 'l'])}
<p>The threshold is a share of correct answers, so a question on the date of a battle is worth one answer, just like one on the role of a jury, so there is no point in spending ten minutes on one difficult item: move on, answer the rest, and come back if time allows.</p>
<h2>If you pass</h2>
<p>You receive a unique reference number. Keep it with your other immigration papers, because both the settlement and the citizenship forms ask for it, and gov.uk says the Home Office uses it to check your result. If you pass for indefinite leave to remain, you do not sit the test again for naturalisation: gov.uk lists "have passed it before" among the cases where no test is needed.</p>
<p>Candidates from before 17 December 2019 hold a pass letter with a "test reference ID" rather than a reference number. If that letter has gone missing, gov.uk asks you to include a letter explaining that it is lost with your citizenship or settlement application.</p>
<h2>If you fail</h2>
<p>A fail does not close any door. gov.uk is short on the point: you can rebook the test as many times as you need, and you pay each time. What a fail does cost is time and money: another ${h.gbp(h.P.uk.test.fee)}, another booking at least ${h.P.uk.test.bookAtLeastDaysAhead} days ahead, and possibly a later application date if you were waiting on the pass to apply.</p>
<p>Before rebooking, sit a few ${h.a('uk-mock', 'timed mock tests')} and look at which chapters lose you points. Rebooking straight away for the next free slot, without changing how you prepare, tends to give the same result.</p>
<h2>How close is close enough?</h2>
<p>In a mock, ${need} is the line between pass and fail, but it is not a comfortable target. With ${n} questions, two or three unfamiliar items on a topic you skimmed can take a good candidate below it. Our own advice is to aim for a few answers above the mark across several mixed mocks before you book. The ${h.a('uk-practice', 'chapter practice')} is the place to lift a weak chapter, and the ${h.a('uk-cost', 'cost page')} shows the full set of official fees around the test.</p>
<h2>What the pass is for</h2>
<p>For citizenship, the Home Office guidance lists sufficient knowledge of life in the UK as one requirement among several: knowledge of English, Welsh or Scottish Gaelic, residence and good character are assessed separately. The ${h.a('uk-citizenship', 'British citizenship page')} sets them out, with a calculator for the earliest date you can apply.</p>`;
    },
  },
});
