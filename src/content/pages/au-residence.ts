import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'au-residence',
  group: 'au',
  order: 35,
  tool: { kind: 'date', props: { country: 'au' } },
  related: ['au-eligibility', 'au-processing', 'au-cost', 'au-test', 'home'],
  sources: ['au_rescalc', 'au_pr', 'au_foi'],
  en: {
    slug: 'australian-citizenship/residence-calculator',
    nav: 'Residence calculator',
    card: 'The first date you meet the 4-year, 12-month and absence rules, with every trip counted, planned ones included.',
    title: 'Residence Calculator for Australian Citizenship: First Date',
    description: 'Australian citizenship residence calculator: the first date you meet the 4-year, 12-month PR and absence rules, every trip counted, future trips included.',
    h1: 'Australian citizenship residence calculator: your first date to apply',
    intro: 'Enter the day you started living in Australia on a visa, the day your permanent visa started and every trip: the first day you can apply appears on the right.',
    resume: (h) => `The general residence requirement for Australian citizenship by conferral has three parts, all measured back from the day you apply. You must have lived in Australia on a valid visa for the ${h.P.au.residence.lawfulYears} years immediately before that day; you must have held a permanent visa for the last ${h.P.au.residence.prMonths} months; and you must not have been absent for more than ${h.P.au.residence.maxAbsenceDays} days in total over the ${h.P.au.residence.lawfulYears} years, nor more than ${h.P.au.residence.maxAbsenceLast12m} days in the last ${h.P.au.residence.prMonths} months. This calculator tries each day from today onwards and gives the first one where all three are met. On counting, a Home Affairs instruction released under freedom of information says that days on which you arrived in or departed from Australia count as days in Australia, so only the days fully abroad are absences; the calculator follows that rule. Home Affairs's own residence calculator checks one date you type; this one searches for the date, and you can add trips you have only planned.`,
    faqs: (h) => [
      { q: 'My first arrival was less than four years ago. Can I apply?', a: `Not under the general requirement. The Home Affairs instruction is explicit: if your first arrival in Australia is less than ${h.P.au.residence.lawfulYears} years before you apply, you cannot meet the requirement, even after three years without leaving. The ${h.P.au.residence.lawfulYears}-year period can start while you are overseas, but only if you had been in Australia at some point before it.` },
      { q: 'Does a weekend in New Zealand count against the 90 days?', a: `Only the days fully outside Australia count. Leaving on a Friday and coming back on a Sunday is one day of absence, the Saturday, because departure and arrival days count as days in Australia. Short trips add up, though: in the ${h.P.au.residence.prMonths} months before you apply, the total must stay at or under ${h.P.au.residence.maxAbsenceLast12m} days.` },
      { q: 'Where do I find the exact dates of my past trips?', a: 'Home Affairs lets you request your international movement records, and says the request is free of charge. Home Affairs assesses residence with the data it holds at the time you lodge, not with what you type in a calculator, so it is worth checking your dates against those records before applying close to the limit.' },
    ],
    body: (h) => `
<h2>The three rules, measured from the day you apply</h2>
${h.table(['Rule', 'Requirement'], [['Lawful residence', `${h.P.au.residence.lawfulYears} years living in Australia on a valid visa`], ['Permanent visa', `held for the last ${h.P.au.residence.prMonths} months`], ['Absences over the period', `${h.P.au.residence.maxAbsenceDays} days in total at most`], [`Absences in the last ${h.P.au.residence.prMonths} months`, `${h.P.au.residence.maxAbsenceLast12m} days at most`], ['Day of departure or arrival', 'counts as a day in Australia']], `Home Affairs residence calculator page and permanent resident page (updated ${h.date(h.P.au.residence.pageUpdated)}); counting rule from FOI document FA 25/08/01434.`, ['l', 'l'])}
<h2>The worked example from Home Affairs</h2>
<p>The instruction released under freedom of information gives an example. Mr Barnaby first entered Australia on 1 January 2016 and became a permanent resident on 1 January 2019. He was away from 7 September 2017 to 30 June 2018, then from 23 March to 29 May 2019, and applied on 1 January 2020. The document counts ${h.num(296)} and ${h.num(67)} days, a total of ${h.num(363)}, and concludes that he meets the requirement because he stays under ${h.P.au.residence.maxAbsenceDays} days. Those figures are the differences between the dates; counting only the days fully abroad, as the same document's rule says, gives ${h.num(295)} and ${h.num(66)}, so ${h.num(361)}. Either way he is eligible on that date, and our test suite checks that the calculator agrees.</p>
<h2>Which dates to enter</h2>
<p>For your permanent visa, Home Affairs says it usually starts on the date the visa was granted if you were in Australia, or the date you first entered Australia on it. The first date is the day you started living in Australia on any valid visa, for example a student or work visa; the department accepts an estimate if you are sure it was more than ${h.P.au.residence.lawfulYears} years ago. Enter every trip of the last ${h.P.au.residence.lawfulYears} years, and the trips you plan before applying.</p>
<h2>New Zealand citizens</h2>
<p>Special rules on the date permanent residence started apply to some New Zealand citizens holding a Special Category (subclass 444) visa or a New Zealand stream Skilled Independent (subclass 189) visa. For the subclass 189 visa, Home Affairs says that a visa granted on or after 1 January 2023 lets you apply from the grant date, without the ${h.P.au.residence.prMonths} months as a permanent resident; choose that option in the calculator. If it was granted during 2022, you are considered a permanent resident from 1 January 2022: enter that date as the start of your permanent visa. For a subclass 444 visa, check the start date on the ${h.src('au_pr', 'Home Affairs page')} before relying on the result. The ${h.P.au.residence.lawfulYears}-year and absence rules still apply in every case.</p>
<h2>When the date is not the end</h2>
<p>Meeting the residence rule lets you lodge. The ${h.a('au-eligibility', 'other conditions')} still apply, most applicants aged ${h.P.au.test.ages[0]} to ${h.P.au.test.ages[1]} sit the ${h.a('au-test', 'citizenship test')}, and the department cannot approve an application while you are outside Australia. The ${h.a('au-processing', 'processing time page')} shows how long the decision and the ceremony currently take.</p>`,
  },
});
