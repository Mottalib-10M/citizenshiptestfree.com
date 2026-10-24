import { definePage } from '../../lib/guide-types';
// STUB : page à rédiger
export default definePage({
  id: 'uk-mock', group: 'uk', order: 13,
  tool: { kind: 'quiz', props: { country: 'uk', mode: 'exam', timed: true } },
  related: [], sources: [],
  en: {
    slug: 'life-in-the-uk-test/mock-test', nav: 'STUB life-in-the-uk-test/mock-test', card: 'STUB', title: 'STUB life-in-the-uk-test/mock-test', description: 'STUB', h1: 'STUB', intro: 'STUB',
    resume: () => 'STUB.', faqs: () => [], body: () => '<p>STUB</p>',
  },
});
