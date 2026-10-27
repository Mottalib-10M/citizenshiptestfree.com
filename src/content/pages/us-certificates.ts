import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-certificates',
  group: 'us',
  order: 145,
  tool: { kind: 'mini:uscert' },
  related: ['us-n600', 'us-n565', 'us-oath', 'us-dual', 'us-n400'],
  sources: ['us_pm_k1', 'us_n600', 'us_n565', 'us_ceremonies', 'us_g1055'],
  en: {
    slug: 'certificate-of-citizenship-vs-naturalization',
    nav: 'Certificate of Citizenship vs Naturalization',
    card: 'Two USCIS certificates, two ways of becoming American: which one you hold, how you get it, and how to replace a lost naturalization certificate.',
    title: 'Certificate of Citizenship vs Naturalization: 2026 Guide',
    description: 'Certificate of Citizenship or Certificate of Naturalization: which one you hold, how each is issued, and how to replace a lost one with Form N-565 in 2026.',
    h1: 'Certificate of Citizenship vs Certificate of Naturalization',
    intro: 'Tell the tool how you became a citizen. It names your USCIS document, how you get it, and what a replacement costs if it is lost or damaged.',
    resume: (h) => `USCIS issues two different certificates, and which one you hold depends on how you became a U.S. citizen. The Certificate of Naturalization is the official record that you naturalized: an adult who filed Form N-400 receives it at the oath ceremony, right after taking the Oath of Allegiance, with no separate application or fee. The Certificate of Citizenship is the official record that you were already a citizen without naturalizing yourself: either at birth abroad to a U.S. citizen parent, or automatically as a child through a parent under INA 320. It is requested with Form N-600, at ${h.usd(h.P.us.forms.n600.online)} online or ${h.usd(h.P.us.forms.n600.paper)} on paper in fee schedule G-1055 (edition of ${h.date(h.P.us.forms.g1055Edition)}). Both prove citizenship for life and never expire; a valid U.S. passport proves it as well. If either certificate is lost, stolen, damaged, or carries a USCIS error or an old name, the replacement is requested on the same form, N-565, at ${h.usd(h.P.us.forms.n565.online)} online or ${h.usd(h.P.us.forms.n565.paper)} on paper, and free when the error was USCIS’s. A person born in the United States receives neither certificate: the birth certificate is the proof.`,
    faqs: (h) => [
      { q: 'I lost my naturalization certificate. What do I do?', a: `File Form N-565, Application for Replacement Naturalization/Citizenship Document, with a police report or a sworn statement explaining the loss. The fee is ${h.usd(h.P.us.forms.n565.online)} online or ${h.usd(h.P.us.forms.n565.paper)} on paper. While you wait, a U.S. passport also proves citizenship; if you already hold one, you may not need the replacement at all for most purposes.` },
      { q: 'My certificate has a spelling mistake. Who pays to fix it?', a: `It depends on who made the mistake. If the error comes from USCIS, for example a name spelled differently from your application, file Form N-565 with the incorrect certificate and pay nothing. If the certificate matches what you wrote on the form, or your name changed since, the regular fee of ${h.usd(h.P.us.forms.n565.online)} online applies. Checking the certificate before leaving the ceremony avoids most cases.` },
      { q: 'My children became citizens when I naturalized. Do they get my certificate?', a: 'No. Your Certificate of Naturalization covers only you. Children who became citizens automatically under INA 320 on the day of your oath can get their own Certificate of Citizenship with Form N-600, or simply a U.S. passport, which costs less and also proves citizenship.' },
    ],
    body: (h) => `
<h2>The two certificates side by side</h2>
${h.table(['', 'Certificate of Naturalization', 'Certificate of Citizenship'], [
  ['Proves that', 'you naturalized', 'you were already a citizen (at birth abroad or through a parent)'],
  ['Form', 'N-400, Application for Naturalization', 'N-600, Application for Certificate of Citizenship'],
  ['When you get it', 'at the oath ceremony', 'after approval, with an oath for those 14 and over'],
  ['Cost', `included in the N-400 fee (${h.usd(h.P.us.fees.online)} online)`, `${h.usd(h.P.us.forms.n600.online)} online, ${h.usd(h.P.us.forms.n600.paper)} paper`],
  ['Replacement', `N-565, ${h.usd(h.P.us.forms.n565.online)} online`, `N-565, ${h.usd(h.P.us.forms.n565.online)} online`],
  ['Expires', 'never', 'never'],
], `USCIS Policy Manual, volume 12, part K, and fee schedule G-1055, edition ${h.date(h.P.us.forms.g1055Edition)}.`, ['l', 'l', 'l'])}
<p>The ${h.src('us_pm_k1', 'Policy Manual')} puts it in one line each: the Certificate of Citizenship records citizenship acquired at birth or derived after birth; the Certificate of Naturalization records that the person is a naturalized citizen. In both cases USCIS must approve a form, may hold an interview, and gives the oath when it is required.</p>
<h2>A subtle point: derived citizens are “naturalized” in law</h2>
<p>The Immigration and Nationality Act defines naturalization as granting nationality after birth by any means, so a child who became a citizen automatically through a parent is, legally, naturalized too. For ease, USCIS still calls their document a Certificate of Citizenship and reserves the Certificate of Naturalization for people who applied with the N-400. What matters in practice is the form: N-400 if you are applying to become a citizen, ${h.a('us-n600', 'N-600')} if you already are one and want proof.</p>
<h2>At the ceremony: check it before you leave</h2>
<p>Naturalized citizens get their certificate the day they become citizens. USCIS asks you to ${h.src('us_ceremonies', 'review it carefully and report any error before leaving the ceremony')}: a typo in the name or the date of birth is corrected free when it is USCIS’s mistake, but fixing it later means filing Form N-565. You hand back your green card at check-in, so from that day on the certificate or a passport is your proof of status. The ${h.a('us-oath', 'oath ceremony page')} walks through the day.</p>
<h2>Replacing a lost, damaged or outdated certificate</h2>
<ul>
<li><strong>Lost, stolen or destroyed:</strong> N-565 with a police report or a sworn statement.</li>
<li><strong>Damaged:</strong> N-565 with the damaged certificate itself.</li>
<li><strong>Legal name change</strong> after marriage, divorce or a court order: N-565 with the original certificate and proof of the new name.</li>
<li><strong>USCIS error:</strong> N-565 with the incorrect certificate, no fee.</li>
</ul>
<p>The ${h.a('us-n565', 'Form N-565 page')} has the fee by reason and the evidence list; ${h.src('us_n565', 'USCIS’s N-565 page')} has the form and the filing addresses. Never send the only original you have unless the instructions require it.</p>
<h2>Which proof to use day to day</h2>
<p>For a job (Form I-9), a passport application or social security, either certificate works, and so does a U.S. passport. Many new citizens apply for a passport soon after the ceremony and keep the certificate at home, because a passport is easier to carry and cheaper to replace. This page is general information from an independent site, not legal advice and not a USCIS service.</p>`,
  },
});
