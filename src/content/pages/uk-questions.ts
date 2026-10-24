import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'uk-questions',
  group: 'uk',
  order: 12,
  tool: { kind: 'bank', props: { country: 'uk', chapter: 2 } },
  related: ['uk-practice', 'uk-mock', 'uk-handbook', 'uk-test', 'uk-pass-mark'],
  sources: ['uk_test'],
  en: {
    slug: 'life-in-the-uk-test/questions',
    nav: 'Questions and answers',
    card: 'Every practice question of our Life in the UK bank with its answer and the fact behind it, chapter by chapter.',
    title: 'Life in the UK Test Questions: Answers Explained by Topic',
    description: 'Life in the UK Test questions with answers: browse our bank chapter by chapter, see which facts come up (dates, places, people) and why each answer is right.',
    h1: 'Life in the UK Test questions with answers',
    intro: 'Open a chapter to read its questions with the right answer and a short explanation. Nothing to tick here: this is a reading list, built to show the kind of facts the test checks.',
    resume: (h) => `Life in the UK Test questions are multiple-choice items on facts from the official handbook, Life in the United Kingdom: A Guide for New Residents, and the real test sets ${h.P.uk.test.questions} of them in ${h.P.uk.test.minutes} minutes. No official question list is published, so every question on this page was written by Radif Partners from the handbook's facts, without copying its text. The bank holds ${h.count.uk} questions, split into the five handbook chapters: ${h.inChapter('uk', 0)} on values and principles, ${h.inChapter('uk', 1)} on what the UK is, ${h.inChapter('uk', 2)} on history, ${h.inChapter('uk', 3)} on modern society and ${h.inChapter('uk', 4)} on government and the law. Each one shows its answer and the reason behind it. Most questions turn on four kinds of fact: a date, a place, a number or a person. Reading them by chapter shows where the handbook is precise and where a near miss among the options is likely, before you test yourself in the practice or mock modes.`,
    faqs: (h) => [
      { q: 'Are the questions in your bank the ones asked at the test centre?', a: 'No. The Home Office does not publish its questions, and we do not copy any. Our questions check the same facts from the handbook, but the wording, the order of options and the wrong answers you meet on the day will be different. That is why it pays to learn the fact itself, not the look of a particular question.' },
      { q: 'Why are a few questions written as true or false statements?', a: 'They train a different reflex: judging whether a whole sentence is accurate, rather than spotting one right option among four. A statement can be wrong because of a single word (a date, a place, "all" instead of "some"), so they push you to read to the end. gov.uk does not describe the question formats in detail, so treat them as practice, not as a forecast.' },
      { q: 'Which kinds of facts should I learn by heart?', a: `Dates of key events, the symbols and capitals of the four nations, the numbers attached to institutions (how often elections are held, how many people sit on a jury) and the names behind inventions, writing and art. Principles and responsibilities, in contrast, are better understood than memorised. The ${h.a('uk-practice', 'chapter practice')} suggests a method for each type.` },
      { q: 'How were the answers on this page checked?', a: 'Each question was written from a fact covered by one of the five handbook chapters and checked against official and reference sources before it went into the bank. Questions that depend on who holds an office today, or on a fact that has changed since the handbook was printed, were left out on purpose, so that the answer stays the same as in the book.' },
    ],
    body: (h) => {
      const hist = h.q('uk-002'), jury = h.q('uk-187'), cap = h.q('uk-055'), car = h.q('uk-109'), trick = h.q('uk-103');
      return `
<h2>How the bank is organised</h2>
<p>The tool at the top opens on the history chapter, the one most people want to read first. Use the chapter selector to switch. Each chapter is a separate list, so you can read one in a sitting and come back to the next.</p>
${h.table(['Handbook chapter', 'Questions in our bank', 'Main type of fact'], [
  [h.chapters.uk[0], h.inChapter('uk', 0), 'principles and situations'],
  [h.chapters.uk[1], h.inChapter('uk', 1), 'places and symbols'],
  [h.chapters.uk[2], h.inChapter('uk', 2), 'dates and people'],
  [h.chapters.uk[3], h.inChapter('uk', 3), 'customs, sport and the arts'],
  [h.chapters.uk[4], h.inChapter('uk', 4), 'institutions and numbers'],
  ['Total', h.count.uk, ''],
], 'Size of each chapter of the Radif Partners question bank, read from the bank itself.', ['l', 'r', 'l'])}
<p>The split is even on purpose. The handbook chapters are not the same length, and the history part is by far the longest, but an even bank makes sure you do not neglect the shorter chapters, which still supply questions on the day.</p>
<h2>The four kinds of fact behind most questions</h2>
<h3>Dates</h3>
<p>History questions often ask for a year or the event tied to one. A typical example from our bank: "${hist?.q}" The answer is ${hist?.options[hist.answer]}. The wrong options are other well-known battles, so knowing roughly when each happened is what lets you pick the right one.</p>
<h3>Places</h3>
<p>The chapter on what the UK is asks where things are: capitals, landmarks, rivers and mountains. "${cap?.q}" has a short answer (${cap?.options[cap.answer]}), but the options mix other towns of Northern Ireland with the capital of the Republic of Ireland, so a vague memory of the map costs the point.</p>
<h3>Numbers</h3>
<p>The government and law chapter attaches numbers to institutions. "${jury?.q}" The answer is ${jury?.options[jury.answer]}. Numbers are easy to learn and easy to forget, so they belong in your revision notebook.</p>
<h3>People</h3>
<p>Writers, scientists, rulers and politicians appear across several chapters. "${car?.q}" Answer: ${car?.options[car.answer]}. Here the trap is a list of other well-known names from British history, one of them a king of the same period.</p>
<h2>Reading a question before answering</h2>
<p>Take "${trick?.q}" Every option names a pair of real royal houses, and several of those houses did reign. The question asks for the two that fought each other in that war, so an option that merely sounds royal and old is not enough. The answer is ${trick?.options[trick.answer]}. The lesson applies to the whole test: read the full question, find the key word (two, first, longest, not), then check every option against it.</p>
<p>Watch for small words. "Which is not" reverses the logic of a question, and "usually" or "normally" signals a general rule rather than an absolute one. A quick second reading of the question costs a few seconds; you have ${h.P.uk.test.minutes} minutes for ${h.P.uk.test.questions} questions, so there is time for it.</p>
<h2>From reading to answering</h2>
<p>Reading the answers is the first step, not the last. Once a chapter looks familiar, close this page and answer the same chapter in the ${h.a('uk-practice', 'practice mode')}, where nothing is shown before you choose. Then sit a few full ${h.a('uk-mock', 'mock tests')} mixing all five chapters. Facts you can recognise in a list are not always facts you can recall under a clock, and only answering tells you which is which.</p>
<p>For the book behind every question, its five parts and how to read it, see the ${h.a('uk-handbook', 'handbook guide')}.</p>
<h2>What the bank leaves out</h2>
<p>We do not write questions about who holds a public office today, about figures that change every year, or about points the handbook states in a way that later events have overtaken. The real test is set from the handbook, so a question whose answer depends on the news would teach you the wrong reflex. Everything else in the five chapters is fair game, and the bank tries to cover each section in proportion.</p>`;
    },
  },
});
