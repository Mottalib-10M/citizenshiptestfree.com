import { definePage } from '../../lib/guide-types';

type H = { P: { us: Record<string, any> } };
const PT = (h: H) => h.P.us.processing as { latestFy: string; medianMonths: Record<string, number>; decisionDaysAfterInterview: number; hearingRequestDays: number; hearingRequestDaysMailed: number; hearingScheduledDays: number; stepsReviewed: string };

export default definePage({
  id: 'us-steps',
  group: 'us',
  order: 116,
  tool: { kind: 'usfrise', props: { variant: 'steps' } },
  related: ['us-processing', 'us-timeline', 'us-oath', 'us-n400', 'us-which', 'us-fee'],
  sources: ['us_10steps', 'us_hist_pt', 'us_pm_b4', 'us_pm_b6', 'us_n400', 'us_ceremonies'],
  en: {
    slug: 'n-400-process',
    nav: 'N-400 process, filing to oath',
    card: 'Every step of naturalization after you file Form N-400: receipt notice, biometrics, interview and tests, decision, hearing if denied, oath and certificate.',
    title: 'N-400 Process 2026: Every Step From Filing to the Oath',
    description: 'N-400 process from filing to oath: receipt notice, biometrics, interview and tests, decision, hearing request if denied, ceremony and certificate, with dates.',
    h1: 'The N-400 process, from filing to the oath',
    intro: 'Enter the date on your receipt notice. The timeline shows each official step in order, with the national median processing time and the steps that have no published duration.',
    resume: (h) => `The N-400 process has the same official steps for everyone, set out by USCIS in its ten steps to naturalization (page reviewed ${h.date(PT(h).stepsReviewed)}). After checking that you are eligible, you file Form N-400 online or on paper and pay the fee; USCIS sends a receipt notice. If it needs your fingerprints, it sends a biometrics appointment. When the preliminary checks are done, it schedules an interview at your field office, where an officer reviews your application with you and gives the English and civics tests. The decision comes on Form N-652: granted, continued for evidence or a second test, or denied. If you are approved, you take the Oath of Allegiance at a ceremony, sometimes the same day, and receive your Certificate of Naturalization; you are a citizen only from the moment you take the oath. From receipt to decision, the national median was ${h.num(PT(h).medianMonths[PT(h).latestFy], 1)} months in fiscal year ${PT(h).latestFy}. The timeline above dates each step from your own receipt date.`,
    faqs: (h) => [
      { q: 'Do I always have a biometrics appointment?', a: 'Only if USCIS needs to take your fingerprints, photograph and signature. Its ten steps say “if applicable”: when it does, it mails an appointment notice with a date, time and place, usually an Application Support Center. Bring the notice and an identity document, and arrive at the time given.' },
      { q: 'What does a continued case mean?', a: `The officer could not decide at the interview: a document is missing, or you failed the English or civics test. USCIS then asks for evidence or schedules a second interview for the part you failed, usually ${h.P.us.english.retestDays[0]} to ${h.P.us.english.retestDays[1]} days later. Only the failed part is tested again.` },
      { q: 'Can I appeal if my N-400 is denied?', a: `You can ask for a hearing before another USCIS officer with Form N-336, within ${PT(h).hearingRequestDays} days after you receive the denial (${PT(h).hearingRequestDaysMailed} if it was mailed). USCIS schedules the hearing within ${PT(h).hearingScheduledDays} days. After that review, a federal district court can look at the case.` },
      { q: 'When exactly do I become a citizen?', a: 'At the moment you take the Oath of Allegiance at the ceremony, not when the N-400 is approved. USCIS says so in plain words: you are not a U.S. citizen until you take the oath. Your Certificate of Naturalization, handed over right after, is the proof; check it for errors before you leave.' },
    ],
    body: (h) => `
<h2>The ten official steps</h2>
<ol>
<li><strong>Check you are not already a citizen.</strong> Some people born abroad acquired citizenship at birth or through a parent; they need a certificate (${h.a('us-n600', 'Form N-600')}), not naturalization.</li>
<li><strong>Check you are eligible.</strong> Years as a permanent resident, physical presence, continuous residence, three months in your state, good moral character, English and civics. The ${h.a('us-n400', 'N-400 date calculator')} counts the dated conditions.</li>
<li><strong>Prepare Form N-400</strong> and the documents it asks for. Online filing needs a free USCIS account.</li>
<li><strong>File and pay.</strong> ${h.usd(h.P.us.fees.online)} online or ${h.usd(h.P.us.fees.paper)} on paper; see the ${h.a('us-fee', 'N-400 fee page')} for the reduced fee and the waiver. USCIS sends a receipt notice, which carries the date that decides your civics test version.</li>
<li><strong>Biometrics,</strong> if USCIS needs them.</li>
<li><strong>The interview,</strong> at your field office, with the English and civics tests: the ${h.a('us-interview', 'citizenship interview page')} lets you practise its N-400 questions.</li>
<li><strong>The decision</strong> on Form N-652: granted, continued or denied.</li>
<li><strong>The oath notice:</strong> a same-day ceremony when available, otherwise Form N-445 by mail.</li>
<li><strong>The Oath of Allegiance</strong> at the ceremony, where you hand in your green card and receive your certificate.</li>
<li><strong>Life as a citizen:</strong> passport, voter registration, Social Security record.</li>
</ol>
<p>The list follows the USCIS page ${h.src('us_10steps', '10 Steps to Naturalization')}; the wording here is ours.</p>
<h2>The forms and notices you will see</h2>
${h.table(['Step', 'Document', 'What it does'], [['Filing', 'Form N-400', `application, ${h.usd(h.P.us.fees.online)} online or ${h.usd(h.P.us.fees.paper)} on paper`], ['After filing', 'Receipt notice (Form I-797C)', 'proof of filing; its date sets your test version'], ['Interview result', 'Form N-652', 'granted, continued or denied'], ['If denied', 'Form N-336', `hearing request within ${PT(h).hearingRequestDays} days (${PT(h).hearingRequestDaysMailed} if mailed)`], ['Before the oath', 'Form N-445', 'ceremony notice and questionnaire'], ['After the oath', 'Certificate of Naturalization', 'proof of citizenship'], ['If lost', 'Form N-565', 'replacement certificate']], `USCIS pages on the N-400, the ten steps, ceremonies and the Policy Manual, read on ${h.date(h.P.us.retrieved_at)}.`, ['l', 'l', 'l'])}
<h2>Which civics test you will take</h2>
<p>The receipt date of step 4 also decides the version of the civics test at step 6. The diagram shows the rule.</p>
${h.us.svgVersions()}
<p>The ${h.a('us-which', 'version checker')} adds the age exemptions, and the ${h.a('us-test', 'mock interview')} uses the version you choose.</p>
<h2>The interview, in practice</h2>
<p>The officer goes through your N-400 with you: identity, addresses, trips, family, the moral character questions. Your answers to these questions are part of the English speaking test. You read one sentence aloud out of up to ${h.P.us.english.readingSentences}, write one out of up to ${h.P.us.english.writingSentences}, and answer civics questions until you reach the pass mark or the fail mark. The ${h.a('us-civics', 'civics test page')} explains the stop rule.</p>
<h2>If the answer is no</h2>
<p>A denial explains its reasons in writing. Within ${PT(h).hearingRequestDays} days after you receive it (${PT(h).hearingRequestDaysMailed} days if USCIS mailed it), you can file Form N-336 to ask for a hearing before a different officer, who can retest the parts you failed once. The ${h.src('us_pm_b6', 'Policy Manual')} sets the hearing within ${PT(h).hearingScheduledDays} days of a timely request. A new N-400 is the other route, with a new fee.</p>
<h2>Durations: what is published and what is not</h2>
<p>USCIS publishes a national median from receipt to decision, ${h.num(PT(h).medianMonths[PT(h).latestFy], 1)} months in fiscal year ${PT(h).latestFy}, and a time for each field office in its online tool; the ${h.a('us-processing', 'processing time page')} explains both. It publishes no time for the receipt notice, the biometrics appointment or the ceremony, so the timeline shows them as milestones. The one legal deadline inside the process is the ${PT(h).decisionDaysAfterInterview}-day limit for a decision after the interview, covered on the ${h.a('us-oath', 'oath ceremony page')} and in the ${h.a('us-timeline', 'naturalization timeline')}.</p>`,
  },
  es: {
    slug: 'proceso-del-n-400',
    nav: 'Proceso del N-400, del envío al juramento',
    card: 'Cada etapa de la naturalización tras presentar el Formulario N-400: aviso de recibo, biometría, entrevista y exámenes, decisión, audiencia, juramento y certificado.',
    title: 'Proceso del N-400 2026: pasos de la solicitud al juramento',
    description: 'Proceso del N-400 de la solicitud al juramento: aviso de recibo, biometría, entrevista y exámenes, decisión, audiencia si se deniega, ceremonia y certificado.',
    h1: 'El proceso del N-400, de la solicitud al juramento',
    intro: 'Indique la fecha de su aviso de recibo. La línea de tiempo muestra cada etapa oficial en orden, con la mediana nacional del trámite y las etapas que no tienen duración publicada.',
    resume: (h) => `El proceso del N-400 tiene las mismas etapas oficiales para todos, descritas por USCIS en sus diez pasos de la naturalización (página revisada el ${h.date(PT(h).stepsReviewed)}). Tras comprobar que cumple los requisitos, presenta el Formulario N-400 en línea o en papel y paga la tarifa; USCIS envía un aviso de recibo. Si necesita sus huellas, envía una cita de datos biométricos. Cuando terminan las verificaciones previas, programa una entrevista en su oficina local, donde un oficial revisa la solicitud con usted y hace los exámenes de inglés y cívico. La decisión llega en el Formulario N-652: aprobada, continuada para pedir pruebas o repetir un examen, o denegada. Si le aprueban, presta el Juramento de Lealtad en una ceremonia, a veces el mismo día, y recibe su Certificado de Naturalización; solo es ciudadano desde el momento del juramento. Del recibo a la decisión, la mediana nacional fue de ${h.num(PT(h).medianMonths[PT(h).latestFy], 1)} meses en el año fiscal ${PT(h).latestFy}. La línea de tiempo de arriba fecha cada etapa desde su propio recibo.`,
    faqs: (h) => [
      { q: '¿Siempre hay cita de datos biométricos?', a: 'Solo si USCIS necesita tomar sus huellas, su foto y su firma. Sus diez pasos dicen «si corresponde»: en ese caso envía un aviso con la fecha, la hora y el lugar, por lo general un Centro de Apoyo a Solicitantes. Lleve el aviso y un documento de identidad, y llegue a la hora indicada.' },
      { q: '¿Qué significa un caso continuado?', a: `El oficial no pudo decidir en la entrevista: falta un documento o no aprobó el examen de inglés o el cívico. USCIS pide pruebas o programa una segunda entrevista para la parte que no aprobó, por lo general entre ${h.P.us.english.retestDays[0]} y ${h.P.us.english.retestDays[1]} días después. Solo se repite la parte fallada.` },
      { q: '¿Puedo apelar si niegan mi N-400?', a: `Puede pedir una audiencia ante otro oficial de USCIS con el Formulario N-336, en los ${PT(h).hearingRequestDays} días siguientes a la recepción de la denegación (${PT(h).hearingRequestDaysMailed} si llegó por correo). USCIS fija la audiencia en un plazo de ${PT(h).hearingScheduledDays} días. Después de esa revisión, un tribunal federal de distrito puede examinar el caso.` },
      { q: '¿En qué momento exacto me hago ciudadano?', a: 'En el momento en que presta el Juramento de Lealtad en la ceremonia, no cuando se aprueba el N-400. USCIS lo dice claramente: no es ciudadano hasta que presta el juramento. El Certificado de Naturalización, que recibe justo después, es la prueba; revíselo antes de salir por si tiene errores.' },
    ],
    body: (h) => `
<h2>Los diez pasos oficiales</h2>
<ol>
<li><strong>Comprobar que no es ya ciudadano.</strong> Algunas personas nacidas en el extranjero adquirieron la ciudadanía al nacer o por un padre; necesitan un certificado, no la naturalización.</li>
<li><strong>Comprobar que cumple los requisitos.</strong> Años como residente permanente, presencia física, residencia continua, tres meses en su estado, buen carácter moral, inglés y educación cívica. La ${h.a('us-n400', 'calculadora del N-400')} cuenta las condiciones con fecha.</li>
<li><strong>Preparar el Formulario N-400</strong> y los documentos que pide. Para presentarlo en línea hace falta una cuenta gratuita de USCIS.</li>
<li><strong>Presentar y pagar.</strong> ${h.usd(h.P.us.fees.online)} en línea o ${h.usd(h.P.us.fees.paper)} en papel; vea la página de la ${h.a('us-fee', 'tarifa del N-400')} para la tarifa reducida y la exención. USCIS envía un aviso de recibo, cuya fecha decide la versión de su examen cívico.</li>
<li><strong>Datos biométricos,</strong> si USCIS los necesita.</li>
<li><strong>La entrevista,</strong> en su oficina local, con los exámenes de inglés y cívico: la página de la ${h.a('us-interview', 'entrevista de ciudadanía')} permite practicar sus preguntas del N-400.</li>
<li><strong>La decisión</strong> en el Formulario N-652: aprobada, continuada o denegada.</li>
<li><strong>El aviso de juramento:</strong> una ceremonia el mismo día si la hay; si no, el Formulario N-445 por correo.</li>
<li><strong>El Juramento de Lealtad</strong> en la ceremonia, donde entrega su tarjeta verde y recibe su certificado.</li>
<li><strong>La vida como ciudadano:</strong> pasaporte, inscripción para votar, registro del Seguro Social.</li>
</ol>
<p>La lista sigue la página de USCIS ${h.src('us_10steps', '10 Steps to Naturalization')}; la redacción es nuestra.</p>
<h2>Los formularios y avisos que verá</h2>
${h.table(['Etapa', 'Documento', 'Para qué sirve'], [['Presentación', 'Formulario N-400', `solicitud, ${h.usd(h.P.us.fees.online)} en línea o ${h.usd(h.P.us.fees.paper)} en papel`], ['Tras presentar', 'Aviso de recibo (Formulario I-797C)', 'prueba de la presentación; su fecha fija la versión del examen'], ['Resultado de la entrevista', 'Formulario N-652', 'aprobada, continuada o denegada'], ['Si se deniega', 'Formulario N-336', `audiencia en ${PT(h).hearingRequestDays} días (${PT(h).hearingRequestDaysMailed} si llegó por correo)`], ['Antes del juramento', 'Formulario N-445', 'aviso de ceremonia y cuestionario'], ['Después del juramento', 'Certificado de Naturalización', 'prueba de la ciudadanía'], ['Si se pierde', 'Formulario N-565', 'certificado de reemplazo']], `Páginas de USCIS sobre el N-400, los diez pasos, las ceremonias y el Manual de Políticas, leídas el ${h.date(h.P.us.retrieved_at)}.`, ['l', 'l', 'l'])}
<h2>Qué examen cívico le tocará</h2>
<p>La fecha de recibo del paso 4 decide también la versión del examen cívico del paso 6. El esquema muestra la regla.</p>
${h.us.svgVersions()}
<p>El ${h.a('us-which', 'verificador de versión')} añade las exenciones por edad, y la ${h.a('us-test', 'entrevista de práctica')} usa la versión que usted elija.</p>
<h2>La entrevista, en la práctica</h2>
<p>El oficial repasa con usted su N-400: identidad, domicilios, viajes, familia y las preguntas de carácter moral. Sus respuestas forman parte del examen oral de inglés. Lee en voz alta una oración de hasta ${h.P.us.english.readingSentences}, escribe una de hasta ${h.P.us.english.writingSentences} y responde preguntas cívicas hasta alcanzar el mínimo para aprobar o el límite de errores. La página del ${h.a('us-civics', 'examen cívico')} explica la regla de parada.</p>
<h2>Si la respuesta es no</h2>
<p>Una denegación explica sus motivos por escrito. En los ${PT(h).hearingRequestDays} días siguientes a su recepción (${PT(h).hearingRequestDaysMailed} días si USCIS la envió por correo), puede presentar el Formulario N-336 para pedir una audiencia ante otro oficial, que puede repetir una vez los exámenes que no aprobó. El ${h.src('us_pm_b6', 'Manual de Políticas')} fija la audiencia en los ${PT(h).hearingScheduledDays} días siguientes a una solicitud presentada a tiempo. La otra vía es un nuevo N-400, con una nueva tarifa.</p>
<h2>Duraciones: lo que se publica y lo que no</h2>
<p>USCIS publica una mediana nacional del recibo a la decisión, ${h.num(PT(h).medianMonths[PT(h).latestFy], 1)} meses en el año fiscal ${PT(h).latestFy}, y un tiempo por oficina en su herramienta en línea; la página del ${h.a('us-processing', 'tiempo de trámite')} explica ambos. No publica tiempos para el aviso de recibo, la cita biométrica ni la ceremonia, por eso la línea de tiempo los muestra como hitos. El único plazo legal dentro del proceso es el límite de ${PT(h).decisionDaysAfterInterview} días para decidir tras la entrevista, que tratan la página de la ${h.a('us-oath', 'ceremonia de juramento')} y el ${h.a('us-timeline', 'calendario de la naturalización')}.</p>`,
  },
});
