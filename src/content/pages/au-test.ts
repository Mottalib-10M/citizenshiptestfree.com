import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'au-test',
  group: 'au',
  order: 30,
  tool: { kind: 'quiz', props: { country: 'au', mode: 'exam' } },
  mini: { kind: 'mini:aupass' },
  related: ['au-practice', 'au-questions', 'au-ocb', 'au-residence', 'au-eligibility', 'au-cost', 'au-processing'],
  sources: ['au_test', 'au_ocb', 'au_pr', 'au_1298i'],
  en: {
    slug: 'australian-citizenship-test',
    nav: 'Australian citizenship test',
    card: 'A 20-question practice test marked like the real one: 75 % overall and all 5 values questions right.',
    title: 'Citizenship Test Australia 2026: Free 20-Question Practice',
    description: 'Free Australian citizenship test practice: 20 questions marked like the real test, 75 % to pass and all 5 values questions right, with every answer explained.',
    h1: 'Australian citizenship test: a free practice test marked like the real one',
    intro: 'Twenty questions drawn from our bank, five of them on Australian values, marked with both official rules. Start now; nothing to sign up for.',
    resume: (h) => `The Australian citizenship test has ${h.P.au.test.questions} multiple choice questions, taken on a computer or tablet in ${h.P.au.test.minutes} minutes. To pass, two rules apply at once: a mark of at least ${h.pc(h.P.au.test.passPercent / 100)} overall, that is ${h.need.au} correct answers out of ${h.P.au.test.questions}, and all ${h.P.au.test.valuesQuestions} questions on Australian values answered correctly. A candidate with ${h.P.au.test.questions - 1} right answers fails if the one mistake is a values question. Home Affairs says that people aged ${h.P.au.test.ages[0]} to ${h.P.au.test.ages[1]} on the day their application for citizenship by conferral is received generally sit the test; younger and older applicants may have an interview instead. The test is in English, every question comes from the testable section of Australian Citizenship: Our Common Bond, and the application fee already includes it, with no extra cost to sit it again. The practice test above applies both rules and tells you which one you missed.`,
    faqs: (h) => [
      { q: 'What happens if I get 19 out of 20 but miss a values question?', a: `You fail. The ${h.P.au.test.valuesQuestions} values questions are a separate condition: all of them must be right, whatever the overall mark. That is why our practice test always includes ${h.P.au.test.valuesQuestions} values questions and shows them apart in the result. A mark of ${h.need.au} out of ${h.P.au.test.questions} with all ${h.P.au.test.valuesQuestions} values questions right is the lowest passing result.` },
      { q: 'How many times can I sit the Australian citizenship test?', a: `If you fail, Home Affairs books another appointment and there is no extra cost for sitting again. After ${h.P.au.test.appointmentsBeforeRefusal} appointments without a pass, the department may refuse the application. Failing does not affect your permanent visa or your right to live in Australia, according to the same page.` },
      { q: 'Can I listen to the questions instead of reading them?', a: `Yes. Computers and tablets at the test have headsets, and a candidate who cannot read English can choose to listen to the questions. An Assisted Test with ${h.P.au.test.assistedMinutes} minutes instead of ${h.P.au.test.minutes} may be offered to people who asked for help in their application and completed at least 400 hours of English tuition under the Adult Migrant English Program, or who have an impairment that needs extra time.` },
    ],
    body: (h) => `
<h2>The format, rule by rule</h2>
${h.table(['Point', 'Official rule'], [['Questions', `${h.P.au.test.questions}, multiple choice`], ['Values questions', `${h.P.au.test.valuesQuestions}, all must be right`], ['Pass mark', `${h.pc(h.P.au.test.passPercent / 100)} overall (${h.need.au} of ${h.P.au.test.questions})`], ['Time', `${h.P.au.test.minutes} minutes (${h.P.au.test.assistedMinutes} for an Assisted Test)`], ['Language', 'English only, questions can be heard through a headset'], ['Who sits it', `most applicants aged ${h.P.au.test.ages[0]} to ${h.P.au.test.ages[1]}`], ['Cost', 'included in the application fee, resits free'], ['Attempts', `refusal possible after ${h.P.au.test.appointmentsBeforeRefusal} appointments without a pass`]], `Home Affairs, test and interview pages, updated ${h.date(h.P.au.test.pageUpdated)}.`, ['l', 'l'])}
<h2>What the questions cover</h2>
<p>Home Affairs lists four subjects, which match the four parts of the testable section of ${h.src('au_ocb', 'Our Common Bond')}: Australia and its people; Australia's democratic beliefs, rights and liberties; government and the law in Australia; and Australian values, based on freedom, respect and equality. Our bank holds ${h.count.au} questions adapted by us from those parts (CC BY 4.0), ${h.count.auValues} of them on values. You can train on one part at a time on the ${h.a('au-practice', 'practice page')}, read every question with its answer on the ${h.a('au-questions', 'questions page')}, or quiz yourself part by part on the ${h.a('au-ocb', 'Our Common Bond page')}.</p>
<h2>How each practice test is drawn</h2>
<p>Each run takes ${h.P.au.test.valuesQuestions} questions from Part 4 and ${h.P.au.test.questions - h.P.au.test.valuesQuestions} from the other three parts, then shuffles the order. The answer choices are shuffled too, so the right answer is not always in the same place. At the end you see your mark, whether the values rule is met, and your result for each part, which tells you what to read again. When you start a new test, the address in your browser changes and reproduces that same test, so you can send it to someone preparing with you.</p>
<h2>On the day</h2>
<p>The appointment letter gives the date, time and place. Appointments are held at departmental offices in most capital cities and at some Services Australia offices. You bring a photo identity document, such as a passport or an Australian driver licence; certified copies and photos of it on a phone are not accepted, and without one the appointment is moved to a later date. Children are not allowed in the test centre. Staff confirm your identity and eligibility, take your photo, and then you sit the test on a computer or tablet. Mobile phones are turned off and put away, and no books or notes are allowed. Your result is displayed when you finish.</p>
<h2>Who does not sit the test</h2>
<p>Applicants aged 17 or under, or 60 or over, at the time they apply do not sit the test, nor do people unable to sit it because of an incapacity or impairment, and some other specific groups listed by Home Affairs. They may have an interview instead, so the department can confirm their identity and ask about the application. For everyone, the test is only one step: the ${h.a('au-residence', 'residence requirement')} decides when you can apply at all, and the ${h.a('au-eligibility', 'eligibility page')} lists the other conditions.</p>
<h2>After you pass</h2>
<p>Processing continues; the department writes if it needs more information or when it decides. If the application is approved and a ceremony is needed, the invitation arrives about four weeks before the ceremony, and you become a citizen when you make the pledge. The ${h.a('au-processing', 'processing time page')} shows the current official times and the ${h.a('au-cost', 'cost page')} what the application costs a family.</p>`,
  },
});
