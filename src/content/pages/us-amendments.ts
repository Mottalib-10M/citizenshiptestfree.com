import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-amendments',
  group: 'us',
  order: 84,
  tool: { kind: 'usdrill', props: { drill: 'amendments' } },
  related: ['us-billofrights', 'us-branches', 'us-presidents', 'us-questions', 'us-test'],
  sources: ['nara_27', 'nara_const', 'nara_bor', 'us_128'],
  en: {
    slug: 'constitutional-amendments',
    nav: 'Constitutional amendments (27)',
    card: 'All 27 amendments to the Constitution with their year, the four about voting, and a quiz on amendments 11 to 27 and the amendment process.',
    title: 'Constitutional Amendments 2026: All 27 in Order, With Quiz',
    description: 'The 27 constitutional amendments in order, with the year each was ratified, the four voting amendments of the civics test, and a free 27 amendments quiz online.',
    h1: 'The 27 amendments to the Constitution',
    intro: 'Ten questions per set on amendments 11 to 27 and on how the Constitution is amended. The first ten have their own quiz on the Bill of Rights page.',
    resume: (h) => `The U.S. Constitution has 27 amendments. The first ten, ratified together in 1791, form the Bill of Rights. The other seventeen came one at a time over two centuries: the 13th abolished slavery in 1865, the 14th made everyone born or naturalized in the United States a citizen in 1868, the 15th barred race as a reason to deny the vote in 1870, the 16th allowed the income tax and the 17th the direct election of senators in 1913, the 18th started Prohibition in 1919 and the 21st repealed it in 1933, the 19th gave women the vote in 1920, the 22nd limited presidents to two terms in 1951, the 24th banned poll taxes in 1964, the 26th set the voting age at 18 in 1971, and the 27th, about congressional pay, was ratified in 1992 after waiting since 1789. Under Article V, two-thirds of both houses of Congress propose an amendment and three-fourths of the states ratify it. The civics test asks how the Constitution is changed (question 5), how many amendments it has (question 7), the four voting amendments (question 63) and which one defines citizenship (question 97), among the ${h.us.n25} questions of the 2025 list.`,
    faqs: () => [
      { q: 'Which four amendments are about voting?', a: 'The 15th (1870) bars denying the vote because of race or color, the 19th (1920) because of sex, the 24th (1964) forbids poll taxes in federal elections, and the 26th (1971) sets the voting age at 18. USCIS question 63 asks you to describe one of them; “citizens 18 and older can vote” is the simplest answer.' },
      { q: 'Has an amendment ever been repealed?', a: 'Once. The 18th Amendment banned making, selling and transporting alcohol from 1920; the 21st Amendment repealed it in 1933. It is the only amendment that cancels another, and the 21st is also the only one ratified by state conventions instead of state legislatures.' },
      { q: 'Why did the 27th Amendment take 202 years?', a: 'It was one of the twelve amendments Congress sent to the states in 1789, with no deadline for ratification. It collected too few states at the time, then a renewed campaign in the 1980s brought it to three-fourths of the states in 1992. It says a pay raise Congress votes for itself starts only after the next House election.' },
    ],
    body: (h) => `
<h2>All 27 amendments</h2>
${h.table(['No.', 'Year', 'Subject'], [
  ['1 to 10', '1791', 'Bill of Rights: speech, religion, arms, searches, trials, punishments, reserved powers'],
  ['11', '1795', 'Limits federal lawsuits against a state by citizens of another state'],
  ['12', '1804', 'Separate electoral votes for President and Vice President'],
  ['13', '1865', 'Abolishes slavery'],
  ['14', '1868', 'Citizenship by birth or naturalization, due process, equal protection'],
  ['15', '1870', 'No denial of the vote for race or color'],
  ['16', '1913', 'Federal income tax'],
  ['17', '1913', 'Direct election of senators'],
  ['18', '1919', 'Prohibition of alcohol (repealed)'],
  ['19', '1920', 'Women’s right to vote'],
  ['20', '1933', 'Terms start on January 20 (President) and January 3 (Congress)'],
  ['21', '1933', 'Repeals the 18th'],
  ['22', '1951', 'Two-term limit for presidents'],
  ['23', '1961', 'Electors for Washington, D.C.'],
  ['24', '1964', 'No poll tax in federal elections'],
  ['25', '1967', 'Presidential succession and disability'],
  ['26', '1971', 'Voting age of 18'],
  ['27', '1992', 'Congressional pay raises wait for the next election'],
], 'Years of ratification. Text: National Archives transcriptions of the Constitution and of amendments 11 to 27.', ['l', 'l', 'l'])}
<p>The full wording of amendments 11 to 27 is on the ${h.src('nara_27', 'National Archives page of constitutional amendments')}; the first ten are explained on the ${h.a('us-billofrights', 'Bill of Rights page')}.</p>
<h2>How an amendment is made</h2>
<p>Article V of the ${h.src('nara_const', 'Constitution')} gives two ways to propose an amendment: two-thirds of both the House and the Senate, or a convention called at the request of two-thirds of the state legislatures. Only the first has ever been used. Ratification then needs three-fourths of the states, today 38 of 50, voting through their legislatures or through special conventions. The President has no formal role: an amendment is not signed or vetoed.</p>
<p>That high bar explains the small number. Thousands of amendments have been introduced in Congress; 33 were sent to the states, and 27 were ratified.</p>
<h2>The amendments the civics test asks about</h2>
<ul>
<li><strong>Question 5:</strong> how changes are made to the Constitution. Answer: amendments, or the amendment process.</li>
<li><strong>Question 7:</strong> how many amendments. Answer: twenty-seven.</li>
<li><strong>Question 37:</strong> why a president can serve only two terms. Accepted: because of the 22nd Amendment.</li>
<li><strong>Question 63:</strong> describe one voting amendment (15th, 19th, 24th or 26th).</li>
<li><strong>Question 97:</strong> the amendment that makes people born or naturalized here citizens. Answer: the 14th.</li>
<li><strong>Question 102:</strong> when all women got the vote. 1920, with the 19th Amendment, is accepted.</li>
</ul>
<p>Every accepted answer is in the ${h.src('us_128', 'USCIS list of 128 questions')}. On the day, you answer aloud; the year and the number are both good anchors.</p>
<h2>Why the 14th matters to you</h2>
<p>For someone naturalizing, the 14th Amendment is the one that describes what happens at the oath: “All persons born or naturalized in the United States, and subject to the jurisdiction thereof, are citizens of the United States and of the State wherein they reside.” From the ${h.a('us-oath', 'oath ceremony')} on, it applies to you exactly as to a citizen by birth, with one exception written elsewhere in the Constitution: only a natural born citizen can become President.</p>
<p>The quiz above draws ten questions per set. The ${h.a('us-branches', 'branches of government quiz')} covers Articles I to III, and the ${h.a('us-test', 'mock civics test')} the whole USCIS list. This site is independent and not connected to USCIS.</p>`,
  },
});
