import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-which',
  group: 'us',
  order: 50,
  tool: { kind: 'uswhich' },
  mini: { kind: 'mini:usexempt' },
  related: ['us-civics', 'us-2008', 'us-exemptions', 'us-test', 'us-n400', 'us-english'],
  sources: ['us_fr_notice', 'us_study', 'us_128', 'us_100', 'us_exceptions'],
  en: {
    slug: 'new-citizenship-test-2025',
    nav: 'New citizenship test: which version?',
    card: 'Enter your N-400 filing date, age and years as a green card holder: the tool says whether you take the 2008 or the new 2025 test, and in which language.',
    title: 'New Citizenship Test 2025: Which Version Is Yours?',
    description: 'New citizenship test of 2025 or old 2008 test? Enter your N-400 filing date, age and years as a permanent resident to see your version, its rules and exemptions.',
    h1: 'New citizenship test: 2008 or 2025, which one do you take?',
    intro: 'The version depends on one date: the day USCIS received your N-400. Add your age and years as a permanent resident to see the 65/20 and English exemptions too.',
    resume: (h) => `The new citizenship test is the 2025 civics test, and whether you take it depends on a single date: the day USCIS received your Form N-400. Applications received on or after ${h.date(h.P.us.cutoff)} take the new test, with ${h.us.n25} official questions, up to ${h.P.us.test2025.asked} asked and ${h.P.us.test2025.passCorrect} right answers to pass. Applications received earlier keep the 2008 test, with ${h.us.n08} questions, up to ${h.P.us.test2008.asked} asked and ${h.P.us.test2008.passCorrect} to pass, even if the interview takes place in 2026. The date of your interview, of your biometrics appointment or of your green card plays no part. Two other facts, both counted on the filing date, change what you are asked: your age and how long you have been a permanent resident. From ${h.P.us.englishExempt[0].age} with ${h.P.us.englishExempt[0].years} years, or ${h.P.us.englishExempt[1].age} with ${h.P.us.englishExempt[1].years} years, there is no English test and the civics test may be taken in your language; from ${h.P.us.s6520.age} with ${h.P.us.s6520.years} years, only 20 marked questions are studied. The checker above applies the three rules to your dates.`,
    faqs: (h) => [
      { q: 'Where do I find the date USCIS received my N-400?', a: 'On the receipt notice USCIS sends after you file, Form I-797C, Notice of Action, under “Received Date”. If you filed online, the same notice appears in your USCIS online account. It is not the date you mailed or submitted the form, and not the priority date of your green card.' },
      { q: 'Why did USCIS change the civics test in 2025?', a: `USCIS announced a revised civics test in a Federal Register notice and set ${h.date(h.P.us.cutoff)} as the first filing date to which it applies. The new list is longer and the officer asks more questions, with the same 60 percent needed to pass. The English part of the test stays as it was.` },
      { q: 'Does the new test apply to my retest after failing?', a: 'No, if your first application was filed before the cut-off. A retest belongs to the same application and uses the same version, 2008 in that case. Only a new N-400, filed on or after the cut-off date, brings the 2025 test.' },
    ],
    body: (h) => `
<h2>The three rules behind the checker</h2>
${h.table(['Your situation on the filing date', 'English test', 'Civics test'], [['Under the thresholds below', 'required', `in English, ${h.P.us.test2025.asked} of ${h.us.n25} (2025) or ${h.P.us.test2008.asked} of ${h.us.n08} (2008)`], [`Aged ${h.P.us.englishExempt[1].age}+ with ${h.P.us.englishExempt[1].years}+ years as a permanent resident`, 'exempt', 'full list, in your language with an interpreter'], [`Aged ${h.P.us.englishExempt[0].age}+ with ${h.P.us.englishExempt[0].years}+ years`, 'exempt', 'full list, in your language with an interpreter'], [`Aged ${h.P.us.s6520.age}+ with ${h.P.us.s6520.years}+ years`, 'exempt', `20 starred questions, up to ${h.P.us.s6520.asked} asked, ${h.P.us.s6520.passCorrect} to pass`]], `USCIS exceptions and accommodations page, read on ${h.date(h.P.us.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>The years are those spent as a lawful permanent resident, counted from the “Resident since” date on the green card, not years in the United States in any status. Time on a visa before the green card does not count.</p>
<h2>Old test or new test: what changes for you</h2>
<ul>
<li><strong>The list.</strong> 2008: ${h.us.n08} questions in ${h.us.themes08.length} themes. 2025: ${h.us.n25} questions in ${h.us.themes25.length} themes, with new questions on history, the Constitution and why events mattered.</li>
<li><strong>The length.</strong> Up to ${h.P.us.test2008.asked} questions, or up to ${h.P.us.test2025.asked}. The officer stops as soon as the result is settled in both versions.</li>
<li><strong>The pass mark.</strong> ${h.P.us.test2008.passCorrect} right, or ${h.P.us.test2025.passCorrect} right: 60 percent either way.</li>
<li><strong>The 65/20 list.</strong> Each version has its own 20 starred questions, and the 65/20 rules (up to ${h.P.us.s6520.asked} asked, ${h.P.us.s6520.passCorrect} to pass) are the same in both.</li>
</ul>
<p>Once you know your version, train with the matching tool: the ${h.a('us-test', 'mock 2025 test')} or the ${h.a('us-2008', '2008 mock test')}, and the ${h.a('us-exemptions', '65/20 test')} if it applies.</p>
<h2>A worked example</h2>
<p>Ana became a permanent resident on 1 March 2011 and filed her N-400 on 2 March 2026, aged 56. On the filing date she had 15 years as a permanent resident: she is past ${h.P.us.englishExempt[1].age} with ${h.P.us.englishExempt[1].years} years, so she has no English test and may take the civics test in Spanish with an interpreter. She filed after ${h.date(h.P.us.cutoff)}, so it is the 2025 list. She is not ${h.P.us.s6520.age}, so she studies all ${h.us.n25} questions. Had she filed in September 2025, she would have had the 2008 list of ${h.us.n08}.</p>
<h2>Exceptions the checker cannot see</h2>
<p>A medical disability exception, requested on Form N-648 completed by a licensed medical or osteopathic doctor or a licensed clinical psychologist, can waive the English test, the civics test or both, at any age. Applicants with disabilities may also request an accommodation for the interview, online or through the USCIS Contact Center, as soon as the appointment notice arrives. These depend on a medical file and an officer's decision, so the checker leaves them out. Read the official ${h.src('us_exceptions', 'exceptions and accommodations page')} if one could apply to you.</p>
<h2>And if you have not filed yet</h2>
<p>Anyone who files today takes the 2025 test. The question then is when you may file: up to ${h.P.us.n400.earlyFilingDays} days before the fifth anniversary of your green card date, or the third if you are married to a U.S. citizen, provided your trips abroad leave enough days of presence. The ${h.a('us-n400', 'N-400 date tool')} gives that first day.</p>`,
  },
  es: {
    slug: 'nuevo-examen-de-ciudadania-2025',
    nav: 'Nuevo examen de ciudadanía: ¿qué versión?',
    card: 'Indique la fecha de su N-400, su edad y sus años de residente: la herramienta dice si hace el examen de 2008 o el nuevo de 2025, y en qué idioma.',
    title: 'Nuevo examen de ciudadanía 2025: ¿cuál le toca?',
    description: 'Nuevo examen de ciudadanía de 2025 o el de 2008: indique la fecha de su N-400, su edad y sus años de residente permanente y vea su versión, sus reglas y exenciones.',
    h1: 'Nuevo examen de ciudadanía: ¿2008 o 2025?',
    intro: 'La versión depende de una sola fecha: el día en que USCIS recibió su N-400. Añada su edad y sus años de residente para ver también las exenciones 65/20 y de inglés.',
    resume: (h) => `El nuevo examen de ciudadanía es el examen cívico de 2025, y hacerlo o no depende de una sola fecha: el día en que USCIS recibió su Formulario N-400. Las solicitudes recibidas desde el ${h.date(h.P.us.cutoff)} hacen el nuevo examen, con ${h.us.n25} preguntas oficiales, hasta ${h.P.us.test2025.asked} en la entrevista y ${h.P.us.test2025.passCorrect} correctas para aprobar. Las recibidas antes conservan el examen de 2008, con ${h.us.n08} preguntas, hasta ${h.P.us.test2008.asked} en la entrevista y ${h.P.us.test2008.passCorrect} para aprobar, aunque la entrevista sea en 2026. La fecha de la entrevista, de la cita de huellas o de la tarjeta verde no cuenta. Otros dos datos, contados también el día de la presentación, cambian lo que le preguntan: su edad y el tiempo que lleva como residente permanente. Desde ${h.P.us.englishExempt[0].age} años con ${h.P.us.englishExempt[0].years} de residencia, o ${h.P.us.englishExempt[1].age} con ${h.P.us.englishExempt[1].years}, no hay examen de inglés y el examen cívico puede hacerse en español; desde ${h.P.us.s6520.age} años con ${h.P.us.s6520.years}, solo se estudian 20 preguntas marcadas. El verificador de arriba aplica las tres reglas a sus fechas.`,
    faqs: (h) => [
      { q: '¿Dónde encuentro la fecha en que USCIS recibió mi N-400?', a: 'En el aviso de recibo que USCIS envía tras la presentación, el Formulario I-797C, Notice of Action, en la línea «Received Date». Si presentó en línea, el mismo aviso aparece en su cuenta de USCIS. No es la fecha en que envió el formulario por correo ni la fecha de prioridad de su tarjeta verde.' },
      { q: '¿Por qué cambió USCIS el examen cívico en 2025?', a: `USCIS anunció un examen cívico revisado en un aviso del Registro Federal y fijó el ${h.date(h.P.us.cutoff)} como primera fecha de presentación a la que se aplica. La nueva lista es más larga y el oficial hace más preguntas, con el mismo 60 % para aprobar. La parte de inglés del examen no cambia.` },
      { q: '¿El nuevo examen se aplica a mi segunda oportunidad?', a: 'No, si su solicitud se presentó antes de la fecha de corte. La segunda oportunidad pertenece a la misma solicitud y usa la misma versión, la de 2008 en ese caso. Solo un N-400 nuevo, presentado desde la fecha de corte, lleva al examen de 2025.' },
    ],
    body: (h) => `
<h2>Las tres reglas del verificador</h2>
${h.table(['Su situación el día de la presentación', 'Examen de inglés', 'Examen cívico'], [['Por debajo de los umbrales siguientes', 'obligatorio', `en inglés, ${h.P.us.test2025.asked} de ${h.us.n25} (2025) o ${h.P.us.test2008.asked} de ${h.us.n08} (2008)`], [`${h.P.us.englishExempt[1].age} años o más con ${h.P.us.englishExempt[1].years} o más de residencia permanente`, 'exento', 'lista completa, en su idioma con intérprete'], [`${h.P.us.englishExempt[0].age} años o más con ${h.P.us.englishExempt[0].years} o más`, 'exento', 'lista completa, en su idioma con intérprete'], [`${h.P.us.s6520.age} años o más con ${h.P.us.s6520.years} o más`, 'exento', `20 preguntas marcadas, hasta ${h.P.us.s6520.asked}, ${h.P.us.s6520.passCorrect} para aprobar`]], `Página de excepciones y adaptaciones de USCIS, leída el ${h.date(h.P.us.retrieved_at)}.`, ['l', 'l', 'l'])}
<p>Los años son los de residente permanente legal, contados desde la fecha «Resident since» de la tarjeta verde, no los años en Estados Unidos con cualquier estatus. El tiempo con visa antes de la tarjeta verde no cuenta.</p>
<h2>Examen antiguo o nuevo: qué cambia para usted</h2>
<ul>
<li><strong>La lista.</strong> 2008: ${h.us.n08} preguntas en ${h.us.themes08.length} temas, con traducción oficial al español. 2025: ${h.us.n25} preguntas en ${h.us.themes25.length} temas, solo en inglés en USCIS.</li>
<li><strong>La duración.</strong> Hasta ${h.P.us.test2008.asked} preguntas, o hasta ${h.P.us.test2025.asked}. En las dos versiones el oficial se detiene en cuanto el resultado es seguro.</li>
<li><strong>La nota para aprobar.</strong> ${h.P.us.test2008.passCorrect} correctas, o ${h.P.us.test2025.passCorrect}: el 60 % en los dos casos.</li>
<li><strong>La lista 65/20.</strong> Cada versión tiene sus 20 preguntas marcadas, y las reglas 65/20 (hasta ${h.P.us.s6520.asked} preguntas, ${h.P.us.s6520.passCorrect} para aprobar) son iguales en las dos.</li>
</ul>
<p>Cuando sepa su versión, practique con la herramienta que le corresponde: el ${h.a('us-test', 'examen de práctica de 2025')}, las ${h.a('us-2008', '100 preguntas de 2008')} y, si le toca, el ${h.a('us-exemptions', 'examen 65/20')}.</p>
<h2>Un ejemplo</h2>
<p>Ana obtuvo la residencia permanente el 1 de marzo de 2011 y presentó su N-400 el 2 de marzo de 2026, con 56 años. Ese día llevaba 15 años como residente permanente: supera ${h.P.us.englishExempt[1].age} años con ${h.P.us.englishExempt[1].years} de residencia, así que no tiene examen de inglés y puede hacer el examen cívico en español con un intérprete. Presentó después del ${h.date(h.P.us.cutoff)}, así que es la lista de 2025. No tiene ${h.P.us.s6520.age} años, así que estudia las ${h.us.n25} preguntas. Si hubiera presentado en septiembre de 2025, le habría tocado la lista de 2008.</p>
<h2>Excepciones que el verificador no ve</h2>
<p>Una excepción por discapacidad médica, pedida con el Formulario N-648 completado por un médico u osteópata autorizado o por un psicólogo clínico autorizado, puede eximir del examen de inglés, del cívico o de los dos, a cualquier edad. Las personas con discapacidad también pueden pedir una adaptación para la entrevista, en línea o por el Centro de Contacto de USCIS, en cuanto reciben la cita. Dependen de un expediente médico y de la decisión de un oficial, así que el verificador no las incluye. Lea la ${h.src('us_exceptions_es', 'página oficial de excepciones')} si alguna podría aplicarse a usted.</p>
<h2>Si todavía no ha presentado</h2>
<p>Quien presenta hoy hace el examen de 2025. La pregunta pasa a ser cuándo puede presentar: hasta ${h.P.us.n400.earlyFilingDays} días antes del quinto aniversario de la fecha de su tarjeta verde, o del tercero si está casado con un ciudadano, siempre que sus viajes le dejen suficientes días de presencia. La herramienta del ${h.a('us-n400', 'Formulario N-400')} le da ese primer día.</p>`,
  },
});
