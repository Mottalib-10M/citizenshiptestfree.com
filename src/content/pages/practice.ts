import { definePage } from '../../lib/guide-types';

// Recentrée sur les États-Unis le 2026-10-25 : la page comparait les tests du Royaume-Uni, de l'Australie et
// du Canada, qui ont désormais chacun leur site. Elle couvre maintenant l'entraînement à toute l'entrevue
// américaine (civique, lecture, écriture, conversation), sans lien vers les autres sites de l'éditeur.
export default definePage({
  id: 'practice',
  group: 'us',
  order: 65,
  tool: { kind: 'usquiz', props: { version: '2025', mode: 'practice', versionSelect: true } },
  mini: { kind: 'mini:uspass' },
  related: ['us-test', 'us-practice', 'us-english', 'us-questions', 'us-exemptions', 'us-which'],
  sources: ['us_study', 'us_128', 'us_100', 'us_vocab_r', 'us_vocab_w', 'us_test_perf'],
  en: {
    slug: 'citizenship-test-practice',
    nav: 'Citizenship test practice',
    card: 'Ten official civics questions drawn from the whole list, then a plan to practise every part of the interview: civics, reading, writing and speaking.',
    title: 'Citizenship Test Practice 2026: Free USCIS Questions',
    description: 'Free U.S. citizenship test practice: ten official USCIS civics questions at a time from the whole list, then reading, writing and speaking for the interview.',
    h1: 'U.S. citizenship test practice: every part of the interview',
    intro: 'Answer ten civics questions drawn from the whole official list, each checked at once. Then use the plan below to cover reading, writing and speaking too.',
    resume: (h) => `The U.S. citizenship test is not one test but four checks made during the same naturalization interview. The officer asks civics questions aloud from the public USCIS list, up to ${h.P.us.test2025.asked} on the 2025 version with ${h.P.us.test2025.passCorrect} right answers needed; asks you to read ${h.P.us.english.readingNeeded} of up to ${h.P.us.english.readingSentences} sentences aloud; dictates ${h.P.us.english.writingNeeded} of up to ${h.P.us.english.writingSentences} sentences for you to write; and judges your spoken English through the whole conversation about your Form N-400. Practice that only drills civics leaves three of those four checks to chance. The set above draws ten questions from the entire 2025 list of ${h.us.n25}, or from the 2008 list of ${h.us.n08} if USCIS received your N-400 before ${h.date(h.P.us.cutoff)}, and shows every accepted answer after each one. The rest of this page explains how to train the reading, writing and speaking parts with the official USCIS word lists, how the four parts weigh in the official results, and when a single mixed set like this one is more useful than practice by theme.`,
    faqs: (h) => [
      { q: 'What is the difference between this practice and the mock test?', a: `This set mixes ten questions from the whole list and always lets you answer all ten, so it measures how much of the list you know today. The ${h.P.us.test2025.asked}-question mock test runs like the interview: it stops at ${h.P.us.test2025.passCorrect} right or ${h.P.us.test2025.failWrong} wrong, exactly as the officer does. Use mixed sets every day and the mock test once or twice a week.` },
      { q: 'Which part of the interview do applicants fail most?', a: `In the USCIS results for fiscal year ${h.P.us.passRates.fy}, ${h.P.us.passRates.civicsInitial}% passed civics at the first interview, against ${h.P.us.passRates.english.reading}% for reading and ${h.P.us.passRates.english.writing}% for writing. Civics is the part that most often sends people to a second appointment, which is why it gets the most practice here, but writing and speaking are not free points.` },
      { q: 'What happens if I fail one part?', a: `USCIS gives a second chance on the part you failed only, at a new interview usually ${h.P.us.english.retestDays[0]} to ${h.P.us.english.retestDays[1]} days later. You keep what you passed. If you fail the same part twice, the application is denied and you must file a new N-400 and pay the fee again.` },
    ],
    body: (h) => `
<h2>The four parts and how often applicants pass them</h2>
${h.table(['Part', 'What the officer does', 'Passed at first try'], [['Civics', `asks up to ${h.P.us.test2025.asked} questions aloud (2025 list), ${h.P.us.test2025.passCorrect} right to pass`, `${h.P.us.passRates.civicsInitial}%`], ['Reading', `shows up to ${h.P.us.english.readingSentences} sentences, you read ${h.P.us.english.readingNeeded} correctly aloud`, `${h.P.us.passRates.english.reading}%`], ['Writing', `dictates up to ${h.P.us.english.writingSentences} sentences, you write ${h.P.us.english.writingNeeded} correctly`, `${h.P.us.passRates.english.writing}%`], ['Speaking', 'judges your answers about your N-400 during the whole interview', `${h.P.us.passRates.english.speaking}%`]], `USCIS test performance data, fiscal year ${h.P.us.passRates.fy}; overall pass rate after a second try: ${h.P.us.passRates.overall}%.`, ['l', 'l', 'r'])}
<h2>A mixed set or one theme at a time?</h2>
<p>Both, at different moments. While you are still learning the list, the ${h.a('us-practice', 'practice by theme')} is faster, because it shows the weak theme you need to read again. Once each theme gives you eight right answers out of ten, switch to mixed sets like the one above: the officer does not announce the theme, and a question on the Senate can follow one on the Civil War. A mixed set that gives you eight or more right answers three days in a row means you are ready for the full ${h.a('us-test', 'mock citizenship test')}.</p>
<h2>Practise reading and writing with the official words</h2>
<p>The reading and writing sentences are built from two short USCIS vocabulary lists, ${h.us.vocabR} words for reading and ${h.us.vocabW} for writing, made of civics words, question words, places, months, holidays and a few verbs. The ${h.a('us-english', 'English test page')} reads a sentence aloud for you to type and shows sentences to read, all made only of those words. Ten minutes a day is enough for most applicants: write each sentence twice, then check capital letters, the names of months and holidays, and the spelling of the presidents' names on the list.</p>
<h2>Practise speaking with your own N-400</h2>
<p>The speaking part has no list. The officer goes through your application and asks you to confirm or explain what you wrote: your addresses, your trips abroad, your work, your family, and the yes-or-no questions of Part 9. Read your copy of the N-400 aloud a few times before the interview and practise saying the key words, such as “claimed to be a U.S. citizen”, “habitual drunkard” or “removal proceedings”, in a short sentence of your own. Saying “Can you repeat the question, please?” is allowed and does not count against you.</p>
<h2>Who practises less</h2>
<p>Applicants aged ${h.P.us.s6520.age} or older with ${h.P.us.s6520.years} years as permanent residents study only the 20 starred questions and may take civics in their own language; ${h.P.us.englishExempt[0].age} with ${h.P.us.englishExempt[0].years} years, or ${h.P.us.englishExempt[1].age} with ${h.P.us.englishExempt[1].years}, skip the English test. The ${h.a('us-exemptions', 'exemptions page')} and the ${h.a('us-which', 'version checker')} tell you which case is yours before you plan your practice.</p>`,
  },
});
