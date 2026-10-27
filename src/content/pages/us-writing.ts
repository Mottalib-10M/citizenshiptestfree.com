import { definePage } from '../../lib/guide-types';
import VOC from '../../data/us-english.json';

const W = VOC.writing as Record<string, string[]>;

export default definePage({
  id: 'us-writing',
  group: 'us',
  order: 81,
  tool: { kind: 'uswordorder' },
  related: ['us-english', 'us-interview', 'us-exemptions', 'us-test', 'us-presidents'],
  sources: ['us_vocab_w', 'us_pm_e2', 'us_interview', 'us_study'],
  en: {
    slug: 'citizenship-writing-test',
    nav: 'Citizenship writing test',
    card: 'The writing part of the English test: the official word list by category, what counts as a mistake, and a drill that rebuilds sentences word by word.',
    title: 'Citizenship Writing Test 2026: Word List, Rules and Drill',
    description: 'Citizenship writing test: the full USCIS writing vocabulary by category, which spelling errors are forgiven, which fail a sentence, and a free sentence drill.',
    h1: 'The citizenship writing test',
    intro: 'Tap the shuffled words in the right order, then write the whole sentence from memory. Every word is on the official USCIS writing list.',
    resume: (h) => `The writing test is one of the three parts of the English requirement for naturalization, given at the interview. The officer reads a sentence aloud and you write it down; you have up to ${h.P.us.english.writingSentences} tries and need ${h.P.us.english.writingNeeded} sentence written so that the officer can understand its meaning. The sentences are built from a short official vocabulary list of ${h.us.vocabW} items published by USCIS: three people (Adams, Lincoln, Washington), civics words such as Congress, President, Senators and White House, places such as Alaska, California and New York City, seven months, seven holidays, ten verbs and a handful of everyday words like red, white, blue, largest and taxes. Under the USCIS Policy Manual, you do not fail for spelling, capitalization or punctuation errors that leave the meaning clear, and numbers may be written as digits or words. You fail a sentence by writing a different word, omitting a content word, abbreviating, or producing something illegible. If you fail, USCIS retests only the part you missed, ${h.P.us.english.retestDays[0]} to ${h.P.us.english.retestDays[1]} days later. Applicants exempt from English because of age and years of residence skip it.`,
    faqs: (h) => [
      { q: 'Can I write numbers as digits on the writing test?', a: 'Yes. The writing list itself shows “fifty/50” and “one hundred/100”, and USCIS accepts either form. “The flag has 50 stars” and “The flag has fifty stars” are both right. What matters is that every content word is there and readable, so practise the spelled forms too, in case the digit slips your mind.' },
      { q: 'Does bad handwriting fail the writing test?', a: 'Only if the officer cannot read the sentence. Print in clear block letters if your cursive is hard to read, leave space between words, and write the whole sentence on one line if you can. Many people practise on paper with a pen, not only on a phone, because that is how the test is taken.' },
      { q: 'What is the hardest word on the writing list?', a: `Learners most often miss the holidays and months: “February”, “Thanksgiving”, “Independence Day”, “Columbus Day”. Then come proper names such as “Delaware” and “Lincoln”, and plurals like “Senators”. The list has ${h.us.vocabW} entries, so writing each one five times is a short evening of work.` },
    ],
    body: (h) => `
<h2>The official writing vocabulary</h2>
${h.table(['Category', 'Words'], Object.entries(W).map(([k, v]) => [k, v.join(', ')]), 'USCIS writing vocabulary for the naturalization test (PDF). A slash means both forms are on the list.', ['l', 'l'])}
<p>The ${h.src('us_vocab_w', 'USCIS writing vocabulary')} is all you need for spelling: every dictated sentence is built from these words. Read it together with the civics answers, because most sentences restate a civics fact, such as who was the first President or when Flag Day is.</p>
<h2>What counts as a mistake</h2>
${h.table(['Accepted (you still pass)', 'Fails the sentence'], [
  ['A spelling slip that keeps the meaning', 'A different word, even close in sound'],
  ['Missing capital letter or period', 'A content word left out'],
  ['Digits for numbers (50, 100)', 'An abbreviation (Pres., Wash.)'],
  ['Small grammar error', 'Writing that the officer cannot read'],
], 'USCIS Policy Manual, volume 12, part E, chapter 2.', ['l', 'l'])}
<p>The ${h.src('us_pm_e2', 'Policy Manual')} sets these rules for officers. In practice, it comes down to one question: can I read the sentence I dictated in what you wrote?</p>
<h2>A routine that works</h2>
<ol>
<li><strong>Spell the list.</strong> Copy each word of the table once a day for a week, saying it aloud.</li>
<li><strong>Rebuild sentences.</strong> Use the drill above: the order of words in English sentences is the part people forget under stress.</li>
<li><strong>Write from dictation.</strong> Ask someone to read a sentence once, at normal speed, and write it without looking. The ${h.a('us-english', 'English test page')} reads sentences aloud with your browser’s voice.</li>
<li><strong>Check only meaning.</strong> Do not lose time on commas: re-read for missing words.</li>
</ol>
<h2>On the interview day</h2>
<p>The officer gives you something to write on; listen to the whole sentence before writing, and ask the officer to repeat it if you did not hear it. Once one sentence is right, the test stops. The civics test and the speaking part are judged separately: the ${h.a('us-interview', 'interview page')} covers the rest of the conversation, and the ${h.a('us-exemptions', 'exemptions page')} the age-based waivers.</p>
<p>The practice sentences here were written by this independent site using only the official word list; they are not the sentences USCIS uses, and this site is not affiliated with USCIS.</p>`,
  },
});
