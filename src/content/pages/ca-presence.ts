import { definePage } from '../../lib/guide-types';
// STUB : page à rédiger
export default definePage({
  id: 'ca-presence', group: 'ca', order: 55,
  tool: { kind: 'date', props: { country: 'ca' } },
  related: [], sources: [],
  en: {
    slug: 'canadian-citizenship/physical-presence-calculator', nav: 'STUB canadian-citizenship/physical-presence-calculator', card: 'STUB', title: 'STUB canadian-citizenship/physical-presence-calculator', description: 'STUB', h1: 'STUB', intro: 'STUB',
    resume: () => 'STUB.', faqs: () => [], body: () => '<p>STUB</p>',
  },
  fr: {
    slug: 'calculateur-presence-physique', nav: 'STUB calculateur-presence-physique', card: 'STUB', title: 'STUB calculateur-presence-physique', description: 'STUB', h1: 'STUB', intro: 'STUB',
    resume: () => 'STUB.', faqs: () => [], body: () => '<p>STUB</p>',
  },
});
