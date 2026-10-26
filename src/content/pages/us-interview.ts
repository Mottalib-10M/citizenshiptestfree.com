import { definePage } from '../../lib/guide-types';
import { N400_INTERVIEW } from '../../data/us-n400-interview';
const NQ = N400_INTERVIEW.length;

export default definePage({
  id: 'us-interview',
  group: 'us',
  order: 115,
  tool: { kind: 'usinterview' },
  mini: { kind: 'mini:uspass' },
  related: ['us-test', 'us-english', 'us-steps', 'us-oath', 'us-exemptions', 'us-n648'],
  sources: ['us_interview', 'us_pm_b3', 'us_n400_pdf', 'us_n400_instr', 'us_g1055'],
  en: {
    slug: 'citizenship-interview',
    nav: 'Citizenship interview and N-400 questions',
    card: 'How the naturalization interview runs, the yes/no questions of Form N-400 the officer asks again under oath, and a practice round with the form’s own key words.',
    title: 'Citizenship Interview 2026: N-400 Questions and Practice',
    description: 'Citizenship interview: how the USCIS officer runs it, the real yes/no N-400 interview questions with the form’s key words, and a practice round to answer aloud.',
    h1: 'Citizenship interview: the N-400 questions, then the tests',
    intro: 'Answer the Part 9 questions of Form N-400 the way you will at the interview: aloud, in English, under oath. The tool counts the answers you will have to explain.',
    resume: (h) => `The citizenship interview, or naturalization interview, is the meeting at a USCIS office where an officer places you under oath, reviews your Form N-400 answer by answer and gives the English and civics tests. The officer asks again the questions you answered in writing: your names, addresses, work, trips abroad, marriages and children, then the yes/no questions of Part 9 about voting, taxes, arrests, military service and the oath. Your written answers are signed under penalty of perjury, and the officer can correct them with you, take a sworn statement or ask for documents. The civics test then asks up to ${h.P.us.test2025.asked} questions of the 2025 list, with ${h.P.us.test2025.passCorrect} right answers to pass, and the English test asks you to read one sentence out of three and write one out of three. You get two attempts: a part you fail is retested ${h.P.us.english.retestDays[0]} to ${h.P.us.english.retestDays[1]} days later. At the end the officer hands you Form N-652 with the result. The practice above uses ${NQ} real Part 9 questions, as printed on the January 2025 edition of the form.`,
    faqs: (h) => [
      { q: 'Can I ask the officer to repeat or rephrase a question?', a: 'Yes. Understanding spoken English is part of what the officer checks, so asking politely for a repetition is normal and does not fail you on its own. Say “Could you repeat the question, please?” rather than guessing. If you still do not understand a word, the officer may rephrase it, which is why the form prints plain explanations in parentheses next to the hardest terms.' },
      { q: 'What does Form N-652 tell me after the interview?', a: `N-652, Naturalization Interview Results, is the sheet the officer gives you at the end. It says whether you passed the English and civics tests and whether your case is recommended for approval, continued (for example to send more documents or to retest) or denied. A continued case usually means a second appointment; a retest is set ${h.P.us.english.retestDays[0]} to ${h.P.us.english.retestDays[1]} days after the first interview.` },
      { q: 'What if my application is denied after the interview?', a: `You can ask for a hearing before another USCIS officer with Form N-336, filed within ${h.P.us.processing.hearingRequestDays} days of the denial notice (${h.P.us.processing.hearingRequestDaysMailed} if it came by mail). The fee is ${h.usd(h.P.us.forms.n336.online)} online or ${h.usd(h.P.us.forms.n336.paper)} on paper in the current USCIS fee schedule. An attorney or accredited representative can tell you whether a hearing or a new N-400 suits your case better.` },
      { q: 'Should I bring a lawyer to the citizenship interview?', a: 'It is your choice. USCIS lets you come with an attorney or an accredited representative, who files Form G-28 and may advise you, but may not answer the officer’s questions for you. Applicants with arrests, long trips, tax debts or immigration problems in their past are the ones who most often hire one; others usually go alone.' },
    ],
    body: (h) => `
<h2>How the interview runs, step by step</h2>
<ol>
<li><strong>Check-in and oath.</strong> You show your appointment notice and identity document. The officer introduces themself, explains the interview and places you under oath before any question.</li>
<li><strong>Review of the N-400.</strong> The officer goes through your application: names, addresses, employers, trips, marital history, children. Every change since filing is corrected on the form with you.</li>
<li><strong>Part 9 questions.</strong> The yes/no questions on good moral character, security and the oath, practised above. A “Yes” leads to follow-up questions and documents.</li>
<li><strong>English test.</strong> Speaking is judged from the whole conversation; you read one sentence out of three and write one out of three correctly.</li>
<li><strong>Civics test.</strong> Up to ${h.P.us.test2025.asked} questions read aloud from the list of ${h.us.n25}, stopped at ${h.P.us.test2025.passCorrect} right or ${h.P.us.test2025.failWrong} wrong (2008 version: up to ${h.P.us.test2008.asked} of ${h.us.n08}, ${h.P.us.test2008.passCorrect} to pass).</li>
<li><strong>Signatures and result.</strong> You sign Part 15 (signature at interview) and Part 16, which only says you have no objection to the oath. The officer gives you Form N-652.</li>
</ol>
<p>The order can change: some officers start with the tests. The ${h.a('us-test', 'mock civics interview')} trains the stop rule, and the ${h.a('us-english', 'English test practice')} uses the official reading and writing vocabulary.</p>
<h2>The N-400 interview questions that matter most</h2>
<p>Part 9 of the form groups the questions that decide good moral character and attachment to the Constitution. The word “EVER” means anywhere in the world and at any time, unless the question limits it. Here is how the official instructions describe each group:</p>
${h.table(['Part 9 items', 'Subject', 'What the instructions say'], [['1 to 2', 'Claims to citizenship, voting', 'A false claim or unlawful vote may make you ineligible; a lawful vote in a local election open to aliens is not counted.'], ['3 to 4', 'Taxes', 'Overdue taxes call for IRS transcripts and a signed payment agreement.'], ['5 to 14', 'Groups, weapons, military units', 'Membership or service must be explained with country, unit, rank and dates.'], ['15 to 16', 'Crimes and arrests', 'Every offense is listed, even sealed or expunged; bring originals or court-certified copies.'], ['17 to 21', 'Other conduct, removal', 'Each “Yes” is explained in Part 14 with evidence.'], ['22 to 29', 'Selective Service, U.S. military', 'Men who lived in the U.S. between 18 and 26 answer about registration.'], ['30 to 37', 'Titles, Constitution, oath', 'A “No” sends you to the Oath of Allegiance section of the instructions.']], `Form N-400 and its instructions, edition 01/20/25, read on ${h.date(h.P.us.forms.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>The answers on your form are the ones the officer expects to hear again. A different answer at the interview is not a problem in itself if you explain it, but an answer that hides something can be treated as false testimony, which is far more serious than the fact it hides.</p>
<h2>How to practise the questions</h2>
<p>Read each question aloud, answer with a full sentence (“No, I have not.” or “Yes, I have.”), then check the key word if the form explains one. Many applicants know the answer but stumble on a word such as “incited”, “bear arms” or “noncombatant”: the form itself gives the plain meaning in parentheses, and the officer may ask what it means. Practise with someone who reads the question at normal speed, without showing you the text. The practice tool keeps your answers in your browser only.</p>
<h2>What to bring</h2>
<ul>
<li>The interview notice and an identity document: the notice lists the papers USCIS wants to see in your case.</li>
<li>For any arrest or offense: originals or court-certified copies of the records, as the instructions require.</li>
<li>For overdue taxes: IRS transcripts and the payment agreement. The instructions also advise bringing tax transcripts if you made a trip of more than six months.</li>
<li>For a “Yes” anywhere in Part 9: the evidence that supports your explanation in Part 14.</li>
</ul>
<h2>After the interview</h2>
<p>If the officer recommends approval, the oath ceremony is sometimes held the same day and more often scheduled later; the ${h.a('us-oath', 'oath ceremony page')} explains it. USCIS has ${h.P.us.processing.decisionDaysAfterInterview} days after the first interview to decide. A medical condition that prevents you from learning English or civics is handled with ${h.a('us-n648', 'Form N-648')}, filed with the N-400. The full order of steps is on the ${h.a('us-steps', 'N-400 process page')}.</p>`,
  },
  es: {
    slug: 'entrevista-de-ciudadania',
    nav: 'Entrevista de ciudadanía y preguntas del N-400',
    card: 'Cómo transcurre la entrevista de naturalización, las preguntas de sí o no del Formulario N-400 que el oficial repite bajo juramento y una práctica en inglés.',
    title: 'Entrevista de ciudadanía 2026: preguntas del N-400 en inglés',
    description: 'Entrevista de ciudadanía: cómo la hace el oficial de USCIS, las preguntas reales de sí o no del N-400 en inglés con su traducción y una práctica en voz alta.',
    h1: 'Entrevista de ciudadanía: las preguntas del N-400 y los exámenes',
    intro: 'Responda las preguntas de la Parte 9 del Formulario N-400 como en la entrevista: en voz alta, en inglés y bajo juramento. La herramienta cuenta las respuestas que tendrá que explicar.',
    resume: (h) => `La entrevista de ciudadanía, o entrevista de naturalización, es la cita en una oficina de USCIS en la que un oficial le toma juramento, revisa su Formulario N-400 respuesta por respuesta y le hace los exámenes de inglés y de educación cívica. El oficial vuelve a preguntar lo que usted respondió por escrito: nombres, direcciones, trabajos, viajes, matrimonios e hijos, y luego las preguntas de sí o no de la Parte 9 sobre el voto, los impuestos, los arrestos, el servicio militar y el juramento. Todo se hace en inglés, salvo exención por edad o discapacidad. Sus respuestas escritas están firmadas bajo pena de perjurio, y el oficial puede corregirlas con usted, tomar una declaración jurada o pedir documentos. El examen cívico hace hasta ${h.P.us.test2025.asked} preguntas de la lista de 2025, con ${h.P.us.test2025.passCorrect} correctas para aprobar, y el de inglés pide leer una oración de tres y escribir una de tres. Hay dos intentos: la parte reprobada se repite entre ${h.P.us.english.retestDays[0]} y ${h.P.us.english.retestDays[1]} días después. Al final el oficial entrega el Formulario N-652 con el resultado. La práctica de arriba usa ${NQ} preguntas reales de la Parte 9, en inglés y con traducción.`,
    faqs: (h) => [
      { q: '¿Puedo pedir al oficial que repita una pregunta?', a: 'Sí. Entender el inglés hablado forma parte de lo que se evalúa, así que pedir con cortesía que repita es normal y no le hace reprobar por sí solo. Diga «Could you repeat the question, please?» en lugar de adivinar. Si una palabra sigue sin entenderse, el oficial puede reformular la pregunta; por eso el formulario explica entre paréntesis los términos más difíciles.' },
      { q: '¿Qué dice el Formulario N-652 que me dan al final?', a: `El N-652, resultados de la entrevista de naturalización, indica si aprobó los exámenes de inglés y de educación cívica y si su caso queda recomendado para aprobación, aplazado (para enviar documentos o repetir un examen) o negado. Un caso aplazado suele implicar una segunda cita; la repetición del examen se fija entre ${h.P.us.english.retestDays[0]} y ${h.P.us.english.retestDays[1]} días después de la primera entrevista.` },
      { q: '¿Qué hago si niegan mi solicitud después de la entrevista?', a: `Puede pedir una audiencia ante otro oficial de USCIS con el Formulario N-336, dentro de los ${h.P.us.processing.hearingRequestDays} días siguientes a la notificación de la negación (${h.P.us.processing.hearingRequestDaysMailed} si llegó por correo). La tarifa es de ${h.usd(h.P.us.forms.n336.online)} en línea o ${h.usd(h.P.us.forms.n336.paper)} en papel según la tabla vigente. Un abogado o representante acreditado puede decirle si conviene más la audiencia o un nuevo N-400.` },
      { q: '¿Debo ir con un abogado a la entrevista?', a: 'Es su decisión. USCIS permite ir con un abogado o un representante acreditado, que presenta el Formulario G-28 y puede aconsejarle, pero no puede responder por usted las preguntas del oficial. Suelen contratarlo quienes tienen arrestos, viajes largos, deudas de impuestos o problemas migratorios en su pasado; los demás van solos en general.' },
    ],
    body: (h) => `
<h2>Cómo transcurre la entrevista, paso a paso</h2>
<ol>
<li><strong>Llegada y juramento.</strong> Presenta la carta de cita y su identificación. El oficial se presenta, explica la entrevista y le toma juramento antes de cualquier pregunta.</li>
<li><strong>Revisión del N-400.</strong> El oficial repasa su solicitud: nombres, direcciones, empleadores, viajes, historial matrimonial, hijos. Cada cambio desde la presentación se corrige con usted en el formulario.</li>
<li><strong>Preguntas de la Parte 9.</strong> Las preguntas de sí o no sobre buen carácter moral, seguridad y juramento, que se practican arriba. Un «Sí» lleva a otras preguntas y a pedir documentos.</li>
<li><strong>Examen de inglés.</strong> La conversación entera sirve para evaluar cómo habla; además debe leer bien una oración de tres y escribir bien una de tres.</li>
<li><strong>Examen cívico.</strong> Hasta ${h.P.us.test2025.asked} preguntas leídas en voz alta de la lista de ${h.us.n25}; el oficial se detiene con ${h.P.us.test2025.passCorrect} correctas o ${h.P.us.test2025.failWrong} incorrectas (versión 2008: hasta ${h.P.us.test2008.asked} de ${h.us.n08}, ${h.P.us.test2008.passCorrect} para aprobar).</li>
<li><strong>Firmas y resultado.</strong> Firma la Parte 15 (firma en la entrevista) y la Parte 16, que solo indica que no se opone al juramento. El oficial le entrega el Formulario N-652.</li>
</ol>
<p>El orden puede variar: algunos oficiales empiezan por los exámenes. El ${h.a('us-test', 'examen cívico de práctica')} entrena la regla de parada, y la ${h.a('us-english', 'práctica del examen de inglés')} usa el vocabulario oficial de lectura y escritura.</p>
<h2>Las preguntas del N-400 que más cuentan</h2>
<p>La Parte 9 del formulario reúne las preguntas que deciden el buen carácter moral y el apego a la Constitución. La palabra «EVER» (alguna vez) significa en cualquier lugar del mundo y en cualquier momento, salvo que la pregunta lo limite. Así describen las instrucciones oficiales cada grupo:</p>
${h.table(['Puntos de la Parte 9', 'Tema', 'Lo que dicen las instrucciones'], [['1 a 2', 'Declararse ciudadano, votar', 'Una declaración falsa o un voto ilegal pueden impedir la naturalización; votar legalmente en una elección local abierta a extranjeros no cuenta.'], ['3 a 4', 'Impuestos', 'Con impuestos atrasados se piden las transcripciones del IRS y un acuerdo de pago firmado.'], ['5 a 14', 'Grupos, armas, unidades militares', 'La pertenencia o el servicio se explican con el país, la unidad, el grado y las fechas.'], ['15 a 16', 'Delitos y arrestos', 'Se declara toda infracción, aunque el expediente esté sellado o borrado; lleve originales o copias certificadas.'], ['17 a 21', 'Otras conductas, deportación', 'Cada «Sí» se explica en la Parte 14 con pruebas.'], ['22 a 29', 'Servicio Selectivo, ejército de EE. UU.', 'Los hombres que vivieron en EE. UU. entre los 18 y los 26 años responden sobre su inscripción.'], ['30 a 37', 'Títulos, Constitución, juramento', 'Un «No» remite a la sección del Juramento de Lealtad de las instrucciones.']], `Formulario N-400 e instrucciones, edición 01/20/25, leídos el ${h.date(h.P.us.forms.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>Las respuestas de su formulario son las que el oficial espera volver a oír. Una respuesta distinta en la entrevista no es un problema en sí si la explica, pero una respuesta que oculta algo puede tratarse como un testimonio falso, mucho más grave que el hecho ocultado.</p>
<h2>Cómo practicar las preguntas en inglés</h2>
<p>Lea cada pregunta en voz alta, en inglés, responda con una frase completa («No, I have not.» o «Yes, I have.») y revise la palabra clave si el formulario la explica. Muchos solicitantes saben la respuesta pero se traban con palabras como «incited», «bear arms» o «noncombatant»: el formulario da su sentido sencillo entre paréntesis, y el oficial puede preguntar qué significan. Practique con alguien que lea la pregunta a velocidad normal, sin mostrarle el texto. La traducción al español sirve para entender; en la entrevista la pregunta llega en inglés. Las respuestas que marca en la herramienta se quedan en su navegador.</p>
<h2>Qué llevar</h2>
<ul>
<li>La carta de cita y una identificación: la carta indica los papeles que USCIS quiere ver en su caso.</li>
<li>Para cualquier arresto o infracción: originales o copias certificadas por el tribunal, como exigen las instrucciones.</li>
<li>Para impuestos atrasados: transcripciones del IRS y el acuerdo de pago. Las instrucciones aconsejan también llevar las transcripciones si hizo un viaje de más de seis meses.</li>
<li>Para cualquier «Sí» en la Parte 9: las pruebas que sostienen su explicación de la Parte 14.</li>
</ul>
<h2>Después de la entrevista</h2>
<p>Si el oficial recomienda la aprobación, la ceremonia de juramento a veces se hace el mismo día y más a menudo en otra fecha; la página de la ${h.a('us-oath', 'ceremonia de juramento')} la explica. USCIS tiene ${h.P.us.processing.decisionDaysAfterInterview} días después de la primera entrevista para decidir. Una afección médica que impide aprender inglés o educación cívica se presenta con el Formulario N-648, junto con el N-400. El orden completo está en la página del ${h.a('us-steps', 'proceso del N-400')}.</p>`,
  },
});
