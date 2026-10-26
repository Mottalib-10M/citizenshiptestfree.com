import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-greencard',
  group: 'us',
  order: 95,
  tool: { kind: 'mini:usroute' },
  mini: { kind: 'mini:usfee' },
  related: ['us-n400', 'us-marriage', 'us-eligibility', 'us-timeline', 'us-fee', 'us-interview'],
  sources: ['us_lpr5', 'us_married', 'us_n400', 'us_pm_d3', 'us_pm_d4', 'us_pm_g5'],
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
<h2>How to count the months</h2>
<p>The tool above works in months, which is enough to plan. For the exact first day, with each trip abroad and the presence days counted one by one, use the ${h.a('us-n400', 'N-400 date tool')}: it applies the same ${h.P.us.n400.earlyFilingDays}-day rule to your real dates and flags trips over six months.</p>`,
  },
  es: {
    slug: 'de-residente-a-ciudadano',
    nav: 'De residente a ciudadano',
    card: 'De residente permanente a ciudadano: las vías de 5 y 3 años, cuántos meses le faltan, lo que revisa el oficial y lo que cuesta.',
    title: 'De residente a ciudadano 2026: 5 o 3 años y meses que faltan',
    description: 'De residente a ciudadano en 2026: la vía de 5 años o la de 3 años casado con un ciudadano, cuántos meses le faltan con la presentación anticipada y los pasos.',
    h1: 'De residente a ciudadano: cuánto le falta para pedir la ciudadanía',
    intro: 'Indique cuánto tiempo lleva con su tarjeta verde y si vive con un cónyuge ciudadano. La herramienta elige la vía más corta y cuenta los meses que faltan para presentar.',
    resume: (h) => `Pasar de la tarjeta verde a la ciudadanía consiste en presentar el Formulario N-400 cuando se lleva el tiempo suficiente como residente permanente legal: cinco años en el caso general, o tres años si ha estado casado y viviendo con un ciudadano estadounidense durante esos tres años, siendo el cónyuge ciudadano todo ese tiempo. En las dos vías puede presentar hasta ${h.P.us.n400.earlyFilingDays} días antes del aniversario de la fecha «Resident since» impresa en la tarjeta. También necesita presencia física de al menos ${h.P.us.n400.routes['5'].presenceMonths} meses (${h.num(h.P.us.n400.routes['5'].presenceDays)} días) en la vía de cinco años o ${h.P.us.n400.routes['3'].presenceMonths} meses (${h.num(h.P.us.n400.routes['3'].presenceDays)} días) en la de tres, residencia continua sin un viaje de un año o más, ${h.P.us.n400.stateMonths} meses en su estado o distrito de USCIS, buen carácter moral y los exámenes de inglés y de educación cívica. La ciudadanía nunca es automática para un residente adulto: empieza el día del juramento. La tarifa es de ${h.usd(h.P.us.fees.online)} en línea o ${h.usd(h.P.us.fees.paper)} en papel. La tarjeta verde condicional (dos años) cuenta para los cinco o tres años, pero las condiciones deben eliminarse antes de naturalizarse.`,
    faqs: (h) => [
      { q: '¿Estoy obligado a hacerme ciudadano si tengo tarjeta verde?', a: 'No. La residencia permanente no tiene una fecha límite que obligue a naturalizarse; la tarjeta se renueva cada diez años con el Formulario I-90. La ciudadanía añade el derecho al voto, el pasaporte estadounidense y la protección contra la deportación, y permite pedir a más familiares. Muchos residentes esperan años antes de presentar, y algunos nunca lo hacen.' },
      { q: '¿Cuenta el tiempo con tarjeta verde condicional?', a: 'Sí. Los dos años con tarjeta condicional cuentan como tiempo de residente permanente para los cinco o tres años. Aun así debe eliminar las condiciones, con el Formulario I-751 o I-829, antes de que USCIS pueda aprobar el N-400. Si la petición sigue pendiente al presentar, USCIS la decide antes que el N-400 o al mismo tiempo, nunca después.' },
      { q: '¿Mis hijos se hacen ciudadanos cuando yo me naturalizo?', a: `Los hijos menores de ${h.P.us.forms.cca.childAgeUnder} años que son residentes permanentes y viven en Estados Unidos bajo su custodia legal y física se hacen ciudadanos automáticamente el día de su juramento, según la sección 320 de la INA. No presentan un N-400. Para tener una prueba, puede pedir un Certificado de Ciudadanía con el Formulario N-600 o solicitar su pasaporte estadounidense.` },
    ],
    body: (h) => `
<h2>Las dos vías comparadas</h2>
${h.table(['', 'Vía de 5 años (INA 316)', 'Vía de 3 años (INA 319(a))'], [['Quién', 'cualquier residente permanente', 'cónyuge que vive en unión matrimonial con un ciudadano'], ['Tiempo de residente permanente', `5 años, presentación ${h.P.us.n400.earlyFilingDays} días antes`, `3 años, presentación ${h.P.us.n400.earlyFilingDays} días antes`], ['Matrimonio', 'no exigido', '3 años viviendo juntos, cónyuge ciudadano todo ese tiempo'], ['Presencia física', `${h.num(h.P.us.n400.routes['5'].presenceDays)} días`, `${h.num(h.P.us.n400.routes['3'].presenceDays)} días`], ['Estado o distrito', `${h.P.us.n400.stateMonths} meses`, `${h.P.us.n400.stateMonths} meses`], ['Tarifa', `${h.usd(h.P.us.fees.online)} en línea, ${h.usd(h.P.us.fees.paper)} en papel`, 'igual']], `Páginas de elegibilidad de USCIS y Manual de Políticas, volumen 12, leídos el ${h.date(h.P.us.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>La vía del matrimonio solo es más corta si los tres años de unión matrimonial están cumplidos al presentar: la presentación anticipada se aplica al periodo de residencia, no al matrimonio. La página de la ${h.a('us-marriage', 'ciudadanía por matrimonio')} detalla esa vía.</p>
<h2>Cinco casos con fechas</h2>
<ul>
<li><strong>Tarjeta del 15 de marzo de 2022, soltero.</strong> Quinto aniversario el 15 de marzo de 2027; puede presentar ${h.P.us.n400.earlyFilingDays} días antes, a mediados de diciembre de 2026.</li>
<li><strong>Tarjeta del 15 de marzo de 2023, casado desde 2020 con un ciudadano de nacimiento, viviendo juntos.</strong> Tercer aniversario el 15 de marzo de 2026; la vía de tres años está abierta desde mediados de diciembre de 2025, siempre que se cumplan la presencia y la residencia.</li>
<li><strong>La misma tarjeta, casado en junio de 2024.</strong> La unión cumple tres años en junio de 2027, antes de la fecha de cinco años de mediados de diciembre de 2027, así que la vía de tres años se abre primero, en junio de 2027.</li>
<li><strong>La misma tarjeta, cónyuge naturalizado en 2025.</strong> Los tres años solo cuentan desde que el cónyuge es ciudadano, así que la vía de tres años se abriría en 2028; la fecha de cinco años, a mediados de diciembre de 2027, llega antes.</li>
<li><strong>Viaje de 14 meses en 2024.</strong> Un viaje de un año o más rompe la residencia continua; USCIS espera entonces ${h.P.us.n400.afterBreakWait['5']} después del regreso en la vía de cinco años antes de poder presentar.</li>
</ul>
<h2>Los pasos después de presentar</h2>
<ol>
<li>Presenta el N-400 en línea o en papel; USCIS envía un aviso de recibo.</li>
<li>Cita de datos biométricos, si USCIS la pide.</li>
<li>La ${h.a('us-interview', 'entrevista de ciudadanía')}, con los exámenes de inglés y de educación cívica.</li>
<li>La decisión y luego la ceremonia de juramento: es ciudadano desde el momento en que jura.</li>
</ol>
<p>El ${h.a('us-timeline', 'calendario de la ciudadanía')} sitúa estos pasos en fechas a partir de su tarjeta verde.</p>
<h2>Lo que impide a un residente naturalizarse</h2>
<p>Las fechas son la parte fácil. El N-400 pregunta por el voto, las declaraciones de ciudadanía, los impuestos, los arrestos y los viajes, y algunas respuestas pueden llevar a una negación o, en casos graves, a un procedimiento de deportación. USCIS también revisa que la tarjeta verde no se obtuviera por error o fraude. Si algo de su pasado le preocupa, consulte a un abogado de inmigración o a un representante de una organización acreditada antes de presentar: la tarifa no se devuelve si niegan la solicitud.</p>
<h2>Cómo contar los meses</h2>
<p>La herramienta de arriba trabaja en meses, lo que basta para planificar. Para el primer día exacto, con cada viaje y los días de presencia contados uno a uno, use la herramienta del ${h.a('us-n400', 'Formulario N-400')}: aplica la misma regla de ${h.P.us.n400.earlyFilingDays} días a sus fechas reales y señala los viajes de más de seis meses.</p>`,
  },
});
