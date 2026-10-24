import { definePage } from '../../lib/guide-types';
// STUB : page à rédiger
export default definePage({
  id: 'au-test', group: 'au', order: 30,
  tool: { kind: 'quiz', props: { country: 'au', mode: 'exam' } },
  related: [], sources: [],
  en: {
    slug: 'australian-citizenship-test', nav: 'STUB australian-citizenship-test', card: 'STUB', title: 'STUB australian-citizenship-test', description: 'STUB', h1: 'STUB', intro: 'STUB',
    resume: () => 'STUB.', faqs: () => [], body: () => '<p>STUB</p>',
  },
});
