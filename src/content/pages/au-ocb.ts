import { definePage } from '../../lib/guide-types';
// STUB : page à rédiger
export default definePage({
  id: 'au-ocb', group: 'au', order: 33,
  tool: { kind: 'quiz', props: { country: 'au', mode: 'practice', chapter: 0 } },
  related: [], sources: [],
  en: {
    slug: 'our-common-bond', nav: 'STUB our-common-bond', card: 'STUB', title: 'STUB our-common-bond', description: 'STUB', h1: 'STUB', intro: 'STUB',
    resume: () => 'STUB.', faqs: () => [], body: () => '<p>STUB</p>',
  },
});
