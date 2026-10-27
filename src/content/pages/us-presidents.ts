import { definePage } from '../../lib/guide-types';
import { PRESIDENCIES } from '../../data/us-drills';

const people = new Set(PRESIDENCIES.map((p) => p.name)).size;
const span = (p: (typeof PRESIDENCIES)[number]) => (p.to === null ? `${p.from} to today` : p.from === p.to ? `${p.from}` : `${p.from} to ${p.to}`);

export default definePage({
  id: 'us-presidents',
  group: 'us',
  order: 87,
  tool: { kind: 'usdrill', props: { drill: 'presidents' } },
  related: ['us-amendments', 'us-branches', 'us-capitals', 'us-questions', 'us-test'],
  sources: ['loc_presidents', 'usagov_presidents', 'us_128', 'us_updates'],
  en: {
    slug: 'us-presidents-quiz',
    nav: 'Presidents quiz',
    card: 'All 47 presidencies in order with their years, the presidents the civics test names, and a quiz that asks who was president when.',
    title: 'Presidents Quiz 2026: All 47 U.S. Presidents in Order, Free',
    description: 'Presidents quiz: all 47 U.S. presidencies in order with their years, the presidents named on the citizenship test (Washington, Lincoln, Roosevelt), and a quiz.',
    h1: 'U.S. presidents quiz: all 47 in order',
    intro: 'Ten questions per set: who was the 16th president, who led the country during the Civil War, who resigned. The reason follows every answer.',
    resume: (h) => `There have been ${PRESIDENCIES.length} presidencies but only ${people} presidents, because two men served non-consecutive terms and are counted twice: Grover Cleveland, the 22nd and 24th president, and Donald J. Trump, the 45th and the 47th, in office since 20 January 2025. The list starts with George Washington in 1789. Eight presidents died in office, four of them assassinated (Lincoln, Garfield, McKinley and Kennedy), and one, Richard Nixon, resigned, in 1974. Since the 22nd Amendment of 1951 a president can be elected only twice; Franklin D. Roosevelt, elected four times, is the reason. The naturalization civics test names several presidents: the 2025 list of ${h.us.n25} questions asks who is President now (question 38), what George Washington, James Madison and Abraham Lincoln are famous for (questions 86, 88 and 94: first president, Father of the Constitution, leader during the Civil War), who was president during the Great Depression and World War II (question 105), and why a president serves only two terms (question 37). You do not need the full list for the test, but placing each president on the timeline makes the history questions on wars and movements much easier to answer.`,
    faqs: () => [
      { q: 'Why is Donald Trump both the 45th and the 47th president?', a: 'Presidents are numbered by presidency, not by person. When a president returns after someone else has served, he gets a new number. Grover Cleveland was the first case, as 22nd and 24th president in the 1880s and 1890s; Donald J. Trump, president from 2017 to 2021 and again since 2025, is the second.' },
      { q: 'Which presidents does the civics test ask about by name?', a: 'The 2025 list asks for the current President and Vice President, what George Washington, James Madison and Abraham Lincoln are famous for, and who was president during the Great Depression and World War II (Franklin Roosevelt). Other questions cover the Emancipation Proclamation and the writers of the Federalist Papers, Madison among them.' },
      { q: 'Who became president without being elected?', a: 'Gerald Ford. Richard Nixon appointed him Vice President in 1973 under the 25th Amendment after Spiro Agnew resigned, and Ford became President when Nixon resigned in 1974. Nine vice presidents in all took over during a term, after a death or a resignation; four of them, Theodore Roosevelt, Coolidge, Truman and Lyndon Johnson, were later elected in their own right.' },
    ],
    body: (h) => `
<h2>All presidencies in order</h2>
${h.table(['No.', 'President', 'In office'], PRESIDENCIES.map((p) => [p.n, p.name, span(p)]), 'Library of Congress chronological list; USAGov for the current president.', ['r', 'l', 'l'])}
<p>The ${h.src('loc_presidents', 'Library of Congress chronological list')} gives each president with the first spouse and the vice presidents, and ${h.src('usagov_presidents', 'USAGov')} keeps the page on the current President and Vice President.</p>
<h2>The presidents of the civics test</h2>
<ul>
<li><strong>George Washington</strong> (question 86): first president, “Father of Our Country”, general of the Continental Army; also on the writing vocabulary list with Adams and Lincoln.</li>
<li><strong>James Madison</strong> (question 88): “Father of the Constitution”, fourth president, president during the War of 1812.</li>
<li><strong>Abraham Lincoln</strong> (question 94): led the country during the Civil War, freed the slaves with the Emancipation Proclamation, saved the Union.</li>
<li><strong>Franklin D. Roosevelt</strong> (question 105): president during the Great Depression and World War II, elected four times.</li>
<li><strong>The current President and Vice President</strong>, questions 38 and 39; the answers change, so check the ${h.src('us_updates', 'USCIS test updates page')} before your interview.</li>
</ul>
<p>Question 37 links the presidents to the Constitution: a president can serve only two terms because of the 22nd Amendment, or to keep the president from becoming too powerful. The ${h.a('us-amendments', 'amendments page')} places it among the 27.</p>
<h2>Landmarks on the timeline</h2>
${h.table(['Period', 'President', 'Why it matters'], [
  ['1789 to 1797', 'George Washington', 'First president; set the two-term custom'],
  ['1803', 'Thomas Jefferson', 'Louisiana Purchase from France'],
  ['1861 to 1865', 'Abraham Lincoln', 'Civil War, Emancipation Proclamation'],
  ['1933 to 1945', 'Franklin D. Roosevelt', 'Great Depression, World War II'],
  ['1974', 'Gerald R. Ford', 'Took office after Nixon resigned'],
  ['2001', 'George W. Bush', 'September 11 attacks'],
], undefined, ['l', 'l', 'l'])}
<p>The history questions of the test move by period (colonial times, the 1800s, recent history), and naming the president of each period gives you a hook for the events. The quiz mixes “who was the nth president” items, built from the list above, with event questions and the official USCIS questions; the ${h.a('us-test', 'mock civics test')} then checks the whole list with the officer’s stop rule.</p>
<h2>How to memorize the order</h2>
<p>Learn them by blocks of five, saying the number aloud: 1 Washington, 2 Adams, 3 Jefferson, 4 Madison, 5 Monroe. The first six include two Adamses, father and son; from 1837 to 1861, eight presidents in a row served one term or less; the 20th century is easier because it overlaps with family memory. Run a set after each block. Practice quiz from an independent site, not affiliated with USCIS or the White House.</p>`,
  },
});
