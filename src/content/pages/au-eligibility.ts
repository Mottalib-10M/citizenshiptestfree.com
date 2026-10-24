import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'au-eligibility',
  group: 'au',
  order: 34,
  tool: { kind: 'date', props: { country: 'au' } },
  mini: { kind: 'mini:aufee' },
  related: ['au-residence', 'au-test', 'au-cost', 'au-processing', 'au-ocb'],
  sources: ['au_pr', 'au_test', 'au_rescalc', 'au_1298i'],
  en: {
    slug: 'australian-citizenship/eligibility',
    nav: 'Eligibility',
    card: 'Every condition for citizenship by conferral, and the first date your residence lets you apply.',
    title: 'Citizenship Eligibility Australia 2026: Every Condition',
    description: 'Australian citizenship eligibility in 2026: permanent visa, the 4-year residence rule, the test, character and a link to Australia, plus your first date.',
    h1: 'Australian citizenship eligibility: the conditions and your first date',
    intro: 'Check the conditions below, then enter your dates: the calculator gives the first day your residence allows an application.',
    resume: (h) => `To become an Australian citizen by conferral under the general eligibility rules, you must be a permanent resident, or a New Zealand citizen holding an eligible Special Category visa, both when you apply and when the department decides. You must meet the residence requirement: ${h.P.au.residence.lawfulYears} years living in Australia on a valid visa, the last ${h.P.au.residence.prMonths} months as a permanent resident, at most ${h.P.au.residence.maxAbsenceDays} days away in total and ${h.P.au.residence.maxAbsenceLast12m} days in the last year. You must understand what becoming a citizen means and have a basic knowledge of English, which most applicants aged ${h.P.au.test.ages[0]} to ${h.P.au.test.ages[1]} show by passing the citizenship test. Applicants aged 18 or over must be of good character. Home Affairs must also be satisfied that you are likely to live in Australia or keep a close and continuing link with it, and in most cases you must be in Australia when the decision is made. The calculator above gives the first date your residence allows you to apply.`,
    faqs: (h) => [
      { q: 'Can I apply for Australian citizenship from overseas?', a: 'Yes, Home Affairs says you can apply in or outside Australia. But it cannot approve the application while you are outside Australia, and if you lodge from abroad you will be invited to sit the test after you return. Tell the department if you need to travel while the application is being processed.' },
      { q: 'What does good character mean for citizenship?', a: 'Home Affairs describes it as the enduring moral qualities of a person, and asks whether you are likely to obey Australian law and keep the commitments of the pledge. It may consider criminal convictions, obligations to a court, association with people of concern, reported domestic violence and honesty in dealings with the department. It applies from age 18.' },
      { q: 'Can my 16-year-old be included on my application?', a: 'No. A child aged 15 or younger who is a permanent resident can be included on a parent’s application at no extra cost, but a parent cannot include a child aged 16 or 17, who must apply on their own. Applicants aged 16 or 17 do not sit the test; the department may ask them at an interview to show a basic knowledge of English and of citizenship.' },
    ],
    body: (h) => `
<h2>The conditions in one table</h2>
${h.table(['Condition', 'What Home Affairs requires'], [['Status', 'permanent resident, or eligible New Zealand citizen, when you apply and when it decides'], ['Residence', `${h.P.au.residence.lawfulYears} years on a valid visa, ${h.P.au.residence.prMonths} months as a permanent resident, absence limits`], ['Knowledge and English', `citizenship test for most applicants aged ${h.P.au.test.ages[0]} to ${h.P.au.test.ages[1]}`], ['Character', 'good character from age 18'], ['Link to Australia', 'likely to live in Australia or keep a close and continuing link'], ['At decision', 'in Australia in most cases']], `Home Affairs, permanent resident page, updated ${h.date(h.P.au.residence.pageUpdated)}.`, ['l', 'l'])}
<h2>The test, or an interview</h2>
<p>Passing the test with at least ${h.pc(h.P.au.test.passPercent / 100)} and all ${h.P.au.test.valuesQuestions} values questions right meets both the knowledge and the English requirement. Applicants who do not sit it, such as people aged 60 or over or those with an incapacity, may have an interview so the department can confirm their identity. Our ${h.a('au-test', 'free practice test')} is marked with both official rules.</p>
<h2>A close and continuing link</h2>
<p>The department looks at where you have lived, how long you spent in each place, your participation in the Australian community, and close family members who are permanent residents or citizens and intend to live in Australia. It is a condition in its own right, assessed separately from the residence count, so meeting the day count alone does not settle it.</p>
<h2>Who is exempt from the residence rule</h2>
<p>Home Affairs lists exemptions and special circumstances, among them children under 16, some people born to a former Australian citizen, people born in Papua before 16 September 1975 to a parent born in Australia, and members of the Australian Defence Force and their families. These cases need supporting documents when applying, and their rules are not built into our calculator.</p>
<h2>What it costs</h2>
<p>The general eligibility application costs ${h.aud(h.P.au.fees.general)} per applicant on form ${h.P.au.fees.form}, ${h.aud(h.P.au.fees.generalConcession)} with an eligible Pensioner Concession Card, and nothing for a child aged 15 or under on a parent’s form. The ${h.a('au-cost', 'cost page')} explains why a Home Affairs page still shows a lower amount.</p>`,
  },
});
