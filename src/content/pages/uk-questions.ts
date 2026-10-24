import { definePage } from '../../lib/guide-types';
// STUB : page à rédiger
export default definePage({
  id: 'uk-questions', group: 'uk', order: 12,
  tool: { kind: 'bank', props: { country: 'uk', chapter: 2 } },
  related: [], sources: [],
  en: {
    slug: 'life-in-the-uk-test/questions', nav: 'STUB life-in-the-uk-test/questions', card: 'STUB', title: 'STUB life-in-the-uk-test/questions', description: 'STUB', h1: 'STUB', intro: 'STUB',
    resume: () => 'STUB.', faqs: () => [], body: () => '<p>STUB</p>',
  },
});
