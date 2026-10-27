/**
 * Checklists of the U.S. pages, written by Radif Partners from official USCIS pages (read 2026-10-27):
 * - biometrics: “Preparing for Your Biometric Services Appointment” and the N-400 instructions (01/20/25);
 * - n400: N-400 instructions, edition 01/20/25 (parts 1 to 16, “How To Complete Form N-400”);
 * - n445: “Naturalization Ceremonies” (check-in, questionnaire on Form N-445, green card returned).
 *   The N-445 questions themselves are printed on the notice each applicant receives: the list below
 *   names their subjects in our words and always sends the reader back to the printed form.
 * `must`: required by USCIS; otherwise advice. Nothing ticked is stored or sent.
 */
export interface CheckItem { t: string; d: string; must?: boolean }
export interface Checklist { id: string; title: string; head: string; done: string; items: CheckItem[]; note: string }

export const CHECKLISTS: Record<string, Checklist> = {
  biometrics: {
    id: 'biometrics', title: 'Biometrics appointment checklist', head: 'Ready for the ASC', done: 'You have everything USCIS asks for',
    note: 'From the USCIS page on biometric services appointments. Required items are marked; the others are advice.',
    items: [
      { t: 'Appointment notice (Form I-797C)', d: 'Bring every biometrics notice you received if there is more than one.', must: true },
      { t: 'Valid photo ID', d: 'Green card, passport or driver’s license; the name should match the notice.', must: true },
      { t: 'Date, time and ASC address checked', d: 'Your notice names one Application Support Center; plan the trip and arrive on time.', must: true },
      { t: 'No weapons in your bag', d: 'Firearms, knives and pepper spray are banned in USCIS buildings, even with a permit.', must: true },
      { t: 'Your copy of the N-400 reread', d: 'At the ASC you sign again, under penalty of perjury, that everything in the application was true and complete.' },
      { t: 'Interpreter or companion if needed', d: 'If you do not understand spoken English, you may bring a family member or a representative to help.' },
      { t: 'Disability accommodation asked in advance', d: 'Request it online on the USCIS accommodations page or through the Contact Center before the day.' },
      { t: 'Reschedule only online, before the appointment', d: 'Use your USCIS online account and give good cause; missing the appointment can lead to a denial for abandonment.' },
    ],
  },
  n400: {
    id: 'n400', title: 'Form N-400, part by part', head: 'Parts ready', done: 'Every part you must fill is ready',
    note: 'Parts of Form N-400, edition 01/20/25, as the USCIS instructions describe them. Parts 15 and 16 are left blank: the officer completes them with you at the interview.',
    items: [
      { t: 'Part 1, eligibility basis', d: 'Choose one box: 5 years as a permanent resident, 3 years married to a citizen, military service or another basis.', must: true },
      { t: 'Part 2, about you', d: 'Legal name, every other name used, A-Number padded to nine digits, “resident since” date from your green card.', must: true },
      { t: 'Part 3, biographic information', d: 'Ethnicity, race, height in feet and inches, weight in pounds, eye and hair color.', must: true },
      { t: 'Part 4, where you lived', d: 'Every address of the last 5 years (3 years on the marriage route), with dates.', must: true },
      { t: 'Part 5, marital history', d: 'Current spouse, prior marriages of both spouses; marriage, divorce or death certificates.', must: true },
      { t: 'Part 6, children', d: 'All children under 18, wherever they live, including stepchildren and adopted children.', must: true },
      { t: 'Part 7, work and school', d: 'Employers and schools of the last 5 years (3 on the marriage route), gaps included.', must: true },
      { t: 'Part 8, time outside the United States', d: 'Every trip of the last 5 years (3 on the marriage route), with departure and return dates.', must: true },
      { t: 'Part 9, additional questions', d: 'Yes or no to every question on moral character, security and the oath; explain each “Yes” in Part 14.', must: true },
      { t: 'Part 10, fee reduction (if eligible)', d: 'Household income at or below 400% of the poverty guidelines, with proof of income and household size.' },
      { t: 'Part 11, your signature', d: 'Sign by hand in ink; a typed name is not a signature. Contact details: phone and email.', must: true },
      { t: 'Parts 12 and 13, interpreter and preparer', d: 'Only if someone translated the form for you or filled it in for you; each signs their own part.' },
      { t: 'Part 14, additional space', d: 'Name, A-Number, page, part and item number on every added sheet, signed and dated.' },
      { t: 'Black ink, “N/A” and “None”', d: 'Write N/A when a question does not apply and None when the answer is zero; no correction fluid.', must: true },
    ],
  },
  n445: {
    id: 'n445', title: 'Before the oath ceremony', head: 'Ready for the ceremony', done: 'You can check in',
    note: 'From the USCIS page on naturalization ceremonies. The questions are printed on your own Form N-445: answer those, in the words of the form.',
    items: [
      { t: 'Form N-445 brought with you', d: 'The notice gives the date, time and place, and holds the questionnaire the officer reviews at check-in.', must: true },
      { t: 'Questionnaire answered before you arrive', d: 'It covers the time since your interview: answer every question on the back of the notice.', must: true },
      { t: 'Changes since the interview noted', d: 'Marriage, divorce, trips abroad, arrests, citations or charges, new memberships: any “Yes” needs a word with the officer.', must: true },
      { t: 'Green card ready to hand back', d: 'You return the Permanent Resident Card at check-in, unless you showed at the interview that it was lost.', must: true },
      { t: 'Prohibited items left at home', d: 'Ceremonies are often in federal buildings: weapons and some other items are banned.' },
      { t: 'Certificate checked before leaving', d: 'Read your Certificate of Naturalization at once and report any error before you leave the ceremony.', must: true },
      { t: 'Cannot attend? Send the notice back', d: 'Return the N-445 to your field office with a letter explaining why; missing more than once can lead to a denial.' },
    ],
  },
};
