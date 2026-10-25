import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-exemptions',
  group: 'us',
  order: 70,
  tool: { kind: 'usquiz', props: { version: '2025', mode: '6520', versionSelect: true } },
  mini: { kind: 'mini:usexempt' },
  related: ['us-which', 'us-civics', 'us-questions', 'us-2008', 'us-english', 'us-test'],
  sources: ['us_exceptions', 'us_exceptions_es', 'us_pm_e2', 'us_128', 'us_100'],
  en: {
    slug: '65-20-civics-test',
    nav: '65/20 test and English exemptions',
    card: 'For applicants 65 or older with 20 years as a permanent resident: the 20 starred questions, a 10-question practice test, and the 50/20 and 55/15 rules.',
    title: '65/20 Civics Test 2026: The 20 Questions and Exemptions',
    description: '65/20 civics test: the 20 official questions for applicants 65 or older with 20 years of residence, a practice test, and the 50/20 and 55/15 English exemptions.',
    h1: '65/20 civics test and English exemptions',
    intro: 'Aged 65 or over with 20 years as a permanent resident? You study 20 questions, not the full list. Practise them below, 2025 or 2008 version.',
    resume: (h) => `The 65/20 civics test is the special consideration USCIS gives to applicants who, on the day they file Form N-400, are ${h.P.us.s6520.age} or older and have been permanent residents for at least ${h.P.us.s6520.years} years. Instead of the full list, they study only the 20 questions marked with an asterisk; the officer asks up to ${h.P.us.s6520.asked} of them and ${h.P.us.s6520.passCorrect} right answers are enough, in the 2025 version as in the 2008 one. They are also exempt from the English test and may take the civics test in the language of their choice, with an interpreter they bring. Two other groups are exempt from English but keep the full civics list: applicants ${h.P.us.englishExempt[0].age} or older with ${h.P.us.englishExempt[0].years} years as a permanent resident (the 50/20 rule) and applicants ${h.P.us.englishExempt[1].age} or older with ${h.P.us.englishExempt[1].years} years (55/15). Age and years are counted on the filing date, not at the interview, so a few months can make the difference. The practice test above draws ${h.P.us.s6520.asked} of the 20 starred questions of the version you choose and stops at ${h.P.us.s6520.passCorrect} right or ${h.P.us.s6520.failWrong} wrong, as the officer does.`,
    faqs: (h) => [
      { q: 'Do the 20 years have to be continuous?', a: 'No. The USCIS Policy Manual speaks of living in the United States for periods totaling at least 20 years after becoming a permanent resident, so separate periods add up. Years spent living abroad do not add to the total. If you spent long periods outside the country, count your years carefully, with proof, before relying on the exemption.' },
      { q: 'Who can be my interpreter?', a: 'USCIS says you must bring the interpreter yourself and that the interpreter must be fluent in both English and your language. The official page sets no other condition on who it can be. Choose someone calm and precise who will translate word for word, without adding help: the officer judges your answers through their words.' },
      { q: 'I turn 65 a month after I could file. Should I wait?', a: `If waiting puts you past ${h.P.us.s6520.age} with ${h.P.us.s6520.years} years as a permanent resident on the filing date, a short wait replaces a list of ${h.us.n25} questions in English with 20 questions in your language. Weigh that against the extra month of waiting. Check both conditions on the version checker before deciding.` },
    ],
    body: (h) => `
<h2>Who qualifies for what</h2>
${h.table(['On the day you file', 'English test', 'Civics test', 'Questions to study'], [[`${h.P.us.s6520.age}+ and ${h.P.us.s6520.years}+ years as a permanent resident (65/20)`, 'exempt', 'in your language', `20 starred, up to ${h.P.us.s6520.asked} asked, ${h.P.us.s6520.passCorrect} to pass`], [`${h.P.us.englishExempt[0].age}+ and ${h.P.us.englishExempt[0].years}+ years (50/20)`, 'exempt', 'in your language', `full list (${h.us.n25} or ${h.us.n08})`], [`${h.P.us.englishExempt[1].age}+ and ${h.P.us.englishExempt[1].years}+ years (55/15)`, 'exempt', 'in your language', `full list (${h.us.n25} or ${h.us.n08})`], ['Medical disability (Form N-648)', 'may be waived', 'may be waived', 'depends on the certification']], `USCIS exceptions and accommodations page and Policy Manual, read on ${h.date(h.P.us.retrieved_at)}.`, ['l', 'l', 'l', 'l'])}
<p>The mini-tool above applies the age and years rules for you. Note that the 50/20 and 55/15 rules only lift the English test: the civics test is still the full one, in your language.</p>
<h2>The 20 questions of the 2025 version</h2>
<ol>
${h.us.stars('2025').map((x) => `<li>${x.en.q} <span class="text-navy-700">(${x.local ? 'answer depends on where you live' : x.en.a.slice(0, 2).join('; ')})</span></li>`).join('\n')}
</ol>
<p>Some of these questions ask about current officeholders. Give the names on the USCIS test updates page on the day of your interview; we use those listed on ${h.date(h.P.us.retrieved_at)}.</p>
<h2>The 20 questions of the 2008 version</h2>
<p>If USCIS received your N-400 before ${h.date(h.P.us.cutoff)}, the starred questions are those of the 2008 list. Choose “2008” in the first menu of the practice test, or read them here:</p>
<ol>
${h.us.stars('2008').map((x) => `<li>${x.en.q}</li>`).join('\n')}
</ol>
<h2>Taking the test in your language</h2>
<p>When you are exempt from English, the officer asks the civics questions in English and your interpreter translates them; you answer in your language and the interpreter translates back. USCIS states that you must bring the interpreter yourself and that the interpreter must be fluent in both languages. Practise with that person beforehand, using the Spanish version of this page if Spanish is your language: the 2008 questions exist in an official USCIS translation, and for 2025 we provide our own translation.</p>
<h2>The medical exception</h2>
<p>A physical or developmental disability or a mental impairment that prevents you from learning English or civics can lead to a waiver of one or both tests. You ask for it with Form N-648, Medical Certification for Disability Exceptions, completed by a licensed medical or osteopathic doctor or a licensed clinical psychologist, and filed with the N-400; a form handed in later, at the interview for example, is accepted only for extenuating circumstances. The officer reviews the certification, and an incomplete one can be refused, so the doctor must explain how the condition affects learning, not only name it.</p>
<h2>Everything else still applies</h2>
<p>An exemption changes the test, not the rest of naturalization: the residence and presence conditions, good moral character, the oath and the ${h.a('us-fee', 'N-400 fee')} are the same for everyone. The ${h.a('us-n400', 'N-400 date tool')} checks when you can file, and the ${h.a('us-which', 'version checker')} confirms which list you study.</p>`,
  },
  es: {
    slug: 'examen-65-20',
    nav: 'Examen 65/20 y exenciones de inglés',
    card: 'Para quien tiene 65 años o más y 20 años de residente: las 20 preguntas marcadas, una práctica de 10 preguntas y las reglas 50/20 y 55/15.',
    title: 'Examen 65/20 en español 2026: las 20 preguntas cívicas',
    description: 'Examen 65/20 en español: las 20 preguntas oficiales para quien tiene 65 años o más y 20 años de residencia, con una práctica y las exenciones de inglés.',
    h1: 'Examen 65/20 y exenciones del examen de inglés',
    intro: '¿Tiene 65 años o más y 20 años como residente permanente? Estudia 20 preguntas, no la lista completa, y puede hacer el examen en español. Practíquelas abajo.',
    resume: (h) => `El examen 65/20 es la consideración especial que USCIS concede a quien, el día en que presenta el Formulario N-400, tiene ${h.P.us.s6520.age} años o más y al menos ${h.P.us.s6520.years} años como residente permanente. En lugar de la lista completa, estudia solo las 20 preguntas marcadas con un asterisco; el oficial hace hasta ${h.P.us.s6520.asked} y bastan ${h.P.us.s6520.passCorrect} respuestas correctas, tanto en la versión de 2025 como en la de 2008. Además está exento del examen de inglés y puede hacer el examen cívico en el idioma que elija, en español por ejemplo, con un intérprete que debe llevar. Otros dos grupos están exentos del inglés pero conservan la lista cívica completa: quien tiene ${h.P.us.englishExempt[0].age} años o más con ${h.P.us.englishExempt[0].years} años de residencia permanente (regla 50/20) y quien tiene ${h.P.us.englishExempt[1].age} años o más con ${h.P.us.englishExempt[1].years} años (55/15). La edad y los años se cuentan el día de la presentación, no el de la entrevista. La práctica de arriba toma ${h.P.us.s6520.asked} de las 20 preguntas marcadas de la versión que elija, en español, y se detiene con ${h.P.us.s6520.passCorrect} correctas o ${h.P.us.s6520.failWrong} incorrectas, como el oficial.`,
    faqs: (h) => [
      { q: '¿Las preguntas 65/20 de 2008 están en español oficial?', a: 'Sí. USCIS publica en español las 20 preguntas 65/20 de la versión de 2008, y las mostramos con esa traducción. Para la versión de 2025, USCIS solo publica la lista en inglés: la traducción que usamos es nuestra y no es oficial, así que conviene que su intérprete conozca también la pregunta en inglés.' },
      { q: '¿Quién puede ser mi intérprete?', a: 'USCIS indica que usted debe llevar al intérprete y que este debe hablar con fluidez el inglés y su idioma. La página oficial no fija otra condición sobre quién puede ser. Elija a alguien tranquilo y preciso que traduzca palabra por palabra, sin ayudarle: el oficial juzga sus respuestas a través de sus palabras.' },
      { q: 'Cumplo 65 años un mes después de la fecha en que podría presentar. ¿Espero?', a: `Si al esperar llega a ${h.P.us.s6520.age} años con ${h.P.us.s6520.years} años de residencia el día de la presentación, una espera corta cambia una lista de ${h.us.n25} preguntas en inglés por 20 preguntas en su idioma. Compárelo con el mes de espera y compruebe las dos condiciones en el verificador de versión antes de decidir.` },
    ],
    body: (h) => `
<h2>Quién tiene derecho a qué</h2>
${h.table(['El día de la presentación', 'Examen de inglés', 'Examen cívico', 'Preguntas que estudiar'], [[`${h.P.us.s6520.age} años o más y ${h.P.us.s6520.years} o más de residencia (65/20)`, 'exento', 'en su idioma', `20 marcadas, hasta ${h.P.us.s6520.asked}, ${h.P.us.s6520.passCorrect} para aprobar`], [`${h.P.us.englishExempt[0].age} o más y ${h.P.us.englishExempt[0].years} o más (50/20)`, 'exento', 'en su idioma', `lista completa (${h.us.n25} o ${h.us.n08})`], [`${h.P.us.englishExempt[1].age} o más y ${h.P.us.englishExempt[1].years} o más (55/15)`, 'exento', 'en su idioma', `lista completa (${h.us.n25} o ${h.us.n08})`], ['Discapacidad médica (Formulario N-648)', 'puede eximirse', 'puede eximirse', 'según la certificación']], `Página de excepciones de USCIS y Manual de Políticas, leídos el ${h.date(h.P.us.retrieved_at)}.`, ['l', 'l', 'l', 'l'])}
<p>La mini herramienta de arriba aplica las reglas de edad y años por usted. Tenga en cuenta que las reglas 50/20 y 55/15 solo eliminan el examen de inglés: el examen cívico sigue siendo el completo, en su idioma.</p>
<h2>Las 20 preguntas de la versión 2025</h2>
<ol>
${h.us.stars('2025').map((x) => `<li>${x.es.q} <span class="text-navy-700">(${x.local ? 'depende de dónde vive' : x.es.a.slice(0, 2).join('; ')})</span> <em lang="en">${x.en.q}</em></li>`).join('\n')}
</ol>
<p>Traducción no oficial de Radif Partners. Algunas preguntas piden quién ocupa hoy un cargo: dé los nombres de la página de actualizaciones de USCIS el día de su entrevista; usamos los publicados el ${h.date(h.P.us.retrieved_at)}.</p>
<h2>Las 20 preguntas de la versión 2008</h2>
<p>Si USCIS recibió su N-400 antes del ${h.date(h.P.us.cutoff)}, las preguntas marcadas son las de la lista de 2008, en la traducción oficial de USCIS. Elija «2008» en el primer menú de la práctica, o léalas aquí:</p>
<ol>
${h.us.stars('2008').map((x) => `<li>${x.es.q}</li>`).join('\n')}
</ol>
<h2>Hacer el examen en su idioma</h2>
<p>Cuando está exento del inglés, el oficial hace las preguntas cívicas en inglés y su intérprete las traduce; usted responde en su idioma y el intérprete traduce la respuesta. USCIS indica que usted debe llevar al intérprete y que este debe hablar con fluidez los dos idiomas. Practique antes con esa persona, en voz alta, con la lista de su versión.</p>
<h2>La excepción médica</h2>
<p>Una discapacidad física o del desarrollo, o un deterioro mental, que le impida aprender inglés o educación cívica puede eximirle de uno o de los dos exámenes. Se pide con el Formulario N-648, Certificación Médica para Excepciones por Discapacidad, completado por un médico u osteópata autorizado o por un psicólogo clínico autorizado, y se presenta con el N-400; un formulario entregado más tarde, en la entrevista por ejemplo, solo se acepta por circunstancias atenuantes. El oficial revisa la certificación y puede rechazarla si está incompleta: el médico debe explicar cómo la afección impide aprender, no solo nombrarla.</p>
<h2>Todo lo demás se mantiene</h2>
<p>Una exención cambia el examen, no el resto de la naturalización: los requisitos de residencia y presencia, el buen carácter moral, el juramento y la ${h.a('us-fee', 'tarifa del N-400')} son iguales para todos. La herramienta del ${h.a('us-n400', 'Formulario N-400')} comprueba cuándo puede presentar, y el ${h.a('us-which', 'verificador de versión')} confirma qué lista estudia.</p>`,
  },
});
