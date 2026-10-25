import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-english',
  group: 'us',
  order: 80,
  tool: { kind: 'usenglish', props: { mode: 'writing' } },
  mini: { kind: 'mini:usexempt' },
  related: ['us-test', 'us-civics', 'us-exemptions', 'us-practice', 'us-which', 'us-questions'],
  sources: ['us_vocab_r', 'us_vocab_w', 'us_pm_e2', 'us_study', 'us_exceptions'],
  en: {
    slug: 'citizenship-english-test',
    nav: 'English test: reading and writing',
    card: 'Hear a sentence and type it, or read one aloud: practice built only from the official USCIS reading and writing vocabulary lists.',
    title: 'Citizenship English Test 2026: Reading and Writing Practice',
    description: 'Citizenship English test practice: hear and write dictated sentences or read them aloud, using only the official USCIS vocabulary lists, with the rules for passing.',
    h1: 'Citizenship English test: reading and writing practice',
    intro: 'Press “Listen”, type the sentence, check it. Switch to reading to practise the questions the officer may hand you. Every word comes from the official USCIS lists.',
    resume: (h) => `The English test for U.S. citizenship has three parts, all at the naturalization interview. Speaking is judged during the whole conversation with the officer, as you answer questions about your Form N-400. Reading: the officer shows you up to ${h.P.us.english.readingSentences} sentences and you must read ${h.P.us.english.readingNeeded} correctly, without long pauses and with every content word. Writing: the officer dictates up to ${h.P.us.english.writingSentences} sentences and you must write ${h.P.us.english.writingNeeded} so that the officer understands it; spelling, capital letters and punctuation are not counted against you unless they change the meaning, and numbers may be written as digits or words. Both tests stop as soon as one sentence is right. The sentences use words from two short official lists: ${h.us.vocabR} items for reading and ${h.us.vocabW} for writing, mostly names, places, holidays and civics words. Applicants who are ${h.P.us.englishExempt[0].age} or older with ${h.P.us.englishExempt[0].years} years as a permanent resident, or ${h.P.us.englishExempt[1].age} with ${h.P.us.englishExempt[1].years}, are exempt. The tool above trains writing with ${h.us.sentW} dictated sentences and reading with ${h.us.sentR} questions, all written with those words only.`,
    faqs: (h) => [
      { q: 'What happens if I misspell a word on the writing test?', a: 'You can still pass. The USCIS Policy Manual says an applicant does not fail because of spelling, capitalization or punctuation errors unless they stop the officer from understanding the sentence. What fails a sentence is writing a different word, leaving out a content word, abbreviating a word or writing something the officer cannot read.' },
      { q: 'Are the real test sentences on the vocabulary lists?', a: 'The sentences themselves are not published, but USCIS publishes the words they are built from, on two lists for reading and writing. Our practice sentences use those words only, so if you can read and spell every word on the lists, you are ready for the vocabulary of the real test, whatever the sentence.' },
      { q: 'How is speaking tested?', a: 'There is no separate speaking exam. The officer judges whether you understand and answer in English during the interview, while going over your application and asking the civics questions. Practise by answering questions about yourself aloud: your address, your trips, your job, the dates on your N-400.' },
      { q: 'Can I fail English and pass civics?', a: `Yes, the parts are marked separately. If you fail one part, USCIS retests only that part, ${h.P.us.english.retestDays[0]} to ${h.P.us.english.retestDays[1]} days after the first interview. If you pass reading but fail writing, for example, only the writing test is given again at the second appointment.` },
    ],
    body: (h) => `
<h2>The rules of each part</h2>
${h.table(['Part', 'What the officer does', 'To pass'], [['Speaking', 'talks with you about your application and asks the civics questions', 'understand and answer in English'], ['Reading', `shows up to ${h.P.us.english.readingSentences} sentences, one at a time`, `read ${h.P.us.english.readingNeeded} so the meaning comes across`], ['Writing', `dictates up to ${h.P.us.english.writingSentences} sentences`, `write ${h.P.us.english.writingNeeded} so the officer understands it`]], `USCIS Policy Manual, volume 12, part E, chapter 2, read on ${h.date(h.P.us.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>On reading, you may skip short words or mispronounce a word as long as the meaning is clear; you fail a sentence if you leave out or replace a content word or pause for a long time. On writing, small spelling and grammar errors are accepted; a different word, an abbreviation or an unreadable sentence is not.</p>
<h2>The official word lists</h2>
<p>USCIS publishes the vocabulary of both tests. The reading list has ${h.us.vocabR} items and the writing list ${h.us.vocabW}. They overlap a lot, and they are mostly made of words you already meet in the civics questions:</p>
<ul>
<li><strong>People:</strong> George Washington, Abraham Lincoln, and Adams on the writing list.</li>
<li><strong>Places:</strong> America, the United States, and for writing Alaska, California, Canada, Delaware, Mexico, New York City and Washington, D.C.</li>
<li><strong>Holidays and months:</strong> Presidents' Day, Memorial Day, Flag Day, Independence Day, Labor Day, Columbus Day, Thanksgiving, and the months they fall in.</li>
<li><strong>Civics words:</strong> Bill of Rights, capital, citizen, Congress, flag, President, Senators, state, White House, freedom of speech.</li>
<li><strong>Question words for reading:</strong> how, what, when, where, who, why.</li>
</ul>
<p>Learn to spell the names of the months and holidays first: they are the words most often misspelled, and a sentence like “Labor Day is in September” holds two of them.</p>
<h2>How to use the practice tool</h2>
<p>In writing mode, press “Listen”: your browser reads a sentence aloud in American English. Type it, then press “Check”. The tool lists any missing or misspelled word; capital letters and punctuation do not count, as in the real test. If your browser has no voice, use “Show the sentence”, read it once, hide it and write it from memory. In reading mode, read the question aloud, then mark honestly whether you read it smoothly. Ask a friend to listen if you can.</p>
<!--tool:usenglish|{"mode":"reading"}-->
<h2>Exemptions</h2>
<p>Applicants who on the filing date are ${h.P.us.englishExempt[0].age} or older with ${h.P.us.englishExempt[0].years} years as a permanent resident, or ${h.P.us.englishExempt[1].age} or older with ${h.P.us.englishExempt[1].years} years, skip the English test entirely and take the civics test in their own language; the ${h.a('us-exemptions', 'exemptions page')} explains them, with the 65/20 rule. A medical disability exception (Form N-648) can also waive the English requirement.</p>
<h2>Our sentences and the real ones</h2>
<p>The practice sentences were written by Radif Partners and checked word by word against the two USCIS lists; none is copied from a test form, which USCIS does not publish. They train the same words in the same kind of short sentences. Once you write all ${h.us.sentW} without a missing word, move back to the ${h.a('us-test', 'civics mock test')}: the civics part is where most of the preparation time goes.</p>`,
  },
  es: {
    slug: 'examen-de-ingles-ciudadania',
    nav: 'Examen de inglés: lectura y escritura',
    card: 'Escuche una oración y escríbala, o léala en voz alta: práctica hecha solo con las listas oficiales de vocabulario de USCIS.',
    title: 'Examen de inglés para la ciudadanía 2026: práctica',
    description: 'Examen de inglés para la ciudadanía: escuche y escriba oraciones dictadas o léalas en voz alta, con las listas oficiales de vocabulario de USCIS y las reglas para aprobar.',
    h1: 'Examen de inglés para la ciudadanía: lectura y escritura',
    intro: 'Pulse «Escuchar», escriba la oración en inglés y compruebe. Cambie a lectura para practicar las preguntas que el oficial puede mostrarle. Todas las palabras vienen de las listas de USCIS.',
    resume: (h) => `El examen de inglés para la ciudadanía estadounidense tiene tres partes, todas en la entrevista de naturalización. La conversación se evalúa durante toda la entrevista, mientras usted responde preguntas sobre su Formulario N-400. Lectura: el oficial le muestra hasta ${h.P.us.english.readingSentences} oraciones y debe leer ${h.P.us.english.readingNeeded} correctamente, sin pausas largas y con todas las palabras importantes. Escritura: el oficial le dicta hasta ${h.P.us.english.writingSentences} oraciones y debe escribir ${h.P.us.english.writingNeeded} de forma que el oficial la entienda; la ortografía, las mayúsculas y la puntuación no cuentan en su contra salvo que cambien el sentido, y los números pueden escribirse con cifras o con letras. Las dos pruebas se detienen en cuanto una oración está bien. Las oraciones usan palabras de dos listas oficiales cortas: ${h.us.vocabR} elementos para lectura y ${h.us.vocabW} para escritura, sobre todo nombres, lugares, días feriados y palabras cívicas. Quien tiene ${h.P.us.englishExempt[0].age} años o más con ${h.P.us.englishExempt[0].years} de residencia permanente, o ${h.P.us.englishExempt[1].age} con ${h.P.us.englishExempt[1].years}, está exento. La herramienta entrena la escritura con ${h.us.sentW} oraciones dictadas y la lectura con ${h.us.sentR} preguntas.`,
    faqs: (h) => [
      { q: '¿Qué pasa si escribo mal una palabra en el examen de escritura?', a: 'Puede aprobar igualmente. El Manual de Políticas de USCIS dice que no se suspende por errores de ortografía, mayúsculas o puntuación, salvo que impidan al oficial entender la oración. Lo que hace fallar una oración es escribir otra palabra, omitir una palabra importante, abreviar o escribir algo que el oficial no puede leer.' },
      { q: '¿Puedo hacer el examen de inglés con un intérprete?', a: `No: el examen de inglés mide justamente su inglés. Solo quien tiene derecho a una exención por edad y años de residencia (${h.P.us.englishExempt[0].age}/${h.P.us.englishExempt[0].years} o ${h.P.us.englishExempt[1].age}/${h.P.us.englishExempt[1].years}) o una excepción médica con el Formulario N-648 deja de hacerlo, y entonces puede hacer el examen cívico en español con un intérprete que debe llevar.` },
      { q: '¿Cómo se evalúa la conversación?', a: 'No hay un examen oral aparte. El oficial juzga si usted entiende y responde en inglés durante la entrevista, al repasar su solicitud y al hacer las preguntas cívicas. Practique respondiendo en voz alta preguntas sobre usted: su dirección, sus viajes, su trabajo, las fechas de su N-400.' },
    ],
    body: (h) => `
<h2>Las reglas de cada parte</h2>
${h.table(['Parte', 'Qué hace el oficial', 'Para aprobar'], [['Conversación', 'habla con usted sobre su solicitud y hace las preguntas cívicas', 'entender y responder en inglés'], ['Lectura', `muestra hasta ${h.P.us.english.readingSentences} oraciones, una por una`, `leer ${h.P.us.english.readingNeeded} de forma que se entienda`], ['Escritura', `dicta hasta ${h.P.us.english.writingSentences} oraciones`, `escribir ${h.P.us.english.writingNeeded} de forma que el oficial la entienda`]], `Manual de Políticas de USCIS, volumen 12, parte E, capítulo 2, leído el ${h.date(h.P.us.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>En la lectura puede saltarse palabras cortas o pronunciar mal una palabra si el sentido queda claro; falla la oración si omite o cambia una palabra importante o hace pausas largas. En la escritura se aceptan pequeños errores de ortografía y gramática; otra palabra, una abreviatura o una oración ilegible, no.</p>
<h2>Las listas oficiales de palabras</h2>
<p>USCIS publica el vocabulario de las dos pruebas. La lista de lectura tiene ${h.us.vocabR} elementos y la de escritura ${h.us.vocabW}. Se parecen mucho y están hechas sobre todo de palabras que ya aparecen en las preguntas cívicas:</p>
<ul>
<li><strong>Personas:</strong> George Washington, Abraham Lincoln y, en escritura, Adams.</li>
<li><strong>Lugares:</strong> America, United States y, en escritura, Alaska, California, Canada, Delaware, Mexico, New York City y Washington, D.C.</li>
<li><strong>Días feriados y meses:</strong> Presidents' Day, Memorial Day, Flag Day, Independence Day, Labor Day, Columbus Day, Thanksgiving y los meses en que caen.</li>
<li><strong>Palabras cívicas:</strong> Bill of Rights, capital, citizen, Congress, flag, President, Senators, state, White House, freedom of speech.</li>
<li><strong>Palabras interrogativas para la lectura:</strong> how, what, when, where, who, why.</li>
</ul>
<p>Aprenda primero a escribir los meses y los días feriados en inglés: son las palabras que más se escriben mal, y una oración como «Labor Day is in September» contiene dos.</p>
<h2>Cómo usar la herramienta</h2>
<p>En el modo escritura, pulse «Escuchar»: su navegador lee una oración en voz alta en inglés americano. Escríbala y pulse «Comprobar». La herramienta indica las palabras que faltan o están mal escritas; las mayúsculas y la puntuación no cuentan, como en el examen real. Si su navegador no tiene voz, use «Ver la oración», léala una vez, ocúltela y escríbala de memoria. En el modo lectura, lea la pregunta en voz alta y marque con honestidad si la leyó con fluidez.</p>
<!--tool:usenglish|{"mode":"reading"}-->
<h2>Exenciones</h2>
<p>Quien el día de la presentación tiene ${h.P.us.englishExempt[0].age} años o más con ${h.P.us.englishExempt[0].years} de residencia permanente, o ${h.P.us.englishExempt[1].age} o más con ${h.P.us.englishExempt[1].years}, no hace el examen de inglés y hace el examen cívico en su idioma; la página de ${h.a('us-exemptions', 'exenciones')} lo explica junto con la regla 65/20. Una excepción por discapacidad médica (Formulario N-648) también puede eximir del inglés.</p>
<h2>Nuestras oraciones y las del examen</h2>
<p>Las oraciones de práctica las escribió Radif Partners y se comprobaron palabra por palabra con las dos listas de USCIS; ninguna está copiada de un formulario de examen, que USCIS no publica. Entrenan las mismas palabras en el mismo tipo de oraciones cortas. Cuando escriba las ${h.us.sentW} sin que falte ninguna palabra, vuelva al ${h.a('us-test', 'examen cívico de práctica')}: la parte cívica es la que exige más tiempo de preparación.</p>`,
  },
});
