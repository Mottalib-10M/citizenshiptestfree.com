import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-biometrics',
  group: 'us',
  order: 113,
  tool: { kind: 'uschecklist', props: { list: 'biometrics' } },
  related: ['us-processing', 'us-timeline', 'us-steps', 'us-interview', 'us-n400'],
  sources: ['us_biometrics', 'us_n400_instr', 'us_10steps', 'us_egov_pt'],
  en: {
    slug: 'biometrics-appointment',
    nav: 'Biometrics appointment',
    card: 'What the biometrics appointment is, what to bring to the Application Support Center, how long it takes and how to reschedule without losing your case.',
    title: 'Biometrics Appointment 2026: What to Bring, Rescheduling',
    description: 'Biometrics appointment for the N-400: what to bring to the USCIS ASC, what happens there, the digital signature, rescheduling online and what a no-show risks.',
    h1: 'The biometrics appointment: what to bring and what happens',
    intro: 'Tick each item once it is in your bag. The panel lists what USCIS requires that is still missing.',
    resume: (h) => `After you file Form N-400, USCIS usually schedules a biometrics appointment at a local Application Support Center (ASC) to take your fingerprints, photograph and digital signature. The notice, Form I-797C, gives the date, time and address. You must bring that notice (all of them if you received several) and a valid photo identification such as your green card, passport or driver’s license; weapons are banned in USCIS buildings. The fingerprints let USCIS confirm your identity and run the background and security checks, including an FBI criminal history check, that must be completed before the interview. At the machine you also sign digitally, which reaffirms under penalty of perjury that everything in your application was complete, true and correct when you filed. The biometrics fee is included in the N-400 fee of ${h.usd(h.P.us.fees.online)} online or ${h.usd(h.P.us.fees.paper)} on paper. To reschedule, you must ask through your USCIS online account before the original date and show good cause, including to change location; if you simply do not appear, USCIS may consider the application abandoned and deny it. Applicants abroad are told by their notice to contact a U.S. embassy, consulate or USCIS office instead.`,
    faqs: () => [
      { q: 'How long does a biometrics appointment take?', a: 'The capture itself takes a few minutes: fingerprints on a scanner, a photo and a digital signature. Most of the time is spent waiting to check in and for your turn. Plan to arrive on time for the slot printed on the notice, with your documents in hand.' },
      { q: 'Can I walk in to my biometrics appointment early or at another center?', a: 'Not by right. Your notice names one center, one date and one time. Changing the location counts as a reschedule, which USCIS now handles only through your online account, before the appointment and for good cause. Going to another center without an approved change risks being turned away.' },
      { q: 'What happens after the biometrics appointment?', a: 'USCIS runs the background checks, then schedules the naturalization interview, where you take the English and civics tests. The time between the two depends on your field office. Nothing is decided at the ASC: staff there only collect fingerprints, photo and signature, and do not answer questions about your case.' },
    ],
    body: (h) => `
<h2>Where it fits in the process</h2>
${h.table(['Step', 'What happens', 'Notice'], [
  ['1. Filing', 'You send the N-400 and the fee', 'Receipt notice'],
  ['2. Biometrics', 'Fingerprints, photo, digital signature at an ASC', 'Form I-797C appointment notice'],
  ['3. Background checks', 'FBI and security checks run on your fingerprints', 'none'],
  ['4. Interview', 'English and civics tests, review of the N-400', 'Interview notice'],
  ['5. Oath', 'Ceremony; you become a citizen', 'Form N-445'],
], 'USCIS, 10 Steps to Naturalization, and N-400 instructions (edition 01/20/25).', ['l', 'l', 'l'])}
<p>The ${h.a('us-timeline', 'naturalization timeline')} dates these steps from your filing day, and the ${h.a('us-processing', 'processing time page')} explains how long each field office takes. USCIS’s own ${h.src('us_egov_pt', 'processing times tool')} gives the current figure for your office.</p>
<h2>At the Application Support Center</h2>
<ol>
<li><strong>Security and check-in.</strong> A guard screens your bag; staff check your notice and your photo ID.</li>
<li><strong>Fingerprints.</strong> All ten fingers on a glass scanner. Clean, dry hands help; cuts and very dry skin can make a print unreadable.</li>
<li><strong>Photograph.</strong> Taken on the spot; you do not bring photos for an N-400 filed in the United States.</li>
<li><strong>Digital signature.</strong> You sign on a pad. The ${h.src('us_biometrics', 'USCIS biometrics page')} explains that this attests, under penalty of perjury, that your application and its documents were complete, true and correct.</li>
</ol>
<p>Because of that signature, reread your copy of the N-400 before you go, as the ${h.src('us_n400_instr', 'N-400 instructions')} recommend. If you spot a mistake, note it: you can correct it at the interview, where the officer goes over the form with you.</p>
<h2>Rescheduling, the strict way</h2>
<p>USCIS’s current rule is strict: a request to reschedule must go through your USCIS online account, not by mail, and must be made before the date and time of the original appointment, with good cause, even if you only want another location. Calling the USCIS Contact Center is the fallback when the online request fails. If you do not follow these steps and miss the appointment, USCIS may treat the N-400 as abandoned and deny it, and the fee is not refunded.</p>
<h2>Special cases</h2>
<ul>
<li><strong>Language.</strong> The attestation is shown in English and Spanish; USCIS publishes translations in other languages. You may bring a family member or representative to translate.</li>
<li><strong>Disability.</strong> Ask for an accommodation in advance, online or through the Contact Center.</li>
<li><strong>Several notices.</strong> If family members filed other forms, each person brings their own notice; if you received several notices yourself, bring them all.</li>
</ul>
<p>Use the time after biometrics to study: the ${h.a('us-test', 'mock civics test')} and the ${h.a('us-interview', 'interview practice')} cover what comes next. Information page from an independent site, not affiliated with USCIS.</p>`,
  },
});
