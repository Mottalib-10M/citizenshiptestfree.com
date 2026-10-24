import { definePage } from '../../lib/guide-types';
// STUB : page à rédiger
export default definePage({
  id: 'ca-test', group: 'ca', order: 50,
  tool: { kind: 'quiz', props: { country: 'ca', mode: 'exam' } },
  related: [], sources: [],
  en: {
    slug: 'canadian-citizenship-test', nav: 'STUB canadian-citizenship-test', card: 'STUB', title: 'STUB canadian-citizenship-test', description: 'STUB', h1: 'STUB', intro: 'STUB',
    resume: () => 'STUB.', faqs: () => [], body: () => '<p>STUB</p>',
  },
});
