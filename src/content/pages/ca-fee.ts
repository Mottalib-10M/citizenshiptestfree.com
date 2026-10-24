import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-fee',
  group: 'ca',
  order: 56,
  tool: { kind: 'cost', props: { country: 'ca' } },
  related: ['ca-eligibility', 'ca-presence', 'ca-test', 'au-cost', 'uk-cost'],
  sources: ['ca_fees', 'ca_eligibility'],
  en: {
    slug: 'canadian-citizenship/fee',
    nav: 'Canadian citizenship fee',
    card: 'The IRCC fee for each adult and minor, and the total for your family.',
    title: 'Citizenship Fee Canada 2026: What IRCC Charges a Family',
    description: 'Canadian citizenship fee in 2026: what IRCC charges per adult (processing fee plus right of citizenship) and per minor, and the total for your whole family.',
    h1: 'Canadian citizenship fee: the cost for your family',
    intro: 'Enter the adults and children applying: the total of the IRCC fees appears with each line.',
    resume: (h) => `The fee for a Canadian citizenship grant is ${h.cad(h.P.ca.fees.adult)} for each adult aged 18 or over, made of a processing fee of ${h.cad(h.P.ca.fees.adultProcessing)} and the right of citizenship fee of ${h.cad(h.P.ca.fees.rightOfCitizenship)}. For each minor under 18 it is ${h.cad(h.P.ca.fees.minor)}. A couple applying with two children therefore pays ${h.cad(2 * h.P.ca.fees.adult + 2 * h.P.ca.fees.minor)}. These amounts come from the IRCC fee list, last modified on ${h.date(h.P.ca.fees.dateModified)}. The fee list has no separate line for the citizenship test. What the fee does not cover are the costs around the application: an approved language test for applicants aged ${h.P.ca.test.ages[0]} to ${h.P.ca.test.ages[1]} who have no other proof, translations of documents in other languages, photos and any travel to the test or the ceremony. The calculator above adds them if you enter them yourself; it never estimates them.`,
    faqs: (h) => [
      { q: 'Why is the adult fee split into two parts?', a: `The ${h.cad(h.P.ca.fees.adultProcessing)} processing fee pays for the examination of the application; the ${h.cad(h.P.ca.fees.rightOfCitizenship)} right of citizenship fee is charged for the grant itself. Minors pay only the ${h.cad(h.P.ca.fees.minor)} processing fee. Both adult parts are paid together when you apply, so in practice an adult pays one total of ${h.cad(h.P.ca.fees.adult)}.` },
      { q: 'How much is a citizenship certificate after the grant?', a: `The IRCC list shows ${h.cad(h.P.ca.fees.certificate)} for a citizenship certificate (proof of citizenship) and ${h.cad(h.P.ca.fees.recordSearch)} for a search of your record of citizenship. These are separate services, listed under other citizenship fees and distinct from the grant application. The same list shows ${h.cad(h.P.ca.fees.rightOfCitizenship)} for the right of citizenship on its own, the part of the adult fee charged for the grant itself.` },
      { q: 'Do I pay again if I fail the citizenship test?', a: 'The IRCC fee list has no line for the test or for a later attempt: the amounts shown are application fees, paid with the application. Failing all the chances given is a different matter, since it affects the outcome of the application itself, so it is worth preparing well before the first attempt.' },
    ],
    body: (h) => `
<h2>The fees, line by line</h2>
${h.table(['Applicant', 'Processing fee', 'Right of citizenship', 'Total'], [['Adult (18 or over)', h.cad(h.P.ca.fees.adultProcessing), h.cad(h.P.ca.fees.rightOfCitizenship), h.cad(h.P.ca.fees.adult)], ['Minor (under 18)', h.cad(h.P.ca.fees.minor), 'none', h.cad(h.P.ca.fees.minor)]], `IRCC fee list, page modified ${h.date(h.P.ca.fees.dateModified)}.`, ['l', 'r', 'r', 'r'])}
<h2>Examples for common families</h2>
${h.table(['Household', 'Fees'], [['One adult', h.cad(h.P.ca.fees.adult)], ['Two adults', h.cad(2 * h.P.ca.fees.adult)], ['Two adults and one child', h.cad(2 * h.P.ca.fees.adult + h.P.ca.fees.minor)], ['Two adults and two children', h.cad(2 * h.P.ca.fees.adult + 2 * h.P.ca.fees.minor)], ['One parent and three children', h.cad(h.P.ca.fees.adult + 3 * h.P.ca.fees.minor)]], 'Totals computed from the IRCC fee list.', ['l', 'r'])}
<h2>Costs that are not fees</h2>
<p>The government fee is only part of the budget. Adults aged ${h.P.ca.test.ages[0]} to ${h.P.ca.test.ages[1]} prove their English or French at level ${h.P.ca.presence.languageLevel}; without another accepted proof, an approved language test is booked and paid with the organisation that runs it. Documents in another language need certified translations. None of these has an official scale, which is why the calculator lets you type your own amount instead of guessing one.</p>
<h2>When the fee changes</h2>
<p>IRCC adjusts some of its fees over time and publishes the amounts in force on its fee list. The page we read was modified on ${h.date(h.P.ca.fees.dateModified)}; a script compares it with our figures each month. Always check the amount on the IRCC page on the day you pay.</p>
<h2>Before you pay</h2>
<p>Pay only once your application is ready to send and you meet the requirements on that day. The ${h.a('ca-presence', 'physical presence calculator')} gives the first date your days are met, and the ${h.a('ca-eligibility', 'eligibility page')} lists the other conditions.</p>`,
  },
});
