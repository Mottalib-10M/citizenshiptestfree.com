import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-marriage',
  group: 'us',
  order: 96,
  tool: { kind: 'usdate', props: { route: '3' } },
  related: ['us-greencard', 'us-n400', 'us-eligibility', 'us-interview', 'us-fee', 'us-timeline'],
  sources: ['us_married', 'us_pm_g3', 'us_pm_g2', 'usc_1430', 'us_pm_g5', 'us_n400'],
  en: {
    slug: 'citizenship-through-marriage',
    nav: 'Citizenship through marriage (3 years)',
    card: 'The 3-year route for spouses of U.S. citizens: marital union, a spouse who was a citizen the whole time, 548 days of presence, and what divorce or separation changes.',
    title: 'Citizenship Through Marriage 2026: The 3-Year N-400 Rule',
    description: 'Citizenship through marriage: the 3-year N-400 rule for spouses of U.S. citizens, marital union, 548 days of presence, divorce and your first filing day.',
    h1: 'Citizenship through marriage: the 3-year rule, day by day',
    intro: 'Enter your green card date, your trips and the date your union with a citizen spouse began. The tool finds the first day the three-year route lets you file.',
    resume: (h) => `Citizenship through marriage is not automatic: marrying a U.S. citizen gives no citizenship by itself, but it shortens the wait before you can file Form N-400 from five years to three, under section 319(a) of the Immigration and Nationality Act. You qualify if, on the filing date, you have been a lawful permanent resident for three years, have lived in marital union with your spouse for the three years just before filing, and your spouse has been a U.S. citizen during that whole period. You may file up to ${h.P.us.n400.earlyFilingDays} days before the third anniversary of your green card, but the three years of marital union must already be complete when you file. You also need ${h.P.us.n400.routes['3'].presenceMonths} months (${h.num(h.P.us.n400.routes['3'].presenceDays)} days) of physical presence in those three years, ${h.P.us.n400.stateMonths} months in your state or USCIS district, continuous residence, good moral character and the tests. Between filing and the oath, USCIS requires a valid marriage but not living together. The fee is the same as on the five-year route, ${h.usd(h.P.us.fees.online)} online. The tool above counts every condition on your real dates.`,
    faqs: (h) => [
      { q: 'What if we divorce or my spouse dies before the oath?', a: 'USCIS requires a legally valid marriage from the day you file until the day you take the oath. A divorce, or the death of the citizen spouse, before the oath ends eligibility on the three-year route. You may still qualify on the five-year route if you meet its conditions, so check your five-year date before giving up. A special provision exists for the surviving spouse of a citizen who died in honorable active-duty service in the U.S. armed forces.' },
      { q: 'How do I prove that my spouse is a citizen?', a: 'The Policy Manual puts the burden on you: evidence of your spouse’s U.S. citizenship goes with the N-400. Depending on how your spouse became a citizen, that is a U.S. birth certificate, a Certificate of Naturalization or Citizenship, a Consular Report of Birth Abroad or a valid U.S. passport. Add your marriage certificate and proof that any earlier marriages of either of you ended.' },
      { q: 'Do years married before my spouse naturalized count?', a: 'No. The three years of marital union count only while your spouse is a citizen. If your spouse naturalized eighteen months ago, the three-year route opens eighteen months from now at the earliest, even if you have been married for ten years. In that case the five-year route, which ignores the marriage, may come first.' },
      { q: 'We live apart for work. Is that still marital union?', a: 'It can be. The Policy Manual accepts, under very limited circumstances and with no sign of marital disunity, a separation beyond your control, and names required travel or relocation for employment and U.S. military service as examples. An informal separation that suggests disunity, or a legal separation, breaks the union; incarceration does not count as involuntary. If your case is unusual, ask an attorney or accredited representative.' },
    ],
    body: (h) => `
<h2>The four conditions of the 3-year route</h2>
${h.table(['Condition', 'Rule', 'When it is checked'], [['Permanent resident', '3 years', `on the filing date (file from ${h.P.us.n400.earlyFilingDays} days before)`], ['Marital union', '3 years living together, spouse a citizen all that time', 'complete on the filing date, no early filing'], ['Physical presence', `${h.num(h.P.us.n400.routes['3'].presenceDays)} days in the last 3 years`, 'on the filing date'], ['Valid marriage', 'still married', 'from filing until the oath']], `USCIS Policy Manual, volume 12, part G, chapter 3, and 8 U.S.C. 1430, read on ${h.date(h.P.us.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>The Policy Manual reads the statute literally: living in marital union is required until the day you file, and only a valid marriage is required after that, until the oath. The older USCIS eligibility page still says “while we adjudicate your application”; the Policy Manual is the current guidance officers apply.</p>
<h2>Which date starts the three years of union</h2>
<p>The union count starts from the latest of three dates: your wedding, the day you began living together, and the day your spouse became a citizen. The green card count starts from the “Resident since” date. Your first filing day is the later of two dates: the green card anniversary minus ${h.P.us.n400.earlyFilingDays} days, and the day the union reaches three years. A conditional green card counts toward the three years, but the conditions must be removed before the N-400 can be approved.</p>
<h2>Three examples</h2>
<ul>
<li><strong>Married in 2019 to a citizen by birth, green card dated 1 July 2024.</strong> Union complete long ago; first filing day ${h.P.us.n400.earlyFilingDays} days before 1 July 2027, in early April 2027.</li>
<li><strong>Green card dated 1 July 2023, wedding on 1 September 2023.</strong> The green card date allows filing from early April 2026, but the union reaches three years only on 1 September 2026, which becomes the first filing day.</li>
<li><strong>Spouse naturalized on 1 March 2025, married since 2015, green card dated 2021.</strong> The union with a citizen reaches three years on 1 March 2028; the five-year date, ${h.P.us.n400.earlyFilingDays} days before the 2026 anniversary, comes much sooner.</li>
</ul>
<h2>Spouses of citizens working abroad</h2>
<p>Section 319(b) offers a different route when your citizen spouse works abroad for the U.S. government, the military or certain American employers and is stationed abroad for at least one year. No specific period of residence, presence or marital union is required, but you must be a permanent resident present in the United States for the interview and the oath, and intend to live abroad with your spouse and then return. The marriage must be valid from filing until the oath.</p>
<h2>What the officer looks at</h2>
<p>Beyond the dates, the officer checks that the marriage is real and continuing, and that your spouse’s citizenship is proven. The officer may ask for evidence of your life together; joint tax returns and shared bank accounts or credit cards are examples cited in the Policy Manual. The ${h.a('us-interview', 'citizenship interview page')} lists the yes/no questions you will answer again under oath, including whether you EVER married to obtain an immigration benefit. The ${h.a('us-greencard', 'green card to citizenship page')} compares this route with the five-year one.</p>`,
  },
});
