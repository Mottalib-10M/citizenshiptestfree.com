import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-eligibility',
  group: 'ca',
  order: 54,
  tool: { kind: 'mini:cadays' },
  mini: { kind: 'mini:catestage' },
  related: ['ca-presence', 'ca-fee', 'ca-test', 'ca-discover', 'home'],
  sources: ['ca_eligibility', 'ca_bulletin', 'ca_rescalc', 'ca_study'],
  en: {
    slug: 'canadian-citizenship/eligibility',
    nav: 'Canadian citizenship eligibility',
    card: 'Every condition for an adult to apply, and how many days of presence you still miss.',
    title: 'Citizenship Eligibility Canada 2026: The Six Conditions',
    description: 'Canadian citizenship eligibility in 2026: permanent residence, 1,095 days in 5 years, taxes, language, the test and prohibitions, missing days counted.',
    h1: 'Canadian citizenship eligibility: what an adult must meet',
    intro: 'Enter your days in Canada: the tool says how many are still missing. The conditions IRCC sets for adults follow.',
    resume: (h) => `To apply for Canadian citizenship as an adult you must meet six conditions on the day you apply, as IRCC lists them. You must hold valid permanent resident status. You must have been physically present in Canada for at least ${h.num(h.P.ca.presence.requiredDays)} days, three years, in the ${h.P.ca.presence.windowYears} years before you apply, including at least ${h.num(h.P.ca.presence.requiredDays - h.P.ca.presence.preprMaxCredit)} days as a permanent resident; each day as a temporary resident or protected person in that window counts as half a day, up to ${h.P.ca.presence.preprMaxCredit} days. You may need to have filed taxes for at least ${h.P.ca.presence.taxYearsRequired} of those ${h.P.ca.presence.windowYears} years. If you are ${h.P.ca.test.ages[0]} to ${h.P.ca.test.ages[1]}, you must prove English or French at level ${h.P.ca.presence.languageLevel} and pass the citizenship test. And you must not be under a prohibition. The tool above turns your days into the number still missing; the ${h.a('ca-presence', 'physical presence calculator')} gives the exact first date with your trips.`,
    faqs: (h) => [
      { q: 'Does time on a work or study permit count towards citizenship?', a: `Yes, within limits. Each day you spent in Canada as a temporary resident (worker, student, visitor) or as a protected person during the ${h.P.ca.presence.windowYears}-year window counts as half a day, and this credit is capped at ${h.P.ca.presence.preprMaxCredit} days. So two full years on a work permit before permanent residence bring the maximum credit, and you still need ${h.num(h.P.ca.presence.requiredDays - h.P.ca.presence.preprMaxCredit)} days as a permanent resident.` },
      { q: 'Does time in prison or on probation count as time in Canada?', a: 'No. IRCC states that time spent serving a term of imprisonment, on parole or on probation does not count as time in Canada. Such periods are taken out of your physical presence, and a current sentence can also be a prohibition that stops the application altogether. These cases are decided by IRCC on the file.' },
      { q: 'Do children have to meet the same conditions?', a: 'Not all of them. Minors under 18 do not prove language skills and do not take the test. A minor applying with a Canadian parent, or with a parent applying at the same time, does not need the three years of presence; a minor applying alone does. Minors aged 14 to 17 take the oath at the ceremony, younger children do not.' },
    ],
    body: (h) => `
<h2>The six conditions, one by one</h2>
${h.table(['Condition', 'Rule for an adult', 'Checked by this site'], [['Permanent resident status', 'valid PR status on the day you apply', 'no'], ['Physical presence', `${h.num(h.P.ca.presence.requiredDays)} days in ${h.P.ca.presence.windowYears} years, of which ${h.num(h.P.ca.presence.requiredDays - h.P.ca.presence.preprMaxCredit)} as PR`, 'yes, day by day'], ['Income tax', `filed for ${h.P.ca.presence.taxYearsRequired} of the ${h.P.ca.presence.windowYears} years, if required`, 'no'], ['Language', `level ${h.P.ca.presence.languageLevel} in English or French, ages ${h.P.ca.test.ages[0]} to ${h.P.ca.test.ages[1]}`, 'no'], ['Citizenship test', `${h.need.ca} of ${h.P.ca.test.questions}, ages ${h.P.ca.test.ages[0]} to ${h.P.ca.test.ages[1]}`, 'practice only'], ['Prohibitions', 'none in force', 'no']], `Conditions listed on the IRCC eligibility page, read on ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<h2>Physical presence: where most applications go wrong</h2>
<p>The ${h.num(h.P.ca.presence.requiredDays)} days are counted on a moving window: the ${h.P.ca.presence.windowYears} years that end the day before your application. Each day of the window is either a day in Canada or a day of absence. A day of absence is a day spent entirely outside Canada: the day you leave and the day you come back both count as days in Canada. Days before permanent residence count for half, up to the cap. The result changes every day: a trip from four years ago may leave the window next month and give you days back, while a long trip planned for the summer may push your date later. That is why the ${h.a('ca-presence', 'calculator')} asks for every trip, past and planned.</p>
<p>IRCC provides its own ${h.src('ca_rescalc', 'physical presence calculator')}, and it is worth running before you apply: it checks the date you give it. Ours searches forward for the first date on which the count is met, so the two are complementary.</p>
<h2>Tax filing</h2>
<p>IRCC asks applicants who were required to file taxes under the Income Tax Act to have done so for at least ${h.P.ca.presence.taxYearsRequired} of the ${h.P.ca.presence.windowYears} years. Whether you were required depends on your income and situation each year, under the rules of the Canada Revenue Agency; this site does not assess it.</p>
<h2>Language and test</h2>
<p>Between ${h.P.ca.test.ages[0]} and ${h.P.ca.test.ages[1]} on the day you sign, you send proof of speaking and listening at level ${h.P.ca.presence.languageLevel} with your application, from an accepted test, diploma or certificate, and you later take the ${h.a('ca-test', 'citizenship test')}. Outside that age band neither is required, which the small tool above shows.</p>
<h2>Prohibitions</h2>
<p>Some situations stop an application whatever the days, such as a sentence being served; IRCC lists them on its eligibility pages. They are assessed on your file and this site does not judge them.</p>`,
  },
});
