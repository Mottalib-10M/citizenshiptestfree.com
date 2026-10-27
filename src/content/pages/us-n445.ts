import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-n445',
  group: 'us',
  order: 119,
  tool: { kind: 'uschecklist', props: { list: 'n445' } },
  related: ['us-oath', 'us-certificates', 'us-interview', 'us-gmc', 'us-steps'],
  sources: ['us_ceremonies', 'us_pm_b4', 'us_oath', 'cfr8_337'],
  en: {
    slug: 'n-445',
    nav: 'Form N-445, oath ceremony notice',
    card: 'Form N-445 is the notice of your oath ceremony and the questionnaire you answer before it: what it asks, what to bring, and how to reschedule.',
    title: 'N-445 Form 2026: Oath Ceremony Notice and Questionnaire',
    description: 'Form N-445, Notice of Naturalization Oath Ceremony: what the questionnaire covers since your interview, what to bring, returning the green card, rescheduling.',
    h1: 'Form N-445: the notice of your oath ceremony',
    intro: 'Go through the list before the ceremony day. The panel shows what is still missing among the steps USCIS requires at check-in.',
    resume: () => `Form N-445, Notice of Naturalization Oath Ceremony, is the letter USCIS sends after your N-400 is approved when you are not sworn in on the day of your interview. It gives the date, time and place of the ceremony, and its back carries a short questionnaire about the time since your interview. You answer it before you arrive; at check-in a USCIS officer reviews your answers, because you must remain eligible, including of good moral character, until the moment you take the oath. You also hand back your Permanent Resident Card at check-in, unless you showed at the interview that it was lost. You become a citizen only when you take the Oath of Allegiance at the ceremony, and you then receive your Certificate of Naturalization, which you should check for errors before leaving. If you cannot attend, you return the N-445 to your local USCIS office with a letter that explains why and asks for a new date. Missing the ceremony more than once may lead USCIS to deny the application. There is no fee for the N-445 or the ceremony: the N-400 fee covers it. Some field offices hold the oath on the same day as the interview, in which case no N-445 is mailed.`,
    faqs: () => [
      { q: 'What does the N-445 questionnaire ask?', a: 'It asks about events after your interview: for example changes in marital status, trips outside the United States, arrests, citations or offenses, and new memberships or other facts that bear on eligibility. The exact questions are printed on your notice; answer those, in the form’s words. A “Yes” does not cancel the ceremony by itself, but the officer may ask questions or hold the oath.' },
      { q: 'Can I change my name at the oath ceremony?', a: 'Only if you asked for it on the N-400, in Part 2. A court can then make the change at a judicial ceremony, and your certificate shows the new name. If you did not ask, you keep your current legal name. USCIS cannot process this request for members of the military or their spouses naturalizing abroad.' },
      { q: 'I traveled abroad after my interview. Is that a problem?', a: 'Say so on the questionnaire. A short trip is common and is not a bar, but continuous residence and good moral character must still hold until the oath. A long absence after the interview can raise questions at check-in. Keep your passport handy in case the officer asks for the dates.' },
    ],
    body: (h) => `
<h2>From approval to the oath</h2>
<ol>
<li>The officer approves your N-400 at or after the interview.</li>
<li>If no same-day ceremony is available, USCIS mails Form N-445 with the date, time and place.</li>
<li>You answer the questionnaire before the day.</li>
<li>At check-in, an officer reviews your answers and takes back your green card.</li>
<li>You take the Oath of Allegiance with the other new citizens.</li>
<li>You receive your Certificate of Naturalization and check it before leaving.</li>
</ol>
<p>This order follows the USCIS page on ${h.src('us_ceremonies', 'naturalization ceremonies')}, which also reminds applicants that they are not citizens until they take the oath. The ${h.a('us-oath', 'oath ceremony page')} of this site has the full text of the oath and a timeline of the day.</p>
<h2>The questionnaire: answer it as the form asks</h2>
<p>The questions cover the period between your interview and the ceremony. They exist because naturalization depends on your eligibility on the day of the oath, not only on the day you filed: USCIS must be able to confirm that nothing has changed. Read each question slowly, answer it with the same honesty as the N-400, and bring documents for any “Yes”, such as a court record for a citation. An unreported arrest found later can lead to serious consequences, up to the revocation of a naturalization obtained by concealment.</p>
<h2>Common situations</h2>
${h.table(['Situation', 'What to do'], [
  ['Nothing changed since the interview', 'Answer “No” where it applies, sign, bring the notice'],
  ['You traveled abroad', 'Answer the travel question; have your passport ready for the dates'],
  ['You were cited, arrested or charged', 'Answer “Yes” and bring the court documents'],
  ['You married or divorced', 'Answer the marital question; bring the certificate or decree'],
  ['You lost your green card', 'Say so at check-in; the return is waived only if you proved the loss at the interview'],
  ['You cannot attend', 'Return the N-445 with a letter asking for a new date'],
], 'USCIS, Naturalization Ceremonies, read on 27 October 2026. The questions themselves are on your own notice.', ['l', 'l'])}
<h2>What to bring</h2>
<ul>
<li>The N-445 notice itself, with the questionnaire answered.</li>
<li>Your Permanent Resident Card, which you hand in at check-in.</li>
<li>Any other document your notice lists: notices differ, so read yours line by line.</li>
<li>Answers to any follow-up the officer might have about a “Yes” on the questionnaire.</li>
</ul>
<h2>Rescheduling the ceremony</h2>
<p>Return the N-445 to your local office with a letter explaining why you cannot attend and asking for a new date. Do it as early as you can. USCIS warns that failing to appear more than once may lead to a denial of the application, after which you would have to start over with a new N-400 and a new fee.</p>
<h2>After the ceremony</h2>
<p>Check every line of the certificate before you leave: name, date of birth, country of birth. An error made by USCIS is corrected free with Form N-565; the ${h.a('us-certificates', 'certificates page')} explains the difference between your new Certificate of Naturalization and a Certificate of Citizenship. Then update your social security record, apply for a U.S. passport if you want one, and register to vote. Independent site, not affiliated with USCIS.</p>`,
  },
});
