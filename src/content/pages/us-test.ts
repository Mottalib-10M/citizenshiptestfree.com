import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-test',
  group: 'us',
  order: 10,
  tool: { kind: 'usquiz', props: { version: '2025', mode: 'exam' } },
  mini: { kind: 'mini:uspass' },
  related: ['us-civics', 'us-questions', 'us-which', 'us-english', 'us-n400', 'us-practice'],
  sources: ['us_study', 'us_interview', 'us_128', 'us_updates', 'us_pm_e2'],
  en: {
    slug: 'us-citizenship-test',
    nav: 'US citizenship test',
    card: 'A mock 2025 civics test run like the interview: up to 20 official questions, 12 right to pass, stopped as soon as the result is settled.',
    title: 'US Citizenship Test 2026: Free Mock Interview, 20 Questions',
    description: 'US citizenship test 2026: a free mock civics test with the official USCIS questions, up to 20 asked, 12 right to pass and the officer’s stop rule, plus the English test.',
    h1: 'US citizenship test: free mock civics interview',
    intro: 'The officer asks up to 20 questions from the official list of 128 and stops at 12 right or 9 wrong. Answer below: the tool applies the same rule.',
    resume: (h) => `The US citizenship test is part of the naturalization interview with USCIS and has two parts: an English test, where you read one sentence out of up to ${h.P.us.english.readingSentences} and write one out of up to ${h.P.us.english.writingSentences} and show you can speak English, and a civics test on American history and government. Since ${h.date(h.P.us.cutoff)}, anyone who files Form N-400 on or after that date takes the 2025 civics test: the officer asks up to ${h.P.us.test2025.asked} questions from a public list of ${h.us.n25}, aloud, and you need ${h.P.us.test2025.passCorrect} correct answers. The officer stops as soon as you reach ${h.P.us.test2025.passCorrect} right or ${h.P.us.test2025.failWrong} wrong. Applicants who filed before that date take the 2008 test: up to ${h.P.us.test2008.asked} of ${h.us.n08} questions, ${h.P.us.test2008.passCorrect} right to pass. If you fail one part, USCIS gives a second chance on that part, usually ${h.P.us.english.retestDays[0]} to ${h.P.us.english.retestDays[1]} days after the first interview. The mock test above draws questions from the official 2025 list, marks each answer against the answers USCIS accepts and stops exactly where the officer would.`,
    faqs: (h) => [
      { q: 'Does the officer show me multiple-choice answers?', a: 'No. At the interview the officer reads the question aloud and you answer in your own words; any answer on the USCIS list, or one that means the same thing, is accepted. The four choices in our tool are only a way to practise alone. Once you score well, say the answers aloud without looking at the choices, as you will on the day.' },
      { q: 'How many questions can I miss and still pass?', a: `On the 2025 test you pass with ${h.P.us.test2025.passCorrect} right answers and fail with ${h.P.us.test2025.failWrong} wrong ones, so you can miss up to ${h.P.us.test2025.failWrong - 1} questions as long as you reach ${h.P.us.test2025.passCorrect} correct. On the 2008 test you need ${h.P.us.test2008.passCorrect} right out of up to ${h.P.us.test2008.asked} and fail at ${h.P.us.test2008.failWrong} wrong answers.` },
      { q: 'Is the civics test given before or during the interview?', a: 'During it. USCIS runs the English and civics tests at the same appointment as the naturalization interview, after the officer has gone through your Form N-400 with you under oath. Speaking is judged from that conversation, so answering questions about your own application in English is already part of the test.' },
      { q: 'Why do some answers change from one year to the next?', a: `A few questions ask who holds an office now, such as the President or the Speaker of the House. USCIS lists the current answers on its test updates page, which read “Last Reviewed/Updated” ${h.date(h.us.updatesReviewed)} when we checked it. Our questions use those names, and we check the page again before every update of the site.` },
    ],
    body: (h) => `
<h2>The two parts of the test</h2>
${h.table(['Part', '2025 test (N-400 filed on or after 20 Oct 2025)', '2008 test (filed before)'], [['Civics: questions asked', `up to ${h.P.us.test2025.asked}, from ${h.us.n25}`, `up to ${h.P.us.test2008.asked}, from ${h.us.n08}`], ['Civics: right answers to pass', h.P.us.test2025.passCorrect, h.P.us.test2008.passCorrect], ['Officer stops at', `${h.P.us.test2025.passCorrect} right or ${h.P.us.test2025.failWrong} wrong`, `${h.P.us.test2008.passCorrect} right or ${h.P.us.test2008.failWrong} wrong`], ['Reading', `1 sentence right out of up to ${h.P.us.english.readingSentences}`, 'same'], ['Writing', `1 sentence right out of up to ${h.P.us.english.writingSentences}`, 'same'], ['Speaking', 'judged during the interview', 'same']], `Read on uscis.gov on ${h.date(h.P.us.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>The civics part is oral: no paper, no screen, no answer choices. The officer may stop early in both directions, which is why a calm start matters. Two wrong answers in the first five questions are not a problem on the 2025 test; you still have room for ${h.P.us.test2025.failWrong - 3} more.</p>
<h2>What the 128 questions cover</h2>
<p>The 2025 list is divided into ${h.us.themes25.length} themes. Some are long and some take an evening:</p>
<ul>
${h.us.themes25.map((t, i) => `<li><strong>${t}</strong>: ${h.us.inTheme('2025', i)} questions.</li>`).join('\n')}
</ul>
<p>Four questions have an answer that depends on where you live: your two senators, your representative, your governor and your state capital. Learn your own answers from your state's official sites before the interview. They are in our ${h.a('us-questions', 'list of questions')} but never in the scored mock test, since we cannot know your state.</p>
<h2>How to prepare in four weeks</h2>
<ol>
<li>Week one: read the ${h.a('us-questions', 'official questions and answers')} theme by theme, one theme a day, saying each answer aloud.</li>
<li>Week two: ${h.a('us-practice', 'practise by theme')} with ten questions at a time and redo the themes where you miss more than two.</li>
<li>Week three: take the mock test above every day. Aim to reach ${h.P.us.test2025.passCorrect} right well before ${h.P.us.test2025.failWrong} wrong, several days in a row.</li>
<li>Week four: train the ${h.a('us-english', 'English reading and writing test')} with the official vocabulary, and ask someone to put the questions to you without the choices.</li>
</ol>
<p>A tip from the way the test is built: many questions have several accepted answers. Learn the shortest one well rather than every one badly. Question ${h.us.q('2025', 113).n} on Martin Luther King, Jr. accepts "${h.us.q('2025', 113).en.a[0].toLowerCase()}", and that is enough.</p>
<h2>Which version is yours</h2>
<p>The version does not depend on the interview date but on the date USCIS received your N-400. If you filed before ${h.date(h.P.us.cutoff)} you keep the 2008 test, even for an interview in 2026, and you can train with the ${h.a('us-2008', '100 civics questions of 2008')}. Applicants aged ${h.P.us.s6520.age} or over with ${h.P.us.s6520.years} years as a permanent resident study only the 20 questions marked for the ${h.a('us-exemptions', '65/20 test')}. The ${h.a('us-which', 'version checker')} tells you in ten seconds.</p>
<h2>Before the test: filing at the right time</h2>
<p>You cannot book the test. USCIS schedules the interview after you file Form N-400, and you can file up to ${h.P.us.n400.earlyFilingDays} days before the anniversary of your green card date (five years, or three when married to a citizen). The ${h.a('us-n400', 'N-400 page')} finds your first filing date with your trips abroad, and the ${h.a('us-fee', 'fee page')} gives the ${h.usd(h.P.us.fees.online)} online and ${h.usd(h.P.us.fees.paper)} paper fees.</p>`,
  },
  es: {
    slug: 'examen-de-ciudadania-americana',
    nav: 'Examen de ciudadanía americana',
    card: 'Examen cívico 2025 de práctica como en la entrevista: hasta 20 preguntas oficiales, 12 correctas para aprobar y la regla de parada del oficial.',
    title: 'Examen de ciudadanía americana 2026: práctica gratis',
    description: 'Examen de ciudadanía americana 2026: práctica gratuita con las preguntas oficiales de USCIS, hasta 20 preguntas, 12 correctas para aprobar y la regla de parada.',
    h1: 'Examen de ciudadanía americana: entrevista cívica de práctica',
    intro: 'El oficial hace hasta 20 preguntas de la lista oficial de 128 y se detiene con 12 correctas o 9 incorrectas. Responda abajo: la herramienta aplica la misma regla.',
    resume: (h) => `El examen de ciudadanía americana forma parte de la entrevista de naturalización con USCIS y tiene dos partes: un examen de inglés, en el que usted lee una oración de hasta ${h.P.us.english.readingSentences}, escribe una de hasta ${h.P.us.english.writingSentences} y demuestra que habla inglés, y un examen de educación cívica sobre la historia y el gobierno de Estados Unidos. Desde el ${h.date(h.P.us.cutoff)}, quien presenta el Formulario N-400 en esa fecha o después hace el examen cívico de 2025: el oficial pregunta en voz alta hasta ${h.P.us.test2025.asked} preguntas de una lista pública de ${h.us.n25} y hacen falta ${h.P.us.test2025.passCorrect} respuestas correctas. El oficial se detiene en cuanto usted llega a ${h.P.us.test2025.passCorrect} correctas o a ${h.P.us.test2025.failWrong} incorrectas. Quien presentó antes de esa fecha hace el examen de 2008: hasta ${h.P.us.test2008.asked} de ${h.us.n08} preguntas, ${h.P.us.test2008.passCorrect} correctas para aprobar. Si no aprueba una parte, USCIS da una segunda oportunidad para esa parte, por lo general entre ${h.P.us.english.retestDays[0]} y ${h.P.us.english.retestDays[1]} días después. La práctica de arriba toma preguntas de la lista oficial de 2025, muestra cada pregunta en español y en inglés, y se detiene donde lo haría el oficial.`,
    faqs: (h) => [
      { q: '¿Puedo hacer el examen cívico en español?', a: `Solo si tiene derecho a una exención de inglés: ${h.P.us.englishExempt[0].age} años o más con ${h.P.us.englishExempt[0].years} años de residencia permanente, o ${h.P.us.englishExempt[1].age} años o más con ${h.P.us.englishExempt[1].years} años, al presentar el N-400. En ese caso hace el examen cívico en español con un intérprete que usted lleva. Si no, la entrevista y las preguntas son en inglés, y por eso nuestra práctica muestra siempre la pregunta original en inglés.` },
      { q: '¿El oficial me da opciones de respuesta?', a: 'No. El oficial lee la pregunta y usted contesta con sus palabras; se acepta cualquier respuesta de la lista de USCIS o una que signifique lo mismo. Las cuatro opciones de nuestra herramienta sirven para practicar solo. Cuando ya acierte casi siempre, diga las respuestas en voz alta y en inglés sin mirar las opciones.' },
      { q: '¿Qué pasa si fallo el examen cívico?', a: `USCIS le da una segunda oportunidad para la parte que no aprobó, en una nueva cita, por lo general entre ${h.P.us.english.retestDays[0]} y ${h.P.us.english.retestDays[1]} días después de la primera entrevista. Solo repite la parte fallada: si aprobó el inglés, no lo vuelve a hacer. Si falla también la segunda vez, USCIS niega la solicitud y habría que presentar un nuevo N-400 y pagar de nuevo la tarifa.` },
      { q: '¿Las preguntas en español son oficiales?', a: 'Para la versión de 2008, sí: USCIS publica una traducción oficial al español de las 100 preguntas. Para la versión de 2025, USCIS solo publica la lista en inglés; la traducción que mostramos es nuestra y no es oficial. Por eso cada pregunta aparece también en inglés, que es el idioma en que se la harán.' },
    ],
    body: (h) => `
<h2>Las dos partes del examen</h2>
${h.table(['Parte', 'Examen 2025 (N-400 desde el 20 oct. 2025)', 'Examen 2008 (presentado antes)'], [['Cívica: preguntas', `hasta ${h.P.us.test2025.asked}, de ${h.us.n25}`, `hasta ${h.P.us.test2008.asked}, de ${h.us.n08}`], ['Cívica: correctas para aprobar', h.P.us.test2025.passCorrect, h.P.us.test2008.passCorrect], ['El oficial se detiene con', `${h.P.us.test2025.passCorrect} correctas o ${h.P.us.test2025.failWrong} incorrectas`, `${h.P.us.test2008.passCorrect} correctas o ${h.P.us.test2008.failWrong} incorrectas`], ['Lectura', `1 oración correcta de hasta ${h.P.us.english.readingSentences}`, 'igual'], ['Escritura', `1 oración correcta de hasta ${h.P.us.english.writingSentences}`, 'igual'], ['Conversación', 'se evalúa durante la entrevista', 'igual']], `Leído en uscis.gov el ${h.date(h.P.us.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>La parte cívica es oral: sin papel, sin pantalla y sin opciones. El oficial puede parar antes en los dos sentidos, así que conviene empezar con calma. Dos errores en las cinco primeras preguntas no son un problema en el examen de 2025: todavía le quedan ${h.P.us.test2025.failWrong - 3} errores posibles.</p>
<h2>Qué temas cubren las 128 preguntas</h2>
<p>La lista de 2025 se divide en ${h.us.themes25.length} temas, de tamaño muy distinto:</p>
<ul>
${h.us.themes25.map((t, i) => `<li><strong>${t}</strong>: ${h.us.inTheme('2025', i)} preguntas.</li>`).join('\n')}
</ul>
<p>Cuatro preguntas dependen del lugar donde vive: sus dos senadores, su representante, su gobernador y la capital de su estado. Busque sus propias respuestas en los sitios oficiales de su estado antes de la entrevista. Están en nuestra ${h.a('us-questions', 'lista de preguntas')}, pero nunca en el examen de práctica, porque no sabemos en qué estado vive.</p>
<h2>Cómo prepararse en cuatro semanas</h2>
<ol>
<li>Primera semana: lea las ${h.a('us-questions', 'preguntas y respuestas oficiales')} tema por tema, un tema por día, diciendo cada respuesta en voz alta en inglés.</li>
<li>Segunda semana: ${h.a('us-practice', 'practique por tema')} con series de diez preguntas y repita los temas en los que falle más de dos.</li>
<li>Tercera semana: haga el examen de arriba cada día, hasta llegar a ${h.P.us.test2025.passCorrect} correctas mucho antes de ${h.P.us.test2025.failWrong} incorrectas varios días seguidos.</li>
<li>Cuarta semana: entrene el ${h.a('us-english', 'examen de lectura y escritura en inglés')} con el vocabulario oficial y pida a alguien que le haga las preguntas sin opciones.</li>
</ol>
<p>Un consejo que sale de la propia lista: muchas preguntas aceptan varias respuestas. Aprenda bien la más corta en inglés en lugar de todas a medias.</p>
<h2>Qué versión le toca</h2>
<p>La versión no depende de la fecha de la entrevista, sino de la fecha en que USCIS recibió su N-400. Si presentó antes del ${h.date(h.P.us.cutoff)}, conserva el examen de 2008 aunque la entrevista sea en 2026, y puede practicar con las ${h.a('us-2008', '100 preguntas cívicas de 2008')}, que USCIS tradujo oficialmente al español. Quien tiene ${h.P.us.s6520.age} años o más y ${h.P.us.s6520.years} años de residencia permanente estudia solo las 20 preguntas del ${h.a('us-exemptions', 'examen 65/20')}. El ${h.a('us-which', 'verificador de versión')} se lo dice en diez segundos.</p>
<h2>Antes del examen: presentar a tiempo</h2>
<p>El examen no se reserva. USCIS fija la entrevista después de recibir el Formulario N-400, que se puede presentar hasta ${h.P.us.n400.earlyFilingDays} días antes del aniversario de la fecha de su tarjeta verde (cinco años, o tres si está casado con un ciudadano). La página del ${h.a('us-n400', 'Formulario N-400')} calcula su primera fecha con sus viajes, y la de la ${h.a('us-fee', 'tarifa')} indica los ${h.usd(h.P.us.fees.online)} en línea y ${h.usd(h.P.us.fees.paper)} en papel.</p>`,
  },
});
