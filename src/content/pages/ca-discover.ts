import { definePage } from '../../lib/guide-types';
// STUB : page à rédiger
export default definePage({
  id: 'ca-discover', group: 'ca', order: 53,
  tool: { kind: 'quiz', props: { country: 'ca', mode: 'practice', chapter: 2 } },
  related: [], sources: [],
  en: {
    slug: 'discover-canada', nav: 'STUB discover-canada', card: 'STUB', title: 'STUB discover-canada', description: 'STUB', h1: 'STUB', intro: 'STUB',
    resume: () => 'STUB.', faqs: () => [], body: () => '<p>STUB</p>',
  },
  fr: {
    slug: 'decouvrir-le-canada', nav: 'STUB decouvrir-le-canada', card: 'STUB', title: 'STUB decouvrir-le-canada', description: 'STUB', h1: 'STUB', intro: 'STUB',
    resume: () => 'STUB.', faqs: () => [], body: () => '<p>STUB</p>',
  },
});
