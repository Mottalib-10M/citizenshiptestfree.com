import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-gmc',
  group: 'us',
  order: 101,
  tool: { kind: 'mini:usgmc' },
  related: ['us-eligibility', 'us-interview', 'us-n400', 'us-n400-howto', 'us-greencard'],
  sources: ['cfr8_316_10', 'us_pm_f1', 'us_n400_instr', 'us_n400_pdf'],
  en: {
    slug: 'good-moral-character',
    nav: 'Good moral character (GMC)',
    card: 'What good moral character means for the N-400: the 5 or 3-year period, the permanent bars, the bars inside the period, and what the officer weighs case by case.',
    title: 'Good Moral Character 2026: N-400 Period, Bars, Evidence List',
    description: 'Good moral character for naturalization: the 5 or 3-year statutory period up to the oath, permanent and conditional bars under 8 CFR 316.10, and how to prepare.',
    h1: 'Good moral character for the N-400',
    intro: 'Choose your route, what happened and how long before filing. The tool says whether it falls inside the period USCIS examines, and which rule applies.',
    resume: (h) => `Good moral character (GMC) is one of the conditions of naturalization: you must show that you have been, and still are, a person of good moral character during the statutory period, which is the ${h.P.us.n400.routes['5'].years} years before you file Form N-400 on the general route, or ${h.P.us.n400.routes['3'].years} years if you file as the spouse of a U.S. citizen, and it continues up to the day you take the oath. USCIS measures it against the standards of average citizens in your community, case by case, and may look at conduct before the period if it shows no reform. Some conduct bars you permanently: a conviction for murder at any time, or for an aggravated felony on or after 29 November 1990. Other conduct bars you only if it happened during the period: for example a conviction for a crime involving moral turpitude, a drug offense other than a single possession of 30 grams or less of marijuana, two or more convictions with 5 years or more of total sentences, 180 days or more in jail after a conviction, false testimony to obtain an immigration benefit, or habitual drunkenness. Failing to support your dependents also counts, unless you show extenuating circumstances. Part 9 of the N-400 asks about all of it, under oath.`,
    faqs: () => [
      { q: 'Does a traffic ticket hurt my good moral character?', a: 'A minor traffic ticket alone does not bar you, but you must disclose citations and arrests the form asks about, and bring the court records. The instructions name driving under the influence among the offenses to report, and a pattern of offenses can lead the officer to find a lack of good moral character under the catch-all rule for unlawful acts.' },
      { q: 'If my conviction was expunged, do I still have to report it?', a: 'Yes. The N-400 instructions say to report all offenses, including those expunged or pardoned and those committed before age 18, and to bring the court order that cleared the record. Hiding one can be worse than the offense: USCIS may deny the case for the omission alone, and false testimony under oath is itself a bar.' },
      { q: 'Can I file before my probation ends?', a: 'You can, but 8 CFR 316.10 says USCIS will not approve the application until probation, parole or a suspended sentence is completed. Being on probation does not, by itself, prevent good moral character; the underlying offense still counts. Most people wait until probation is over to avoid a denial and a lost fee.' },
    ],
    body: (h) => `
<h2>The period USCIS examines</h2>
${h.table(['Route', 'Statutory period', 'Ends'], [
  ['5 years as a permanent resident (INA 316)', `${h.P.us.n400.routes['5'].years} years before filing`, 'at the oath'],
  ['3 years married to a U.S. citizen (INA 319(a))', `${h.P.us.n400.routes['3'].years} years before filing`, 'at the oath'],
], '8 CFR 316.10(a) and N-400 instructions, Part 9, Good Moral Character.', ['l', 'l', 'l'])}
<p>The period does not stop when you file: it runs through the interview and up to the ceremony. An arrest between the interview and the oath must be reported on the questionnaire you bring to the ceremony, Form N-445.</p>
<h2>Three kinds of bars</h2>
<p>The regulation, ${h.src('cfr8_316_10', '8 CFR 316.10')}, sorts conduct into three groups.</p>
<ul>
<li><strong>Permanent bars, at any time:</strong> conviction for murder; conviction for an aggravated felony on or after 29 November 1990.</li>
<li><strong>Bars during the statutory period:</strong> conviction for one or more crimes involving moral turpitude (with narrow exceptions); two or more convictions with total sentences of 5 years or more; controlled substance violations except a single possession of 30 grams or less of marijuana; admitting such crimes even without a charge; 180 days or more in jail after a conviction; false testimony under oath to get an immigration benefit; prostitution; smuggling people into the United States; polygamy; two or more gambling convictions or a living made from illegal gambling; habitual drunkenness.</li>
<li><strong>Bars unless extenuating circumstances:</strong> willfully failing to support dependents; an extramarital affair that tended to destroy an existing marriage; other unlawful acts that reflect badly on your character.</li>
</ul>
<p>The ${h.src('us_pm_f1', 'USCIS Policy Manual')} adds that the officer reviews your record, your statements, the evidence and the interview as a whole: GMC is a judgment, not a checklist, outside the automatic bars.</p>
<h2>Questions on the form that touch GMC</h2>
<p>Part 9 of the ${h.src('us_n400_pdf', 'Form N-400')} asks, among others, whether you ever claimed to be a U.S. citizen, voted unlawfully, were arrested, cited or detained, lied to obtain an immigration benefit, or failed to support your children. Every “Yes” must be explained in Part 14 with documents. The ${h.a('us-interview', 'interview practice')} lets you rehearse these yes-or-no questions aloud.</p>
<h2>Evidence worth gathering</h2>
<ul>
<li>Certified court dispositions for every arrest, citation or charge, even dismissed ones.</li>
<li>Proof that fines were paid and probation was completed.</li>
<li>IRS tax transcripts, which the instructions also ask for on the marriage route and after long trips.</li>
<li>Child support records: court orders and proof of payments, as the ${h.src('us_n400_instr', 'N-400 instructions')} list them.</li>
</ul>
<h2>When to see a lawyer first</h2>
<p>Any conviction, any arrest outside the United States, any doubt about a past vote or a claim to citizenship: get advice from an immigration attorney or an accredited representative before filing. Some situations do more than bar naturalization; they can lead to removal proceedings. The tool above only places an event against the period; it does not judge a case. The ${h.a('us-eligibility', 'eligibility page')} covers the other conditions. This site is independent and gives general information, not legal advice.</p>`,
  },
});
