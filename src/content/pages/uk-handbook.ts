import { definePage } from '../../lib/guide-types';
// STUB : page à rédiger
export default definePage({
  id: 'uk-handbook', group: 'uk', order: 17,
  tool: { kind: 'quiz', props: { country: 'uk', mode: 'practice', chapter: 2 } },
  related: [], sources: [],
  en: {
    slug: 'life-in-the-uk-test/handbook', nav: 'STUB life-in-the-uk-test/handbook', card: 'STUB', title: 'STUB life-in-the-uk-test/handbook', description: 'STUB', h1: 'STUB', intro: 'STUB',
    resume: () => 'STUB.', faqs: () => [], body: () => '<p>STUB</p>',
  },
});
