import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-2008',
  group: 'us',
  order: 40,
  tool: { kind: 'usquiz', props: { version: '2008', mode: 'exam' } },
  related: ['us-which', 'us-questions', 'us-civics', 'us-exemptions', 'us-test', 'us-practice'],
  sources: ['us_100', 'us_100_es', 'us_updates', 'us_study', 'us_fr_notice'],
  en: {
    slug: '100-civics-questions',
    nav: '100 civics questions (2008 test)',
    card: 'The 2008 civics test for N-400s filed before 20 October 2025: the 100 official questions, up to 10 asked, 6 right to pass, with a mock test.',
    title: '100 Civics Questions 2026: The 2008 Test, 6 Right to Pass',
    description: '100 civics questions of the 2008 test, still used for N-400s filed before 20 October 2025: up to 10 asked, 6 right to pass, current answers and a mock test.',
    h1: '100 civics questions: the 2008 test, still in use',
    intro: 'Filed your N-400 before 20 October 2025? Your interview uses the 2008 list. The mock test below asks up to 10 of its questions and stops at 6 right or 5 wrong.',
    resume: (h) => `The 100 civics questions are the 2008 version of the naturalization civics test, and they have not disappeared: USCIS still uses them for every applicant whose Form N-400 was received before ${h.date(h.P.us.cutoff)}, including at interviews and retests held in 2026. The officer asks up to ${h.P.us.test2008.asked} questions from the list of ${h.us.n08} and you pass with ${h.P.us.test2008.passCorrect} right answers; the test ends as soon as you reach ${h.P.us.test2008.passCorrect} right or ${h.P.us.test2008.failWrong} wrong. The list is grouped under American government, American history and integrated civics, in ${h.us.themes08.length} themes, and a few answers change with elections: the President, the Vice President, the Speaker, the Chief Justice and the President's party. USCIS keeps those on its test updates page, and the questions here already carry them. Applicants who filed on or after the cut-off date study the 2025 list of ${h.us.n25} questions instead. The mock test above draws from the 2008 list only, so the score you see matches the test you will take.`,
    faqs: (h) => [
      { q: 'I filed in September 2025 but my interview is in 2026. Which test?', a: `The 2008 test. The version follows the date USCIS received your N-400, and ${h.date(h.P.us.cutoff)} is the first day of the 2025 test. An application received before it keeps the 2008 list for the interview and for any retest, however late the appointment comes.` },
      { q: 'Are the 100 questions the same as the first 100 of the 2025 list?', a: `No. The 2025 list rewords many of the old questions, splits some, removes a few and adds new ones, and the numbering is different. Studying the wrong list wastes time and can teach you answers worded differently from the ones your officer expects, so check your filing date first.` },
      { q: 'Which 2008 answers have changed since the list was printed?', a: `Five questions depend on who holds office: the President, the Vice President, the Speaker of the House, the Chief Justice and the political party of the President. The list itself sends you to the USCIS test updates page for them. We use the names shown there when we checked it on ${h.date(h.P.us.retrieved_at)}. The number of Supreme Court justices, nine, is also listed there.` },
    ],
    body: (h) => `
<h2>The 2008 test in figures</h2>
${h.table(['Rule', '2008 test'], [['Who takes it', `N-400 received before ${h.date(h.P.us.cutoff)}`], ['Official list', `${h.us.n08} questions`], ['Questions asked', `up to ${h.P.us.test2008.asked}`], ['Right answers to pass', h.P.us.test2008.passCorrect], ['Officer stops at', `${h.P.us.test2008.passCorrect} right or ${h.P.us.test2008.failWrong} wrong`], ['65/20 applicants', `20 starred questions, up to ${h.P.us.s6520.asked} asked, ${h.P.us.s6520.passCorrect} to pass`]], `USCIS, read on ${h.date(h.P.us.retrieved_at)}.`, ['l', 'l'])}
<h2>The ${h.us.themes08.length} themes of the 100 questions</h2>
${h.table(['Theme', 'Questions'], h.us.themes08.map((t, i) => [t, h.us.inTheme('2008', i)]), undefined, ['l', 'r'])}
<p>The “System of Government” theme alone holds ${h.us.inTheme('2008', 1)} of the ${h.us.n08} questions. With only ${h.P.us.test2008.asked} questions asked, chance plays a bigger part than in 2025: two people can get very different draws. The safest plan is still to learn the whole list.</p>
<h2>Every question with its answers</h2>
<p>The list below shows the 2008 questions theme by theme with the answers USCIS accepts. Open a question after you have answered it in your head.</p>
<!--tool:usbank|{"version":"2008","theme":0}-->
<h2>Questions often missed on the 2008 list</h2>
<ul>
${[12, 49, 50, 66, 93].map((n) => { const x = h.us.q('2008', n); return `<li><strong>${x.en.q}</strong> ${x.en.a.join('; ')}.</li>`; }).join('\n')}
</ul>
<p>Questions 49 and 50 look alike and are easy to swap: serving on a jury is a responsibility, running for federal office is a right, and voting in a federal election answers both.</p>
<h2>What happens if your interview moves</h2>
<p>A rescheduled interview, a request for more evidence or a retest after a first failure does not change the version: the date that counts is the day USCIS received your N-400. If you withdraw and file a new N-400 after ${h.date(h.P.us.cutoff)}, the new application takes the ${h.a('us-civics', '2025 civics test')}. Not sure of your date? Your receipt notice (Form I-797C) shows it as the received date, and the ${h.a('us-which', 'version checker')} turns it into the right test.</p>
<h2>In Spanish</h2>
<p>USCIS publishes an official Spanish translation of the 100 questions. Our Spanish page uses it word for word, with the English question beside it. Remember that the interview itself is in English unless you qualify for an age exemption, as explained on the ${h.a('us-exemptions', 'exemptions page')}.</p>`,
  },
  es: {
    slug: '100-preguntas-civicas',
    nav: '100 preguntas cívicas (examen 2008)',
    card: 'El examen cívico de 2008 para los N-400 presentados antes del 20 de octubre de 2025: las 100 preguntas en la traducción oficial de USCIS.',
    title: '100 preguntas cívicas 2026 en español: examen de 2008',
    description: 'Las 100 preguntas cívicas de 2008 en la traducción oficial de USCIS, para los N-400 presentados antes del 20 de octubre de 2025: 10 preguntas, 6 para aprobar.',
    h1: '100 preguntas cívicas en español: el examen de 2008',
    intro: '¿Presentó su N-400 antes del 20 de octubre de 2025? Su entrevista usa la lista de 2008. La práctica de abajo hace hasta 10 preguntas y se detiene con 6 correctas o 5 incorrectas.',
    resume: (h) => `Las 100 preguntas cívicas son la versión de 2008 del examen de educación cívica de la naturalización, y siguen vigentes: USCIS las usa para todo solicitante cuyo Formulario N-400 se recibió antes del ${h.date(h.P.us.cutoff)}, también en entrevistas y segundas oportunidades de 2026. El oficial hace hasta ${h.P.us.test2008.asked} preguntas de la lista de ${h.us.n08} y se aprueba con ${h.P.us.test2008.passCorrect} correctas; el examen termina en cuanto usted llega a ${h.P.us.test2008.passCorrect} correctas o a ${h.P.us.test2008.failWrong} incorrectas. A diferencia de la lista de 2025, esta tiene una traducción oficial al español publicada por USCIS, que es la que mostramos palabra por palabra junto a la pregunta en inglés. La lista se agrupa en gobierno, historia y educación cívica integrada, en ${h.us.themes08.length} temas, y algunas respuestas cambian con las elecciones: el presidente, el vicepresidente, el presidente de la Cámara, el presidente de la Corte Suprema y el partido del presidente. USCIS las actualiza en una página aparte, y nuestras preguntas ya las incluyen. Quien presentó desde la fecha de corte estudia la lista de 2025, de ${h.us.n25} preguntas.`,
    faqs: (h) => [
      { q: 'Presenté en septiembre de 2025 y mi entrevista es en 2026. ¿Qué examen hago?', a: `El de 2008. La versión depende de la fecha en que USCIS recibió su N-400, y el ${h.date(h.P.us.cutoff)} es el primer día del examen de 2025. Una solicitud recibida antes conserva la lista de 2008 para la entrevista y para la segunda oportunidad, aunque la cita llegue mucho después.` },
      { q: '¿Es oficial la traducción al español de las 100 preguntas?', a: 'Sí. USCIS publica las Preguntas de Educación Cívica del Examen de Naturalización en español, y esta página reproduce esa traducción sin cambios, salvo las respuestas que dependen de quién ocupa un cargo hoy, tomadas de la página de actualizaciones de USCIS. Las opciones de respuesta de la práctica son nuestras.' },
      { q: '¿Qué respuestas de 2008 han cambiado desde que se imprimió la lista?', a: `Cinco preguntas dependen de quién ocupa el cargo: el presidente, el vicepresidente, el presidente de la Cámara de Representantes, el presidente de la Corte Suprema y el partido del presidente. La lista remite a la página de actualizaciones de USCIS, cuyos nombres usamos tal como estaban el ${h.date(h.P.us.retrieved_at)}.` },
    ],
    body: (h) => `
<h2>El examen de 2008 en cifras</h2>
${h.table(['Regla', 'Examen 2008'], [['Quién lo hace', `N-400 recibido antes del ${h.date(h.P.us.cutoff)}`], ['Lista oficial', `${h.us.n08} preguntas`], ['Preguntas en la entrevista', `hasta ${h.P.us.test2008.asked}`], ['Correctas para aprobar', h.P.us.test2008.passCorrect], ['El oficial se detiene con', `${h.P.us.test2008.passCorrect} correctas o ${h.P.us.test2008.failWrong} incorrectas`], ['Solicitantes 65/20', `20 preguntas marcadas, hasta ${h.P.us.s6520.asked}, ${h.P.us.s6520.passCorrect} para aprobar`]], `USCIS, leído el ${h.date(h.P.us.retrieved_at)}.`, ['l', 'l'])}
<h2>Los ${h.us.themes08.length} temas de las 100 preguntas</h2>
${h.table(['Tema', 'Preguntas'], h.us.themes08.map((t, i) => [t, h.us.inTheme('2008', i)]), undefined, ['l', 'r'])}
<p>El tema «Sistema de Gobierno» reúne él solo ${h.us.inTheme('2008', 1)} de las ${h.us.n08} preguntas. Con solo ${h.P.us.test2008.asked} preguntas en la entrevista, la suerte pesa más que en 2025: dos personas pueden recibir preguntas muy distintas. Lo más seguro sigue siendo aprender toda la lista.</p>
<h2>Todas las preguntas con sus respuestas</h2>
<p>La lista de abajo muestra las preguntas de 2008 tema por tema, con las respuestas que USCIS acepta en su traducción oficial y la pregunta original en inglés.</p>
<!--tool:usbank|{"version":"2008","theme":0}-->
<h2>Preguntas que se fallan a menudo</h2>
<ul>
${[12, 49, 50, 66, 93].map((n) => { const x = h.us.q('2008', n); return `<li><strong>${x.es.q.replace(/\?$/, '')}${x.es.q.endsWith('?') ? '?' : ''}</strong> ${x.es.a.map((a) => a.replace(/\.$/, '')).join('; ')}. <em lang="en">${x.en.q}</em></li>`; }).join('\n')}
</ul>
<p>Las preguntas 49 y 50 se parecen y se confunden con facilidad: servir en un jurado es una responsabilidad, postularse a un cargo federal es un derecho, y votar en una elección federal responde a las dos.</p>
<h2>Si su entrevista cambia de fecha</h2>
<p>Una entrevista reprogramada, una solicitud de pruebas o una segunda oportunidad tras un primer fallo no cambian la versión: cuenta el día en que USCIS recibió su N-400. Si retira la solicitud y presenta un N-400 nuevo después del ${h.date(h.P.us.cutoff)}, la nueva solicitud hace el ${h.a('us-civics', 'examen cívico de 2025')}. ¿No sabe su fecha? Su aviso de recibo (Formulario I-797C) la indica como fecha de recepción, y el ${h.a('us-which', 'verificador de versión')} le dice qué examen le toca.</p>
<h2>El idioma de la entrevista</h2>
<p>Que la lista exista en español no significa que el examen sea en español. Salvo exención por edad, explicada en la página de ${h.a('us-exemptions', 'exenciones')}, el oficial pregunta en inglés. Use la traducción para entender cada respuesta y la versión inglesa para memorizarla.</p>`,
  },
});
