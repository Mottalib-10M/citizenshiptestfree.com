import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'uk-practice',
  group: 'uk',
  order: 11,
  tool: { kind: 'quiz', props: { country: 'uk', mode: 'practice' } },
  mini: { kind: 'mini:ukpass' },
  related: ['uk-questions', 'uk-mock', 'uk-handbook', 'uk-pass-mark', 'uk-test'],
  sources: ['uk_test', 'uk_booking'],
  en: {
    slug: 'life-in-the-uk-test/practice',
    nav: 'Practice by chapter',
    card: 'Practise the Life in the UK Test one handbook chapter at a time, with the fact behind every answer.',
    title: 'Life in the UK Test Practice: Free Questions by Chapter',
    description: 'Life in the UK Test practice by chapter: pick one of the five handbook chapters, answer questions with instant corrections and follow a simple study plan.',
    h1: 'Life in the UK Test practice, one chapter at a time',
    intro: 'Pick a chapter of the official handbook, answer at your own pace and read the explanation after each answer. When a chapter feels easy, move to the next one, then finish with full mock tests.',
    resume: (h) => `Practising the Life in the UK Test chapter by chapter means working through the five parts of the official handbook separately before mixing them, so that each mistake points to a precise gap. The real test asks ${h.P.uk.test.questions} questions in ${h.P.uk.test.minutes} minutes and gov.uk says you must score ${h.pc(0.75)} or more, which is ${h.need.uk} correct answers; questions can come from any chapter, and gov.uk says you will only be tested on the Guide for New Residents. Our bank holds ${h.count.uk} questions written by Radif Partners from the handbook's facts, with ${h.inChapter('uk', 2)} on history alone, the chapter most dense in dates and names. Choose a chapter in the practice tool, answer, and read the correction straight away: each one explains the fact rather than just marking it. A sitting costs ${h.gbp(h.P.uk.test.fee)} and is paid again after a fail, so steady practice before booking is the cheapest way to pass the first time.`,
    faqs: (h) => [
      { q: 'How many practice questions should I answer each day?', a: `There is no official figure. A rhythm that works for many learners is one chapter block a day, so about ${h.inChapter('uk', 0)} questions, followed by a second look at the ones you missed the next morning. Short daily sessions fix facts better than one long weekend session, because you meet each fact again after a gap, which is exactly what the test asks you to do.` },
      { q: 'Which chapter of the handbook takes longest to practise?', a: `For most people it is the history chapter, "${h.chapters.uk[2]}". It covers thousands of years, and its questions turn on dates, battles, monarchs and inventors that sound alike. Give it at least twice the time of the other chapters, and practise it in slices (early Britain, the Middle Ages, the Tudors and Stuarts, the modern era) rather than in one go.` },
      { q: 'Should I keep the handbook open while I practise?', a: 'Not while you answer. Answer from memory first, even when you are unsure, then open the handbook on the facts you missed. Looking up answers as you go feels productive but hides what you really know. The aim of practice is to find gaps; reading the handbook afterwards is how you fill them.' },
      { q: 'Do chapter practice scores predict my real result?', a: `Only partly. A chapter score shows how well you know that part, but the real test mixes the five chapters and adds the pressure of a ${h.P.uk.test.minutes}-minute clock. Use chapter practice to learn, then judge readiness on full mixed sittings in the ${h.a('uk-mock', 'timed mock test')}, where the score is closer to what you would get on the day.` },
    ],
    body: (h) => `
<h2>Why practise by chapter first</h2>
<p>A full mixed test tells you whether you would pass today. It does not tell you why you dropped points. When you practise a single chapter, every wrong answer belongs to the same part of the handbook, so you can reread the right pages the same evening. Our bank is split evenly across the five chapters, ${h.inChapter('uk', 0)} questions in each, so a chapter block is a fair sample of that part rather than a handful of easy questions.</p>
<p>Start with the chapter you find most comfortable. An early success keeps you going, and the shorter chapters on values and on the four nations of the UK also explain words (devolved, Crown dependency, constituency) that come back later in the history and government chapters.</p>
<h2>A four-week plan that fits around work</h2>
<p>This is our own suggestion, not an official programme. Adjust it to the time you have, but keep the order: learn, test yourself, then mix.</p>
${h.table(['Week', 'What to do', 'Target before moving on'], [
  ['1', `Read "${h.chapters.uk[0]}" and "${h.chapters.uk[1]}", then practise each`, 'Most answers right without the book'],
  ['2', `Read "${h.chapters.uk[2]}" in four slices, practise each slice`, 'Dates placed in the right century'],
  ['3', `Read "${h.chapters.uk[3]}" and "${h.chapters.uk[4]}", then practise each`, 'Each chapter above the pass rate'],
  ['4', `Mixed sittings in the ${h.a('uk-mock', 'timed mock')}, rework weak chapters`, `${h.need.uk} or more on several fresh draws`],
], 'A suggested study plan by chapter (Radif Partners, not an official programme).', ['l', 'l', 'l'])}
<h2>What each chapter tends to test</h2>
<p>The five chapters do not ask for the same kind of memory. Knowing this helps you choose how to study each one.</p>
<ul>
<li><strong>${h.chapters.uk[0]}</strong>: understanding more than recall. Questions describe a situation and ask which principle or responsibility it shows. Read them slowly.</li>
<li><strong>${h.chapters.uk[1]}</strong>: geography and symbols. Capitals, flags, patron saints and national flowers come in sets of four, so learn them as a grid, one line per nation.</li>
<li><strong>${h.chapters.uk[2]}</strong>: dates, rulers and events in order. This is where a timeline pays off.</li>
<li><strong>${h.chapters.uk[3]}</strong>: festivals, sport, arts and famous people. Many facts are isolated, so short daily repetition works better than long reading.</li>
<li><strong>${h.chapters.uk[4]}</strong>: institutions and how they relate. Draw who elects whom, which court hears what, and what each devolved body does.</li>
</ul>
<h2>Five ways to remember dates</h2>
<p>Dates cause more hesitation than any other type of fact, because two plausible years look equally right under pressure. These techniques help.</p>
<ol>
<li><strong>Build one timeline.</strong> Draw a single line from the Romans to the post-war years and add each new date to it. A date with neighbours is easier to recall than a date alone.</li>
<li><strong>Anchor on a few fixed points.</strong> The Battle of Hastings in 1066, the Tudors, the Glorious Revolution, the two world wars: place other events before or after these.</li>
<li><strong>Think in centuries first.</strong> If you know an event belongs to the 1500s, three of four options often fall away before you need the exact year.</li>
<li><strong>Pair dates with people.</strong> A year attached to a monarch or a prime minister is remembered as a story, not as a number.</li>
<li><strong>Space your reviews.</strong> Retry the dates you missed after one day, then three days, then a week. Each gap that you bridge fixes the fact a little more.</li>
</ol>
<h2>Using the corrections well</h2>
<p>After each answer the tool shows the right option and a short explanation. Read it even when you were right: a correct guess is not knowledge yet. When you miss a question, note the fact in your own words in a notebook, grouped by chapter. Rereading that notebook the day before the real test is far quicker than rereading the whole handbook.</p>
<p>If you want to see every question of a chapter with its answer before you practise, open the ${h.a('uk-questions', 'question bank')}. If you are unsure how the book itself is laid out, the ${h.a('uk-handbook', 'handbook guide')} describes its five parts. And once your chapter scores are steady, check against the ${h.a('uk-pass-mark', 'pass mark')} with the small calculator below.</p>
<h2>When to switch to full mocks</h2>
<p>Move on when every chapter is comfortably above ${h.pc(h.need.uk / h.P.uk.test.questions)} in practice. Full mixed sittings then train the skill that chapter blocks cannot: switching from a question on the Tudors to one on jury service without losing focus. Book the real test on gov.uk at least ${h.P.uk.test.bookAtLeastDaysAhead} days ahead, with the same ID you will bring on the day.</p>`,
  },
});
