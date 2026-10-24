import { definePage } from '../../lib/guide-types';
// STUB : page à rédiger
export default definePage({
  id: 'ca-practice', group: 'ca', order: 51,
  tool: { kind: 'quiz', props: { country: 'ca', mode: 'practice' } },
  related: [], sources: [],
  en: {
    slug: 'canadian-citizenship-test/practice', nav: 'STUB canadian-citizenship-test/practice', card: 'STUB', title: 'STUB canadian-citizenship-test/practice', description: 'STUB', h1: 'STUB', intro: 'STUB',
    resume: () => 'STUB.', faqs: () => [], body: () => '<p>STUB</p>',
  },
  fr: {
    slug: 'examen-citoyennete-pratique', nav: 'STUB examen-citoyennete-pratique', card: 'STUB', title: 'STUB examen-citoyennete-pratique', description: 'STUB', h1: 'STUB', intro: 'STUB',
    resume: () => 'STUB.', faqs: () => [], body: () => '<p>STUB</p>',
  },
});
