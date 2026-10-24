import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'practice',
  group: 'all',
  order: 1,
  tool: { kind: 'quiz', props: { country: 'au', mode: 'practice', countrySelect: true } },
  mini: { kind: 'mini:compare' },
  related: ['au-practice', 'ca-practice', 'uk-practice', 'au-test', 'ca-test', 'uk-test'],
  sources: ['au_test', 'au_ocb', 'ca_study', 'ca_guide', 'uk_test'],
  en: {
    slug: 'citizenship-test-practice',
    nav: 'Citizenship test practice',
    card: 'Ten practice questions for the Australian, Canadian or UK test, the answer explained after each one.',
    title: 'Citizenship Test Practice: Free Questions for AU, CA and UK',
    description: 'Free citizenship test practice for Australia, Canada and the UK: ten questions at a time from the official guide of your country, answers explained, no sign-up.',
    h1: 'Citizenship test practice for Australia, Canada and the UK',
    intro: 'Choose your country and answer ten questions. Each one is checked straight away, with a short explanation taken from the official guide.',
    resume: (h) => `Three countries ask future citizens to pass a test on the country itself, and each one publishes the guide its questions come from. Australia uses Our Common Bond: ${h.P.au.test.questions} questions, at least ${h.pc(h.P.au.test.passPercent / 100)} overall and all ${h.P.au.test.valuesQuestions} values questions right. Canada uses Discover Canada: ${h.P.ca.test.questions} questions, ${h.P.ca.test.passCorrect} correct answers to pass, in English or French. The United Kingdom uses the Life in the UK handbook: ${h.P.uk.test.questions} questions, ${h.P.uk.test.passCorrect} correct answers to pass, for a ${h.gbp(h.P.uk.test.fee)} booking. This page draws ten questions for the country you choose from our banks of ${h.count.au} Australian, ${h.count.caEn} Canadian and ${h.count.uk} British questions, all written by us from the facts in those guides, and checks each answer as you go. None of them is a real test question: those are not published. When ten in a row feel easy, take the full practice test of your country, with its time limit and its pass rule.`,
    faqs: (h) => [
      { q: 'Which citizenship test is the hardest?', a: `They test different things. The UK test has the most questions, ${h.P.uk.test.questions}, and a handbook rich in history and dates. The Australian test adds a rule of its own: all ${h.P.au.test.valuesQuestions} values questions must be right. The Canadian test needs ${h.P.ca.test.passCorrect} of ${h.P.ca.test.questions}, the same ratio as Australia, but its guide covers history, geography and government in detail. The best test is the one you prepare from its own guide.` },
      { q: 'Can I practise in French?', a: 'Yes, for Canada, which offers its test in English or French. The French version of this site has the Canadian practice test, the questions by chapter and the physical presence calculator in French. The Australian and UK tests are in English only, so their practice here is in English.' },
      { q: 'Do I need an account to keep my score?', a: 'No. Nothing is stored about you and there is no sign-up. Your score appears at the end of each set and disappears when you leave. To track progress, note the result of each full practice test, which shows your score for every chapter or part of the guide.' },
    ],
    body: (h) => `
<h2>The three tests side by side</h2>
${h.table(['', 'United Kingdom', 'Australia', 'Canada'], [['Questions', h.P.uk.test.questions, h.P.au.test.questions, h.P.ca.test.questions], ['To pass', `${h.P.uk.test.passCorrect} correct`, `${h.pc(h.P.au.test.passPercent / 100)} and all ${h.P.au.test.valuesQuestions} values`, `${h.P.ca.test.passCorrect} correct`], ['Time', `${h.P.uk.test.minutes} min`, `${h.P.au.test.minutes} min`, `${h.P.ca.test.minutes} min`], ['Who sits it', `${h.P.uk.test.exemptUnder} to ${h.P.uk.test.exemptFromAge - 1}`, `${h.P.au.test.ages[0]} to ${h.P.au.test.ages[1]}`, `${h.P.ca.test.ages[0]} to ${h.P.ca.test.ages[1]}`], ['Guide', 'Life in the United Kingdom', 'Our Common Bond', 'Discover Canada'], ['Our questions', h.count.uk, h.count.au, h.count.caEn]], 'Official test pages of GOV.UK, Home Affairs and IRCC; question counts from our banks.', ['l', 'r', 'r', 'r'])}
<h2>Practice by country</h2>
<p>Each country has its own practice page, where you can pick one chapter or part of the guide: the ${h.a('uk-practice', 'Life in the UK test practice')}, the ${h.a('au-practice', 'Australian test practice by part')} and the ${h.a('ca-practice', 'Canadian test practice by chapter')}. For a run under real conditions, with the time limit and the pass rule, use the full tests: ${h.a('uk-test', 'Life in the UK')}, ${h.a('au-test', 'Australia')} and ${h.a('ca-test', 'Canada')}.</p>
<h2>How the questions are written</h2>
<p>We write each question from a fact stated in the official guide and keep its source with it. We do not copy questions from apps, books or other sites, and we do not claim to know the real questions. Tests in our code check that every question has one right answer, that the answers are spread across the four positions and that no question repeats in a set.</p>
<h2>The test is one step</h2>
<p>In all three countries the test only counts once you can apply, which depends on how long you have lived there and how long you were away. Our date calculators count every trip with the official rule: ${h.a('uk-citizenship', 'British citizenship')}, ${h.a('au-residence', 'Australian residence')} and ${h.a('ca-presence', 'Canadian physical presence')}.</p>`,
  },
});
