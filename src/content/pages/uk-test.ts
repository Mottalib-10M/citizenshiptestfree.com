import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'uk-test',
  group: 'uk',
  order: 10,
  tool: { kind: 'quiz', props: { country: 'uk', mode: 'exam' } },
  mini: { kind: 'mini:ukexempt' },
  related: ['uk-mock', 'uk-practice', 'uk-questions', 'uk-pass-mark', 'uk-cost', 'uk-citizenship'],
  sources: ['uk_test', 'uk_booking', 'uk_fees', 'uk_ilr', 'uk_earned'],
  en: {
    slug: 'life-in-the-uk-test',
    nav: 'Life in the UK Test',
    card: 'A free 24-question mock of the Life in the UK Test, marked against the 18 correct answers you need.',
    title: 'Life in the UK Test 2026: Free Mock Exam of 24 Questions',
    description: 'Life in the UK Test 2026: take a free 24-question mock exam marked like the real one (18 to pass), with every answer explained and the £50 booking rules.',
    h1: 'Life in the UK Test: free mock exam',
    intro: 'Twenty-four questions drawn from the five chapters of the official handbook, 45 minutes, 18 correct answers to pass. Answer below; the panel tells you where you stand after each question.',
    resume: (h) => `The Life in the UK Test is a computer test of ${h.P.uk.test.questions} multiple-choice questions on British history, institutions, laws and customs, taken in ${h.P.uk.test.minutes} minutes at one of the approved test centres. You need it for indefinite leave to remain and for British citizenship by naturalisation, unless you are under ${h.P.uk.test.exemptUnder}, aged ${h.P.uk.test.exemptFromAge} or over, have passed it before, or have a long-term condition confirmed by a form or a doctor's letter. It costs ${h.gbp(h.P.uk.test.fee)} each time you sit it, you book online at least ${h.P.uk.test.bookAtLeastDaysAhead} days ahead with an accepted ID, and you can rebook as often as you need after a fail. GOV.UK says you must score 75 % or more to pass, which is ${h.need.uk} correct answers out of ${h.P.uk.test.questions}. Every question comes from the official handbook, Life in the United Kingdom: A Guide for New Residents (3rd edition). The mock exam on this page draws ${h.P.uk.test.questions} of our ${h.count.uk} practice questions, spread over the handbook's five chapters, and marks them with the same rule.`,
    faqs: (h) => [
      { q: 'What do I need to bring on the day of the Life in the UK Test?', a: `Bring the same ID you used to book: gov.uk asks for the name on your booking to match it exactly. You then answer ${h.P.uk.test.questions} questions in ${h.P.uk.test.minutes} minutes on a computer. Keep the pass letter and its reference number you receive: the citizenship or settlement application asks for it, and gov.uk explains what to do if it is lost.` },
      { q: 'Can I take the Life in the UK Test in another language?', a: 'The test is taken in English. Most people who need it must also prove their English separately, through an approved English test or a degree taught in English, unless an exemption applies. Reading practice questions aloud and checking the meaning of words such as "devolved", "constituency" or "jury" is a good way to prepare both at once.' },
      { q: 'Does the test still use the 3rd edition of the handbook?', a: 'Yes. Questions are written only from Life in the United Kingdom: A Guide for New Residents, 3rd edition, which is the guide gov.uk names. Some facts in it are dated (it predates later changes to institutions and names), so our questions avoid points that have changed since it was published and anything that depends on who holds an office today.' },
      { q: 'Is the Life in the UK Test changing with earned settlement?', a: 'The Home Office consulted on an "earned settlement" model for indefinite leave to remain, which also mentions changes to citizenship, and the consultation closed on 12 February 2026. As of our last check, no new rule had come into force, so the test, its fee and its format are unchanged. We will update this page when the final policy is published.' },
    ],
    body: (h) => `
<h2>How the real test is built</h2>
<p>The test is a single sitting of ${h.P.uk.test.questions} multiple-choice questions on a computer. Only the number of right answers counts, so an unanswered question is simply a lost point: it is always worth giving your best guess. The mock above lets you go back to an earlier question before you submit, so you can leave a hard one and return to it.</p>
<p>With ${h.P.uk.test.minutes} minutes for ${h.P.uk.test.questions} questions you have almost two minutes per question, which is plenty for a question you know. The difficulty is the breadth of the handbook, which runs from the Stone Age to the devolved parliaments, and its love of precise facts: dates, numbers of members, the patron saint of each nation, which sport was invented where.</p>
${h.table(['Rule', 'Figure', 'Where it comes from'], [['Questions', h.P.uk.test.questions, 'gov.uk test page'], ['Time allowed', `${h.P.uk.test.minutes} minutes`, 'gov.uk test page'], ['Correct answers to pass', `${h.need.uk} (75 %)`, 'gov.uk test guide'], ['Fee per sitting', h.gbp(h.P.uk.test.fee), 'gov.uk test page'], ['Booking', `online, at least ${h.P.uk.test.bookAtLeastDaysAhead} days ahead`, 'gov.uk test page'], ['Attempts', 'no limit, paid each time', 'gov.uk test page']], 'The Life in the UK Test in figures, read on gov.uk on ' + h.date(h.P.retrieved_at) + '.', ['l', 'r', 'l'])}
<h2>The five chapters you are tested on</h2>
<p>Questions can come from any part of the handbook's five chapters. Our bank follows the same division, with ${h.inChapter('uk', 0)} questions on values and principles, ${h.inChapter('uk', 1)} on what the UK is, ${h.inChapter('uk', 2)} on history, ${h.inChapter('uk', 3)} on modern society and ${h.inChapter('uk', 4)} on government, the law and your role. The history chapter is the longest in the handbook and usually weighs most in a real sitting, so the ${h.a('uk-practice', 'chapter-by-chapter practice')} is the best place to work on it.</p>
<ul>
<li><strong>${h.chapters.uk[0]}</strong>: the fundamental principles of British life (democracy, the rule of law, individual liberty, tolerance, participation) and the responsibilities that come with living in the UK.</li>
<li><strong>${h.chapters.uk[1]}</strong>: the four nations, Great Britain and the United Kingdom, the Crown dependencies and the overseas territories.</li>
<li><strong>${h.chapters.uk[2]}</strong>: from early Britain and the Romans to the Tudors, the Civil War, the Empire, both world wars and the post-war period.</li>
<li><strong>${h.chapters.uk[3]}</strong>: religion, festivals, sport, the arts, literature, leisure and places of interest.</li>
<li><strong>${h.chapters.uk[4]}</strong>: the constitution, Parliament, elections, the devolved administrations, the courts, taxes, driving and how to help your community.</li>
</ul>
<h2>Booking: what you need</h2>
<p>You book on the official service at gov.uk, at least ${h.P.uk.test.bookAtLeastDaysAhead} days before the date you want. You need an email address, a debit or credit card and an accepted form of ID. If you have an eVisa, gov.uk asks you to use a share code from your UK Visas and Immigration account; otherwise a valid passport, an EU, Swiss, Icelandic, Liechtenstein or Norwegian identity card, or another travel document with a photo can be used. The name on your booking must match your ID exactly. There are over 30 test centres in the UK and you pick one when you book. ${h.gbp(h.P.uk.test.fee)} is charged for every sitting, including a retake.</p>
<h2>How to use this mock exam</h2>
<p>Choose "At the end" to sit it as in a real centre: answers are recorded without correction and the review comes when you submit. Choose "As I go" to learn: each answer is corrected straight away with a short explanation of the fact behind it. A new draw gives you ${h.P.uk.test.questions} other questions from the bank; the link in your address bar then replays the same draw, which is handy to compare results with a partner who is preparing too. For a timed sitting with a 45-minute clock, use the ${h.a('uk-mock', 'timed mock test')}; to read every question with its answer, open the ${h.a('uk-questions', 'question bank')}.</p>
<p>A sensible routine is one chapter a day with the practice mode, then two or three full mocks in the last week. Our own rule of thumb: book the real test once you clear the mark with a few answers to spare on several fresh draws. A score that only just reaches ${h.need.uk} is a reason to wait a little, because a fail costs another ${h.gbp(h.P.uk.test.fee)} and a new booking.</p>
<h2>What the test is part of</h2>
<p>Passing the test is one condition among several. For citizenship you also need to meet the residence requirement, the good character requirement and the English language requirement, then pay the naturalisation fee of ${h.gbp(h.P.uk.fees.naturalisation)} and the ceremony fee of ${h.gbp(h.P.uk.fees.ceremony)}. The ${h.a('uk-citizenship', 'British citizenship page')} works out the first date you can apply with your trips abroad, and the ${h.a('uk-cost', 'cost page')} adds every fee for your household.</p>
<p>If you already passed the test for indefinite leave to remain, you do not take it again for citizenship: you use the same pass. Keep your pass notification letter or reference number, because the application asks for it.</p>
<h2>Our questions are not the official ones</h2>
<p>No official question bank is published. Every question here was written by Radif Partners from facts covered by the handbook's chapters, checked against official and reference sources, and none is copied from the handbook, from an app or from another site. They train you on the same facts, but the wording on the day will be different. The official handbook, sold by its publisher, remains the only text the real test draws on.</p>`,
  },
});
