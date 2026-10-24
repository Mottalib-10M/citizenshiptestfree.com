import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'au-practice',
  group: 'au',
  order: 31,
  tool: { kind: 'quiz', props: { country: 'au', mode: 'practice' } },
  related: ['au-test', 'au-questions', 'au-ocb', 'practice', 'au-residence'],
  sources: ['au_test', 'au_ocb'],
  en: {
    slug: 'australian-citizenship-test/practice',
    nav: 'Practice by part',
    card: 'Ten questions at a time from the part of Our Common Bond you choose, with the answer explained at once.',
    title: 'Citizenship Test Practice Australia: 10 Questions by Part',
    description: 'Australian citizenship test practice by part of Our Common Bond: ten questions at a time, each answer explained at once, and your weak part shown at the end.',
    h1: 'Australian citizenship test practice, part by part',
    intro: 'Pick one of the four parts, or all of them, and answer ten questions. Each answer is checked as you go, with a line on why it is right.',
    resume: (h) => `This practice mode is built for learning, not for marking. You choose one of the four parts of the testable section of Our Common Bond, or all four together, and get ${h.num(10)} questions from our bank of ${h.count.au}. After each answer the tool tells you whether you were right and why, in one or two sentences written from the booklet. You can switch the correction to the end if you prefer to keep a test feeling. Part 4, Australian values, deserves the most attention: in the real test all ${h.P.au.test.valuesQuestions} values questions must be right, whatever the overall mark, so a single mistake there means a fail. When you can answer every values question here without hesitating, move on to the ${h.a('au-test', 'full practice test')}, which has ${h.P.au.test.questions} questions, the ${h.P.au.test.minutes}-minute limit and both pass rules. Each new set of ten is drawn again, so repeating a part shows new questions until the part is exhausted.`,
    faqs: (h) => [
      { q: 'Which part of Our Common Bond should I practise first?', a: `Start with Part 4, Australian values, because it carries a rule of its own: all ${h.P.au.test.valuesQuestions} values questions in the test must be right. Then take the part where your score is lowest. The result of each set shows your score, and a full practice test shows it part by part.` },
      { q: 'Are these the questions of the real test?', a: 'No. The questions of the real test are not published, and Home Affairs says its own practice test is a sample whose questions will be different on the day. Ours are written by us from the facts in the testable section of Our Common Bond, which is what every real question is based on.' },
      { q: 'How many questions are there for each part?', a: (h.chapters.au.map((c, i) => `${c}: ${h.inChapter('au', i)}`).join('; ')) + '. The bank is checked by tests so that every question has one right answer that comes from the booklet.' },
    ],
    body: (h) => `
<h2>The four parts and what they ask</h2>
${h.table(['Part', 'Questions in our bank', 'What it covers'], [[h.chapters.au[0], h.inChapter('au', 0), 'Aboriginal and Torres Strait Islander peoples, the states and territories, national symbols and days'], [h.chapters.au[1], h.inChapter('au', 1), 'parliamentary democracy, the rule of law, freedoms, responsibilities of citizens'], [h.chapters.au[2], h.inChapter('au', 2), 'the Constitution, the three levels of government, parliament, the courts'], [h.chapters.au[3], h.inChapter('au', 3), 'freedom, respect, equality, and how Australians are expected to live together']], 'Our bank, by part of the testable section of Our Common Bond.', ['l', 'r', 'l'])}
<h2>A method that works in short sessions</h2>
<p>Read one part of ${h.src('au_ocb', 'Our Common Bond')} once, then do two sets of ten on that part here. Note each question you missed and read the booklet paragraph it comes from; the explanation under each answer says which idea it tests. The next day, do one set on all parts together before moving to the next part. After the four parts, take a full ${h.a('au-test', 'practice test')}: if your result shows one part below the others, go back to it here.</p>
<h2>Correction as you go or at the end</h2>
<p>By default the answer is checked as soon as you choose it, which is the fastest way to learn. Switch the option to "At the end" when you want to test yourself without help, closer to the real test where you only see the result once you finish. In both modes, the review lists each question with your answer and the right one.</p>
<h2>Why we do not copy questions</h2>
<p>Apps and books sometimes present "real test questions". The test questions are not published, so no one can give them. Every question here was prepared by us from the booklet, which Home Affairs publishes under a Creative Commons Attribution 4.0 licence (the Coat of Arms excepted); our questions are adapted from it, with attribution. The ${h.a('au-questions', 'questions page')} lists them all with their answers.</p>`,
  },
});
