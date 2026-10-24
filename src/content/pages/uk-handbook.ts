import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'uk-handbook',
  group: 'uk',
  order: 17,
  tool: { kind: 'quiz', props: { country: 'uk', mode: 'practice', chapter: 2 } },
  related: ['uk-practice', 'uk-questions', 'uk-test', 'uk-mock', 'uk-exemption'],
  sources: ['uk_test'],
  en: {
    slug: 'life-in-the-uk-test/handbook',
    nav: 'The official handbook',
    card: 'The official Life in the UK handbook explained: its edition, its five chapters and how to study it for the test.',
    title: 'Life in the UK Handbook: The Official Guide, 3rd Edition',
    description: 'Life in the UK handbook: what the official Guide for New Residents covers in its five chapters, why it is the only source of questions, and how to read it.',
    h1: 'The Life in the UK handbook',
    intro: 'The quiz above opens on the history chapter, the longest in the book. Below: which book to use, what each chapter is about, and a reading method that turns it into answers.',
    resume: (h) => `The Life in the UK handbook is the official study guide for the Life in the UK Test: ${h.P.uk.test.handbook}. gov.uk says you will only be tested on information from this Guide for New Residents and that you should study it to prepare; it is available as a printed book, an eBook or in audio formats. It is divided into five chapters: ${h.chapters.uk.join('; ')}. The test sets ${h.P.uk.test.questions} questions drawn from those chapters, and gov.uk says you need ${h.pc(0.75)} or more to pass, which is ${h.need.uk} correct answers. Because the book is the sole source of questions, a fact it states is the answer the test expects, even where public life has moved on since it was written. The handbook is under copyright and nothing from it is reproduced here: our ${h.count.uk} practice questions were written by Radif Partners from its facts, in our own words, to check your reading chapter by chapter.`,
    faqs: (h) => [
      { q: 'How do I make sure I have the right handbook?', a: `Check the full title and edition: ${h.P.uk.test.handbook}. Other books about British life, or study aids built around the handbook, are not the official guide. gov.uk names this guide as the only source the test draws on, so the official text should be the base of your preparation, whatever else you use alongside it.` },
      { q: 'Is the audio version of the handbook enough to prepare?', a: 'gov.uk lists audio among the official formats, and the content is the same guide. Listening suits long journeys and helps with the narrative chapters. Dates, names and numbers are easier to fix when you see them written, though, so pair the audio with a written timeline or with our chapter practice to check what has stayed.' },
      { q: 'Do I need to read every chapter of the handbook?', a: `Yes. Questions can come from any of the five chapters, and there is no way to know which ones your sitting will draw. A candidate who skips one chapter gives up the questions from it. With only ${h.P.uk.test.questions - h.need.uk} mistakes allowed, a single skipped chapter can be the difference between a pass and a fail.` },
      { q: 'Why does the handbook describe things that have since changed?', a: 'It is the 3rd edition and has not been rewritten each time an institution, a name or a figure changes. The test is set from the book, so learn the book’s version of a fact for the test. Our questions avoid points where the book and the present situation differ, so you are never trained on an answer that contradicts the handbook.' },
    ],
    body: (h) => `
<h2>Which book, in which format</h2>
<p>The study guide that gov.uk names is ${h.P.uk.test.handbook}. It is published by TSO, and gov.uk lists it as a book, an eBook or in audio formats. The edition matters: the test is set from this one, and gov.uk tells candidates to study it to prepare. We do not link to any shop or sell the book; any bookseller can find it by its ISBN.</p>
<p>The handbook is not free to copy. That is why this site reproduces none of its text: what you read here describes the chapters in our own words, and our questions test the facts, not the sentences.</p>
<h2>The five chapters, briefly</h2>
<p>Each chapter has its own tone, and each calls for a different way of reading.</p>
${h.table(['Chapter', 'In a sentence', 'Read it for', 'Our questions'], [
  [h.chapters.uk[0], 'The principles that British society asks residents to share, and the steps to becoming a permanent resident or citizen.', 'meanings and examples', h.inChapter('uk', 0)],
  [h.chapters.uk[1], 'A short portrait of the country: its four nations, the islands linked to it and the territories overseas.', 'names, places and symbols', h.inChapter('uk', 1)],
  [h.chapters.uk[2], 'A long narrative running from prehistory to modern times, by far the densest chapter.', 'dates, rulers and turning points', h.inChapter('uk', 2)],
  [h.chapters.uk[3], 'Everyday and cultural life: faiths, festivals, sport, arts, literature, places to visit and a few landmarks of science.', 'isolated facts and famous names', h.inChapter('uk', 3)],
  [h.chapters.uk[4], 'How the state works and how a resident takes part: Parliament, devolution, courts, public services and civic duties.', 'structures and the numbers attached', h.inChapter('uk', 4)],
], 'The handbook chapters described by Radif Partners (no text reproduced), with the size of each chapter in our practice bank.', ['l', 'l', 'l', 'r'])}
<h2>The only source of questions</h2>
<p>gov.uk is explicit: you will only be tested on information from the Guide for New Residents. This has two consequences. First, you do not need anything beyond it: no wider history reading, no current affairs. Second, the book's version of a fact is the one that counts, even when the world has moved on. If the handbook gives a figure, a title or a description, that is the answer expected on the day.</p>
<p>This is also why a good practice question must stay inside the handbook. Our ${h.a('uk-questions', 'question bank')} leaves out anything the book does not cover and anything that depends on who holds a post today, so that the answer you learn here and the answer the test expects cannot diverge.</p>
<h2>A dated book, and how to handle it</h2>
<p>The 3rd edition has not been reissued every time something changed, so a few passages describe arrangements in the way they stood when it was written. Do not let this unsettle you. Learn the book's statement for the test, and keep any newer knowledge for life outside the exam room. Where you notice a gap between the two, it is worth a line in your notes, so that you do not answer from the news by reflex.</p>
<h2>A reading method in four passes</h2>
<ol>
<li><strong>Skim the whole book once</strong>, quickly, without notes, to see its shape and how the chapters link.</li>
<li><strong>Read one chapter closely per session</strong>, writing down every date, number and proper name in a list of your own.</li>
<li><strong>Test that chapter the same day</strong> with the quiz at the top of this page or the ${h.a('uk-practice', 'chapter practice')}, from memory, book closed.</li>
<li><strong>Reread only what you missed</strong>, then move to the next chapter. Finish with full ${h.a('uk-mock', 'timed mock tests')} that mix all five.</li>
</ol>
<p>The history chapter deserves several sessions on its own. Breaking it at natural boundaries (before the Normans, the Middle Ages, the Tudors and Stuarts, the modern era) makes it far easier to hold in mind.</p>
<h2>If you are exempt</h2>
<p>Some people do not need the test at all: those under ${h.P.uk.test.exemptUnder}, those aged ${h.P.uk.test.exemptFromAge} or over, those who passed before, and those with a long-term condition backed by a form or a doctor's letter. The ${h.a('uk-exemption', 'exemption page')} sets out the rules. For everyone else, the handbook is the whole syllabus, and the ${h.a('uk-test', 'Life in the UK Test page')} explains the test it leads to.</p>`,
  },
});
