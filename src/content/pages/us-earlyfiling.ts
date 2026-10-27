import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-earlyfiling',
  group: 'us',
  order: 93,
  tool: { kind: 'usearly' },
  related: ['us-n400', 'us-eligibility', 'us-greencard', 'us-marriage', 'us-n400-howto'],
  sources: ['us_n400_instr', 'us_lpr5', 'us_pm_g3', 'us_pm_d3'],
  en: {
    slug: 'n-400-early-filing-calculator',
    nav: 'N-400 early filing calculator',
    card: 'The 90-day early filing rule for Form N-400: the first day USCIS accepts your application, combined with the 3 months in your state and, on the marriage route, 3 years of marriage.',
    title: 'N-400 Early Filing Calculator 2026: the 90-Day Rule',
    description: 'N-400 early filing calculator: the first day you can apply, 90 days before your 5 or 3-year anniversary, checked against 3 months in your state and marriage.',
    h1: 'N-400 early filing calculator: the 90-day rule',
    intro: 'Enter the “resident since” date on your green card and the day you moved to your state. The calculator gives the first day USCIS accepts your N-400.',
    resume: (h) => `USCIS lets permanent residents file Form N-400 up to ${h.P.us.n400.earlyFilingDays} days before they complete the required period of continuous residence: ${h.P.us.n400.routes['5'].years} years on the general route, or ${h.P.us.n400.routes['3'].years} years if you file as the spouse of a U.S. citizen. The count starts from the “resident since” date on your green card. With a card dated 1 December 2021, the fifth anniversary is 1 December 2026, and the first filing day is ${h.P.us.n400.earlyFilingDays} days earlier, on 2 September 2026. Early filing only moves the residence period: every other condition must already be met on the day you file, including ${h.P.us.n400.stateMonths} months of residence in the state or USCIS district where you file and, on the marriage route, three full years of marriage to and living with a spouse who has been a citizen all that time. The calculator takes the latest of these dates. USCIS rejects an application that arrives even one day too early, and a rejected N-400 has to be filed again. Physical presence (${h.num(h.P.us.n400.routes['5'].presenceDays)} days on the five-year route, ${h.num(h.P.us.n400.routes['3'].presenceDays)} on the three-year route) and long trips are not checked here; the full date tool on the N-400 page counts them trip by trip.`,
    faqs: (h) => [
      { q: 'Does the 90-day early filing apply to the 3-year marriage route?', a: `Yes, to the residence part only. You may file ${h.P.us.n400.earlyFilingDays} days before your third anniversary as a permanent resident, but the three years of marriage and living with the citizen spouse must be complete on the filing day. If you married later than you got your card, the marriage date usually decides.` },
      { q: 'How do I count the 90 days?', a: `Take the anniversary of the date on your card (5 or 3 years later) and go back ${h.P.us.n400.earlyFilingDays} calendar days. Weekends and holidays count like any day. The calculator does it for you; because months have different lengths, “three months early” is not the same thing and can land a few days too soon.` },
      { q: 'What if I move to another state before filing?', a: `You need ${h.P.us.n400.stateMonths} months of residence in the state or USCIS district where you file. A move resets that clock, even if your five years are complete. Enter the date you moved: if it is the limiting date, the calculator says so. Students may file where they study or where their family lives, under conditions.` },
    ],
    body: (h) => `
<h2>The rule, in the words of the instructions</h2>
<p>The ${h.src('us_n400_instr', 'N-400 instructions')} say you may generally file up to ${h.P.us.n400.earlyFilingDays} days before meeting the five-year (or three-year) period of continuous residence, that every other requirement must be met at the time of filing, and that USCIS will reject an application submitted too early. USCIS used to host its own early filing calculator; the rule itself has not changed.</p>
<h2>Worked examples</h2>
${h.table(['Situation', 'Anniversary', 'Earliest filing'], [
  ['Card dated 1 Dec 2021, 5-year route, same state since 2023', '1 Dec 2026', '2 Sep 2026'],
  ['Card dated 15 Jan 2023, married since 2020, 3-year route', '15 Jan 2026', '17 Oct 2025'],
  ['Card dated 15 Jan 2023, married in March 2024, 3-year route', '15 Jan 2026', 'March 2027 (marriage date decides)'],
  ['Card dated 1 Dec 2021, moved state on 1 Aug 2026', '1 Dec 2026', '1 Nov 2026 (3 months in the new state)'],
], `Dates counted with the ${h.P.us.n400.earlyFilingDays}-day rule and ${h.P.us.n400.stateMonths} months of state residence.`, ['l', 'l', 'l'])}
<p>In the third case the five-year route opens in October 2027, so the marriage route still comes first, in March 2027. In the last case, the move pushes the date back by two months: early filing does not help with the state requirement.</p>
<h2>What the calculator does not check</h2>
<ul>
<li><strong>Physical presence.</strong> You must have spent at least half of the period in the United States. Trips are counted day by day by the ${h.a('us-n400', 'full N-400 date tool')}.</li>
<li><strong>Continuous residence.</strong> A trip of more than six months raises a presumption of a break; a trip of a year or more breaks it, as the ${h.src('us_pm_d3', 'Policy Manual')} explains. After a break of a year or more, USCIS accepts a new N-400 only ${h.P.us.n400.afterBreakWait['5']} after your return on the five-year route (${h.P.us.n400.afterBreakWait['3']} on the marriage route).</li>
<li><strong>Age and moral character.</strong> You must be at least ${h.P.us.n400.minAge} and meet the ${h.a('us-gmc', 'good moral character')} rules for the period.</li>
</ul>
<h2>Why filing early is worth it</h2>
<p>Processing takes months, and the ${h.P.us.n400.earlyFilingDays} days can let the interview fall soon after your anniversary instead of months later. It is also the window to prepare: gather the documents, list your trips and fill in the form with the ${h.a('us-n400-howto', 'part-by-part guide')}. Pay the fee only when the calculator, and your own check of the trips, both say you are ready: a rejected filing loses weeks. Independent calculator, not a USCIS tool and not affiliated with USCIS.</p>`,
  },
});
