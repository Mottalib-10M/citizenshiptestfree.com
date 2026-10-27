import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-greencard',
  group: 'us',
  order: 95,
  tool: { kind: 'mini:usroute' },
  mini: { kind: 'mini:usfee' },
  related: ['us-n400', 'us-marriage', 'us-eligibility', 'us-timeline', 'us-fee', 'us-interview'],
  sources: ['us_lpr5', 'us_married', 'us_n400', 'us_pm_d3', 'us_pm_d4', 'us_pm_g5', 'us_i90', 'us_replace_gc'],
  en: {
    slug: 'green-card-to-citizenship',
    nav: 'Green card to citizenship',
    card: 'From permanent resident to citizen: the 5-year and 3-year routes, how many months you still have to wait, what the officer checks and what it costs.',
    title: 'Green Card to Citizenship 2026: 5 or 3 Years, Months Left',
    description: 'Green card to citizenship in 2026: the 5-year route or 3 years married to a citizen, how many months you still wait with the 90-day early filing, and the steps.',
    h1: 'Green card to citizenship: how long you still have to wait',
    intro: 'Enter how long you have held your green card and whether you live with a citizen spouse. The tool picks the shorter route and counts the months left before you can file.',
    resume: (h) => `Going from green card to citizenship means filing Form N-400 once you have been a lawful permanent resident long enough: five years in the general case, or three years if you have been married to and living with a U.S. citizen for those three years, the spouse having been a citizen the whole time. In both routes you may file up to ${h.P.us.n400.earlyFilingDays} days before the anniversary of the “Resident since” date printed on the card. You also need physical presence of at least ${h.P.us.n400.routes['5'].presenceMonths} months (${h.num(h.P.us.n400.routes['5'].presenceDays)} days) on the five-year route or ${h.P.us.n400.routes['3'].presenceMonths} months (${h.num(h.P.us.n400.routes['3'].presenceDays)} days) on the three-year route, continuous residence without a trip of a year or more, ${h.P.us.n400.stateMonths} months in your state or USCIS district, good moral character, and the English and civics tests. Citizenship is never automatic for an adult permanent resident: it starts the day you take the oath. The filing fee is ${h.usd(h.P.us.fees.online)} online or ${h.usd(h.P.us.fees.paper)} on paper. A conditional green card (two years) counts toward the five or three years; the conditions must be removed before you can naturalize.`,
    faqs: (h) => [
      { q: 'Do I have to become a citizen if I have a green card?', a: 'No. Permanent residence has no end date that forces naturalization; the card itself is renewed every ten years with Form I-90. Citizenship adds the right to vote, a U.S. passport and protection from removal, and it allows you to petition for more relatives. Many residents wait years before filing, and some never do.' },
      { q: 'Does time on a conditional green card count?', a: 'Yes. The two years on a conditional card count as time as a permanent resident toward the five or three years. You must still have the conditions removed, with Form I-751 or I-829, before USCIS can approve the N-400. If the petition is still pending when you file, USCIS decides it before or together with the N-400, never after.' },
      { q: 'Can I apply for citizenship with an expired green card?', a: 'You can file Form N-400: it asks for your A-Number and the date you became a permanent resident, both printed on the card whether it has expired or not. But USCIS also states that you must carry a valid, unexpired card at all times and that applying for naturalization does not change this. So renew a ten-year card with Form I-90 if it is expired or expires within six months.' },
      { q: 'Can my children become citizens when I naturalize?', a: `Children under ${h.P.us.forms.cca.childAgeUnder} who are permanent residents and live in the United States in your legal and physical custody become citizens automatically on the day you take the oath, under INA 320. They do not file an N-400. To get proof, you can request a Certificate of Citizenship with Form N-600 or apply for a U.S. passport for them.` },
    ],
    body: (h) => `
<h2>The two routes side by side</h2>
${h.table(['', '5-year route (INA 316)', '3-year route (INA 319(a))'], [['Who', 'any permanent resident', 'spouse living in marital union with a U.S. citizen'], ['Time as a permanent resident', `5 years, file ${h.P.us.n400.earlyFilingDays} days early`, `3 years, file ${h.P.us.n400.earlyFilingDays} days early`], ['Marriage', 'not required', '3 years living together, spouse a citizen all that time'], ['Physical presence', `${h.num(h.P.us.n400.routes['5'].presenceDays)} days`, `${h.num(h.P.us.n400.routes['3'].presenceDays)} days`], ['State or district', `${h.P.us.n400.stateMonths} months`, `${h.P.us.n400.stateMonths} months`], ['Fee', `${h.usd(h.P.us.fees.online)} online, ${h.usd(h.P.us.fees.paper)} paper`, 'same']], `USCIS eligibility pages and Policy Manual, volume 12, read on ${h.date(h.P.us.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>The marriage route is only shorter if the three years of marital union are complete when you file: early filing applies to the residence period, not to the marriage. The ${h.a('us-marriage', 'citizenship through marriage page')} goes through that route in detail.</p>
<h2>Five worked cases</h2>
<ul>
<li><strong>Card dated 15 March 2022, single.</strong> Fifth anniversary 15 March 2027; earliest filing ${h.P.us.n400.earlyFilingDays} days before, in mid-December 2026.</li>
<li><strong>Card dated 15 March 2023, married since 2020 to a citizen by birth, living together.</strong> Third anniversary 15 March 2026; the three-year route is open from mid-December 2025, as long as presence and residence hold.</li>
<li><strong>Same card, married in June 2024.</strong> The marital union reaches three years in June 2027, before the five-year filing date of mid-December 2027, so the three-year route opens first, in June 2027.</li>
<li><strong>Same card, spouse naturalized in 2025.</strong> The three years count only from the day the spouse became a citizen, so the three-year route would open in 2028; the five-year date, mid-December 2027, comes first.</li>
<li><strong>Trip of 14 months in 2024.</strong> A trip of a year or more breaks continuous residence; USCIS then waits ${h.P.us.n400.afterBreakWait['5']} after the return on the five-year route before you can file.</li>
</ul>
<h2>The steps after you file</h2>
<ol>
<li>File the N-400 online or on paper; USCIS sends a receipt notice.</li>
<li>Biometrics appointment, if USCIS asks for one.</li>
<li>The ${h.a('us-interview', 'citizenship interview')}, with the English and civics tests.</li>
<li>The decision, then the oath ceremony: you are a citizen from the moment you take the oath.</li>
</ol>
<p>The ${h.a('us-timeline', 'naturalization timeline')} places these steps on a calendar from your green card date.</p>
<h2>What stops a permanent resident from naturalizing</h2>
<p>The dates are the easy part. The N-400 asks about voting, claims to citizenship, taxes, arrests and trips, and some answers can lead to a denial or, in serious cases, to removal proceedings. USCIS also checks that you did not obtain the green card itself by mistake or fraud. If anything in your past worries you, see an immigration attorney or a representative of an accredited organization before filing: the fee is not refunded if the application is denied.</p>
<h2>Can I apply with an expired green card?</h2>
<p>Yes for the filing itself, with one obligation on the side. The N-400 asks for your A-Number and the date you became a permanent resident, read from the card; the card’s own expiration date is not part of the eligibility conditions. The ${h.src('us_i90', 'USCIS Form I-90 page')} is just as clear on the other point: a permanent resident must have a valid, unexpired green card with them at all times, and applying for naturalization does not change that requirement. Under the ${h.src('us_replace_gc', 'USCIS replacement rules')}, you must renew a ten-year card that has expired or will expire within six months.</p>
${h.table(['Your card', 'File the N-400?', 'What else to do'], [['Ten-year card, valid', 'yes, when the dates allow', 'nothing'], ['Ten-year card, expired or expiring within 6 months', 'yes', 'file Form I-90 to renew it'], ['Two-year conditional card, expired', 'only with conditions being removed', 'Form I-751 (marriage) or I-829 (investor) is due in the 90 days before expiry; in most cases USCIS must approve it before the N-400'], ['Card lost or stolen', 'yes', 'file Form I-90 to replace it']], 'USCIS: Form I-90 page, Replace your green card, and N-400 instructions (01/20/25), Conditional Permanent Residents.', ['l', 'l', 'l'])}
<p>The conditional card is the real trap. A two-year card does not get renewed with an I-90: its conditions are removed with Form I-751 or I-829, and the N-400 instructions say that in most cases USCIS must approve that petition before it can approve the naturalization. The time spent on the conditional card still counts toward the five or three years.</p>
<p>At the oath ceremony you hand back the card, expired or not. From then on, your Certificate of Naturalization or a U.S. passport is your proof of status.</p>
<h2>How to count the months</h2>
<p>The tool above works in months, which is enough to plan. For the exact first day, with each trip abroad and the presence days counted one by one, use the ${h.a('us-n400', 'N-400 date tool')}: it applies the same ${h.P.us.n400.earlyFilingDays}-day rule to your real dates and flags trips over six months.</p>`,
  },
});
