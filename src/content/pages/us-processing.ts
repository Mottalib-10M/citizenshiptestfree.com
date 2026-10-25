import { definePage } from '../../lib/guide-types';

const PT = (h: { P: { us: { processing: unknown } } }) => h.P.us.processing as {
  dataAsOf: string; latestFy: string; latestFyFrom: string; latestFyTo: string; medianMonths: Record<string, number>;
  decisionDaysAfterInterview: number; fieldOffices: number;
};
const years = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

export default definePage({
  id: 'us-processing',
  group: 'us',
  order: 112,
  tool: { kind: 'usfrise', props: { variant: 'processing' } },
  related: ['us-steps', 'us-timeline', 'us-oath', 'us-n400', 'us-test', 'us-fee'],
  sources: ['us_hist_pt', 'us_egov_pt', 'us_pm_b4', 'us_fod', 'us_10steps'],
  en: {
    slug: 'n-400-processing-time',
    nav: 'N-400 processing time',
    card: 'How long USCIS takes to decide an N-400: the national median year by year, the figure for your field office, and the date your decision should come.',
    title: 'N-400 Processing Time 2026: Estimate Your Decision Date',
    description: 'N-400 processing time: the national median published by USCIS, how to read the time for your field office, and a tool that dates your decision and oath.',
    h1: 'N-400 processing time: when your decision should come',
    intro: 'Enter the date USCIS received your N-400. The timeline places each step on a calendar with the national median; the tool lower down takes the figure shown for your own field office.',
    resume: (h) => `N-400 processing time is the time USCIS takes from the day it receives your application to the day it decides it. USCIS publishes it in two ways. Its historical fact sheet gives one national median per fiscal year, the time within which half of all N-400s were completed: ${h.num(PT(h).medianMonths[PT(h).latestFy], 1)} months in fiscal year ${PT(h).latestFy} (data from ${h.date(PT(h).latestFyFrom)} to ${h.date(PT(h).latestFyTo)}), down from ${h.num(PT(h).medianMonths['2021'], 1)} months in 2021. Its online processing times tool gives a separate figure for each of its ${PT(h).fieldOffices} field offices, because the interview takes place in the office that serves your address and some offices carry heavier workloads than others. The timeline above counts the national median from your receipt date. For a closer estimate, open the official tool, choose Form N-400 and your field office, and type the number of months it shows into the calculator below. After the interview, the law adds a hard limit: USCIS has ${PT(h).decisionDaysAfterInterview} days to decide, or you may ask a federal district court to step in.`,
    faqs: (h) => [
      { q: 'Why is my field office slower than the national median?', a: `A median is a middle value: half of the applications nationwide were decided faster and half more slowly. Each of the ${PT(h).fieldOffices} USCIS field offices interviews the applicants who live in its area, and staffing and the number of pending cases differ from one office to another. The figure for your own office is the better guide, and it changes as the office clears its queue.` },
      { q: 'Where do I find the processing time for my office?', a: 'On the USCIS processing times tool: choose Form N-400, then the field office named on your notices, or the one that serves your address. The tool shows a time in months for that form and office. Type that number into the calculator on this page in place of the national median to date your own decision.' },
      { q: 'What if USCIS has not decided after my interview?', a: `The USCIS Policy Manual says the agency has ${PT(h).decisionDaysAfterInterview} days from the initial interview to issue a decision. Past that, you may ask a federal district court to review the application. Many applicants are told the result on the interview day, and some cases are continued for more evidence or a second test, which restarts part of the wait.` },
      { q: 'Does the processing time include the oath ceremony?', a: 'No. The published times run from receipt to the decision. If USCIS approves you, the oath may happen the same day as the interview when a ceremony is available, or later on the date of the Form N-445 notice. USCIS publishes no waiting time for ceremonies, so the timeline shows the oath as a milestone.' },
    ],
    body: (h) => `
<h2>The national median, year by year</h2>
${h.table(['Fiscal year', 'Median N-400 processing time'], years.map((y) => [y === PT(h).latestFy ? `${y} (to ${h.date(PT(h).latestFyTo)})` : y, `${h.num(PT(h).medianMonths[y], 1)} months`]), `USCIS fact sheet “Historical Processing Times Trends”, data as of ${h.date(PT(h).dataAsOf)}. A fiscal year runs from 1 October to 30 September.`, ['l', 'r'])}
<p>The series shows how much the wait moves. It rose to ${h.num(PT(h).medianMonths['2021'], 1)} months in 2021, when interviews and ceremonies slowed down, then fell back to ${h.num(PT(h).medianMonths['2023'], 1)} months in 2023 and ${h.num(PT(h).medianMonths['2024'], 1)} months in the first four months of fiscal year 2024. USCIS warns that its figures can differ from earlier reports after system updates, and that a median says nothing certain about one application. It is the best public benchmark, not a promise.</p>
<h2>Your own estimate, with your field office</h2>
<p>The national figure mixes fast and slow offices. To date your own decision, read the time for your field office on the ${h.src('us_egov_pt', 'USCIS processing times tool')} and enter it here. The calculator adds it to the date on your receipt notice. Months count as a twelfth of a year, so a time of 6 months from 2 March lands at the end of August.</p>
<!--tool:ustime|{"mode":"processing"}-->
<p>The tool never reads the USCIS site for you: the official tool does not allow automated reading, so the number you type is the one you saw, on the day you looked. Note that date, because offices update their figures as their queues change.</p>
<h2>What happens during the wait</h2>
<p>An N-400 is first handled centrally, then sent to the field office that will interview you. The ${h.src('us_fod', 'USCIS Field Operations Directorate')} describes this split: the National Benefits Center does the front-end processing of applications that need an interview, primarily N-400s and family-based green card cases, and the field offices hold the interviews. On your side, the visible steps are few: a receipt notice, a biometrics appointment if USCIS needs your fingerprints, and an interview notice. The ${h.a('us-steps', 'N-400 process page')} goes through each one.</p>
<h2>Three things that make the wait longer</h2>
<ul>
<li><strong>A continued case.</strong> If you fail the English or civics test, or a document is missing, the officer continues the case: a second interview for the test, usually ${h.P.us.english.retestDays[0]} to ${h.P.us.english.retestDays[1]} days later, or a request for evidence. Preparing with the ${h.a('us-test', 'mock citizenship test')} is the simplest way to avoid it.</li>
<li><strong>A move.</strong> Your case belongs to the office that serves your address. Report a change of address to USCIS within the time the law sets; the file may then move to another office with its own queue.</li>
<li><strong>A missed appointment.</strong> The Policy Manual says an applicant who misses the initial interview without good cause, and without telling USCIS within 30 days, abandons the application, which can be closed without a decision.</li>
</ul>
<h2>After the interview: the 120-day rule</h2>
<p>The ${h.src('us_pm_b4', 'USCIS Policy Manual')} gives the agency ${PT(h).decisionDaysAfterInterview} days from the initial interview to issue a decision. The officer may approve, continue or deny. If no decision is issued within that time, an applicant may ask a district court to review the case. The ${h.a('us-timeline', 'naturalization timeline')} adds this window to the years of residence before filing, and the ${h.a('us-oath', 'oath ceremony page')} explains what follows an approval.</p>`,
  },
  es: {
    slug: 'tiempo-de-tramite-n-400',
    nav: 'Tiempo de trámite del N-400',
    card: 'Cuánto tarda USCIS en decidir un N-400: la mediana nacional año por año, la cifra de su oficina y la fecha en que debería llegar su decisión.',
    title: 'Tiempo de trámite del N-400 2026: fecha de su decisión',
    description: 'Tiempo de trámite del N-400: la mediana nacional que publica USCIS, cómo leer el tiempo de su oficina y una herramienta que fecha su decisión y su juramento.',
    h1: 'Tiempo de trámite del N-400: cuándo llega la decisión',
    intro: 'Indique la fecha en que USCIS recibió su N-400. La línea de tiempo sitúa cada etapa en el calendario con la mediana nacional; la herramienta de más abajo usa la cifra de su propia oficina.',
    resume: (h) => `El tiempo de trámite del N-400 es el tiempo que USCIS tarda desde el día en que recibe su solicitud hasta el día en que la decide. USCIS lo publica de dos maneras. Su hoja informativa histórica da una mediana nacional por año fiscal, el tiempo en que se completó la mitad de los N-400: ${h.num(PT(h).medianMonths[PT(h).latestFy], 1)} meses en el año fiscal ${PT(h).latestFy} (datos del ${h.date(PT(h).latestFyFrom)} al ${h.date(PT(h).latestFyTo)}), frente a ${h.num(PT(h).medianMonths['2021'], 1)} meses en 2021. Su herramienta en línea da una cifra distinta para cada una de sus ${PT(h).fieldOffices} oficinas locales, porque la entrevista se hace en la oficina que corresponde a su domicilio y unas oficinas tienen más casos pendientes que otras. La línea de tiempo de arriba cuenta la mediana nacional desde su fecha de recibo. Para una estimación más cercana, abra la herramienta oficial, elija el Formulario N-400 y su oficina, y escriba los meses que muestra en la calculadora de abajo. Después de la entrevista, la ley pone un límite: USCIS tiene ${PT(h).decisionDaysAfterInterview} días para decidir, o usted puede pedir a un tribunal federal de distrito que intervenga.`,
    faqs: (h) => [
      { q: '¿Por qué mi oficina tarda más que la mediana nacional?', a: `Una mediana es un valor central: la mitad de las solicitudes del país se decidieron antes y la otra mitad después. Cada una de las ${PT(h).fieldOffices} oficinas locales de USCIS entrevista a quienes viven en su zona, y el personal y los casos pendientes cambian de una oficina a otra. La cifra de su oficina es la mejor guía, y varía a medida que la oficina avanza.` },
      { q: '¿Dónde encuentro el tiempo de trámite de mi oficina?', a: 'En la herramienta de tiempos de trámite de USCIS: elija el Formulario N-400 y luego la oficina que figura en sus avisos o la que corresponde a su domicilio. La herramienta muestra un tiempo en meses para ese formulario y esa oficina. Escriba ese número en la calculadora de esta página en lugar de la mediana nacional.' },
      { q: '¿Qué pasa si USCIS no decide después de mi entrevista?', a: `El Manual de Políticas de USCIS indica que la agencia tiene ${PT(h).decisionDaysAfterInterview} días desde la primera entrevista para dictar una decisión. Pasado ese plazo, puede pedir a un tribunal federal de distrito que revise la solicitud. Muchos solicitantes conocen el resultado el mismo día, y algunos casos se continúan para pedir pruebas o repetir un examen.` },
      { q: '¿El tiempo de trámite incluye la ceremonia de juramento?', a: 'No. Los tiempos publicados van del recibo a la decisión. Si USCIS le aprueba, el juramento puede ser el mismo día de la entrevista si hay ceremonia, o más tarde en la fecha del aviso N-445. USCIS no publica tiempos de espera para las ceremonias, por eso la línea de tiempo muestra el juramento como un hito.' },
    ],
    body: (h) => `
<h2>La mediana nacional, año por año</h2>
${h.table(['Año fiscal', 'Mediana del trámite del N-400'], years.map((y) => [y === PT(h).latestFy ? `${y} (hasta el ${h.date(PT(h).latestFyTo)})` : y, `${h.num(PT(h).medianMonths[y], 1)} meses`]), `Hoja informativa de USCIS sobre tendencias históricas de los tiempos de trámite, datos al ${h.date(PT(h).dataAsOf)}. El año fiscal va del 1 de octubre al 30 de septiembre.`, ['l', 'r'])}
<p>La serie muestra cuánto cambia la espera. Subió a ${h.num(PT(h).medianMonths['2021'], 1)} meses en 2021, cuando las entrevistas y las ceremonias se frenaron, y bajó a ${h.num(PT(h).medianMonths['2023'], 1)} meses en 2023 y a ${h.num(PT(h).medianMonths['2024'], 1)} meses en los cuatro primeros meses del año fiscal 2024. USCIS advierte que sus cifras pueden diferir de informes anteriores tras actualizaciones de sus sistemas, y que una mediana no dice nada seguro de una solicitud concreta. Es la mejor referencia pública, no una promesa.</p>
<h2>Su propia estimación, con su oficina</h2>
<p>La cifra nacional mezcla oficinas rápidas y lentas. Para fechar su decisión, lea el tiempo de su oficina en la ${h.src('us_egov_pt', 'herramienta de tiempos de trámite de USCIS')} y escríbalo aquí. La calculadora lo suma a la fecha de su aviso de recibo. Un mes cuenta como la doceava parte de un año, así que 6 meses desde el 2 de marzo llevan a finales de agosto.</p>
<!--tool:ustime|{"mode":"processing"}-->
<p>La herramienta no lee el sitio de USCIS por usted: la herramienta oficial no permite la lectura automática, así que el número que escribe es el que usted vio, el día en que lo consultó. Anote esa fecha, porque las oficinas actualizan sus cifras.</p>
<h2>Qué pasa durante la espera</h2>
<p>Un N-400 se trata primero de forma centralizada y luego pasa a la oficina que le entrevistará. La ${h.src('us_fod', 'Dirección de Operaciones de Campo de USCIS')} describe ese reparto: el Centro Nacional de Beneficios hace el trámite inicial de las solicitudes que requieren entrevista, sobre todo los N-400 y las tarjetas verdes por familia, y las oficinas locales hacen las entrevistas. Para usted, las etapas visibles son pocas: un aviso de recibo, una cita de datos biométricos si USCIS necesita sus huellas y un aviso de entrevista. La página del ${h.a('us-steps', 'proceso del N-400')} explica cada una.</p>
<h2>Tres cosas que alargan la espera</h2>
<ul>
<li><strong>Un caso continuado.</strong> Si no aprueba el examen de inglés o el cívico, o falta un documento, el oficial continúa el caso: una segunda cita para el examen, por lo general entre ${h.P.us.english.retestDays[0]} y ${h.P.us.english.retestDays[1]} días después, o una solicitud de pruebas. Prepararse con el ${h.a('us-test', 'examen de práctica')} es la forma más sencilla de evitarlo.</li>
<li><strong>Una mudanza.</strong> Su caso pertenece a la oficina de su domicilio. Comunique a USCIS su cambio de dirección en el plazo que fija la ley; el expediente puede pasar a otra oficina con su propia fila.</li>
<li><strong>Una cita perdida.</strong> El Manual de Políticas indica que quien no acude a la primera entrevista sin causa justificada, y sin avisar a USCIS en 30 días, abandona la solicitud, que puede cerrarse sin decisión.</li>
</ul>
<h2>Después de la entrevista: la regla de los 120 días</h2>
<p>El ${h.src('us_pm_b4', 'Manual de Políticas de USCIS')} da a la agencia ${PT(h).decisionDaysAfterInterview} días desde la primera entrevista para dictar una decisión. El oficial puede aprobar, continuar o denegar. Si no hay decisión en ese plazo, el solicitante puede pedir a un tribunal de distrito que revise el caso. El ${h.a('us-timeline', 'calendario de la naturalización')} suma esta ventana a los años de residencia previos, y la página de la ${h.a('us-oath', 'ceremonia de juramento')} explica lo que sigue a una aprobación.</p>`,
  },
});
