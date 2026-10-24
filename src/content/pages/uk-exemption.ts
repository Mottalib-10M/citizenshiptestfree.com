import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'uk-exemption',
  group: 'uk',
  order: 16,
  tool: { kind: 'mini:ukexempt' },
  related: ['uk-test', 'uk-citizenship', 'uk-cost', 'uk-pass-mark', 'uk-handbook'],
  sources: ['uk_test', 'uk_booking', 'uk_guidance', 'uk_ilr'],
  en: {
    slug: 'life-in-the-uk-test/exemption',
    nav: 'Exemptions',
    card: 'Who does not need to take the Life in the UK Test: under 18, 65 or over, a previous pass, or a long-term condition.',
    title: 'Life in the UK Test Exemption: Who Does Not Need to Sit It',
    description: 'Life in the UK Test exemption: no test under 18, at 65 or over, after an earlier pass, or with a long-term condition shown by a form or a letter from a doctor.',
    h1: 'Life in the UK Test exemptions',
    intro: 'Answer three questions to see whether the test applies to you. The rules below are the four cases gov.uk lists, with what each one asks you to provide.',
    resume: (h) => `You do not need to take the Life in the UK Test in four cases listed on gov.uk: if you are under ${h.P.uk.test.exemptUnder}, if you are ${h.P.uk.test.exemptFromAge} or over, if you have passed it before (for example as part of a settlement application, before applying for citizenship), or if you have a long-term physical or mental condition. The last case is the only one that needs evidence: gov.uk asks for either an exemption form or a letter from a doctor confirming the condition. Everyone else between ${h.P.uk.test.exemptUnder} and ${h.P.uk.test.exemptFromAge - 1} who applies for citizenship by naturalisation or for settlement where the test is required has to pass it, at ${h.gbp(h.P.uk.test.fee)} a sitting. The test is not the English requirement: naturalisation also asks you to prove your knowledge of English, Welsh or Scottish Gaelic, and the Home Office guidance notes that in some cases it may be appropriate to exempt a person from both the language and the knowledge of life requirements. A disability that does not lead to an exemption can still be met with special arrangements requested when you book.`,
    faqs: (h) => [
      { q: `Do I need the test if I am ${h.P.uk.test.exemptFromAge - 1} when I apply?`, a: `On the gov.uk wording, the age exemption starts at ${h.P.uk.test.exemptFromAge}, so at ${h.P.uk.test.exemptFromAge - 1} you would still need to pass. gov.uk does not say on the test page which date your age is taken on, so read the guidance and application form for your route before deciding to wait for a birthday rather than book.` },
      { q: 'Who can write the letter for a long-term condition?', a: 'gov.uk says the evidence is either an exemption form or a letter from a doctor confirming your physical or mental condition. What matters is that the document confirms the condition. If you are unsure which document your route accepts, the guidance and application form for that route are the place to check before you apply.' },
      { q: 'Can I ask for help at the test centre instead of being exempt?', a: 'Yes. When you book, gov.uk lets you make special requests, for example if you have a disability and need extra equipment or help accessing the centre. This is for people who can sit the test with support. An exemption is for a long-term condition that prevents it, and needs the form or the doctor’s letter.' },
      { q: 'Does a child included in a family application sit the test?', a: `No. Anyone under ${h.P.uk.test.exemptUnder} is exempt. In any case, the Home Office guidance says children under ${h.P.uk.naturalisation.minAge} cannot be naturalised: a child becomes British by registration, a separate application costing ${h.gbp(h.P.uk.fees.registrationChild)}, and the test does not apply to that application either.` },
    ],
    body: (h) => `
<h2>The four exemptions on gov.uk</h2>
<p>gov.uk lists the cases in a short paragraph at the end of the booking section. Each one applies on its own: meeting any of them is enough.</p>
${h.table(['Your situation', 'Do you sit the test?', 'What you provide'], [
  [`Under ${h.P.uk.test.exemptUnder}`, 'No', 'nothing for the test'],
  [`Aged ${h.P.uk.test.exemptFromAge} or over`, 'No', 'nothing for the test'],
  ['Passed it before', 'No new sitting', 'the reference number or letter of your earlier pass'],
  ['Long-term physical or mental condition', 'No, with evidence', 'an exemption form or a letter from a doctor'],
  [`Anyone else aged ${h.P.uk.test.exemptUnder} to ${h.P.uk.test.exemptFromAge - 1}`, 'Yes', `a pass, at ${h.gbp(h.P.uk.test.fee)} per sitting`],
], `Exemptions from the Life in the UK Test as listed on gov.uk, read on ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<h2>Age: the two ends of the scale</h2>
<p>The age band that sits the test runs from ${h.P.uk.test.exemptUnder} to ${h.P.uk.test.exemptFromAge - 1}. Below it, the question rarely arises for citizenship, because naturalisation is for adults: the Home Office guidance says children under ${h.P.uk.naturalisation.minAge} cannot be naturalised, and a child is registered instead. Above it, a person of ${h.P.uk.test.exemptFromAge} or more applying for citizenship does not need a test pass at all.</p>
<p>Check the guidance for your own route on the date that counts. gov.uk does not repeat on the test page whether age is taken on the day you apply or on another date, and that detail matters only when a birthday falls close to your application.</p>
<h2>An earlier pass</h2>
<p>The usual path to citizenship is settlement first, then naturalisation, and gov.uk notes that the test may be needed for either application. gov.uk gives that exact example: if you are applying to become a citizen and already passed the test for settlement, you do not take it again.</p>
<p>What you need is proof of that pass. Since 17 December 2019, candidates receive a unique reference number, which the Home Office uses to check the result. Earlier candidates hold a letter with a "test reference ID". If the letter is lost, gov.uk says to send a letter explaining this with your application.</p>
<h2>A long-term physical or mental condition</h2>
<p>This is the only exemption that has to be shown. gov.uk asks for one of two documents: an exemption form, or a letter from a doctor confirming your physical or mental condition. The point of the evidence is to show a lasting condition, not a short illness on the day of a booking; a temporary problem is handled by cancelling or moving the booking at least ${h.P.uk.test.bookAtLeastDaysAhead} days ahead.</p>
<p>If your condition makes the test harder but not impossible, an exemption is not the only option. gov.uk lets you make special requests at booking, such as extra equipment or help to get into the centre.</p>
<h2>The English requirement is separate</h2>
<p>For naturalisation, the Home Office guidance lists two distinct requirements: a sufficient knowledge of the English, Welsh or Scottish Gaelic language, and a sufficient knowledge of life in the UK. The Life in the UK Test is the evidence for the second one only. Passing it, or being exempt from it, does not on its own settle the language requirement, which is proved separately.</p>
<p>The same guidance adds that in some cases it may be appropriate to exempt a person from the language and knowledge of life requirements. It refers caseworkers to separate guidance on knowledge of language and life for the detail, so we do not set out those cases here. If you think this applies to you, read that guidance before you apply.</p>
<h2>If you are not exempt</h2>
<p>Then the test is one step to plan, not an obstacle. Book on gov.uk at least ${h.P.uk.test.bookAtLeastDaysAhead} days ahead, prepare with the ${h.a('uk-handbook', 'official handbook')} and our practice tools, and aim for the ${h.a('uk-pass-mark', 'pass mark')} with some margin. The ${h.a('uk-cost', 'cost page')} adds the test fee to the other fees of your household, and the ${h.a('uk-citizenship', 'British citizenship page')} shows the full list of requirements.</p>`,
  },
});
