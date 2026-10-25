import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-civics',
  group: 'us',
  order: 20,
  tool: { kind: 'usquiz', props: { version: '2025', mode: 'exam', versionSelect: true } },
  mini: { kind: 'mini:usexempt' },
  related: ['us-test', 'us-questions', 'us-practice', 'us-2008', 'us-which', 'us-exemptions'],
  sources: ['us_128', 'us_100', 'us_study', 'us_updates', 'us_fr_notice', 'us_pm_e2'],
  en: {
    slug: 'civics-test',
    nav: 'Civics test 2025',
    card: 'The 2025 civics test explained: 128 official questions, 20 asked, 12 to pass, and how it differs from the 2008 test of 100 questions.',
    title: 'Civics Test 2026: The 128 Questions, 20 Asked, 12 to Pass',
    description: 'Civics test for naturalization: the 2025 version with 128 official questions, up to 20 asked and 12 to pass, compared with the 2008 test, with a free mock test.',
    h1: 'Civics test for naturalization: the 2025 version explained',
    intro: 'Choose the version that matches your N-400 filing date and take a mock civics test. Below: what changed in 2025, theme by theme.',
    resume: (h) => `The civics test is the part of the naturalization interview that checks what you know about American history and government. USCIS changed it for applications filed on or after ${h.date(h.P.us.cutoff)}: the 2025 version has a public list of ${h.us.n25} questions, of which the officer asks up to ${h.P.us.test2025.asked}, and you pass with ${h.P.us.test2025.passCorrect} correct answers. The earlier 2008 version, still given to everyone who filed before that date, has ${h.us.n08} questions, up to ${h.P.us.test2008.asked} asked and ${h.P.us.test2008.passCorrect} to pass. In both versions the pass mark is the same share, 60 percent, and the officer stops as soon as the result is certain: at ${h.P.us.test2025.passCorrect} right or ${h.P.us.test2025.failWrong} wrong in 2025. The questions are asked aloud and answered aloud, in English unless you qualify for an age exemption. The list is grouped in ${h.us.themes25.length} themes, from the principles of American government to holidays. The mock test above uses the official list of the version you pick and marks your answer against every answer USCIS accepts.`,
    faqs: (h) => [
      { q: 'Is the 2025 civics test harder than the 2008 one?', a: `It is longer. The list grew from ${h.us.n08} to ${h.us.n25} questions and the officer may ask up to ${h.P.us.test2025.asked} instead of ${h.P.us.test2008.asked}, so luck matters less and preparation more. The share needed to pass did not change: ${h.P.us.test2025.passCorrect} of ${h.P.us.test2025.asked} and ${h.P.us.test2008.passCorrect} of ${h.P.us.test2008.asked} are both 60 percent. Several new questions ask why an event mattered, not only when it happened.` },
      { q: 'Can I choose to take the 2008 test instead?', a: `No. The version is set by the date USCIS received your Form N-400, not by your choice or by the interview date. An application received before ${h.date(h.P.us.cutoff)} keeps the 2008 test until the end, including a retest. An application received on that day or later gets the 2025 test, even if an earlier one was denied.` },
      { q: 'Do I have to learn all 128 questions?', a: `Yes, unless you qualify for the 65/20 consideration (aged ${h.P.us.s6520.age} or over with ${h.P.us.s6520.years} years as a permanent resident), who study only 20 marked questions. The officer picks the questions, and you do not know which ones in advance. In practice, a few themes such as the system of government hold most of the list, so they deserve most of your time.` },
    ],
    body: (h) => `
<h2>What changed with the 2025 civics test</h2>
<p>USCIS announced the new version in the Federal Register and applies it to every Form N-400 received on or after ${h.date(h.P.us.cutoff)}. Three things changed for the applicant:</p>
<ul>
<li><strong>A longer list.</strong> ${h.us.n25} questions instead of ${h.us.n08}. Most 2008 questions are still there, sometimes reworded, and new ones were added on history and on the Constitution.</li>
<li><strong>More questions asked.</strong> Up to ${h.P.us.test2025.asked} instead of ${h.P.us.test2008.asked}, with ${h.P.us.test2025.passCorrect} right answers to pass instead of ${h.P.us.test2008.passCorrect}.</li>
<li><strong>A new stop rule.</strong> The officer ends the test at ${h.P.us.test2025.passCorrect} right or at ${h.P.us.test2025.failWrong} wrong. Under the 2008 test the figures were ${h.P.us.test2008.passCorrect} and ${h.P.us.test2008.failWrong}.</li>
</ul>
<p>What did not change: the test is oral, it is given during the naturalization interview, there is no time limit per question, and you get a second chance on the civics part if you fail it the first time.</p>
<h2>The ${h.us.themes25.length} themes of the 2025 list</h2>
${h.table(['Theme', 'Questions'], h.us.themes25.map((t, i) => [t, h.us.inTheme('2025', i)]), `Count from the USCIS list (form M-1778), read on ${h.date(h.P.us.retrieved_at)}.`, ['l', 'r'])}
<p>The three government themes (principles, system, rights and responsibilities) hold ${h.us.inTheme('2025', 0) + h.us.inTheme('2025', 1) + h.us.inTheme('2025', 2)} of the ${h.us.n25} questions. The history themes ask fewer questions but expect precise answers: a war, a document, a person. Symbols and holidays are short and easy points if you have read them twice.</p>
<h2>Answers that change with elections</h2>
<p>Some questions ask who holds an office now: the President, the Vice President, the Speaker of the House, the Chief Justice, and in the 2008 list the party of the President. USCIS keeps the current answers on its ${h.src('us_updates', 'test updates page')}, which read “Last Reviewed/Updated” ${h.date(h.us.updatesReviewed)} on the day we checked it. If an office changes hands before your interview, the new name is the one to give. Four other questions depend on your state and are covered on the ${h.a('us-questions', 'questions page')}.</p>
<h2>Who takes which test</h2>
<p>Most applicants take the full test in English. Two groups are treated differently, and both are counted on the day the N-400 is filed:</p>
<ul>
<li>Aged ${h.P.us.englishExempt[0].age} or over with ${h.P.us.englishExempt[0].years} years as a permanent resident, or ${h.P.us.englishExempt[1].age} or over with ${h.P.us.englishExempt[1].years} years: no English test, and the civics test in your own language with an interpreter.</li>
<li>Aged ${h.P.us.s6520.age} or over with ${h.P.us.s6520.years} years as a permanent resident: the same, plus a shorter list of 20 questions marked for special consideration, of which up to ${h.P.us.s6520.asked} are asked and ${h.P.us.s6520.passCorrect} must be right.</li>
</ul>
<p>The mini-tool above shows which case applies at your age; the ${h.a('us-exemptions', 'exemptions page')} has the 65/20 questions and a practice test on them. A medical disability exception, requested with Form N-648 signed by a doctor, can waive the tests at any age.</p>
<h2>How to use the mock civics test</h2>
<p>Pick your version in the first menu. Each answer is marked at once and shows every answer USCIS accepts, so you learn the wording as you go. When the officer would stop, the tool stops too and lists the questions you missed. Start a new test as often as you like: the draw changes each time. Once you pass several times in a row, switch to ${h.a('us-practice', 'practice by theme')} for the themes you miss most, then come back to full tests in the last week.</p>`,
  },
  es: {
    slug: 'examen-de-educacion-civica',
    nav: 'Examen cívico 2025',
    card: 'El examen cívico de 2025 explicado: 128 preguntas oficiales, 20 preguntadas, 12 para aprobar, y en qué se diferencia del de 2008.',
    title: 'Examen de educación cívica 2026: las 128 preguntas',
    description: 'Examen de educación cívica para la naturalización: versión 2025 con 128 preguntas oficiales, hasta 20 preguntadas y 12 para aprobar, frente a la de 2008, con práctica.',
    h1: 'Examen de educación cívica: la versión de 2025 explicada',
    intro: 'Elija la versión que corresponde a la fecha de su N-400 y haga un examen cívico de práctica. Debajo: qué cambió en 2025, tema por tema.',
    resume: (h) => `El examen de educación cívica es la parte de la entrevista de naturalización que comprueba lo que usted sabe de la historia y del gobierno de Estados Unidos. USCIS lo cambió para las solicitudes presentadas desde el ${h.date(h.P.us.cutoff)}: la versión de 2025 tiene una lista pública de ${h.us.n25} preguntas, de las que el oficial hace hasta ${h.P.us.test2025.asked}, y se aprueba con ${h.P.us.test2025.passCorrect} respuestas correctas. La versión anterior, de 2008, que se sigue aplicando a quien presentó antes de esa fecha, tiene ${h.us.n08} preguntas, hasta ${h.P.us.test2008.asked} preguntadas y ${h.P.us.test2008.passCorrect} para aprobar. En las dos versiones la proporción exigida es la misma, el 60 %, y el oficial se detiene en cuanto el resultado es seguro: con ${h.P.us.test2025.passCorrect} correctas o ${h.P.us.test2025.failWrong} incorrectas en 2025. Las preguntas se hacen y se contestan en voz alta, en inglés salvo exención por edad. La lista se agrupa en ${h.us.themes25.length} temas, desde los principios del gobierno hasta los días feriados. La práctica de arriba usa la lista oficial de la versión que elija y compara su respuesta con todas las que USCIS acepta.`,
    faqs: (h) => [
      { q: '¿Es más difícil el examen cívico de 2025 que el de 2008?', a: `Es más largo. La lista pasó de ${h.us.n08} a ${h.us.n25} preguntas y el oficial puede hacer hasta ${h.P.us.test2025.asked} en lugar de ${h.P.us.test2008.asked}, así que la suerte cuenta menos y la preparación más. La proporción para aprobar no cambió: ${h.P.us.test2025.passCorrect} de ${h.P.us.test2025.asked} y ${h.P.us.test2008.passCorrect} de ${h.P.us.test2008.asked} son el 60 %. Varias preguntas nuevas piden por qué un hecho fue importante.` },
      { q: '¿Puedo elegir el examen de 2008?', a: `No. La versión depende de la fecha en que USCIS recibió su Formulario N-400, no de su elección ni de la fecha de la entrevista. Una solicitud recibida antes del ${h.date(h.P.us.cutoff)} conserva el examen de 2008 hasta el final, incluida la segunda oportunidad. Una solicitud recibida ese día o después hace el de 2025.` },
      { q: '¿Tengo que aprender las 128 preguntas?', a: `Sí, salvo que tenga derecho a la consideración 65/20 (${h.P.us.s6520.age} años o más y ${h.P.us.s6520.years} años como residente permanente), que solo estudia 20 preguntas marcadas. El oficial elige las preguntas y usted no sabe cuáles serán. En la práctica, unos pocos temas, como el sistema de gobierno, concentran la mayor parte de la lista y merecen la mayor parte del tiempo.` },
    ],
    body: (h) => `
<h2>Qué cambió con el examen cívico de 2025</h2>
<p>USCIS anunció la nueva versión en el Registro Federal y la aplica a todo Formulario N-400 recibido desde el ${h.date(h.P.us.cutoff)}. Para el solicitante cambiaron tres cosas:</p>
<ul>
<li><strong>Una lista más larga.</strong> ${h.us.n25} preguntas en lugar de ${h.us.n08}. La mayoría de las preguntas de 2008 siguen ahí, a veces con otra redacción, y se añadieron otras sobre historia y sobre la Constitución.</li>
<li><strong>Más preguntas en la entrevista.</strong> Hasta ${h.P.us.test2025.asked} en lugar de ${h.P.us.test2008.asked}, con ${h.P.us.test2025.passCorrect} correctas para aprobar en lugar de ${h.P.us.test2008.passCorrect}.</li>
<li><strong>Una nueva regla de parada.</strong> El oficial termina con ${h.P.us.test2025.passCorrect} correctas o con ${h.P.us.test2025.failWrong} incorrectas. En el examen de 2008 las cifras eran ${h.P.us.test2008.passCorrect} y ${h.P.us.test2008.failWrong}.</li>
</ul>
<p>Lo que no cambió: el examen es oral, se hace durante la entrevista de naturalización, no hay tiempo límite por pregunta y hay una segunda oportunidad para la parte cívica si no se aprueba la primera vez.</p>
<h2>Los ${h.us.themes25.length} temas de la lista de 2025</h2>
${h.table(['Tema', 'Preguntas'], h.us.themes25.map((t, i) => [t, h.us.inTheme('2025', i)]), `Recuento hecho sobre la lista de USCIS (formulario M-1778), leída el ${h.date(h.P.us.retrieved_at)}.`, ['l', 'r'])}
<p>Los tres temas de gobierno (principios, sistema, derechos y responsabilidades) reúnen ${h.us.inTheme('2025', 0) + h.us.inTheme('2025', 1) + h.us.inTheme('2025', 2)} de las ${h.us.n25} preguntas. Los de historia tienen menos preguntas, pero esperan respuestas precisas: una guerra, un documento, una persona. Símbolos y días feriados son puntos fáciles si los ha leído dos veces.</p>
<h2>Respuestas que cambian con las elecciones</h2>
<p>Algunas preguntas piden quién ocupa hoy un cargo: el presidente, el vicepresidente, el presidente de la Cámara de Representantes, el presidente de la Corte Suprema y, en la lista de 2008, el partido del presidente. USCIS publica las respuestas vigentes en su ${h.src('us_updates', 'página de actualizaciones del examen')}, con la mención «Last Reviewed/Updated» del ${h.date(h.us.updatesReviewed)} el día en que la consultamos. Si un cargo cambia antes de su entrevista, debe dar el nombre nuevo. Otras cuatro preguntas dependen de su estado y se explican en la ${h.a('us-questions', 'página de preguntas')}.</p>
<h2>Quién hace qué examen</h2>
<p>La mayoría de los solicitantes hace el examen completo en inglés. Dos grupos tienen un trato distinto, y en los dos casos se cuenta el día en que se presenta el N-400:</p>
<ul>
<li>${h.P.us.englishExempt[0].age} años o más con ${h.P.us.englishExempt[0].years} años de residencia permanente, o ${h.P.us.englishExempt[1].age} años o más con ${h.P.us.englishExempt[1].years} años: sin examen de inglés, y el examen cívico en su idioma con un intérprete.</li>
<li>${h.P.us.s6520.age} años o más con ${h.P.us.s6520.years} años de residencia permanente: lo mismo, y además una lista corta de 20 preguntas marcadas, de las que se hacen hasta ${h.P.us.s6520.asked} y hay que acertar ${h.P.us.s6520.passCorrect}.</li>
</ul>
<p>La mini herramienta de arriba indica qué caso corresponde a su edad; la página de ${h.a('us-exemptions', 'exenciones')} tiene las 20 preguntas y una práctica sobre ellas. Una excepción por discapacidad médica, pedida con el Formulario N-648 firmado por un médico, puede eximir de los exámenes a cualquier edad.</p>
<h2>Cómo usar el examen de práctica</h2>
<p>Elija su versión en el primer menú. Cada respuesta se corrige al instante y muestra todas las respuestas que USCIS acepta, para que aprenda las palabras exactas. Cuando el oficial se detendría, la herramienta también se detiene y enumera las preguntas falladas. Empiece un examen nuevo tantas veces como quiera: las preguntas cambian cada vez. Cuando apruebe varias veces seguidas, pase a la ${h.a('us-practice', 'práctica por tema')} en los temas que más falla y vuelva a los exámenes completos la última semana.</p>`,
  },
});
