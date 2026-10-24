import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'au-questions',
  group: 'au',
  order: 32,
  tool: { kind: 'bank', props: { country: 'au', chapter: 3 } },
  mini: { kind: 'mini:aupass' },
  related: ['au-test', 'au-practice', 'au-ocb', 'au-eligibility'],
  sources: ['au_test', 'au_ocb', 'au_pr'],
  en: {
    slug: 'australian-citizenship-test/questions',
    nav: 'Questions and answers',
    card: 'Every question of our bank with its answer, by part, starting with the values questions.',
    title: 'Citizenship Test Questions Australia: All 120 With Answers',
    description: 'Australian citizenship test questions with answers, by part of Our Common Bond, starting with the values questions you must all get right. Written by us, free.',
    h1: 'Australian citizenship test questions and answers',
    intro: 'All the questions of our bank, part by part, each with its answer and a short explanation. The page opens on Part 4, Australian values.',
    resume: (h) => `This page lists the ${h.count.au} questions of our Australian bank, ${h.inChapter('au', 0)} to ${h.inChapter('au', 3)} per part, each with its right answer and a one-line explanation. It opens on Part 4, Australian values, because those questions decide the result on their own: the official rule requires all ${h.P.au.test.valuesQuestions} values questions to be answered correctly, in addition to a mark of at least ${h.pc(h.P.au.test.passPercent / 100)} over the ${h.P.au.test.questions} questions. The values the booklet sets out include parliamentary democracy, the rule of law, living peacefully, respect for all individuals regardless of background, freedom of speech and of association, freedom of religion and secular government, equality of opportunity and equality between men and women. The questions are not the real ones, which are not published; we wrote each from the testable section of Our Common Bond. Choose another part in the list to see its questions, open a question to read its answer, then test yourself with the ${h.a('au-practice', 'practice mode')}.`,
    faqs: (h) => [
      { q: 'Why does a values question count more than the others?', a: `It does not count more in the mark, but it is a condition of its own. Home Affairs says you pass if you score ${h.pc(h.P.au.test.passPercent / 100)} or more and answer all ${h.P.au.test.valuesQuestions} values questions correctly. A missed values question therefore fails the test even with every other answer right.` },
      { q: 'Are the values questions trick questions?', a: 'In our bank they test whether you know what the booklet says about each value, for example that no person or group is above the law, or that change should come through discussion and the democratic process rather than violence. Read Part 4 carefully: the answers follow its wording of each idea, not personal opinion.' },
      { q: 'Can I print these questions?', a: 'Yes, the page prints with each question open. You can also come back to a part at any time: nothing is stored about you, and there is no account. For a timed run under test conditions, use the full practice test instead of reading the answers.' },
    ],
    body: (h) => {
      const x = h.q('au-v01');
      return `
<h2>Questions per part</h2>
${h.table(['Part', 'Questions'], h.chapters.au.map((c, i) => [c, h.inChapter('au', i)]), 'Our bank, written from the testable section of Our Common Bond.', ['l', 'r'])}
${x ? `<h2>An example from Part 4</h2>
<p><strong>${x.q}</strong> The right answer is "${x.options[x.answer]}". ${x.explain ?? ''}</p>` : ''}
<h2>How to use the list</h2>
<p>Read the questions of one part with the answers hidden, answer in your head, then open each one to check. Mark the ones you got wrong and read the paragraph of ${h.src('au_ocb', 'Our Common Bond')} they come from. When a part feels easy, test yourself on it in the ${h.a('au-practice', 'practice mode')}, where the answer choices are shuffled so you cannot rely on their position.</p>
<h2>Where the facts come from</h2>
<p>Every answer comes from the testable section of Our Common Bond, the booklet Home Affairs says is all you need to prepare. The department does not endorse any external course or paid app, and neither are we endorsed by it: this site is independent. When Home Affairs publishes a new edition of the booklet, the questions are checked against it.</p>`;
    },
  },
});
