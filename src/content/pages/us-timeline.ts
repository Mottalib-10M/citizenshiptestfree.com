import { definePage } from '../../lib/guide-types';

type H = { P: { us: Record<string, any> } };
const PT = (h: H) => h.P.us.processing as { latestFy: string; medianMonths: Record<string, number>; decisionDaysAfterInterview: number; ssaWaitDays: number; naturalizedFy2024: number; medianLprYearsFy2024: number; statsReviewed: string };
const N = (h: H) => h.P.us.n400 as { earlyFilingDays: number; routes: Record<'5' | '3', { years: number; presenceDays: number }> };

export default definePage({
  id: 'us-timeline',
  group: 'us',
  order: 114,
  tool: { kind: 'usfrise', props: { variant: 'timeline' } },
  related: ['us-steps', 'us-processing', 'us-n400', 'us-eligibility', 'us-oath', 'us-test'],
  sources: ['us_n400', 'us_hist_pt', 'us_pm_b4', 'us_nat_stats', 'us_ceremonies'],
  en: {
    slug: 'naturalization-timeline',
    nav: 'Naturalization timeline',
    card: 'How long it takes to become a U.S. citizen, from the date on your green card to the oath: years of residence, N-400 processing, decision and ceremony.',
    title: 'Naturalization Timeline 2026: How Long to Become a Citizen',
    description: 'Naturalization timeline from green card to oath: the years before you can file, the N-400 processing time, the decision and the ceremony, dated from your card.',
    h1: 'Naturalization timeline: from green card to citizenship',
    intro: 'Enter the “Resident since” date on your green card. The timeline lays out the wait before filing, the processing, the decision and the oath, each bar sized to its official duration.',
    resume: (h) => `Becoming a U.S. citizen takes two waits in a row. The first is set by law: ${N(h).routes['5'].years} years as a permanent resident, or ${N(h).routes['3'].years} years if you are married to and living with a U.S. citizen, and you may file Form N-400 ${N(h).earlyFilingDays} days before that anniversary. The second is the processing of the application by USCIS, from the receipt notice to the decision: the national median was ${h.num(PT(h).medianMonths[PT(h).latestFy], 1)} months in fiscal year ${PT(h).latestFy}, according to the USCIS historical fact sheet. Between the two sit the interview with the English and civics tests, then the oath ceremony, which can happen the same day as the interview or a few weeks later on a mailed notice. On the five-year route, the shortest path from green card to oath is therefore close to five years and a half. In practice many people take longer: USCIS reports that the median time spent as a permanent resident by the people naturalized in fiscal year 2024 was ${h.num(PT(h).medianLprYearsFy2024, 1)} years, because many wait before they file.`,
    faqs: (h) => [
      { q: 'What is the fastest way to become a U.S. citizen?', a: `For most adults it is filing on the first day the law allows: ${N(h).earlyFilingDays} days before the fifth anniversary of the green card, or the third for the spouse of a citizen living together, with enough days in the country. Filing a complete N-400 online, with every document, and passing both tests at the first interview avoids the delays that come from a continued case.` },
      { q: 'Why do people wait longer than five years?', a: `Some are not eligible yet because of long trips abroad, which can break continuous residence; some wait to improve their English; others simply delay. USCIS statistics show a median of ${h.num(PT(h).medianLprYearsFy2024, 1)} years as a permanent resident for the people naturalized in fiscal year 2024, well above the legal minimum.` },
      { q: 'Does the timeline change for the spouse of a citizen?', a: `Yes, the first wait is shorter: ${N(h).routes['3'].years} years as a permanent resident instead of ${N(h).routes['5'].years}, with ${N(h).routes['3'].presenceDays} days of physical presence instead of ${N(h).routes['5'].presenceDays}, and three years of marriage to a spouse who was a citizen during that time. The processing, the interview, the tests and the oath are the same for everyone.` },
    ],
    body: (h) => `
<h2>The four stages and their official durations</h2>
${h.table(['Stage', 'Official duration', 'Source'], [['Permanent residence before filing', `${N(h).routes['5'].years} years (or ${N(h).routes['3'].years}) minus ${N(h).earlyFilingDays} days`, 'USCIS, Form N-400 page'], ['N-400 processing, receipt to decision', `national median ${h.num(PT(h).medianMonths[PT(h).latestFy], 1)} months (FY ${PT(h).latestFy})`, 'USCIS historical processing times'], ['Decision after the interview', `at most ${PT(h).decisionDaysAfterInterview} days`, 'USCIS Policy Manual'], ['Oath ceremony', 'same day as the interview, or on the N-445 notice', 'USCIS naturalization ceremonies'], ['Social Security update', `from ${PT(h).ssaWaitDays} days after the oath`, 'USCIS naturalization ceremonies']], `Read on uscis.gov on ${h.date(h.P.us.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>Only the first stage is fixed in days. The processing time is a national middle value; the timeline above uses it so that each stage keeps its real proportion, and it makes the residence years look as long as they are next to the months of processing.</p>
<h2>Your dates, step by step</h2>
<p>Once you have filed, replace the national median by the time USCIS shows for your field office, and add the interview and ceremony dates as soon as your notices arrive. The tool then dates the decision, the legal limit after the interview, the deadline for a hearing request if the answer is no, and the day you can update your Social Security record.</p>
<!--tool:ustime|{"mode":"timeline"}-->
<h2>An example</h2>
<p>Ana became a permanent resident on 15 November 2021. On the five-year route she may file ${N(h).earlyFilingDays} days before 15 November 2026, on 17 August 2026, if her trips leave her enough days in the country: the ${h.a('us-n400', 'N-400 date calculator')} checks it trip by trip. With the national median of ${h.num(PT(h).medianMonths[PT(h).latestFy], 1)} months, a decision would come around the end of January 2027. If her field office offers same-day ceremonies, she could take the oath at the interview; otherwise she waits for the N-445 notice.</p>
<h2>How the country-wide numbers look</h2>
<p>USCIS ${h.src('us_nat_stats', 'naturalization statistics')} (page reviewed ${h.date(PT(h).statsReviewed)}) count ${h.num(PT(h).naturalizedFy2024)} new citizens in fiscal year 2024, and a median of ${h.num(PT(h).medianLprYearsFy2024, 1)} years spent as a permanent resident before naturalizing. That median is far above the legal five years because the clock in the statistics runs from the green card to the oath, whatever the reason for waiting.</p>
<h2>Where time is lost, and how to avoid it</h2>
<ul>
<li><strong>Filing too early.</strong> An N-400 received before the 90-day window can be rejected or denied, and the fee is not refunded. Count your days first.</li>
<li><strong>A long trip in the five years.</strong> A trip of more than six months may break continuous residence and one of a year or more breaks it; the ${h.a('us-eligibility', 'eligibility page')} explains the rule and the waiting time after a break.</li>
<li><strong>Failing a test.</strong> A second interview usually comes ${h.P.us.english.retestDays[0]} to ${h.P.us.english.retestDays[1]} days later. The ${h.a('us-test', 'mock civics test')} and the ${h.a('us-english', 'English practice')} are free.</li>
<li><strong>Missing the ceremony.</strong> USCIS warns that failing to appear more than once can lead to the denial of the application; the ${h.a('us-oath', 'oath ceremony page')} explains how to ask for a new date.</li>
</ul>
<p>Each stage has its own page: the ${h.a('us-steps', 'N-400 process from filing to oath')}, the ${h.a('us-processing', 'processing time')} and the ${h.a('us-oath', 'ceremony')}.</p>`,
  },
  es: {
    slug: 'cuanto-tarda-la-ciudadania',
    nav: 'Cuánto tarda la ciudadanía',
    card: 'Cuánto se tarda en ser ciudadano de Estados Unidos, de la tarjeta verde al juramento: años de residencia, trámite del N-400, decisión y ceremonia.',
    title: 'Calendario de la ciudadanía americana 2026: cuánto tarda',
    description: 'Calendario de la ciudadanía americana: los años antes de presentar el N-400, el trámite, la decisión y la ceremonia, con fechas desde su tarjeta verde.',
    h1: 'Cuánto tarda la ciudadanía: de la tarjeta verde al juramento',
    intro: 'Indique la fecha «Resident since» de su tarjeta verde. La línea de tiempo muestra la espera antes de presentar, el trámite, la decisión y el juramento, cada barra según su duración oficial.',
    resume: (h) => `Hacerse ciudadano de Estados Unidos lleva dos esperas seguidas. La primera la fija la ley: ${N(h).routes['5'].years} años como residente permanente, o ${N(h).routes['3'].years} años si está casado con un ciudadano y vive con él, y puede presentar el Formulario N-400 ${N(h).earlyFilingDays} días antes de ese aniversario. La segunda es el trámite de la solicitud en USCIS, del aviso de recibo a la decisión: la mediana nacional fue de ${h.num(PT(h).medianMonths[PT(h).latestFy], 1)} meses en el año fiscal ${PT(h).latestFy}, según la hoja histórica de USCIS. Entre ambas están la entrevista con los exámenes de inglés y cívico, y luego la ceremonia de juramento, que puede ser el mismo día de la entrevista o unas semanas después con un aviso por correo. En la vía de cinco años, el camino más corto de la tarjeta verde al juramento ronda así los cinco años y medio. En la práctica muchos tardan más: USCIS indica que la mediana de años como residente permanente de quienes se naturalizaron en el año fiscal 2024 fue de ${h.num(PT(h).medianLprYearsFy2024, 1)} años, porque muchos esperan antes de presentar.`,
    faqs: (h) => [
      { q: '¿Cuál es la forma más rápida de hacerse ciudadano?', a: `Para la mayoría de los adultos, presentar el primer día que permite la ley: ${N(h).earlyFilingDays} días antes del quinto aniversario de la tarjeta verde, o del tercero para el cónyuge de un ciudadano que vive con él, con suficientes días en el país. Un N-400 completo en línea, con todos los documentos, y aprobar ambos exámenes en la primera entrevista evitan los retrasos de un caso continuado.` },
      { q: '¿Por qué hay quien espera más de cinco años?', a: `Algunos aún no cumplen los requisitos por viajes largos al extranjero, que pueden interrumpir la residencia continua; otros esperan para mejorar su inglés, y otros simplemente lo dejan para más tarde. Las estadísticas de USCIS dan una mediana de ${h.num(PT(h).medianLprYearsFy2024, 1)} años como residente permanente para los naturalizados del año fiscal 2024.` },
      { q: '¿Cambia el calendario para el cónyuge de un ciudadano?', a: `Sí, la primera espera es más corta: ${N(h).routes['3'].years} años como residente permanente en lugar de ${N(h).routes['5'].years}, con ${N(h).routes['3'].presenceDays} días de presencia física en lugar de ${N(h).routes['5'].presenceDays}, y tres años de matrimonio con un cónyuge que era ciudadano durante ese tiempo. El trámite, la entrevista, los exámenes y el juramento son iguales para todos.` },
    ],
    body: (h) => `
<h2>Las cuatro etapas y sus duraciones oficiales</h2>
${h.table(['Etapa', 'Duración oficial', 'Fuente'], [['Residencia permanente antes de presentar', `${N(h).routes['5'].years} años (o ${N(h).routes['3'].years}) menos ${N(h).earlyFilingDays} días`, 'USCIS, página del N-400'], ['Trámite del N-400, del recibo a la decisión', `mediana nacional de ${h.num(PT(h).medianMonths[PT(h).latestFy], 1)} meses (año fiscal ${PT(h).latestFy})`, 'USCIS, tiempos históricos'], ['Decisión después de la entrevista', `como máximo ${PT(h).decisionDaysAfterInterview} días`, 'Manual de Políticas de USCIS'], ['Ceremonia de juramento', 'el día de la entrevista, o en la fecha del aviso N-445', 'USCIS, ceremonias de naturalización'], ['Actualizar el Seguro Social', `desde ${PT(h).ssaWaitDays} días después del juramento`, 'USCIS, ceremonias de naturalización']], `Leído en uscis.gov el ${h.date(h.P.us.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>Solo la primera etapa está fijada en días. El tiempo de trámite es un valor central nacional; la línea de tiempo de arriba lo usa para que cada etapa conserve su proporción real, y así los años de residencia se ven tan largos como son frente a los meses de trámite.</p>
<h2>Sus fechas, paso a paso</h2>
<p>Una vez presentado el N-400, reemplace la mediana nacional por el tiempo que USCIS muestra para su oficina, y añada las fechas de la entrevista y de la ceremonia cuando lleguen los avisos. La herramienta fecha entonces la decisión, el límite legal tras la entrevista, el plazo para pedir una audiencia si la respuesta es negativa y el día en que puede actualizar su registro del Seguro Social.</p>
<!--tool:ustime|{"mode":"timeline"}-->
<h2>Un ejemplo</h2>
<p>Ana es residente permanente desde el 15 de noviembre de 2021. En la vía de cinco años puede presentar ${N(h).earlyFilingDays} días antes del 15 de noviembre de 2026, el 17 de agosto de 2026, si sus viajes le dejan suficientes días en el país: la ${h.a('us-n400', 'calculadora del N-400')} lo comprueba viaje por viaje. Con la mediana nacional de ${h.num(PT(h).medianMonths[PT(h).latestFy], 1)} meses, la decisión llegaría hacia finales de enero de 2027. Si su oficina ofrece ceremonias el mismo día, podría jurar en la entrevista; si no, espera el aviso N-445.</p>
<h2>Las cifras de todo el país</h2>
<p>Las ${h.src('us_nat_stats', 'estadísticas de naturalización de USCIS')} (página revisada el ${h.date(PT(h).statsReviewed)}) cuentan ${h.num(PT(h).naturalizedFy2024)} nuevos ciudadanos en el año fiscal 2024 y una mediana de ${h.num(PT(h).medianLprYearsFy2024, 1)} años como residente permanente antes de naturalizarse. Esa mediana supera con mucho los cinco años legales porque en las estadísticas el reloj corre de la tarjeta verde al juramento, sea cual sea el motivo de la espera.</p>
<h2>Dónde se pierde tiempo y cómo evitarlo</h2>
<ul>
<li><strong>Presentar demasiado pronto.</strong> Un N-400 recibido antes de la ventana de 90 días puede rechazarse o denegarse, y la tarifa no se devuelve. Cuente sus días antes.</li>
<li><strong>Un viaje largo en los cinco años.</strong> Un viaje de más de seis meses puede interrumpir la residencia continua y uno de un año o más la interrumpe; la página de ${h.a('us-eligibility', 'elegibilidad')} explica la regla y la espera tras una interrupción.</li>
<li><strong>No aprobar un examen.</strong> La segunda entrevista suele llegar entre ${h.P.us.english.retestDays[0]} y ${h.P.us.english.retestDays[1]} días después. El ${h.a('us-test', 'examen cívico de práctica')} y la ${h.a('us-english', 'práctica de inglés')} son gratuitos.</li>
<li><strong>Faltar a la ceremonia.</strong> USCIS advierte que no presentarse más de una vez puede llevar a la denegación; la página de la ${h.a('us-oath', 'ceremonia de juramento')} explica cómo pedir otra fecha.</li>
</ul>
<p>Cada etapa tiene su página: el ${h.a('us-steps', 'proceso del N-400 de la presentación al juramento')}, el ${h.a('us-processing', 'tiempo de trámite')} y la ${h.a('us-oath', 'ceremonia')}.</p>`,
  },
});
