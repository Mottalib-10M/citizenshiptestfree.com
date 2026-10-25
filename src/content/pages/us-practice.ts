import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-practice',
  group: 'us',
  order: 60,
  tool: { kind: 'usquiz', props: { version: '2025', mode: 'practice', versionSelect: true } },
  related: ['us-test', 'us-questions', 'us-civics', 'us-english', 'us-2008', 'us-exemptions'],
  sources: ['us_128', 'us_100', 'us_study', 'us_updates'],
  en: {
    slug: 'civics-practice-test',
    nav: 'Civics practice test by theme',
    card: 'Ten official civics questions at a time from the theme you choose, 2025 or 2008 list, each answer corrected at once with every accepted wording.',
    title: 'Civics Practice Test 2026: Official Questions by Theme',
    description: 'Civics practice test by theme: ten official USCIS civics questions at a time, 2025 or 2008 list, each answer checked at once against every accepted wording.',
    h1: 'Civics practice test: official questions theme by theme',
    intro: 'Choose a theme and answer ten questions from the official list. Each answer is checked at once; a new set draws different questions from the same theme.',
    resume: (h) => `Practising by theme is the fastest way to cover the citizenship test, because the officer's questions come from a fixed public list and some themes weigh much more than others. On the 2025 list the government themes hold ${h.us.inTheme('2025', 0) + h.us.inTheme('2025', 1)} of the ${h.us.n25} questions, while symbols and holidays hold ${h.us.inTheme('2025', 6) + h.us.inTheme('2025', 7)}. Working one theme at a time lets you see where you lose points and go back to it the next day, rather than taking full tests that mix everything and hide your weak spots. Each set above has ten questions from the theme you choose, or from the whole list, with four answer choices. When you answer, the tool shows whether you were right and every answer USCIS accepts, so the wording you will need at the interview sinks in as you go. There is no stop rule here: you always answer all ten. Once every theme gives you eight or more right answers out of ten, move on to the full mock test, which runs like the interview, with up to ${h.P.us.test2025.asked} questions and ${h.P.us.test2025.passCorrect} right answers to pass.`,
    faqs: (h) => [
      { q: 'Which theme should I start with?', a: `Start with “${h.us.themes25[1]}”, the largest theme with ${h.us.inTheme('2025', 1)} questions, because it is where most interview questions come from. Then do the principles of government, which explain the system the other questions describe. Leave symbols and holidays for the end of a session: they are quick wins that keep motivation up.` },
      { q: 'How many practice sets a day are useful?', a: 'Three or four sets of ten, spread over the day, work better than one long session. Repeat a theme until two sets in a row give eight right answers or more, then move to the next. Short daily practice over three to four weeks is enough for most applicants who read English comfortably.' },
      { q: 'Why are the same questions sometimes repeated?', a: 'Small themes have few questions: the holidays theme of the 2025 list has fewer than ten, so a set of ten from it repeats nothing but simply shows the whole theme. In larger themes each new set is a new random draw, and seeing a question again after a few sets is a good way to fix the answer.' },
    ],
    body: (h) => `
<h2>Themes, sizes and what they ask</h2>
${h.table(['Theme (2025 list)', 'Questions', 'What it asks'], [[h.us.themes25[0], h.us.inTheme('2025', 0), 'the Constitution, the Bill of Rights, self-government, the rule of law'], [h.us.themes25[1], h.us.inTheme('2025', 1), 'Congress, the President, the courts, federal and state powers'], [h.us.themes25[2], h.us.inTheme('2025', 2), 'voting, the oath, what citizens do and owe'], [h.us.themes25[3], h.us.inTheme('2025', 3), 'colonies, the Revolution, the Declaration, the founders'], [h.us.themes25[4], h.us.inTheme('2025', 4), 'territory, the Civil War, the end of slavery'], [h.us.themes25[5], h.us.inTheme('2025', 5), 'world wars, the Cold War, civil rights, 11 September 2001'], [h.us.themes25[6], h.us.inTheme('2025', 6), 'the flag, the anthem, the motto'], [h.us.themes25[7], h.us.inTheme('2025', 7), 'national holidays']], `Theme sizes counted on the USCIS list, ${h.date(h.P.us.retrieved_at)}.`, ['l', 'r', 'l'])}
<h2>A study plan that works</h2>
<p>The list is long but repetitive: the same institutions and documents come back in many questions. Learning them in the right order saves time.</p>
<ol>
<li><strong>Days 1 to 5: government.</strong> One set per day on the principles theme, then two on the system of government. Read the full list of the theme on the ${h.a('us-questions', 'questions page')} before your first set.</li>
<li><strong>Days 6 to 8: rights and responsibilities.</strong> Short theme, but questions on voting and the oath often come up.</li>
<li><strong>Days 9 to 14: history.</strong> The colonial period first, then the 1800s, then recent history. Make a timeline on paper: dates are easier to keep when they hang on each other.</li>
<li><strong>Days 15 to 16: symbols and holidays.</strong> Two quick sets.</li>
<li><strong>Days 17 onward:</strong> full ${h.a('us-test', 'mock tests')} every day, and back to the theme of any question you miss twice.</li>
</ol>
<h2>Answer aloud, in English</h2>
<p>At the interview there are no choices on a screen: the officer reads the question and you answer aloud. Practise the same way once you know a theme. Read the question, say your answer before you look at the choices, then click. If your spoken answer matches an accepted wording, it counts. This also trains the speaking part of the ${h.a('us-english', 'English test')}, which is judged during the whole conversation.</p>
<h2>2008 list and 65/20</h2>
<p>If USCIS received your N-400 before ${h.date(h.P.us.cutoff)}, pick “2008” in the first menu: the themes change to the ${h.us.themes08.length} groups of the old list. Applicants aged ${h.P.us.s6520.age} or over with ${h.P.us.s6520.years} years as a permanent resident should train on the ${h.a('us-exemptions', '20 questions of the 65/20 test')} instead, which have their own practice tool.</p>
<h2>About the answer choices</h2>
<p>The questions and the accepted answers are those of USCIS, unchanged. The four choices are written by us: one right answer that matches an accepted wording and three wrong answers built to be plausible, such as another founding document or another President. A wrong choice that looks reasonable is a sign of a question to review on the list, not a trick of the real test, where nobody offers you choices.</p>`,
  },
  es: {
    slug: 'practica-examen-de-ciudadania',
    nav: 'Práctica del examen por tema',
    card: 'Diez preguntas cívicas oficiales por serie, del tema que elija, lista de 2025 o de 2008, corregidas al instante en español y en inglés.',
    title: 'Práctica del examen de ciudadanía 2026 por temas',
    description: 'Práctica del examen de ciudadanía por temas: diez preguntas cívicas oficiales de USCIS por serie, lista de 2025 o 2008, en español con la pregunta original en inglés.',
    h1: 'Práctica del examen de ciudadanía, tema por tema',
    intro: 'Elija un tema y responda diez preguntas de la lista oficial. Cada respuesta se corrige al instante; una serie nueva toma otras preguntas del mismo tema.',
    resume: (h) => `Practicar por temas es la forma más rápida de preparar el examen de ciudadanía, porque las preguntas del oficial salen de una lista pública fija y algunos temas pesan mucho más que otros. En la lista de 2025, los temas de gobierno reúnen ${h.us.inTheme('2025', 0) + h.us.inTheme('2025', 1)} de las ${h.us.n25} preguntas, mientras que símbolos y días feriados suman ${h.us.inTheme('2025', 6) + h.us.inTheme('2025', 7)}. Trabajar un tema cada vez le muestra dónde pierde puntos y le permite volver a él al día siguiente, en lugar de hacer exámenes completos que lo mezclan todo y esconden sus puntos débiles. Cada serie de arriba tiene diez preguntas del tema elegido, o de toda la lista, con cuatro opciones. La pregunta aparece en español y en inglés, y al responder la herramienta indica si acertó y muestra todas las respuestas que USCIS acepta. Aquí no hay regla de parada: siempre responde las diez. Cuando todos los temas le den ocho correctas o más de diez, pase al examen completo, que funciona como la entrevista, con hasta ${h.P.us.test2025.asked} preguntas y ${h.P.us.test2025.passCorrect} correctas para aprobar.`,
    faqs: (h) => [
      { q: '¿Por qué tema conviene empezar?', a: `Por «${h.us.themes25[1]}», el tema más grande, con ${h.us.inTheme('2025', 1)} preguntas, porque de él salen la mayoría de las preguntas de la entrevista. Después, los principios del gobierno, que explican el sistema que describen las demás preguntas. Deje símbolos y días feriados para el final de cada sesión: son aciertos rápidos que mantienen la motivación.` },
      { q: '¿Debo practicar en español o en inglés?', a: 'En los dos, en este orden: lea la pregunta en español para entenderla, y después repita la pregunta y la respuesta en inglés en voz alta, porque es en inglés como se la harán, salvo exención por edad. Cuando un tema le salga bien, intente responder mirando solo la línea en inglés.' },
      { q: '¿Cuántas series al día son útiles?', a: 'Tres o cuatro series de diez, repartidas durante el día, funcionan mejor que una sesión larga. Repita un tema hasta que dos series seguidas le den ocho correctas o más, y pase al siguiente. Una práctica corta y diaria durante tres o cuatro semanas basta para la mayoría de los solicitantes.' },
    ],
    body: (h) => `
<h2>Temas, tamaño y contenido</h2>
${h.table(['Tema (lista de 2025)', 'Preguntas', 'De qué trata'], [[h.us.themes25[0], h.us.inTheme('2025', 0), 'la Constitución, la Carta de Derechos, el autogobierno, el estado de derecho'], [h.us.themes25[1], h.us.inTheme('2025', 1), 'el Congreso, el presidente, los tribunales, los poderes federales y estatales'], [h.us.themes25[2], h.us.inTheme('2025', 2), 'el voto, el juramento, los deberes de los ciudadanos'], [h.us.themes25[3], h.us.inTheme('2025', 3), 'las colonias, la Revolución, la Declaración, los fundadores'], [h.us.themes25[4], h.us.inTheme('2025', 4), 'el territorio, la Guerra Civil, el fin de la esclavitud'], [h.us.themes25[5], h.us.inTheme('2025', 5), 'las guerras mundiales, la Guerra Fría, los derechos civiles, el 11 de septiembre'], [h.us.themes25[6], h.us.inTheme('2025', 6), 'la bandera, el himno, el lema'], [h.us.themes25[7], h.us.inTheme('2025', 7), 'los días feriados nacionales']], `Tamaño de los temas contado en la lista de USCIS, ${h.date(h.P.us.retrieved_at)}.`, ['l', 'r', 'l'])}
<h2>Un plan de estudio que funciona</h2>
<p>La lista es larga pero repetitiva: las mismas instituciones y los mismos documentos vuelven en muchas preguntas. Aprenderlos en buen orden ahorra tiempo.</p>
<ol>
<li><strong>Días 1 a 5: gobierno.</strong> Una serie al día sobre los principios y dos sobre el sistema de gobierno. Lea el tema completo en la ${h.a('us-questions', 'página de preguntas')} antes de la primera serie.</li>
<li><strong>Días 6 a 8: derechos y responsabilidades.</strong> Tema corto, pero las preguntas sobre el voto y el juramento salen a menudo.</li>
<li><strong>Días 9 a 14: historia.</strong> Primero la época colonial, después el siglo XIX y por último la historia reciente. Haga una línea del tiempo en papel: las fechas se recuerdan mejor encadenadas.</li>
<li><strong>Días 15 y 16: símbolos y días feriados.</strong> Dos series rápidas.</li>
<li><strong>Desde el día 17:</strong> ${h.a('us-test', 'exámenes de práctica completos')} cada día, y vuelta al tema de cada pregunta que falle dos veces.</li>
</ol>
<h2>Responda en voz alta y en inglés</h2>
<p>En la entrevista no hay opciones en una pantalla: el oficial lee la pregunta y usted responde en voz alta. Cuando ya domine un tema, practique así: lea la pregunta en inglés, diga su respuesta antes de mirar las opciones y después haga clic. Esto entrena también la parte oral del ${h.a('us-english', 'examen de inglés')}, que se evalúa durante toda la conversación.</p>
<h2>Lista de 2008 y examen 65/20</h2>
<p>Si USCIS recibió su N-400 antes del ${h.date(h.P.us.cutoff)}, elija «2008» en el primer menú: los temas pasan a los ${h.us.themes08.length} grupos de la lista antigua, con la traducción oficial de USCIS. Quien tiene ${h.P.us.s6520.age} años o más y ${h.P.us.s6520.years} años de residencia permanente debe practicar con las ${h.a('us-exemptions', '20 preguntas del examen 65/20')}, que tienen su propia herramienta.</p>
<h2>Sobre las opciones de respuesta</h2>
<p>Las preguntas y las respuestas aceptadas son las de USCIS; en 2025, en nuestra traducción no oficial. Las cuatro opciones las escribimos nosotros: una correcta que coincide con una respuesta aceptada y tres incorrectas pensadas para ser verosímiles, como otro documento fundador u otro presidente. Una opción incorrecta que parece razonable indica una pregunta que conviene repasar, no una trampa del examen real, donde nadie le ofrece opciones.</p>`,
  },
});
