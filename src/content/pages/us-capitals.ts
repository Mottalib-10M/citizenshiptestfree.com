import { definePage } from '../../lib/guide-types';
import { STATES } from '../../data/us-states';

export default definePage({
  id: 'us-capitals',
  group: 'us',
  order: 83,
  tool: { kind: 'usdrill', props: { drill: 'capitals' } },
  related: ['us-senators', 'us-questions', 'us-test', 'us-presidents', 'us-branches'],
  sources: ['usagov_states', 'us_128', 'us_study'],
  en: {
    slug: 'state-capitals-quiz',
    nav: 'State capitals quiz',
    card: 'The capital of each of the 50 states, the cities people confuse with them, and a quiz that draws ten states at a time.',
    title: 'State Capitals Quiz 2026: All 50 States, Free, With Answers',
    description: 'State capitals quiz: the capital of all 50 states with the traps (New York City, Los Angeles, Chicago), the full list, and civics test question 62 explained.',
    h1: 'State capitals quiz: the 50 capitals',
    intro: 'Ten states per set, four choices each. The wrong choices often include a bigger, better-known city of the state, the classic mistake.',
    resume: (h) => `Each of the ${STATES.length} states has its own capital, the city where the governor, the legislature and the state courts sit, and in most states it is not the largest city. New York’s capital is Albany, not New York City; California’s is Sacramento, not Los Angeles; Illinois has Springfield, not Chicago; Pennsylvania has Harrisburg, not Philadelphia; Florida has Tallahassee, not Miami; Texas has Austin, not Houston. About a third of the capitals are also the biggest city of their state, such as Boston, Phoenix, Denver, Atlanta or Honolulu. For the naturalization test you only need your own: question 62 of the 2025 civics list (${h.us.n25} questions) asks “What is the capital of your state?”, and the answer depends on where you live. Residents of the District of Columbia answer that D.C. is not a state and has no capital; residents of a territory name the territory’s capital. The capital of the country, Washington, D.C., is question 119. The quiz above covers all ${STATES.length} states, so you can also learn your neighbors’.`,
    faqs: () => [
      { q: 'Which state capitals are also the largest city of their state?', a: 'Among others: Phoenix (Arizona), Denver (Colorado), Atlanta (Georgia), Honolulu (Hawaii), Boise (Idaho), Indianapolis (Indiana), Des Moines (Iowa), Boston (Massachusetts), Jackson (Mississippi), Oklahoma City, Providence (Rhode Island), Nashville (Tennessee), Salt Lake City (Utah) and Columbus (Ohio). Most other states put their capital in a smaller city, often chosen in the 1800s for being central.' },
      { q: 'What do I answer for the capital question if I live in Washington, D.C.?', a: 'USCIS tells officers to accept that D.C. is not a state and does not have a capital. Say it in a sentence: “D.C. is not a state, so it has no state capital.” The same logic applies to senators: D.C. residents answer that the District has no U.S. senators.' },
      { q: 'Is the state capital question on the 2008 test as well?', a: 'Yes. The 2008 list also asks for the capital of your state, with the same answer for D.C. and the territories. Whichever version you take, learn the capital of the state on your N-400 address; if you move before the interview, learn the new one.' },
    ],
    body: (h) => `
<h2>The 50 capitals</h2>
${h.table(['State', 'Capital'], STATES.map((s) => [s.name, s.capital]), 'The seat of each state government. Official state websites: USAGov, State governments.', ['l', 'l'])}
<h2>The traps the quiz uses</h2>
<p>The quiz puts a larger, better-known city among the wrong choices whenever there is one. These are the pairs that catch most people:</p>
<ul>
<li><strong>Albany</strong>, not New York City; <strong>Sacramento</strong>, not Los Angeles or San Francisco; <strong>Springfield</strong>, not Chicago.</li>
<li><strong>Harrisburg</strong>, not Philadelphia or Pittsburgh; <strong>Tallahassee</strong>, not Miami or Orlando; <strong>Austin</strong>, not Houston or Dallas.</li>
<li><strong>Olympia</strong>, not Seattle; <strong>Carson City</strong>, not Las Vegas; <strong>Frankfort</strong>, not Louisville; <strong>Lansing</strong>, not Detroit.</li>
<li><strong>Annapolis</strong>, not Baltimore; <strong>Jefferson City</strong>, not Kansas City or St. Louis; <strong>Juneau</strong>, not Anchorage.</li>
</ul>
<p>Two capitals share a name with another state’s city: Portland is the largest city of both Oregon and Maine, yet neither state’s capital; Charleston is the capital of West Virginia and also a major city of South Carolina, whose capital is Columbia.</p>
<h2>Question 62 at the interview</h2>
<p>The officer reads the question from the ${h.src('us_128', 'USCIS list of 128 civics questions')} and you answer aloud: the city alone is enough. Because the answer varies, it does not appear in the official answer key, so learn it with the other “answers will vary” questions: your two U.S. senators (question 23), your representative (question 29) and your governor (question 61). The ${h.a('us-senators', 'senators by state page')} gives the senators of every state and the official way to find your representative.</p>
<p>The ${h.src('usagov_states', 'USAGov directory of state governments')} links to the official website of each state, where the capital is named on the governor’s and the legislature’s pages.</p>
<h2>A quick way to learn them</h2>
<p>Run a set of ten, note the misses, then run new sets until a full set comes back clean. Most people already know fifteen to twenty; the rest come faster grouped by region, for example New England (Augusta, Concord, Montpelier, Boston, Providence, Hartford). Once the capitals stick, try the ${h.a('us-presidents', 'presidents quiz')} or go back to the ${h.a('us-test', 'full mock test')}.</p>
<p>Practice tool from an independent site, not affiliated with USCIS or any government agency.</p>`,
  },
});
