import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-eligibility',
  group: 'us',
  order: 100,
  tool: { kind: 'mini:uspresence' },
  related: ['us-n400', 'us-fee', 'us-which', 'us-test', 'us-exemptions', 'us-english'],
  sources: ['us_pm_d3', 'us_pm_d4', 'us_pm_g3', 'us_lpr5', 'us_n400'],
  en: {
    slug: 'naturalization-eligibility',
    nav: 'Naturalization eligibility: residence and presence',
    card: 'Continuous residence and physical presence explained: 913 days in 5 years or 548 in 3, trips of 6 months and of a year, and the spouse route, with a day-by-day check.',
    title: 'Naturalization Eligibility 2026: Residence and Presence',
    description: 'Naturalization eligibility in 2026: continuous residence and physical presence, 913 days in 5 years or 548 in 3, long trips abroad and the spouse route.',
    h1: 'Naturalization eligibility: continuous residence and physical presence',
    intro: 'Enter your whole days abroad for a quick count, then use the full calculator below with the dates of each trip, including the 3-year route for spouses of citizens.',
    resume: (h) => `Naturalization eligibility rests on two time rules that are often confused. Physical presence counts days: you must have been in the United States for at least ${h.P.us.n400.routes['5'].presenceMonths} months, which USCIS sets at ${h.num(h.P.us.n400.routes['5'].presenceDays)} days, during the five years before filing, or ${h.P.us.n400.routes['3'].presenceMonths} months (${h.num(h.P.us.n400.routes['3'].presenceDays)} days) during the three years before filing on the spouse route. Continuous residence looks at single trips: an absence of one year or more breaks it, and an absence of more than six months but less than a year is presumed to break it unless you show that you kept your job, your home and your ties. A person can meet one rule and fail the other: ten short trips of a month each leave continuous residence intact but eat into presence, while one trip of eight months raises the presumption even with plenty of days. Both are checked on the day USCIS receives your N-400, together with age ${h.P.us.n400.minAge}, ${h.P.us.n400.stateMonths} months in your state or district, and good moral character. The quick tool above estimates your days; the calculator below counts them trip by trip.`,
    faqs: (h) => [
      { q: 'What can rebut the presumption after a trip of more than six months?', a: 'The Policy Manual gives examples: you did not end your U.S. job or take a job abroad, your immediate family stayed in the United States, and you kept full access to a home you own or rent there. The list is not closed and the officer weighs the evidence case by case, so bring documents rather than explanations.' },
      { q: 'Does time before my green card count toward presence?', a: 'Not on these routes. Physical presence for naturalization is counted within the statutory period, which starts no earlier than the date you became a permanent resident. Years spent in the United States on a visa or in another status before the green card do not add days, unlike in some other countries.' },
      { q: 'How does the 3-year route for spouses work?', a: `You must have been a permanent resident for three years, married to and living with the same U.S. citizen spouse for those three years, with ${h.num(h.P.us.n400.routes['3'].presenceDays)} days of presence. The spouse must have been a citizen for the whole three years. If the marriage ends or you separate before you naturalize, the 3-year route is lost and the 5-year rules apply.` },
    ],
    body: (h) => `
<h2>The two rules side by side</h2>
${h.table(['', 'Physical presence', 'Continuous residence'], [['What it measures', 'total days in the United States', 'each trip outside the United States'], ['5-year route', `${h.num(h.P.us.n400.routes['5'].presenceDays)} days (${h.P.us.n400.routes['5'].presenceMonths} months) in 5 years`, 'no trip of 1 year or more'], ['3-year route', `${h.num(h.P.us.n400.routes['3'].presenceDays)} days (${h.P.us.n400.routes['3'].presenceMonths} months) in 3 years`, 'same'], ['Trip of more than 6 months (180 days), under 1 year', 'days count as absent', 'presumed break, can be rebutted'], ['Trip of 1 year (365 days) or more', 'days count as absent', `break: wait ${h.P.us.n400.afterBreakWait['5']} after return (3-year route: ${h.P.us.n400.afterBreakWait['3']})`], ['Departure and return days', 'count as days present', 'not absences']], `USCIS Policy Manual, volume 12, part D, chapters 3 and 4, read on ${h.date(h.P.us.retrieved_at)}.`, ['l', 'l', 'l'])}
<h2>Count your days trip by trip</h2>
<p>The calculator below is the full version of the tool at the top. It starts on the 3-year route for spouses of citizens; switch the first menu to the 5-year route if that is yours. Enter the date on your green card, your marriage date and every trip, past and planned.</p>
<!--tool:usdate|{"route":"3"}-->
<h2>After a long trip</h2>
<p>A trip of one year or more breaks continuous residence, and the clock restarts in practice: on the 5-year route you can apply ${h.P.us.n400.afterBreakWait['5']} after you come back, as long as you can overcome the presumption of a break, or 4 years and 6 months after you come back to avoid it altogether. On the 3-year route the figures are ${h.P.us.n400.afterBreakWait['3']} and 2 years and 6 months. The calculator applies the first figure and flags the presumption until the second.</p>
<p>Some people must leave for a year or more for qualifying work abroad, for the U.S. government or certain American employers and international organizations, for example. An approved Form N-470, Application to Preserve Residence for Naturalization Purposes, keeps their continuous residence. It does not count as physical presence, which still has to be met.</p>
<h2>A worked example of the presumption</h2>
<p>Maria, permanent resident since 2 February 2021, spent 7 months in her home country in 2023, from 1 March to 1 October. She has well over ${h.num(h.P.us.n400.routes['5'].presenceDays)} days of presence when she can first file, on the 90-day rule, in early November 2025. Her trip lasted 213 whole days, more than 180, so USCIS presumes a break in continuous residence. She kept her job, her husband and children stayed in the United States, and she kept her apartment: she can file and bring that evidence. Without it, she would have to wait until the trip leaves the statutory period or until the presumption no longer applies.</p>
<h2>Other conditions on the filing date</h2>
<ul>
<li><strong>Age:</strong> ${h.P.us.n400.minAge} or older.</li>
<li><strong>State or district:</strong> ${h.P.us.n400.stateMonths} months living in the state or USCIS district where you file.</li>
<li><strong>Good moral character:</strong> assessed over the statutory period and beyond if relevant; criminal records, unpaid taxes or false statements can lead to a denial.</li>
<li><strong>English and civics:</strong> tested at the interview, unless an exemption applies (see the ${h.a('us-exemptions', 'exemptions page')}).</li>
</ul>
<p>When all the dated conditions hold, the ${h.a('us-n400', 'N-400 page')} gives your filing date and the ${h.a('us-fee', 'fee page')} what you will pay.</p>`,
  },
  es: {
    slug: 'elegibilidad-para-la-ciudadania',
    nav: 'Elegibilidad: residencia y presencia',
    card: 'Residencia continua y presencia física explicadas: 913 días en 5 años o 548 en 3, viajes de 6 meses y de un año, la vía del cónyuge, con cálculo día por día.',
    title: 'Elegibilidad para la ciudadanía 2026: residencia continua',
    description: 'Elegibilidad para la ciudadanía en 2026: residencia continua y presencia física, 913 días en 5 años o 548 en 3, viajes largos y la vía del cónyuge, con cálculo.',
    h1: 'Elegibilidad para la ciudadanía: residencia continua y presencia física',
    intro: 'Indique sus días completos fuera del país para un cálculo rápido y use después la calculadora completa, con las fechas de cada viaje y la vía de 3 años para cónyuges.',
    resume: (h) => `La elegibilidad para la ciudadanía se apoya en dos reglas de tiempo que a menudo se confunden. La presencia física cuenta días: debe haber estado en Estados Unidos al menos ${h.P.us.n400.routes['5'].presenceMonths} meses, que USCIS fija en ${h.num(h.P.us.n400.routes['5'].presenceDays)} días, durante los cinco años anteriores a la presentación, o ${h.P.us.n400.routes['3'].presenceMonths} meses (${h.num(h.P.us.n400.routes['3'].presenceDays)} días) durante los tres años anteriores en la vía del cónyuge. La residencia continua mira cada viaje: una ausencia de un año o más la interrumpe, y una de más de seis meses y menos de un año se presume que la interrumpe, salvo que demuestre que mantuvo su empleo, su hogar y sus vínculos. Se puede cumplir una regla y no la otra: diez viajes cortos de un mes no tocan la residencia continua pero restan presencia, mientras que un solo viaje de ocho meses crea la presunción aunque sobren días. Las dos se comprueban el día en que USCIS recibe su N-400, junto con la edad de ${h.P.us.n400.minAge} años, ${h.P.us.n400.stateMonths} meses en su estado o distrito y el buen carácter moral. La herramienta rápida de arriba estima sus días; la calculadora de abajo los cuenta viaje por viaje.`,
    faqs: (h) => [
      { q: '¿Qué pruebas sirven tras un viaje de más de seis meses?', a: 'El Manual de Políticas da ejemplos: no dejó su empleo en Estados Unidos ni aceptó uno en el extranjero, su familia inmediata se quedó en Estados Unidos y conservó pleno acceso a una vivienda propia o alquilada allí. La lista no es cerrada y el oficial valora las pruebas caso por caso: lleve documentos, no solo explicaciones.' },
      { q: '¿Cuenta el tiempo anterior a la tarjeta verde?', a: 'No en estas vías. La presencia física para la naturalización se cuenta dentro del periodo legal, que empieza como muy pronto en la fecha en que se hizo residente permanente. Los años en Estados Unidos con visa o con otro estatus antes de la tarjeta verde no suman días.' },
      { q: '¿Cómo funciona la vía de 3 años para cónyuges?', a: `Debe llevar tres años como residente permanente, casado y viviendo con el mismo cónyuge ciudadano durante esos tres años, con ${h.num(h.P.us.n400.routes['3'].presenceDays)} días de presencia. El cónyuge debe haber sido ciudadano durante los tres años. Si el matrimonio termina o se separan antes de la naturalización, se pierde la vía de 3 años y se aplican las reglas de 5 años.` },
    ],
    body: (h) => `
<h2>Las dos reglas, una al lado de la otra</h2>
${h.table(['', 'Presencia física', 'Residencia continua'], [['Qué mide', 'el total de días en Estados Unidos', 'cada viaje fuera de Estados Unidos'], ['Vía de 5 años', `${h.num(h.P.us.n400.routes['5'].presenceDays)} días (${h.P.us.n400.routes['5'].presenceMonths} meses) en 5 años`, 'ningún viaje de 1 año o más'], ['Vía de 3 años', `${h.num(h.P.us.n400.routes['3'].presenceDays)} días (${h.P.us.n400.routes['3'].presenceMonths} meses) en 3 años`, 'igual'], ['Viaje de más de 6 meses (180 días) y menos de 1 año', 'los días cuentan como ausencia', 'interrupción presunta, se puede refutar'], ['Viaje de 1 año (365 días) o más', 'los días cuentan como ausencia', 'interrupción: esperar 4 años y 1 día tras el regreso (vía de 3 años: 2 años y 1 día)'], ['Días de salida y regreso', 'cuentan como presencia', 'no son ausencias']], `Manual de Políticas de USCIS, volumen 12, parte D, capítulos 3 y 4, leído el ${h.date(h.P.us.retrieved_at)}.`, ['l', 'l', 'l'])}
<h2>Cuente sus días viaje por viaje</h2>
<p>La calculadora de abajo es la versión completa de la herramienta del principio. Empieza en la vía de 3 años para cónyuges de ciudadanos; cambie el primer menú a la vía de 5 años si es la suya. Indique la fecha de su tarjeta verde, la de su matrimonio y cada viaje, pasado o previsto.</p>
<!--tool:usdate|{"route":"3"}-->
<h2>Después de un viaje largo</h2>
<p>Un viaje de un año o más interrumpe la residencia continua: en la vía de 5 años puede presentar 4 años y 1 día después de volver, si logra refutar la presunción de interrupción, o 4 años y 6 meses después para evitarla del todo. En la vía de 3 años las cifras son 2 años y 1 día y 2 años y 6 meses. La calculadora aplica la primera cifra y señala la presunción hasta la segunda.</p>
<p>Algunas personas deben irse un año o más por un empleo que cumple los requisitos, para el gobierno de Estados Unidos o ciertas empresas estadounidenses y organizaciones internacionales, por ejemplo. Un Formulario N-470 aprobado, Solicitud para Preservar la Residencia a Efectos de Naturalización, mantiene su residencia continua. No cuenta como presencia física, que se sigue exigiendo.</p>
<h2>Un ejemplo de la presunción</h2>
<p>María, residente permanente desde el 2 de febrero de 2021, pasó 7 meses en su país en 2023, del 1 de marzo al 1 de octubre. Tiene muchos más de ${h.num(h.P.us.n400.routes['5'].presenceDays)} días de presencia cuando puede presentar por primera vez, con la regla de 90 días, a principios de noviembre de 2025. Su viaje duró 213 días completos, más de 180, así que USCIS presume una interrupción de la residencia continua. Conservó su empleo, su esposo y sus hijos se quedaron en Estados Unidos y mantuvo su apartamento: puede presentar y llevar esas pruebas. Sin ellas, tendría que esperar a que el viaje salga del periodo legal o a que la presunción deje de aplicarse.</p>
<h2>Otras condiciones el día de la presentación</h2>
<ul>
<li><strong>Edad:</strong> ${h.P.us.n400.minAge} años o más.</li>
<li><strong>Estado o distrito:</strong> ${h.P.us.n400.stateMonths} meses viviendo en el estado o distrito de USCIS donde presenta.</li>
<li><strong>Buen carácter moral:</strong> se evalúa durante el periodo legal y antes si es pertinente; antecedentes penales, impuestos impagos o declaraciones falsas pueden llevar a una negación.</li>
<li><strong>Inglés y educación cívica:</strong> se examinan en la entrevista, salvo exención (vea la página de ${h.a('us-exemptions', 'exenciones')}).</li>
</ul>
<p>Cuando se cumplen todas las condiciones con fecha, la página del ${h.a('us-n400', 'Formulario N-400')} da su fecha de presentación y la de la ${h.a('us-fee', 'tarifa')} lo que pagará.</p>`,
  },
});
