import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-branches',
  group: 'us',
  order: 85,
  tool: { kind: 'usdrill', props: { drill: 'branches' } },
  related: ['us-senators', 'us-amendments', 'us-billofrights', 'us-presidents', 'us-questions'],
  sources: ['usagov_branches', 'nara_const', 'us_128', 'us_study'],
  en: {
    slug: 'branches-of-government',
    nav: 'Three branches of government',
    card: 'Legislative, executive and judicial: who does what, how each one checks the others, and a quiz with the USCIS questions on the topic.',
    title: 'Branches of Government 2026: Congress, President, Courts',
    description: 'The three branches of government explained: Congress, the President and the courts, checks and balances, the civics test answers, and a free 10-question quiz.',
    h1: 'The three branches of government',
    intro: 'Who makes, carries out and interprets federal law? Ten questions per set, with the reason after each answer.',
    resume: (h) => `The federal government of the United States has three branches, each created by its own article of the Constitution. The legislative branch, Congress, makes the laws (Article I); it has two chambers, the Senate with 100 senators, two per state, elected for six years, and the House of Representatives with 435 voting members elected for two years by congressional district. The executive branch carries out the laws (Article II): the President, elected for four years and limited to two terms, the Vice President, the Cabinet and the federal departments and agencies. The judicial branch explains and applies the laws (Article III): the Supreme Court, whose nine justices are nominated by the President and confirmed by the Senate, and the lower federal courts. The system is built on separation of powers and checks and balances: the President can veto a bill, Congress can override the veto with two-thirds of each chamber, the Senate confirms judges, and the courts can strike down a law that goes against the Constitution. Questions 15 to 51 of the 2025 civics list (${h.us.n25} questions in all) cover this ground, starting with “Name the three branches of government.”`,
    faqs: () => [
      { q: 'Why does the United States have three branches?', a: 'So that no single part of the government becomes too powerful. USCIS accepts “checks and balances”, “separation of powers” or “so one part does not become too powerful” for question 15. The founders had lived under a king and then under the weak Articles of Confederation, and wanted power divided but able to act.' },
      { q: 'Is the Vice President part of Congress or of the executive branch?', a: 'Both, in a way. The Vice President belongs to the executive branch and becomes President if the President can no longer serve, but the Constitution also makes the Vice President the President of the Senate, with a vote only to break a tie. In everyday work, the role is executive.' },
      { q: 'Are state governments a fourth branch?', a: 'No. States have their own three branches: a governor, a state legislature and state courts. Federal and state governments share power under federalism, a separate idea from the three branches. The civics test asks about it too, for example which powers belong to the states, such as providing schooling or issuing a driver’s license.' },
    ],
    body: (h) => `
<h2>Who does what</h2>
${h.table(['', 'Legislative', 'Executive', 'Judicial'], [
  ['Article', 'I', 'II', 'III'],
  ['Who', 'Congress: Senate and House', 'President, Vice President, Cabinet, agencies', 'Supreme Court and federal courts'],
  ['Main job', 'Makes federal laws', 'Carries out and enforces laws', 'Interprets laws, settles disputes'],
  ['Members', '100 senators, 435 representatives', 'President elected for 4 years', '9 justices, appointed for life'],
  ['Checks on the others', 'Overrides vetoes, confirms nominees, impeaches', 'Vetoes bills, nominates judges', 'Strikes down unconstitutional laws and acts'],
], 'Summary from the Constitution (National Archives transcription) and USAGov, Branches of government.', ['l', 'l', 'l', 'l'])}
<h2>Checks and balances, in five moves</h2>
<ol>
<li>Congress passes a bill; the President signs it into law or vetoes it.</li>
<li>Congress can override a veto with two-thirds of the House and two-thirds of the Senate.</li>
<li>The President nominates judges and ambassadors; the Senate confirms or rejects them.</li>
<li>The courts can find a law or an executive action contrary to the Constitution.</li>
<li>The House can impeach a President or a judge, and the Senate holds the trial.</li>
</ol>
<p>Money follows the same logic: Congress sets taxes and approves spending, the executive branch collects and spends within those limits. ${h.src('usagov_branches', 'USAGov’s page on the branches')} sums it up for each one, with the agencies under the President.</p>
<h2>The numbers to know for the test</h2>
<ul>
<li>100 senators, 2 per state, 6-year terms (questions 21, 22 and 27).</li>
<li>435 voting representatives, 2-year terms, more for states with more people (questions 24, 25 and 35).</li>
<li>The President is elected for 4 years and can serve two terms (questions 36 and 37).</li>
<li>If the President can no longer serve, the Vice President becomes President (question 40).</li>
</ul>
<p>Two questions depend on where you live: one of your state’s U.S. senators (23) and your representative (29). The ${h.a('us-senators', 'senators by state page')} lists both senators of every state and links to the House lookup by ZIP code.</p>
<h2>Answering aloud</h2>
<p>For “Name the three branches of government”, both “legislative, executive and judicial” and “Congress, the President and the courts” are accepted by the ${h.src('us_128', 'USCIS list')}. For “What does the judicial branch do?”, any of reviewing laws, explaining laws, resolving disputes about the law or deciding whether a law goes against the Constitution works. Short, plain sentences are best: the officer checks your knowledge and your spoken English at the same time.</p>
<p>The quiz above mixes questions written from Articles I to III with the official USCIS questions on the topic. When it comes back clean, the ${h.a('us-amendments', 'amendments quiz')} and the ${h.a('us-test', 'full mock test')} are the next steps. Independent practice site, not affiliated with USCIS.</p>`,
  },
});
