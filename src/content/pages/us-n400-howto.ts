import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-n400-howto',
  group: 'us',
  order: 92,
  tool: { kind: 'uschecklist', props: { list: 'n400' } },
  related: ['us-n400', 'us-fee', 'us-gmc', 'us-earlyfiling', 'us-interview', 'us-biometrics'],
  sources: ['us_n400_instr', 'us_n400_pdf', 'us_n400', 'us_g1055'],
  en: {
    slug: 'how-to-fill-out-n-400',
    nav: 'How to fill out Form N-400',
    card: 'Form N-400 part by part: what each of the 16 parts asks, the documents to have at hand, and the mistakes that get an application rejected.',
    title: 'N-400 Instructions 2026: How to Fill Out All 16 Parts',
    description: 'How to fill out Form N-400 (edition 01/20/25): the 16 parts one by one, documents to gather, the A-Number and N/A rules, and errors that cause a rejection.',
    h1: 'How to fill out Form N-400, part by part',
    intro: 'Work through the form with this checklist: tick each part once you have the information and the documents for it.',
    resume: (h) => `Form N-400, Application for Naturalization, has 16 parts in its current edition (01/20/25), and you fill in all of them except Parts 15 and 16, which the officer completes with you at the interview. Part 1 sets your eligibility basis, usually five years as a permanent resident or three years married to a U.S. citizen. Part 2 asks for your legal name, every other name you used, your A-Number padded to nine digits and the “resident since” date printed on your green card; USCIS may reject the form without that date. Parts 4, 7 and 8 list your addresses, jobs or schools and every trip abroad over the last five years (three on the marriage route). Part 9 holds the yes-or-no questions on moral character, security and the oath, and each “Yes” must be explained in Part 14. Part 10 is the fee reduction for households at or below ${h.P.us.fees.reducedMaxPctFpg}% of the poverty guidelines. You sign Part 11 by hand. The fee is ${h.usd(h.P.us.fees.online)} online or ${h.usd(h.P.us.fees.paper)} on paper. On paper, type or print in black ink, write “N/A” when a question does not apply and “None” when the answer is zero, and avoid correction fluid. Filing online removes most of those risks: the form checks required fields before you can submit.`,
    faqs: (h) => [
      { q: 'Should I file the N-400 online or on paper?', a: `Online costs ${h.usd(h.P.us.fees.paper - h.P.us.fees.online)} less (${h.usd(h.P.us.fees.online)} against ${h.usd(h.P.us.fees.paper)}), checks for blank required fields, lets you upload evidence and follow the case in your USCIS account. Paper is required for a fee reduction or a fee waiver request, and for some applicants abroad. Whichever you choose, keep a complete copy to reread before the biometrics appointment and the interview.` },
      { q: 'What if I do not remember the exact dates of my trips?', a: 'Rebuild them from your passport stamps, airline records and, if needed, a request for your travel history from Customs and Border Protection. Give your best dates and stay consistent: the officer compares Part 8 with the presence the form claims. Days count, because physical presence and continuous residence are checked from these trips.' },
      { q: 'Can I use someone to fill out the N-400 for me?', a: 'Yes. Anyone who fills it in for you signs Part 13 as preparer, and anyone who translated the questions signs Part 12 as interpreter. You still sign Part 11 yourself and answer for every word at the interview. Avoid “notarios”: only attorneys and accredited representatives may give legal advice on immigration.' },
    ],
    body: (h) => `
<h2>The 16 parts at a glance</h2>
${h.table(['Part', 'Subject', 'What you need'], [
  ['1', 'Eligibility', 'Your basis: 5 years, 3 years married to a citizen, military, other'],
  ['2', 'About you', 'Legal name, other names, A-Number, date as resident, name change request'],
  ['3', 'Biographic', 'Ethnicity, race, height (feet, inches), weight (pounds), eye and hair color'],
  ['4', 'Residence', 'Every address of the last 5 years (3 on the marriage route), with dates'],
  ['5', 'Marital history', 'Spouse’s details, prior marriages of both, certificates'],
  ['6', 'Children', 'All children under 18, wherever they live'],
  ['7', 'Work and school', 'Employers and schools, full or part time, over the period'],
  ['8', 'Time outside the U.S.', 'Each trip with departure and return dates'],
  ['9', 'Additional questions', 'Yes or no, under penalty of perjury; evidence for each “Yes”'],
  ['10', 'Fee reduction', `Household size and income, at or below ${h.P.us.fees.reducedMaxPctFpg}% of the poverty guidelines`],
  ['11', 'Your signature', 'Handwritten in ink; phone and email'],
  ['12, 13', 'Interpreter, preparer', 'Only if someone translated or filled in the form'],
  ['14', 'Additional information', 'Explanations that did not fit'],
  ['15, 16', 'Signature at interview, oath', 'Leave blank: done with the officer'],
], 'Form N-400 and its instructions, edition 01/20/25 (USCIS).', ['l', 'l', 'l'])}
<h2>Rules that apply to every page</h2>
<ul>
<li><strong>A-Number on each page,</strong> top right, padded with zeros to nine digits: A12345678 becomes A012345678.</li>
<li><strong>“N/A” and “None”.</strong> N/A when a question does not apply (no spouse), None when the answer is zero (no trips). A blank can get the form rejected.</li>
<li><strong>Black ink, no correction fluid.</strong> The ${h.src('us_n400_instr', 'instructions')} warn that scanners can read through correction tape; start a new form for big corrections.</li>
<li><strong>All pages, same edition.</strong> Send every page, even blank ones, from the same edition; the edition date is at the bottom.</li>
<li><strong>Extra space in Part 14:</strong> name and A-Number on top, then page, part and item number for each answer, signed and dated.</li>
</ul>
<h2>The parts that trip people up</h2>
<p><strong>Part 2, other names.</strong> List every name ever used: maiden name, nicknames, spellings on old documents and any name used in an arrest or citation. A name change at the ceremony is optional and requested here.</p>
<p><strong>Part 8, trips.</strong> These dates decide physical presence and continuous residence. A trip of more than six months raises a presumption of a break; one of a year or more breaks continuity. Count them first with the ${h.a('us-n400', 'N-400 date calculator')}, which also gives your first filing day, or with the ${h.a('us-earlyfiling', 'early filing calculator')}.</p>
<p><strong>Part 9, the yes-or-no questions.</strong> Answer each one, read the parenthesized definitions on the form, and report offenses even if they were expunged or happened before 18. A “Yes” is not an automatic denial; an omission found later can be. The ${h.a('us-gmc', 'good moral character page')} explains what USCIS weighs.</p>
<p><strong>Part 10, fee reduction.</strong> Only on paper. The ${h.a('us-fee', 'N-400 fee page')} tells you whether your household qualifies.</p>
<h2>Documents to gather before you file</h2>
<ul>
<li>Your green card at hand: the A-Number and the “resident since” date are read from it.</li>
<li>Marriage certificate and proof the marriage ended for any prior marriage, if you file on the marriage route or list a spouse.</li>
<li>Court records for any arrest, citation or charge.</li>
<li>Evidence for every “Yes” in Part 9, as the instructions list it.</li>
</ul>
<p>After you file, USCIS sends a receipt, then usually a ${h.a('us-biometrics', 'biometrics appointment')}. The ${h.src('us_n400', 'USCIS N-400 page')} has the form, the current fee and the filing addresses. Guide from an independent site, not affiliated with USCIS.</p>`,
  },
});
