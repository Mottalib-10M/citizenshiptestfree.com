import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-test',
  group: 'ca',
  order: 50,
  tool: { kind: 'quiz', props: { country: 'ca', mode: 'exam' } },
  mini: { kind: 'mini:capass' },
  related: ['ca-practice', 'ca-questions', 'ca-discover', 'ca-presence', 'ca-fee', 'ca-eligibility'],
  sources: ['ca_study', 'ca_guide', 'ca_eligibility', 'ca_fees'],
  en: {
    slug: 'canadian-citizenship-test',
    nav: 'Canadian citizenship test',
    card: 'A 20-question practice test marked like the IRCC test: 15 correct answers to pass, every answer explained.',
    title: 'Citizenship Test Canada 2026: Free 20-Question Practice',
    description: 'Canadian citizenship test 2026: a free 20-question practice test marked like the IRCC test (15 to pass), with explained answers drawn from Discover Canada.',
    h1: 'Canadian citizenship test: free practice exam',
    intro: 'Twenty questions from the ten chapters of Discover Canada, 15 correct answers to pass, as in the real test. Answer below and watch your score against the mark.',
    resume: (h) => `The Canadian citizenship test is a ${h.P.ca.test.minutes}-minute test of ${h.P.ca.test.questions} questions, multiple choice or true or false, offered in English or French. You pass with at least ${h.need.ca} correct answers, and IRCC gives you ${h.P.ca.test.attempts} chances to pass. Every applicant aged ${h.P.ca.test.ages[0]} to ${h.P.ca.test.ages[1]} must take it; children under 18 do not. The questions cover the rights and responsibilities of citizens and Canada's history, geography, economy, government, laws and symbols, all taken from the free official study guide, Discover Canada: The Rights and Responsibilities of Citizenship. The test does not grade your English or French, which you prove separately at level ${h.P.ca.presence.languageLevel}. You do not book it yourself: IRCC invites you once your application is being processed, so the first task is to be eligible, with ${h.num(h.P.ca.presence.requiredDays)} days of physical presence in the last ${h.P.ca.presence.windowYears} years. The practice exam above draws ${h.P.ca.test.questions} of our ${h.count.caEn} English questions across the guide's chapters and marks them with the same rule.`,
    faqs: (h) => [
      { q: 'Are the questions true or false or multiple choice?', a: 'IRCC says the test mixes both: multiple-choice questions with several options and true-or-false statements. Our practice questions use four options, which is harder than a true-or-false item, so a score that clears the mark here is a comfortable sign. Read every option to the end: two choices often differ by a single word, such as federal and provincial.' },
      { q: 'Can I choose to take the citizenship test in French?', a: `Yes. The test is offered in English or French and the guide exists in both languages, under the titles Discover Canada and Découvrir le Canada. Our French practice test was written separately in French, with ${h.count.caFr} questions of its own, so you can switch language without meeting the same sentences translated.` },
      { q: 'Does the citizenship test check my English?', a: `No. IRCC states that the test has no questions that assess language skills. Language is a separate requirement for applicants aged ${h.P.ca.test.ages[0]} to ${h.P.ca.test.ages[1]}: you send an accepted certificate, diploma or test result showing speaking and listening at level ${h.P.ca.presence.languageLevel}, and an officer may also note how well you communicate if you are invited to an interview.` },
    ],
    body: (h) => `
<h2>The test in figures</h2>
${h.table(['Rule', 'Figure'], [['Questions', h.P.ca.test.questions], ['Correct answers to pass', `${h.need.ca} (75 %)`], ['Time', `${h.P.ca.test.minutes} minutes`], ['Chances to pass', h.P.ca.test.attempts], ['Who takes it', `applicants aged ${h.P.ca.test.ages[0]} to ${h.P.ca.test.ages[1]}`], ['Languages', 'English or French'], ['Separate fee', 'none, it is part of the application']], `Read on the IRCC study page and eligibility page on ${h.date(h.P.retrieved_at)}.`, ['l', 'r'])}
<p>With ${h.P.ca.test.minutes} minutes for ${h.P.ca.test.questions} questions there is time to read each one twice. The mark leaves room for ${h.P.ca.test.questions - h.need.ca} mistakes, no more: a sixth wrong answer is a fail.</p>
<h2>What the ten chapters ask</h2>
<p>Discover Canada is short, about the length of a long magazine, but dense. Our ${h.count.caEn} questions follow its ten chapters, about ${h.inChapter('ca', 0)} per chapter. Some themes deserve more time than their page count suggests:</p>
<ul>
<li><strong>Government and elections.</strong> The difference between federal, provincial and municipal powers, the roles of the Sovereign, the Governor General and the Prime Minister, how a bill becomes law, and who can vote. Many wrong answers come from mixing up two levels of government.</li>
<li><strong>History.</strong> A long chain of events from the first peoples and New France to Confederation, the World Wars and the Charter. Dates matter less than the order of events and why they mattered.</li>
<li><strong>Regions and symbols.</strong> Provinces, territories and capitals, the five regions, the flag, the anthem, the national symbols. Easy points if you learn them, lost points if you do not.</li>
<li><strong>Rights and responsibilities.</strong> The Charter of Rights and Freedoms, equality of women and men, and what a citizen owes in return, from obeying the law to serving on a jury.</li>
</ul>
<p>The ${h.a('ca-practice', 'practice page')} lets you work one chapter at a time, and the ${h.a('ca-questions', 'question list')} shows every question with its answer.</p>
<h2>From application to test</h2>
<p>Unlike the Life in the UK Test, the Canadian test is not something you book. You send your application with the fee of ${h.cad(h.P.ca.fees.adult)} for an adult, IRCC checks that it is complete, and you then receive an invitation to the test. That is why eligibility comes first: the requirements are checked on the day you apply, so an application sent before the last of your days are reached does not meet them, whatever your test score would have been. The ${h.a('ca-presence', 'physical presence calculator')} finds the first day on which your ${h.num(h.P.ca.presence.requiredDays)} days are met, counting each trip, and the ${h.a('ca-eligibility', 'eligibility page')} lists the other conditions.</p>
<h2>How to get ready in three weeks</h2>
<ol>
<li>Week one: read Discover Canada once from cover to cover without taking notes, then do one practice set per chapter with the correction shown at once.</li>
<li>Week two: go back to the chapters where you scored below eight out of ten, read them again and redo their sets with new draws.</li>
<li>Week three: take full practice exams with the correction at the end, as in the real test, until you clear the mark with a margin several times in a row.</li>
</ol>
<p>Pace is a matter of taste, but the order matters: chapter work first, full exams last.</p>
<h2>Our questions and the official test</h2>
<p>IRCC does not publish its question bank. Our questions were written by Radif Partners from the facts of Discover Canada, never copied from it or from any other source, and each names the chapter where the answer can be checked. Questions on who holds office today and on facts that have changed since the guide was printed are left out. They train you on the right material; the real test will word things its own way.</p>`,
  },
});
