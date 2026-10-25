import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-questions',
  group: 'us',
  order: 30,
  tool: { kind: 'usbank', props: { version: '2025', theme: 0, versionSelect: true } },
  mini: { kind: 'mini:uspass' },
  related: ['us-test', 'us-practice', 'us-civics', 'us-2008', 'us-exemptions', 'us-english'],
  sources: ['us_128', 'us_100', 'us_100_es', 'us_updates', 'us_study'],
  en: {
    slug: 'citizenship-test-questions',
    nav: 'Citizenship test questions',
    card: 'The official 128 civics questions of 2025 (and the 100 of 2008) with every accepted answer, theme by theme, current officeholders included.',
    title: 'Citizenship Test Questions 2026: All 128 With Answers',
    description: 'Citizenship test questions and answers: the 128 official USCIS civics questions of 2025 and the 100 of 2008, theme by theme, with every accepted answer.',
    h1: 'Citizenship test questions and answers (USCIS list)',
    intro: 'Pick a theme to read its official questions; open one to see every answer USCIS accepts. Switch to the 2008 list if you filed before 20 October 2025.',
    resume: (h) => `The citizenship test questions are public: USCIS publishes the full list of civics questions with the answers it accepts, and the officer at your naturalization interview asks only questions from that list. For applications filed on or after ${h.date(h.P.us.cutoff)} the list is the 2025 one, ${h.us.n25} questions in ${h.us.themes25.length} themes; for earlier applications it is the 2008 list of ${h.us.n08} questions. Many questions accept several answers, and any one of them is enough: “The executive branch has many parts. Name one.” is passed with “the Cabinet” alone. Twenty questions on each list carry a star: they are the only ones asked to applicants who qualify for the 65/20 special consideration. A handful depend on where you live, such as your senators and governor, and a few on who holds an office now, which USCIS updates on a separate page. This page shows both lists exactly as USCIS publishes them, with the current officeholders filled in, and lets you open each question to check yourself before looking at the answer.`,
    faqs: (h) => [
      { q: 'Are these the real questions of the citizenship test?', a: `Yes. Unlike most countries, the United States publishes its civics questions. The list on this page is the official USCIS one, ${h.us.n25} questions for 2025 and ${h.us.n08} for 2008, a work of the federal government in the public domain. Only the four-choice practice format is ours; at the interview you answer aloud.` },
      { q: 'What should I answer for my senators and representative?', a: 'Give the names of the people who represent your state and your district on the day of the interview. Look them up on the official websites of the Senate and of the House, by state or by ZIP code. Residents of the District of Columbia and of U.S. territories have special answers given on the USCIS list itself.' },
      { q: 'Do I have to give the exact words of the answer?', a: 'No. The officer accepts any answer on the list or one that means the same thing, in normal spoken English. You do not need to recite a sentence word for word. Practise with short answers you can say without hesitation, and keep a second one in mind for the questions you find hard.' },
      { q: 'What does the star next to a question mean?', a: `It marks the 20 questions of the 65/20 special consideration. An applicant aged ${h.P.us.s6520.age} or over with ${h.P.us.s6520.years} years as a permanent resident on the day of filing studies only those, may take the test in their own language, and is asked up to ${h.P.us.s6520.asked} of them with ${h.P.us.s6520.passCorrect} right answers to pass.` },
    ],
    body: (h) => `
<h2>How the list is organized</h2>
<p>The 2025 list follows ${h.us.themes25.length} themes. The menu of the tool above uses the same order, so you can read the list in the sequence USCIS prints it:</p>
${h.table(['Theme', '2025 questions'], h.us.themes25.map((t, i) => [t, h.us.inTheme('2025', i)]), `USCIS form M-1778 (09/25), read on ${h.date(h.P.us.retrieved_at)}.`, ['l', 'r'])}
<p>The 2008 list is shorter, ${h.us.n08} questions in ${h.us.themes08.length} groups, and is still the one to study if USCIS received your N-400 before ${h.date(h.P.us.cutoff)}. Choose “2008” in the first menu to see it.</p>
<h2>Five questions worth reading twice</h2>
<p>Some questions trip up applicants because the answer is short but not obvious. A few examples from the 2025 list, with the accepted answers:</p>
<ul>
${[1, 13, 52, 74, 121].map((n) => { const x = h.us.q('2025', n); return `<li><strong>${x.en.q}</strong> ${x.en.a.slice(0, 3).join('; ')}${x.en.a.length > 3 ? '; and other answers on the list' : ''}.</li>`; }).join('\n')}
</ul>
<h2>Questions that depend on you</h2>
<p>Four questions on the 2025 list have no single answer: question ${h.us.q('2025', 23).n} on your senators, ${h.us.q('2025', 29).n} on your representative, ${h.us.q('2025', 61).n} on your governor and ${h.us.q('2025', 62).n} on your state capital. Write your own answers on a card and learn them with the rest. They never appear in our scored tests, because the right answer depends on your address.</p>
<h2>Questions that change with elections</h2>
<p>The names of the President, the Vice President, the Speaker of the House and the Chief Justice are not printed in the list itself, which sends you to the USCIS test updates page. We show the names listed there, checked on ${h.date(h.P.us.retrieved_at)} (page reviewed ${h.date(h.us.updatesReviewed)}). If an election or an appointment changes one of them before your interview, give the new name.</p>
<h2>From reading to answering</h2>
<p>Reading the list is the first step, not the last. Once you have read every theme, cover the answers and test yourself with the ${h.a('us-practice', 'practice by theme')}, then with the full ${h.a('us-test', 'mock citizenship test')}, which stops the way the officer does. In Spanish, the same questions are available with the official USCIS translation of the 2008 list and our own translation of the 2025 list, always with the English original beside them, since the interview is in English for most applicants.</p>
<p>The answers here are exactly those of the USCIS documents: we have not shortened, corrected or added any. The four answer choices used in our quizzes, including the three wrong ones, are written by Radif Partners and checked so that the right choice always matches an accepted answer.</p>`,
  },
  es: {
    slug: 'preguntas-del-examen-de-ciudadania',
    nav: 'Preguntas del examen de ciudadanía',
    card: 'Las 128 preguntas cívicas oficiales de 2025 y las 100 de 2008, en español y en inglés, con todas las respuestas aceptadas por USCIS.',
    title: 'Preguntas del examen de ciudadanía 2026 con respuestas',
    description: 'Preguntas del examen de ciudadanía en español: las 128 preguntas cívicas de USCIS de 2025 y las 100 de 2008, tema por tema, con todas las respuestas en inglés.',
    h1: 'Preguntas del examen de ciudadanía y sus respuestas',
    intro: 'Elija un tema para leer sus preguntas oficiales; abra una para ver todas las respuestas que USCIS acepta, en español y con el original en inglés.',
    resume: (h) => `Las preguntas del examen de ciudadanía son públicas: USCIS publica la lista completa de preguntas cívicas con las respuestas que acepta, y el oficial de la entrevista de naturalización solo hace preguntas de esa lista. Para las solicitudes presentadas desde el ${h.date(h.P.us.cutoff)} la lista es la de 2025, con ${h.us.n25} preguntas en ${h.us.themes25.length} temas; para las anteriores es la de 2008, con ${h.us.n08} preguntas. USCIS tradujo oficialmente al español la lista de 2008, pero no la de 2025, que solo existe en inglés: la traducción de 2025 que mostramos es nuestra y no es oficial. Muchas preguntas aceptan varias respuestas y basta con una: «El poder ejecutivo tiene muchas partes. Mencione una» se aprueba solo con «el Gabinete». Veinte preguntas de cada lista llevan una estrella: son las únicas que se hacen a quien tiene derecho a la consideración 65/20. Cuatro dependen del lugar donde vive, como sus senadores y su gobernador. Esta página muestra las dos listas tal como USCIS las publica, con cada pregunta también en inglés, el idioma de la entrevista para la mayoría.`,
    faqs: (h) => [
      { q: '¿Son estas las preguntas reales del examen de ciudadanía?', a: `Sí. Estados Unidos publica sus preguntas cívicas. La lista de esta página es la oficial de USCIS, ${h.us.n25} preguntas de 2025 y ${h.us.n08} de 2008, una obra del gobierno federal en el dominio público. Lo único nuestro es la traducción al español de la versión 2025 y el formato de cuatro opciones de la práctica; en la entrevista se responde en voz alta.` },
      { q: '¿Me harán las preguntas en español?', a: `Solo si tiene derecho a una exención de inglés por edad y años de residencia permanente (${h.P.us.englishExempt[0].age}/${h.P.us.englishExempt[0].years} o ${h.P.us.englishExempt[1].age}/${h.P.us.englishExempt[1].years}); entonces hace el examen cívico en español con un intérprete que usted lleva. En los demás casos, el oficial pregunta en inglés y usted contesta en inglés. Use el español para entender y el inglés para memorizar.` },
      { q: '¿Qué significa la estrella junto a una pregunta?', a: `Marca las 20 preguntas de la consideración especial 65/20. Quien tiene ${h.P.us.s6520.age} años o más y ${h.P.us.s6520.years} años como residente permanente el día en que presenta el N-400 estudia solo esas, puede hacer el examen en su idioma y debe acertar ${h.P.us.s6520.passCorrect} de hasta ${h.P.us.s6520.asked} preguntas.` },
    ],
    body: (h) => `
<h2>Cómo está organizada la lista</h2>
<p>La lista de 2025 sigue ${h.us.themes25.length} temas. El menú de la herramienta de arriba usa el mismo orden, así que puede leer la lista en la secuencia en que USCIS la imprime:</p>
${h.table(['Tema', 'Preguntas de 2025'], h.us.themes25.map((t, i) => [t, h.us.inTheme('2025', i)]), `Formulario M-1778 de USCIS (09/25), leído el ${h.date(h.P.us.retrieved_at)}.`, ['l', 'r'])}
<p>La lista de 2008 es más corta, ${h.us.n08} preguntas en ${h.us.themes08.length} grupos, y es la que debe estudiar si USCIS recibió su N-400 antes del ${h.date(h.P.us.cutoff)}. Elija «2008» en el primer menú para verla con la traducción oficial de USCIS.</p>
<h2>Cinco preguntas que conviene leer dos veces</h2>
<p>Algunas preguntas confunden porque la respuesta es corta pero no evidente. Unos ejemplos de la lista de 2025, con las respuestas aceptadas en nuestra traducción:</p>
<ul>
${[1, 13, 52, 74, 121].map((n) => { const x = h.us.q('2025', n); return `<li><strong>${x.es.q}</strong> ${x.es.a.slice(0, 3).join('; ')}${x.es.a.length > 3 ? '; y otras respuestas de la lista' : ''}. <em lang="en">${x.en.q}</em></li>`; }).join('\n')}
</ul>
<h2>Preguntas que dependen de usted</h2>
<p>Cuatro preguntas de la lista de 2025 no tienen una respuesta única: la ${h.us.q('2025', 23).n} sobre sus senadores, la ${h.us.q('2025', 29).n} sobre su representante, la ${h.us.q('2025', 61).n} sobre su gobernador y la ${h.us.q('2025', 62).n} sobre la capital de su estado. Escriba sus respuestas en una tarjeta y apréndalas con las demás. Nunca aparecen en nuestros exámenes puntuados, porque la respuesta depende de su dirección.</p>
<h2>Preguntas que cambian con las elecciones</h2>
<p>Los nombres del presidente, del vicepresidente, del presidente de la Cámara de Representantes y del presidente de la Corte Suprema no están impresos en la lista, que remite a la página de actualizaciones de USCIS. Mostramos los nombres que figuran allí, comprobados el ${h.date(h.P.us.retrieved_at)} (página revisada el ${h.date(h.us.updatesReviewed)}). Si una elección o un nombramiento cambia alguno antes de su entrevista, dé el nombre nuevo.</p>
<h2>De la lectura a la respuesta</h2>
<p>Leer la lista es el primer paso, no el último. Cuando haya leído todos los temas, tape las respuestas y póngase a prueba con la ${h.a('us-practice', 'práctica por tema')} y después con el ${h.a('us-test', 'examen de ciudadanía de práctica')}, que se detiene como lo hace el oficial. Repita cada respuesta en inglés en voz alta: es lo que hará el día de la entrevista.</p>
<p>Las respuestas son las de los documentos de USCIS, sin recortes ni añadidos; en 2008, en la traducción oficial de USCIS. Las cuatro opciones de nuestras prácticas, incluidas las tres incorrectas, las escribe Radif Partners y se comprueba que la opción correcta coincide siempre con una respuesta aceptada.</p>`,
  },
});
