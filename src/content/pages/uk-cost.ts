import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'uk-cost',
  group: 'uk',
  order: 14,
  tool: { kind: 'cost', props: { country: 'uk' } },
  mini: { kind: 'mini:ukattempts' },
  related: ['uk-citizenship', 'uk-pass-mark', 'uk-mock', 'uk-exemption', 'uk-test'],
  sources: ['uk_fees', 'uk_test', 'uk_ilr', 'uk_spouse'],
  en: {
    slug: 'life-in-the-uk-test/cost',
    nav: 'Cost and fees',
    card: 'What the Life in the UK Test and British citizenship cost in 2026, fee by fee, for one person or a family.',
    title: 'Life in the UK Test Cost: £50 a Sitting and Citizenship Fees',
    description: 'Life in the UK Test cost in 2026: £50 per sitting, paid again on a retake, plus the naturalisation, ceremony, ILR and child fees of the 8 October fees table.',
    h1: 'Life in the UK Test cost and the full citizenship bill',
    intro: 'Enter your household and the number of sittings: the calculator adds every official fee from the Home Office table. The test is the smallest line; this page explains the others.',
    resume: (h) => `The Life in the UK Test costs ${h.gbp(h.P.uk.test.fee)} each time you sit it, paid by card when you book on gov.uk, and a retake after a fail is paid again at the same price. It is only one line of the bill. Under the Home Office fees table in force from ${h.date(h.P.uk.fees.effective)}, naturalisation as a British citizen costs ${h.gbp(h.P.uk.fees.naturalisation)} and the citizenship ceremony ${h.gbp(h.P.uk.fees.ceremony)}, so one adult who passes the test the first time pays ${h.gbp(h.ukTotal)} in official fees. Someone who still needs indefinite leave to remain first adds ${h.gbp(h.P.uk.fees.ilr)} for that application. Registering a child as a British citizen costs ${h.gbp(h.P.uk.fees.registrationChild)} per child, and an adult registration ${h.gbp(h.P.uk.fees.registrationAdult)}. Taking biometric information is free. gov.uk sets no limit on the number of attempts at the test, so the main way to keep the total down is to book only when your practice scores are steady. Costs without an official tariff, such as an English test or translations, are not estimated here: add them yourself in the calculator.`,
    faqs: (h) => [
      { q: 'Do I pay for the Life in the UK Test again when I move from settlement to citizenship?', a: `No. gov.uk says you do not need to take the test if you have passed it before, for example as part of your settlement application. You reuse the same pass and give its reference number in the citizenship form, so the ${h.gbp(h.P.uk.test.fee)} is paid once for both steps, as long as you passed.` },
      { q: `Can I get the ${h.gbp(h.P.uk.test.fee)} back if I cannot attend my test?`, a: `Yes, if you cancel at least ${h.P.uk.test.bookAtLeastDaysAhead} days before the test in your Life in the UK account: the fee goes back to the card you booked with. Cancelling or moving it later gives no refund, and gov.uk lists other cases with no refund, such as bringing the wrong ID, being ill or arriving late. A refund is due if the centre cancels.` },
      { q: 'Is there a fee waiver for citizenship?', a: `On the gov.uk citizenship page, a fee waiver is mentioned only for children: if a child under ${h.P.uk.naturalisation.minAge} is being registered and you cannot afford the fee, you may be able to apply for one. We found no waiver of the adult naturalisation fee or of the test fee on the official pages we rely on.` },
      { q: 'Can I pay extra to get a faster citizenship decision?', a: `gov.uk says you may be able to pay to get a faster decision, without stating a price on the citizenship page, so we do not add one to the calculator. Without it, a decision usually comes within ${h.P.uk.naturalisation.decisionUsuallyMonths} months, and you are told before then if yours will take longer.` },
    ],
    body: (h) => {
      const F = h.P.uk.fees;
      const family = F.naturalisation * 2 + F.ceremony * 2 + F.lifeInUkTest * 2 + F.registrationChild;
      const retake = F.naturalisation + F.ceremony + F.lifeInUkTest * 2;
      return `
<h2>Every official fee in one table</h2>
<p>All amounts below come from the Home Office immigration and nationality fees table that applies from ${h.date(F.effective)}. They are the fees charged by the government; nothing here is a service charge of ours, and this site does not take any payment.</p>
${h.table(['What you pay for', 'Fee', 'Who pays it'], [
  ['Life in the UK Test, each sitting', h.gbp(F.lifeInUkTest), `anyone not exempt, aged ${h.P.uk.test.exemptUnder} to ${h.P.uk.test.exemptFromAge - 1}`],
  ['Naturalisation as a British citizen', h.gbp(F.naturalisation), `each adult (${h.P.uk.naturalisation.minAge} or over)`],
  ['Citizenship ceremony', h.gbp(F.ceremony), 'each adult, added to the application fee'],
  ['Indefinite leave to remain', h.gbp(F.ilr), 'only if you do not hold it yet'],
  ['Registration as a British citizen, child', h.gbp(F.registrationChild), 'each child registered'],
  ['Registration as a British citizen, adult', h.gbp(F.registrationAdult), 'adults on a registration route'],
  ['Biometric information', h.gbp(0), 'given after you apply'],
], `Home Office fees in force from ${h.date(F.effective)}, read on ${h.date(h.P.retrieved_at)}.`, ['l', 'r', 'l'])}
<h2>The test: small fee, repeated if you fail</h2>
<p>The test is the cheapest item, but it is the only one you can end up paying several times. gov.uk lets you rebook as many times as you need and charges each time. Two sittings take the bill for one adult from ${h.gbp(h.ukTotal)} to ${h.gbp(retake)}. The small calculator under the summary shows the effect of each extra attempt, and the ${h.a('uk-pass-mark', 'pass mark page')} explains what a fail means in practice.</p>
<p>Money can also be lost before the test starts. You must cancel at least ${h.P.uk.test.bookAtLeastDaysAhead} days ahead to be refunded, and there is no refund if you arrive without the right original ID or decline the photo taken at the centre. Check your ID against the list on gov.uk when you book, not the night before.</p>
<h2>Naturalisation and the ceremony</h2>
<p>For an adult, the naturalisation fee of ${h.gbp(F.naturalisation)} and the ceremony fee of ${h.gbp(F.ceremony)} are paid together when you apply, which is why gov.uk quotes them as a single amount of ${h.gbp(F.naturalisation + F.ceremony)}. The same figure applies on the route for someone with indefinite leave to remain and on the route for the husband, wife or civil partner of a British citizen. Your local authority organises the ceremony; the standard ceremony is covered, while a private one may cost more and is priced by the council.</p>
<p>Before you pay, make sure you are eligible on the date the Home Office receives your form: residence, absences and the waiting period after settlement all count. The ${h.a('uk-citizenship', 'British citizenship page')} works out that date from your trips abroad.</p>
<h2>Settlement first, if you do not have it</h2>
<p>Most people naturalise after indefinite leave to remain, which carries its own fee of ${h.gbp(F.ilr)} per person. If you already hold it, or settled status, there is nothing more to pay for it. Settlement and citizenship need the same Life in the UK Test pass, so one sitting can serve both.</p>
<h2>Children</h2>
<p>Children under ${h.P.uk.naturalisation.minAge} are not naturalised but registered, at ${h.gbp(F.registrationChild)} each, on a separate application. gov.uk adds that a ${h.gbp(F.ceremony)} ceremony fee is due if the child turns ${h.P.uk.naturalisation.minAge} during the process, and that a fee waiver may be possible for a child whose family cannot afford the fee. A child born in the UK after a parent was granted indefinite leave to remain may already be British, in which case no registration is needed. Children are also exempt from the test itself, as the ${h.a('uk-exemption', 'exemption page')} explains.</p>
<h2>A worked example for a family</h2>
<p>Two adults who already hold indefinite leave to remain, who each pass the test the first time, and who register one child pay ${h.gbp(F.naturalisation)} and ${h.gbp(F.ceremony)} twice, two test fees of ${h.gbp(F.lifeInUkTest)}, and ${h.gbp(F.registrationChild)} for the child: ${h.gbp(family)} in official fees. The calculator at the top of the page gives the same result for these inputs and updates it for your own household.</p>
<h2>What the calculator leaves to you</h2>
<p>Some costs have no official tariff on these pages: an English language test if you need one to prove your English, certified translations of documents, travel to the test centre or to your biometrics appointment, and help from an adviser if you choose to use one. They vary from one person to the next, so we do not guess them. Enter them in the field for other costs you expect and they are added to the total.</p>`;
    },
  },
});
