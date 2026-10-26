import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-n600',
  group: 'us',
  order: 140,
  tool: { kind: 'mini:usderive' },
  related: ['us-n565', 'us-dual', 'us-greencard', 'us-oath', 'us-n400', 'us-fee'],
  sources: ['us_n600', 'us_n600_instr', 'us_pm_h4', 'usc_1431', 'us_g1055'],
  en: {
    slug: 'n-600',
    nav: 'Form N-600, Certificate of Citizenship',
    card: 'Proof of citizenship for people who became Americans through a parent: the INA 320 conditions, the N-600 fee of $1,335 online, and when a passport is enough.',
    title: 'N-600 2026: Certificate of Citizenship, $1,335 Online Fee',
    description: 'Form N-600 in 2026: the Certificate of Citizenship for children of U.S. citizens, the four INA 320 conditions, the $1,335 fee and when a passport is enough.',
    h1: 'Form N-600: the Certificate of Citizenship',
    intro: 'Answer four questions about your childhood. The tool tells you whether you likely became a citizen automatically under INA 320, and what proving it with Form N-600 costs.',
    resume: (h) => `Form N-600, Application for Certificate of Citizenship, asks USCIS for a document proving that you are already a U.S. citizen: either from birth abroad to a U.S. citizen parent, or because you became a citizen automatically before turning ${h.P.us.forms.cca.childAgeUnder}. It is not an application to become a citizen. Under INA 320, as amended by the Child Citizenship Act in force since ${h.date(h.P.us.forms.cca.effective)}, a child born abroad becomes a citizen automatically once all four conditions are met at the same time before age ${h.P.us.forms.cca.childAgeUnder}: one parent is a U.S. citizen by birth or naturalization, the child is under ${h.P.us.forms.cca.childAgeUnder}, the child is a lawful permanent resident, and the child lives in the United States in that parent’s legal and physical custody. The law applies to children born on or after that date or still under ${h.P.us.forms.cca.childAgeUnder} on it. The fee is ${h.usd(h.P.us.forms.n600.online)} online or ${h.usd(h.P.us.forms.n600.paper)} on paper in USCIS fee schedule G-1055, edition of ${h.date(h.P.us.forms.g1055Edition)}, with no fee for current and former members of the U.S. armed forces filing for themselves and for certain adopted children. You are not required to hold a certificate: a valid U.S. passport is also proof of citizenship.`,
    faqs: (h) => [
      { q: 'Do I need an N-600 if I already have a U.S. passport?', a: 'No. USCIS states that you are not required to obtain evidence of your citizenship, and a valid, unexpired U.S. passport proves it. The difference is duration: a passport expires and is then no longer conclusive proof, while a Certificate of Citizenship never expires. Many families get the passport first, for travel, and file the N-600 later or never.' },
      { q: 'I was over 18 on 27 February 2001. Can I still file an N-600?', a: `Yes, but the current INA 320 does not apply to you. The Child Citizenship Act is not retroactive: your case is judged under the law in force when you turned ${h.P.us.forms.cca.childAgeUnder} or met the last condition, such as former INA 321, which had different rules on parents and custody. The N-600 is the same form; the conditions are not. Have an attorney or accredited representative review the old rules before paying the fee.` },
      { q: 'Can a parent file an N-600 for a child?', a: 'Yes. A U.S. citizen parent or legal guardian with legal and physical custody can file for a child under 18, and signs for a child under 14. USCIS gives the Oath of Allegiance before issuing the certificate, but waives it for children under 14. If the child lives abroad and did not become a citizen automatically, Form N-600K is the relevant form instead.' },
      { q: 'Can I file a second N-600 after a denial?', a: `No. The instructions say USCIS will reject any new N-600 from a person who already received a decision on one. After a denial, the notice explains your right to appeal, within ${h.P.us.processing.hearingRequestDays} calendar days (${h.P.us.processing.hearingRequestDaysMailed} if the decision was mailed); a U.S. passport application is another way to seek proof. That is why it pays to gather custody and residence evidence carefully the first time.` },
    ],
    body: (h) => `
<h2>Fees in force</h2>
${h.table(['Case', 'Fee'], [['Online filing', h.usd(h.P.us.forms.n600.online)], ['Paper filing', h.usd(h.P.us.forms.n600.paper)], ['Current or former member of the U.S. armed forces, for yourself', h.usd(h.P.us.forms.n600.military)], ['Certain adopted children (INA 101(b)(1)(E), (F) or (G))', h.usd(h.P.us.forms.n600.adopted)], ['Fee waiver with Form I-912 (paper only)', h.usd(0)]], `USCIS Fee Schedule, Form G-1055, edition ${h.date(h.P.us.forms.g1055Edition)}, read on ${h.date(h.P.us.forms.retrieved_at)}.`, ['l', 'r'])}
<p>Children of service members do not get the military exemption. You cannot file online if you apply from outside the United States, ask for a fee waiver, or are a service member or veteran filing for yourself: those cases go by mail.</p>
<h2>The four conditions of INA 320</h2>
<p>All four must be true at the same time, at some point before the 18th birthday. The order does not matter.</p>
<ol>
<li><strong>A U.S. citizen parent</strong>, by birth or naturalization, including an adoptive parent. Stepchildren do not qualify unless adopted.</li>
<li><strong>Under ${h.P.us.forms.cca.childAgeUnder}.</strong></li>
<li><strong>A lawful permanent resident.</strong> The child holds a green card.</li>
<li><strong>Living in the United States in the legal and physical custody of the citizen parent.</strong> Legal custody follows the birth certificate for married parents, or a court order after a divorce; physical custody means actually living with that parent.</li>
</ol>
<p>The most common case: a parent naturalizes while a child with a green card lives with them. The child becomes a citizen on the day of the parent’s oath, with no form at all. The N-600 only documents it later. Children of U.S. government employees and service members stationed abroad can meet the residence condition abroad under INA 320(c).</p>
<h2>Evidence USCIS looks for</h2>
<ul>
<li>Your birth certificate and the parent’s proof of citizenship (birth certificate, Certificate of Naturalization, passport).</li>
<li>Your green card or other proof of permanent residence.</li>
<li>Proof of legal custody: parents’ marriage certificate, divorce decree and custody order, or legitimation documents for a father.</li>
<li>Proof you lived with the citizen parent before ${h.P.us.forms.cca.childAgeUnder}: school, medical or tax records showing the same address, or notarized affidavits from either parent, as the Policy Manual lists.</li>
</ul>
<h2>Born abroad to a citizen parent</h2>
<p>A child born abroad to a U.S. citizen parent may be a citizen from birth under INA 301 or 309, depending on the parents’ marriage and the parent’s past physical presence in the United States, under the law in force on the birth date. That child can also use the N-600, or a parent can ask a U.S. embassy or consulate for a Consular Report of Birth Abroad. These rules changed several times; check the version that applies to your birth year with an attorney or accredited representative.</p>
<h2>After approval</h2>
<p>If you are 14 or older, you take the Oath of Allegiance before USCIS issues the certificate; under 14, USCIS waives it. Keep the original safe: a lost or damaged Certificate of Citizenship is replaced with ${h.a('us-n565', 'Form N-565')}, at a separate fee. Adults who did not become citizens through a parent follow the ${h.a('us-greencard', 'green card to citizenship')} route with the N-400 instead.</p>`,
  },
});
