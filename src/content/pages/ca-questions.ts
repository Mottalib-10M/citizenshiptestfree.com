import { definePage } from '../../lib/guide-types';
// STUB : page à rédiger
export default definePage({
  id: 'ca-questions', group: 'ca', order: 52,
  tool: { kind: 'bank', props: { country: 'ca', chapter: 4 } },
  related: [], sources: [],
  en: {
    slug: 'canadian-citizenship-test/questions', nav: 'STUB canadian-citizenship-test/questions', card: 'STUB', title: 'STUB canadian-citizenship-test/questions', description: 'STUB', h1: 'STUB', intro: 'STUB',
    resume: () => 'STUB.', faqs: () => [], body: () => '<p>STUB</p>',
  },
  fr: {
    slug: 'questions-examen-citoyennete', nav: 'STUB questions-examen-citoyennete', card: 'STUB', title: 'STUB questions-examen-citoyennete', description: 'STUB', h1: 'STUB', intro: 'STUB',
    resume: () => 'STUB.', faqs: () => [], body: () => '<p>STUB</p>',
  },
});
