import { definePage } from '../../lib/guide-types';
// STUB : page à rédiger
export default definePage({
  id: 'uk-practice', group: 'uk', order: 11,
  tool: { kind: 'quiz', props: { country: 'uk', mode: 'practice' } },
  related: [], sources: [],
  en: {
    slug: 'life-in-the-uk-test/practice', nav: 'STUB life-in-the-uk-test/practice', card: 'STUB', title: 'STUB life-in-the-uk-test/practice', description: 'STUB', h1: 'STUB', intro: 'STUB',
    resume: () => 'STUB.', faqs: () => [], body: () => '<p>STUB</p>',
  },
});
