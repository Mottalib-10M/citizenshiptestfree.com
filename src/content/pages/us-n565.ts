import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-n565',
  group: 'us',
  order: 150,
  tool: { kind: 'mini:usn565' },
  related: ['us-n600', 'us-oath', 'us-dual', 'us-steps', 'us-fee', 'us-n400'],
  sources: ['us_n565', 'us_n565_instr', 'us_g1055', 'us_i912'],
  en: {
    slug: 'n-565',
    nav: 'Form N-565, replace a naturalization certificate',
    card: 'Replacing a lost, damaged or wrong Certificate of Naturalization or Citizenship: the $505 online fee, the free case of a USCIS error, and the evidence for each reason.',
    title: 'N-565 2026: Replace a Naturalization Certificate for $505',
    description: 'Form N-565 in 2026: replace a lost, stolen, damaged or incorrect naturalization certificate for $505 online or $555 on paper, free after a USCIS error.',
    h1: 'Form N-565: replacing your naturalization certificate',
    intro: 'Choose why you need a new certificate and how you will file. The tool gives the fee and the evidence USCIS asks for in your case.',
    resume: (h) => `Form N-565, Application for Replacement Naturalization/Citizenship Document, is how you ask USCIS for a new Certificate of Naturalization, Certificate of Citizenship, Declaration of Intention or Repatriation Certificate. You may file it if the document was lost, stolen, destroyed or mutilated; if it contains a typographical or clerical error made by USCIS; or if your name changed after it was issued, by marriage, divorce, annulment or court order. Naturalized citizens also use it to ask for a special certificate that a foreign country needs to recognize their U.S. citizenship. The fee in USCIS fee schedule G-1055, edition of ${h.date(h.P.us.forms.g1055Edition)}, is ${h.usd(h.P.us.forms.n565.online)} online and ${h.usd(h.P.us.forms.n565.paper)} on paper, and ${h.usd(h.P.us.forms.n565.uscisError)} when the certificate is wrong because of a USCIS error. A fee waiver can be requested with Form I-912 on paper. USCIS cannot correct a name or date of birth that you gave wrongly on your N-400 and swore to at the interview: the certificate shows what you declared. For a damaged or incorrect certificate, the original goes with the application.`,
    faqs: (h) => [
      { q: 'Do I need a replacement certificate to get a U.S. passport?', a: 'Not necessarily. A U.S. passport, once issued, is itself proof of citizenship, and a valid passport has the same force as a certificate. If you already hold a valid passport, you may not need the certificate for daily life. If you have neither, you need some proof of citizenship for the passport application, and the replacement certificate is often the way to get it.' },
      { q: 'Can USCIS fix the date of birth on my naturalization certificate?', a: 'Only if USCIS made the mistake. The instructions say USCIS cannot change an incorrect name or date of birth on a Certificate of Naturalization if you gave it on your N-400 and swore to it at the interview. For a Certificate of Citizenship, a new date of birth can be shown with a U.S. court order or a document from a U.S. government or state that changes it.' },
      { q: 'I changed my name at the oath ceremony. Do I need an N-565?', a: 'Not for that change. Item 3 of the N-400 lets you ask a court to change your name when you naturalize, and the change becomes final at the court ceremony, as part of naturalization. The N-565 is for a name changed after the certificate was issued, by marriage, divorce, annulment or court order. You then send the original certificate with a copy of the document that changed your name, and complete Part 6 of the form.' },
    ],
    body: (h) => `
<h2>Fee and evidence by reason</h2>
${h.table(['Reason', 'Fee', 'Evidence the instructions require'], [['Lost, stolen or destroyed', `${h.usd(h.P.us.forms.n565.online)} online, ${h.usd(h.P.us.forms.n565.paper)} paper`, 'a copy of the document if you have one, a police report and/or a sworn statement of what happened'], ['Mutilated (damaged)', `${h.usd(h.P.us.forms.n565.online)} or ${h.usd(h.P.us.forms.n565.paper)}`, 'the damaged document itself'], ['USCIS typographical or clerical error', h.usd(h.P.us.forms.n565.uscisError), 'the original incorrect document; Part 5 of the form'], ['Name change after issuance', `${h.usd(h.P.us.forms.n565.online)} or ${h.usd(h.P.us.forms.n565.paper)}`, 'the original document and proof of the change; Part 6'], ['Special certificate for a foreign country', `${h.usd(h.P.us.forms.n565.online)} or ${h.usd(h.P.us.forms.n565.paper)}`, 'details of the foreign official who asks for it; Part 8']], `USCIS Fee Schedule G-1055, edition ${h.date(h.P.us.forms.g1055Edition)}, and Form N-565 instructions, edition 02/27/25, read on ${h.date(h.P.us.forms.retrieved_at)}.`, ['l', 'r', 'l'])}
<p>Every applicant also sends a copy of a U.S. government-issued photo ID. If your marital status changed since the certificate was issued, add the marriage certificate, divorce or annulment decree, or death certificate. Applicants living outside the United States add two identical passport-style photos.</p>
<h2>Filing online or on paper</h2>
<p>Online filing costs ${h.usd(h.P.us.forms.n565.paper - h.P.us.forms.n565.online)} less and needs a USCIS online account. When you file online and the case needs the original document (damage, USCIS error, name change), you mail that original to the USCIS service center named on the N-565 page after filing. Paper applications go to the USCIS lockbox listed there. A fee waiver request with Form I-912 means filing on paper. USCIS may call you for biometrics; at that appointment you sign an oath reaffirming your application.</p>
<h2>Correcting what USCIS got wrong</h2>
<p>The free case is narrow. It covers an error made by USCIS when it typed the certificate: a misspelled name you wrote correctly, a wrong date of birth when your N-400 had the right one. Check every line of your certificate the day you receive it, at the ceremony. If the information on the certificate matches what you wrote and swore to on your N-400, it is not a USCIS error, and the N-565 cannot change it.</p>
<h2>Is the certificate the only proof?</h2>
<p>No. A valid U.S. passport is also proof of citizenship, so many naturalized citizens apply for a passport soon after the ${h.a('us-oath', 'oath ceremony')} and keep the certificate at home. That is the safer habit: a certificate travels badly. Children who became citizens through a parent, and never received any certificate, use ${h.a('us-n600', 'Form N-600')} rather than the N-565, since there is nothing to replace.</p>
<h2>A note on copies</h2>
<p>For applications that ask for proof of citizenship, follow each agency’s instructions on copies. USCIS forms usually accept a legible photocopy unless they ask for the original, and USCIS may ask to see the original at any time. Questions about a complicated case, such as conflicting dates across several documents, are best put to an immigration attorney or accredited representative.</p>`,
  },
});
