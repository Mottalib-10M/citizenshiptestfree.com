import { definePage } from '../../lib/guide-types';
import { STATES, SENATORS_READ } from '../../data/us-states';

const PARTY: Record<string, string> = { D: 'D', R: 'R', I: 'I' };

export default definePage({
  id: 'us-senators',
  group: 'us',
  order: 86,
  tool: { kind: 'ussenators' },
  related: ['us-capitals', 'us-branches', 'us-questions', 'us-interview', 'us-test'],
  sources: ['senate_list', 'congress_members', 'house_find', 'us_128', 'us_updates'],
  en: {
    slug: 'who-is-my-senator',
    nav: 'Who is my senator and representative',
    card: 'The two U.S. senators of every state, read from Congress.gov, and the official ZIP code lookup for your representative: questions 23 and 29 of the civics test.',
    title: 'Senators by State 2026: Who Is My Senator and Representative',
    description: 'Who is my senator? Pick your state to see both U.S. senators in office, find your representative by ZIP code on house.gov, answer civics questions 23 and 29.',
    h1: 'Who is my senator, and who is my representative?',
    intro: 'Choose your state: the tool shows its two U.S. senators and its capital. Your representative depends on your address, so the official House lookup finds it from your ZIP code.',
    resume: (h) => `Every state elects two U.S. senators for six-year terms, so the Senate has 100 members, and the senators of a state represent all of its residents. The House of Representatives has 435 voting members, each elected for two years by one congressional district: your representative therefore depends on your street address, not only your state, and a large state such as California has 52 districts. The naturalization civics test asks for both names: question 23, “Who is one of your state’s U.S. senators now?”, and question 29, “Name your U.S. representative.” One senator is enough for question 23. Residents of Washington, D.C. and of the territories answer that they have no U.S. senators, and territory residents may name their nonvoting delegate or resident commissioner for question 29. The senators in the tool are those listed as current members by Congress.gov, the Library of Congress service, read on ${h.date(SENATORS_READ)}. Because names change after an election, a resignation or an appointment, USCIS reminds applicants to check the current answer before the interview, as it does for the other questions marked as changing.`,
    faqs: () => [
      { q: 'How do I find my U.S. representative?', a: 'Use the official “Find Your Representative” page of the House of Representatives: type your ZIP code, and add your street address if the ZIP code is split between two districts. It gives the name and a link to the member’s website. Write the name down with your senators and your governor, then say all three aloud a few times before the interview.' },
      { q: 'What if a senator of my state changes before my interview?', a: 'Give the name of a senator in office on the day of the interview. A seat can change after a resignation, a death or an appointment by the governor, not only in November. USCIS publishes changing answers on its test updates page; check it and the Senate’s own list the week of your interview.' },
      { q: 'Do I have to know which party my senators belong to?', a: 'No. Questions 23 and 29 only ask for a name, and the party is never part of the answer. The tool shows the party only to help you tell the two senators apart and recognize them in the news, where they are often named with it.' },
    ],
    body: (h) => `
<h2>The 100 senators, state by state</h2>
${h.table(['State', 'Senators (party)', 'Capital'], STATES.map((s) => [s.name, s.senators.map((x) => `${x.name} (${PARTY[x.party]})`).join(', '), s.capital]), `D Democrat, R Republican, I Independent. Current members listed by Congress.gov, read on ${h.date(SENATORS_READ)}.`, ['l', 'l', 'l'])}
<p>The ${h.src('senate_list', 'Senate’s own list of senators')} publishes the same names with contact details; ${h.src('congress_members', 'Congress.gov')} gives each member’s record. This page reads the Library of Congress data because the Senate site refuses automated reading. If a name here differs from the Senate’s list on the day you read it, the Senate is right.</p>
<h2>Your representative: the official lookup</h2>
<p>A representative is tied to a congressional district, and districts follow street boundaries that change after each census. A ZIP code can straddle two districts. That is why this site does not guess from your state: the ${h.src('house_find', 'House of Representatives’ “Find your representative” page')} asks for your ZIP code, then your address if needed, and returns the right name. Six states have a single at-large representative for the whole state (Alaska, Delaware, North Dakota, South Dakota, Vermont and Wyoming); everywhere else, check your address, even in a small state.</p>
<h2>Answering questions 23 and 29</h2>
<ul>
<li><strong>Question 23:</strong> one name is enough: “One of my senators is …”. Learn both in case you blank on one.</li>
<li><strong>Question 29:</strong> the name of your representative. If you moved after filing, learn the one for your current address; the officer accepts the answer that matches where you live.</li>
<li><strong>Question 61 and 62:</strong> your governor and your state capital vary in the same way. The capital is shown in the tool above and on the ${h.a('us-capitals', 'state capitals page')}.</li>
<li><strong>D.C. and territories:</strong> USCIS accepts that D.C. or the territory has no U.S. senators, and, for question 29, the name of the nonvoting delegate or resident commissioner.</li>
</ul>
<p>The national names also change: the President, the Vice President and the Speaker of the House are in the ${h.src('us_updates', 'USCIS test updates')} list. The ${h.a('us-branches', 'branches of government page')} explains how the Senate and the House share the work.</p>
<p>This site is not a government website and is not affiliated with USCIS, the Senate or the House of Representatives.</p>`,
  },
});
