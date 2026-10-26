import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-n648',
  group: 'us',
  order: 75,
  tool: { kind: 'mini:usn648' },
  mini: { kind: 'mini:usexempt' },
  related: ['us-exemptions', 'us-which', 'us-interview', 'us-n400', 'us-english', 'us-civics'],
  sources: ['us_n648', 'us_pm_e3', 'us_exceptions', 'us_g1055', 'us_pm_j3'],
  en: {
    slug: 'n-648',
    nav: 'Form N-648 medical exception',
    card: 'The medical certification that waives the English test, the civics test or both: who may sign it, the 180-day and 12-month rules, and how the officer reviews it.',
    title: 'N-648 2026: Medical Disability Exception, No Fee, 180 Days',
    description: 'Form N-648 in 2026: the medical certification that waives the English and civics tests, who may sign it, the 180-day and 12-month rules, and refusals.',
    h1: 'Form N-648: the medical exception to the citizenship tests',
    intro: 'Choose who signs the form and count the days between the signature and your N-400. The tool checks the three conditions USCIS looks at before reading the diagnosis.',
    resume: (h) => `Form N-648, Medical Certification for Disability Exceptions, is the form that lets an applicant for naturalization skip the English test, the civics test or both because of a physical or developmental disability or a mental impairment. It has no USCIS fee (${h.usd(h.P.us.forms.n648.fee)} in the fee schedule), although the doctor may charge for the examination. Only a medical doctor, a doctor of osteopathy or a clinical psychologist licensed in the United States may certify it, after an examination in person or, where state law allows, by real-time telehealth. The condition must have lasted, or be expected to last, at least ${h.P.us.forms.n648.minMonths} months, and the professional must certify the form no more than ${h.P.us.forms.n648.maxDaysBeforeFiling} days before you file Form N-400. It should be filed with the N-400; a form handed in later, at the interview for example, is accepted only if you show extenuating circumstances. Once accepted, it stays valid for that whole application. If the medical professional finds you cannot understand the oath, a separate waiver of the oath can also be requested. The checker above tests the formal conditions; the officer then judges whether the explanation links the condition to the inability to learn.`,
    faqs: (h) => [
      { q: 'Does an N-648 exempt me from the interview itself?', a: 'No. The N-648 waives the English requirement, the civics requirement or both, as the doctor indicates. You still attend the interview, swear to your answers and show you meet the other conditions such as residence and good moral character. If the English requirement is waived, you may use an interpreter for the interview and the civics test is not given in English.' },
      { q: 'Can my family doctor fill out the N-648?', a: 'Yes, if that doctor is a medical doctor or a doctor of osteopathy licensed in the United States and examined you. A clinical psychologist licensed in the United States may also certify it. Nurses, therapists, chiropractors and doctors licensed only abroad may not. USCIS advises checking the license with your state medical board.' },
      { q: `What if my N-648 was signed more than ${h.P.us.forms.n648.maxDaysBeforeFiling} days before I filed?`, a: `USCIS requires the certification to be made no more than ${h.P.us.forms.n648.maxDaysBeforeFiling} days before the N-400 is filed. An older form does not meet that rule, so the safe course is a new examination and a new form signed within the window. Ask for the appointment early enough that the doctor signs it a few weeks before you file.` },
      { q: 'Is an accommodation the same as an N-648 exception?', a: 'No. An accommodation changes how you take the tests, for example with a sign language interpreter, extra time or an interview at another location, and you still have to meet the English and civics requirements. The N-648 removes one or both requirements. You can ask for both when both are needed; accommodations are requested through the USCIS disability accommodations process, not with the N-648.' },
    ],
    body: (h) => `
<h2>The rules in one table</h2>
${h.table(['Rule', 'What USCIS requires'], [['Fee', `${h.usd(h.P.us.forms.n648.fee)}: no USCIS fee; the doctor may charge for the visit`], ['Who certifies', 'medical doctor, doctor of osteopathy or clinical psychologist, licensed in the United States'], ['Examination', 'in person, or real-time telehealth where state law permits'], ['Duration of the condition', `has lasted or is expected to last at least ${h.P.us.forms.n648.minMonths} months`], ['Timing of the signature', `no more than ${h.P.us.forms.n648.maxDaysBeforeFiling} days before the N-400 is filed`], ['When to submit', 'with the N-400; later only with extenuating circumstances'], ['Validity', 'the whole naturalization process of that N-400'], ['What it waives', 'English, civics or both, as certified']], `USCIS Form N-648 page and Policy Manual, volume 12, part E, chapter 3, read on ${h.date(h.P.us.forms.retrieved_at)}.`, ['l', 'l'])}
<h2>What the doctor must explain</h2>
<p>The Policy Manual asks for more than a diagnosis. The certification has to describe the condition, say that it has lasted or will last at least ${h.P.us.forms.n648.minMonths} months, and explain how it prevents you from learning or showing knowledge of English, civics or both, even with reasonable accommodations. A form that only names a condition, without linking it to the inability to learn, is the most common reason for a request for evidence. The officer presumes the diagnosis is valid and does not second-guess the medicine; what is reviewed is whether the form is complete and consistent with the rest of your record.</p>
<h2>When an officer doubts the form</h2>
<p>The Policy Manual lists situations that raise credible doubts: answers at the interview that contradict the described condition, discrepancies between the form and your file, several N-648 forms from different professionals that disagree, or an interpreter known to be involved in fraud. In those cases the officer may ask you to explain under oath, issue a request for evidence or ask for a new N-648 from a different medical professional. USCIS also warns that people have been prosecuted for selling false certifications: the form must come from a real examination.</p>
<h2>The interview with an N-648</h2>
<ol>
<li>The officer reviews the form at the start of the interview.</li>
<li>If it is sufficient, the waived test is not given. When English is waived, the rest of the interview and any civics test run in your language, with your interpreter.</li>
<li>If it is insufficient, the officer explains why in your language and continues the interview as if no N-648 had been filed. You keep your second chance: a re-examination ${h.P.us.english.retestDays[0]} to ${h.P.us.english.retestDays[1]} days later, where new evidence is reviewed.</li>
</ol>
<h2>N-648 or the age exemptions?</h2>
<p>Age and years as a permanent resident already lift the English test for many older applicants, with no medical form: the 50/20, 55/15 and 65/20 rules, checked in the second tool above and explained on the ${h.a('us-exemptions', '65/20 test page')}. The N-648 is the route for a disability at any age, and the only one that can waive the civics test entirely. If you qualify for an age exemption and only need the civics test in your language, you do not need an N-648. A short list of ${h.P.us.s6520.bank} questions may then be all you have to learn.</p>
<p>Before filing, check your dates with the ${h.a('us-n400', 'N-400 date tool')}, so the doctor signs within the ${h.P.us.forms.n648.maxDaysBeforeFiling}-day window. Questions about your eligibility for a waiver are best put to an immigration attorney or a representative of an accredited organization; this page explains the published rules and does not assess any medical case.</p>`,
  },
});
