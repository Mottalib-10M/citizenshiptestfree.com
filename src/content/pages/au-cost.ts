import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'au-cost',
  group: 'au',
  order: 36,
  tool: { kind: 'cost', props: { country: 'au' } },
  mini: { kind: 'mini:aufee' },
  related: ['au-eligibility', 'au-residence', 'au-processing', 'au-test', 'uk-cost', 'ca-fee'],
  sources: ['au_1298i', 'au_pr'],
  en: {
    slug: 'australian-citizenship/cost',
    nav: 'Cost',
    card: 'The Home Affairs fee for each applicant, concessions and children, and the total for your family.',
    title: 'Citizenship Cost Australia 2026: The Fee for Your Family',
    description: 'Australian citizenship cost in 2026: the fee per adult, the Pensioner Concession Card rate, children free on a parent form, and the total for your family.',
    h1: 'Australian citizenship cost: the fee for your family',
    intro: 'Enter the adults applying, those with a Pensioner Concession Card and the children on a parent’s form: the total appears with each line.',
    resume: (h) => `An application for Australian citizenship by conferral under general eligibility costs ${h.aud(h.P.au.fees.general)} per applicant, according to form ${h.P.au.fees.form}, the Home Affairs list of citizenship fees. The concession fee is ${h.aud(h.P.au.fees.generalConcession)}, but only for the primary holder of a valid Pensioner Concession Card issued by the Australian Government, or a person aged 17 or under listed as a dependant on one; Health Care Cards, Student Cards and Senior Health Cards do not qualify. Children aged 15 or under applying on the same form as a responsible parent pay nothing. A couple with two young children therefore pays ${h.aud(2 * h.P.au.fees.general)}. The fee includes the citizenship test and any resit. Fees are indexed to the consumer price index on 1 July each year, and a surcharge may apply depending on how you pay. Some Home Affairs pages still show an older, lower amount; this site follows the fee form, which is the dated reference.`,
    faqs: (h) => [
      { q: 'Why does a Home Affairs page say the fee is lower?', a: `On the day we checked, the Home Affairs page on becoming a citizen as a permanent resident still showed AUD285 for applicants aged 18 to 59, while form ${h.P.au.fees.form} gives ${h.aud(h.P.au.fees.general)} for general eligibility. The form is the fee list itself and carries a design date, so we follow it. Check the amount shown in ImmiAccount when you pay.` },
      { q: 'Who can apply without paying a fee?', a: 'The fee form lists British and Maltese former child migrants who came to Australia without their parents between 1947 and 1967 under the Commonwealth Child Migration Scheme, people who served at least 90 days in the permanent forces of the Australian Defence Force, and applicants under the statelessness provision. A fee exemption requires a paper application with the supporting letter.' },
      { q: 'How much is the fee on form 1290, for other situations?', a: `Form 1290, for other situations, costs ${h.aud(h.P.au.fees.otherSituations)}, or ${h.aud(h.P.au.fees.otherSituationsConcession)} with an eligible Pensioner Concession Card, and children aged 15 or under on a parent’s form are free. Check on the Home Affairs site which form applies to you: the calculator above uses the general eligibility fee and lets you add another amount.` },
    ],
    body: (h) => `
<h2>The fees on form ${h.P.au.fees.form}</h2>
${h.table(['Application', 'Fee', 'Concession'], [['General eligibility (form 1300t)', h.aud(h.P.au.fees.general), h.aud(h.P.au.fees.generalConcession)], ['Other situations (form 1290)', h.aud(h.P.au.fees.otherSituations), h.aud(h.P.au.fees.otherSituationsConcession)], ['Child 15 or under on a parent’s form', 'free', 'free'], ['Citizenship by descent (form 118)', h.aud(h.P.au.fees.descent), 'none'], ['Evidence of citizenship (form 119)', h.aud(h.P.au.fees.evidence), 'none']], `Home Affairs, form ${h.P.au.fees.form}, amounts in Australian dollars.`, ['l', 'r', 'r'])}
<h2>Examples for common families</h2>
${h.table(['Household', 'Fees'], [['One adult', h.aud(h.P.au.fees.general)], ['Two adults', h.aud(2 * h.P.au.fees.general)], ['Two adults and two children under 16', h.aud(2 * h.P.au.fees.general)], ['One adult with a Pensioner Concession Card', h.aud(h.P.au.fees.generalConcession)], ['One adult and one 16-year-old applying alone', `${h.aud(h.P.au.fees.general)} plus the 16-year-old’s own fee`]], 'Totals computed from form 1298i.', ['l', 'r'])}
<h2>The 16 and 17 year olds</h2>
<p>A parent cannot include a child aged 16 or 17 on their application: that child applies on their own form and pays the fee for it. Home Affairs's permanent resident page gives a separate, lower amount for this age group, but it is the same page that still shows the older adult fee, so we do not publish its figure; check the form that applies to your child on the Home Affairs site.</p>
<h2>What the fee does not cover</h2>
<p>The fee pays for the application, and it includes the citizenship test and any resit. You may still spend money on certified copies for a paper application, translations of documents in other languages and travel to the test appointment. Preparing for the test costs nothing: the booklet ${h.a('au-ocb', 'Our Common Bond')} is free, and so is our ${h.a('au-test', 'practice test')}.</p>
<h2>When the fee changes</h2>
<p>Home Affairs indexes citizenship fees to the consumer price index on 1 July each year. Our monthly check reads form ${h.P.au.fees.form} and flags any change; always confirm the amount in ImmiAccount on the day you pay. To see when you can apply, use the ${h.a('au-residence', 'residence calculator')}.</p>`,
  },
});
