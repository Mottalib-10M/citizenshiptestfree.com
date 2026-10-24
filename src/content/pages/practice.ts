import { definePage } from '../../lib/guide-types';
// STUB : page à rédiger
export default definePage({
  id: 'practice', group: 'all', order: 1,
  tool: { kind: 'quiz', props: { country: 'au', mode: 'practice', countrySelect: true } },
  related: [], sources: [],
  en: {
    slug: 'citizenship-test-practice', nav: 'STUB citizenship-test-practice', card: 'STUB', title: 'STUB citizenship-test-practice', description: 'STUB', h1: 'STUB', intro: 'STUB',
    resume: () => 'STUB.', faqs: () => [], body: () => '<p>STUB</p>',
  },
});
