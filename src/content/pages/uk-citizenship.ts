import { definePage } from '../../lib/guide-types';
// STUB : page à rédiger
export default definePage({
  id: 'uk-citizenship', group: 'uk', order: 18,
  tool: { kind: 'quiz', props: { country: 'uk', mode: 'exam' } },
  related: [], sources: [],
  en: {
    slug: 'british-citizenship-test', nav: 'STUB british-citizenship-test', card: 'STUB', title: 'STUB british-citizenship-test', description: 'STUB', h1: 'STUB', intro: 'STUB',
    resume: () => 'STUB.', faqs: () => [], body: () => '<p>STUB</p>',
  },
});
