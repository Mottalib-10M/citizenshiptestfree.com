import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'uk-citizenship',
  group: 'uk',
  order: 18,
  tool: { kind: 'quiz', props: { country: 'uk', mode: 'exam' } },
  mini: { kind: 'date', props: { country: 'uk' } },
  related: ['uk-test', 'uk-cost', 'uk-exemption', 'uk-pass-mark', 'uk-mock', 'home'],
  sources: ['uk_ilr', 'uk_spouse', 'uk_guidance', 'uk_fees', 'uk_test', 'uk_earned'],
  en: {
    slug: 'british-citizenship-test',
    nav: 'British citizenship',
    card: 'The British citizenship test and every other naturalisation requirement: residence, absences, good character, English and fees.',
    title: 'Citizenship Test UK 2026: Naturalisation Rules and Practice',
    description: 'Citizenship test UK: practise the Life in the UK Test, then check naturalisation rules (5 or 3 years, 450 or 270 days abroad), fees and your date to apply.',
    h1: 'The British citizenship test and naturalisation requirements',
    intro: 'The test at the top is a full mock of the Life in the UK Test, the citizenship test itself. Under the summary, a calculator gives your earliest date to apply from your trips abroad.',
    resume: (h) => {
      const r1 = h.P.uk.naturalisation.route61, r2 = h.P.uk.naturalisation.route62spouse;
      return `The British citizenship test is the Life in the UK Test: ${h.P.uk.test.questions} questions on the official handbook in ${h.P.uk.test.minutes} minutes, passed with ${h.pc(0.75)} or more (${h.need.uk} correct answers), at ${h.gbp(h.P.uk.test.fee)} a sitting. It is one of several conditions for naturalisation. Under section 6(1) of the British Nationality Act 1981 you need ${r1.years} years of residence, no more than ${h.num(r1.maxAbsenceDays)} days abroad in that period and ${r1.maxAbsenceLast12m} in the last 12 months, and indefinite leave to remain or settled status held for ${r1.ilrHeldMonths} months. Under section 6(2), for the husband, wife or civil partner of a British citizen, the period is ${r2.years} years with ${r2.maxAbsenceDays} days abroad at most, and no waiting period after settlement. You must also be ${h.P.uk.naturalisation.minAge} or over, of good character, prove your English, Welsh or Scottish Gaelic, and intend to live in the UK. Only whole days abroad count. The fee is ${h.gbp(h.P.uk.fees.naturalisation)} plus ${h.gbp(h.P.uk.fees.ceremony)} for the ceremony, and a decision usually takes up to ${h.P.uk.naturalisation.decisionUsuallyMonths} months.`;
    },
    faqs: (h) => [
      { q: 'Do the days I leave and return to the UK count as days abroad?', a: 'No. The Home Office guidance tells caseworkers to count only whole days of absence and not to count the dates of departure and arrival. Its own example is a person who left on 22 September and came back on 23 September: they are not treated as absent at all. A week-long trip therefore counts as fewer days than the calendar suggests.' },
      { q: 'What happens if I am a few days over the absence limit?', a: `The guidance says that where an applicant exceeds the permitted absence by ${h.P.uk.naturalisation.discretion.route61Band[0] - h.P.uk.naturalisation.route61.maxAbsenceDays} days or less, discretion must be exercised unless there are other grounds for refusal. Beyond that, larger excesses are considered only in specific circumstances, such as an established home, work, family and finances in the UK plus one of the reasons the guidance lists.` },
      { q: 'Does being married to a British citizen shorten the wait for citizenship?', a: `Yes. Under section 6(2) the residence period is ${h.P.uk.naturalisation.route62spouse.years} years instead of ${h.P.uk.naturalisation.route61.years}, the absence allowance is ${h.P.uk.naturalisation.route62spouse.maxAbsenceDays} days, and gov.uk says you do not need to wait ${h.P.uk.naturalisation.route61.ilrHeldMonths} months after settlement. You still need indefinite leave to remain or settled status, the test, the English requirement and good character.` },
      { q: 'Is the citizenship ceremony compulsory?', a: `If you are ${h.P.uk.naturalisation.minAge} or over and your application succeeds, gov.uk says you need to attend one. Your local authority organises it. You make an oath of allegiance, or an affirmation if you prefer not to swear by God, and a pledge, and you receive your certificate of British citizenship at the end. The ${h.gbp(h.P.uk.fees.ceremony)} ceremony fee is paid with the application.` },
    ],
    body: (h) => {
      const N = h.P.uk.naturalisation, r1 = N.route61, r2 = N.route62spouse, d = N.discretion;
      const margin = d.route61Band[0] - r1.maxAbsenceDays;
      return `
<h2>Two routes to naturalisation</h2>
<p>Most adults become British by naturalisation under one of two sections of the British Nationality Act 1981. The table compares them, with the figures from the Home Office guidance and the gov.uk pages for each route.</p>
${h.table(['Requirement', 'Section 6(1): settled residents', 'Section 6(2): spouse or civil partner of a British citizen'], [
  ['Residence period', `${r1.years} years`, `${r2.years} years`],
  ['Most days abroad in the period', h.num(r1.maxAbsenceDays), h.num(r2.maxAbsenceDays)],
  ['Most days abroad in the last 12 months', r1.maxAbsenceLast12m, r2.maxAbsenceLast12m],
  ['Settlement held before applying', `${r1.ilrHeldMonths} months`, 'none required beyond holding it'],
  ['Minimum age', N.minAge, N.minAge],
  ['Life in the UK Test and English', 'required unless exempt', 'required unless exempt'],
], `Naturalisation requirements, read in ${N.guidanceVersion} and on gov.uk on ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>Both routes also require good character, being of full capacity and, for section 6(1), the intention to keep your main home in the UK. gov.uk adds that you should not have broken UK immigration laws during the period; if you hold indefinite leave, the Home Office will not usually check breaches before it was granted.</p>
<h2>When the qualifying period starts</h2>
<p>You must have been physically in the UK on the first day of the residence period. The guidance explains how to find that day: take the day after the application date, minus the length of the period. Its example is a section 6(1) application made on 1 September 2022, for which the applicant must have been in the UK on 2 September 2017. gov.uk gives a second example: an application received on 20 June 2022 does not qualify if the applicant was abroad from 10 June to 25 June 2017; they need to wait until 24 June 2022.</p>
<p>The relevant date is the day the Home Office receives your application. Online, that is the same day; by post it takes longer. The calculator under the summary finds the first date that works with your own trips.</p>
<h2>Counting days abroad</h2>
<p>Only whole days outside the UK count as absences: the days you leave and come back are treated as days in the UK. A trip from Monday to the following Monday is six days of absence, not eight. When you apply, gov.uk asks for your time abroad and suggests using your own records, such as emails or boarding passes; the Home Office then checks its records and corrects any gaps.</p>
<h2>Discretion over excess absences</h2>
<p>Going over the limit is not always fatal. The guidance says that where the excess is ${margin} days or less, discretion must be exercised unless there are other reasons to refuse. For larger excesses, between ${h.num(d.route61Band[0])} and ${h.num(d.route61Band[1])} days under section 6(1), or ${d.route62Band[0]} and ${d.route62Band[1]} days under section 6(2), discretion is considered only when you have established your home, work, family and finances in the UK and one of the listed reasons applies, such as postings abroad in Crown service or a career that made travel unavoidable. The final-year limit of ${r1.maxAbsenceLast12m} days is assessed separately.</p>
<h2>Good character, English and the test</h2>
<p>Good character is a requirement of both routes, assessed under its own Home Office guidance, to which gov.uk refers applicants. Knowledge of language and knowledge of life in the UK are two further requirements: you prove your English, Welsh or Scottish Gaelic, and you show a pass in the Life in the UK Test. A pass obtained for settlement is reused. People under ${h.P.uk.test.exemptUnder}, aged ${h.P.uk.test.exemptFromAge} or over, or with a long-term condition shown by a form or a doctor's letter do not sit the test; the ${h.a('uk-exemption', 'exemption page')} has the detail.</p>
<p>The quiz at the top of this page is a full ${h.P.uk.test.questions}-question mock. For practice against the clock, use the ${h.a('uk-mock', 'timed mock test')}, and check a score against the ${h.a('uk-pass-mark', 'pass mark')}.</p>
<h2>Fees, decision and ceremony</h2>
<p>Under the fees table in force from ${h.date(h.P.uk.fees.effective)}, naturalisation costs ${h.gbp(h.P.uk.fees.naturalisation)} and the ceremony ${h.gbp(h.P.uk.fees.ceremony)}, so ${h.gbp(h.ukTotal)} with one test sitting. Biometric information is taken free of charge after you apply. A decision usually comes within ${N.decisionUsuallyMonths} months, and you are told before then if it will take longer. If you are granted citizenship, you attend a ceremony arranged by your local authority, make an oath or affirmation and a pledge, and receive your certificate. The ${h.a('uk-cost', 'cost page')} adds the fees for a whole household, including children registered at ${h.gbp(h.P.uk.fees.registrationChild)} each.</p>
<h2>Coming next: earned settlement</h2>
<p>The Home Office consulted on an "earned settlement" model under which settlement would no longer be granted automatically after a fixed period. The consultation closed on 12 February 2026 and, at our last check on ${h.date(h.P.retrieved_at)}, the Home Office was still analysing responses and no new rule was in force. Because section 6(1) relies on settlement held for ${r1.ilrHeldMonths} months, any change to settlement would matter for the timing of citizenship. The rules on this page are those in force today, and we will update them when the final policy is published.</p>`;
    },
  },
});
