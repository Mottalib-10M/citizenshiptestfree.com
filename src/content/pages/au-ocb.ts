import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'au-ocb',
  group: 'au',
  order: 33,
  tool: { kind: 'quiz', props: { country: 'au', mode: 'practice', chapter: 0 } },
  related: ['au-test', 'au-practice', 'au-questions', 'au-eligibility'],
  sources: ['au_ocb', 'au_ocb_pdf', 'au_test'],
  en: {
    slug: 'our-common-bond',
    nav: 'Our Common Bond',
    card: 'The four parts of the testable section explained, with a ten-question quiz on the part you are reading.',
    title: 'Our Common Bond: The 4 Testable Parts and a Quiz on Each',
    description: 'Our Common Bond, the Australian citizenship test booklet: what each of the four testable parts covers, where to get it free, and a ten-question quiz on each.',
    h1: 'Our Common Bond: the four testable parts, with a quiz on each',
    intro: 'Choose the part you have just read and answer ten questions on it. The quiz opens on Part 1, Australia and its people.',
    resume: (h) => `Australian Citizenship: Our Common Bond is the booklet Home Affairs publishes to prepare for the citizenship test, and the department says it is all you need. Only its testable section is examined, and that section has four parts: Australia and its people; Australia's democratic beliefs, rights and liberties; government and the law in Australia; and Australian values. Every test question is based on it. The booklet is free on the Home Affairs website, in English and in a range of community languages, with a podcast and the AMEPOnline citizenship modules for people learning English; the test itself is in English only. The text is published under a Creative Commons Attribution 4.0 licence, except the Commonwealth Coat of Arms, which is why this page can quote it with attribution. The quiz above draws ten questions from the part you choose, from our bank of ${h.count.au}, so you can check right after reading whether the facts have stayed.`,
    faqs: (h) => [
      { q: 'Do I need to read all of Our Common Bond?', a: 'Only the testable section is examined. The booklet marks clearly where it starts and where it ends: it runs from Part 1 to Part 4 and closes with a glossary of its terms. The pages outside it, such as the introduction and the further information at the back, are useful reading but are not the source of test questions.' },
      { q: 'Is there a version of Our Common Bond in my language?', a: 'Home Affairs publishes the booklet in English and in a range of community languages; its video on preparing for the test speaks of 40 languages. Reading in your language helps understanding, but the test is in English only, so it is worth learning the key English terms too, for example from the glossary at the end of the testable section.' },
      { q: 'Where is the pledge in Our Common Bond?', a: 'The Australian Citizenship Pledge appears in the introduction of the booklet, which explains that you make it at your citizenship ceremony as a public commitment to Australia. Most new citizens must attend a ceremony and make the pledge; it is the final step in becoming an Australian citizen.' },
    ],
    body: (h) => `
<h2>The four parts at a glance</h2>
${h.table(['Part', 'Main subjects', 'Our questions'], [[h.chapters.au[0], 'Aboriginal and Torres Strait Islander peoples, the first settlers, the states and territories and their capitals, symbols, colours, anthem, days', h.inChapter('au', 0)], [h.chapters.au[1], 'parliamentary democracy, the rule of law, freedoms, responsibilities and privileges of citizens', h.inChapter('au', 1)], [h.chapters.au[2], 'the Constitution, parliament, the three levels of government, elections, courts and police', h.inChapter('au', 2)], [h.chapters.au[3], 'freedom, respect, equality and the values the test checks with five questions', h.inChapter('au', 3)]], 'Testable section of Our Common Bond; question counts from our bank.', ['l', 'l', 'r'])}
<h2>A few lines from Part 4</h2>
<p>Part 4 is the part with a rule of its own in the test, so its wording matters. On the rule of law, the booklet says: "All Australians are equal under the law. The Rule of Law means that no person, group or religious rule is above the law." On living peacefully: "Australians believe that change should occur through discussion, peaceful persuasion, and the democratic process." On freedom of religion: "Where there is a conflict between an Australian law and a religious practice, Australian law prevails." On a fair go, what someone achieves in life "should be as a result of their talents, work and effort, rather than their wealth or background."</p>
<p class="text-sm">Quotations from Australian Citizenship: Our Common Bond, © Commonwealth of Australia, licensed under ${h.ext('https://creativecommons.org/licenses/by/4.0/', 'Creative Commons Attribution 4.0')}.</p>
<h2>How to read it for the test</h2>
<p>Read one part, close the booklet and take the quiz above on that part. A question you miss points to a paragraph to read again. Part 1 is rich in names and places, Part 3 in numbers and institutions; for those, short repeated sessions work better than one long reading. For Part 4, read for the meaning of each value as written, because the test expects the booklet's statement, not a personal view. Then try a full ${h.a('au-test', 'practice test')} with its ${h.P.au.test.minutes}-minute limit.</p>
<h2>Where to get it</h2>
<p>Download the booklet from ${h.src('au_ocb', 'the Our Common Bond page of Home Affairs')}, which also links the podcast and the versions in other languages. Home Affairs says it does not endorse external courses or paid apps; you do not need to buy anything to prepare. This site is not a Home Affairs product and is not endorsed by the department.</p>`,
  },
});
