import { definePage } from '../../lib/guide-types';

type H = { P: { us: Record<string, any> } };
const PT = (h: H) => h.P.us.processing as { decisionDaysAfterInterview: number; ssaWaitDays: number; ceremoniesPerYear: number; ceremoniesReviewed: string; oathReviewed: string };

export default definePage({
  id: 'us-oath',
  group: 'us',
  order: 118,
  tool: { kind: 'usfrise', props: { variant: 'oath' } },
  related: ['us-steps', 'us-timeline', 'us-processing', 'us-test', 'us-n400', 'us-civics'],
  sources: ['us_ceremonies', 'us_oath', 'us_pm_j3', 'us_pm_b4', 'us_fod', 'us_10steps'],
  en: {
    slug: 'oath-ceremony',
    nav: 'Oath ceremony',
    card: 'What happens at the naturalization oath ceremony: the N-445 notice, check-in, handing in the green card, the oath itself, the certificate, then passport and voting.',
    title: 'Oath Ceremony 2026: Naturalization Day, Step by Step',
    description: 'Oath ceremony for naturalization: the N-445 notice, what to bring, the full Oath of Allegiance and its modified forms, the certificate and the days after.',
    h1: 'The oath ceremony: the day you become a citizen',
    intro: 'Enter your interview date. The timeline shows the decision window, the ceremony and the first step after it; the tool lower down gives the exact words of the oath you will say.',
    resume: (h) => `The oath ceremony is the last step of naturalization and the moment you become a U.S. citizen: USCIS states that you are not a citizen until you take the Oath of Allegiance. If your N-400 is approved, you may be able to take the oath the same day as your interview; otherwise USCIS mails a Form N-445, Notice of Naturalization Oath Ceremony, with the date, time and place. There are two kinds of ceremony: judicial, where a court gives the oath, and administrative, where USCIS gives it. USCIS holds more than ${h.num(PT(h).ceremoniesPerYear)} ceremonies a year. At check-in an officer reviews your answers to the N-445 questionnaire, which you complete beforehand, and you hand in your green card. After the oath you receive your Certificate of Naturalization, to check for errors before you leave. A welcome packet includes a passport application, and you can register to vote. USCIS advises waiting at least ${PT(h).ssaWaitDays} days before updating your Social Security record.`,
    faqs: (h) => [
      { q: 'What should I bring to the oath ceremony?', a: 'Your Form N-445 notice with the questionnaire completed, and your Permanent Resident Card, which you must return at check-in unless you showed at the interview that it was lost. Check the federal list of items prohibited in federal buildings before you go, and read any extra instructions USCIS sent with the notice.' },
      { q: 'What if I cannot attend my ceremony?', a: 'Send the Form N-445 notice back to your local USCIS office with a letter that asks for a new date and explains why you cannot attend. Do it as early as possible. USCIS warns that failing to appear more than once for the ceremony may lead to the denial of your application.' },
      { q: 'Can I take the oath without the military clauses?', a: 'Yes, if you show by clear and convincing evidence that religious training and belief, or a deeply held moral or ethical code, prevents you from bearing arms or performing noncombatant service. You may also affirm instead of swearing and leave out “so help me God”. The clause on work of national importance cannot be removed.' },
      { q: 'Is my certificate proof of citizenship?', a: 'Yes. USCIS says the Certificate of Naturalization can be used as official proof that you are a citizen. Check every detail before you leave the ceremony and report any error on the spot. If you lose it later, a replacement is requested with Form N-565.' },
    ],
    body: (h) => `
<h2>The ceremony in five moments</h2>
<ol>
<li><strong>The notice.</strong> A same-day ceremony after the interview, or Form N-445 by mail. If you filed online, the notice is also in your account.</li>
<li><strong>Check-in.</strong> A USCIS officer reviews your answers to the N-445 questionnaire. It asks what happened since your interview, so answer it truthfully on the day before.</li>
<li><strong>The green card.</strong> You return it; you will not need it once you hold your certificate.</li>
<li><strong>The oath.</strong> You say the Oath of Allegiance with the other candidates. From that moment you are a citizen.</li>
<li><strong>The certificate.</strong> You receive your Certificate of Naturalization and check it before leaving.</li>
</ol>
<p>The steps follow the USCIS page on ${h.src('us_ceremonies', 'naturalization ceremonies')}, reviewed on ${h.date(PT(h).ceremoniesReviewed)}.</p>
<h2>The exact words of the oath</h2>
<p>The text comes from the USCIS page on the ${h.src('us_oath', 'Oath of Allegiance')} and the federal regulations (8 CFR 337.1). Choose the form you will take; the text changes as the ${h.src('us_pm_j3', 'Policy Manual')} allows.</p>
<!--tool:ustime|{"mode":"oath"}-->
<p>The modified oath without the two military clauses needs evidence of a religious or moral objection, such as an attestation or a witness statement. The affirmation needs no evidence. A full waiver of the oath exists only for a person who cannot understand or communicate its meaning because of a physical or developmental disability or a mental impairment, on a medical professional's evaluation.</p>
<h2>Judicial or administrative</h2>
<p>In a judicial ceremony a court gives the oath; in an administrative ceremony USCIS does. The legal effect is the same. USCIS may show short videos, such as “Faces of America” and the national anthem. The ${h.src('us_fod', 'USCIS Field Operations Directorate')} says it holds more than ${h.num(PT(h).ceremoniesPerYear)} naturalization ceremonies a year across the country.</p>
<h2>How long after the interview</h2>
<p>USCIS publishes no waiting time for ceremonies. What is fixed is the decision: the Policy Manual gives USCIS ${PT(h).decisionDaysAfterInterview} days from the interview to decide. When your office holds a same-day ceremony, the timeline above collapses to one day; otherwise the N-445 notice brings a later date. The ${h.a('us-processing', 'processing time page')} covers the wait before the interview.</p>
<h2>The days after</h2>
<ul>
<li><strong>Passport.</strong> The welcome packet includes an application. Leave enough time before any trip abroad, because the passport takes time to arrive.</li>
<li><strong>Voting.</strong> You receive a voter registration application after the oath, and you can also register at post offices, motor vehicle offices or election offices.</li>
<li><strong>Social Security.</strong> Update your record with Form SS-5, by mail or in person, at least ${PT(h).ssaWaitDays} days after the ceremony.</li>
<li><strong>Your certificate.</strong> Keep it safe; a lost certificate is replaced with Form N-565.</li>
</ul>
<p>Still before the interview? The ${h.a('us-test', 'mock civics interview')} uses the official questions, and the ${h.a('us-steps', 'N-400 process page')} shows what comes before the ceremony.</p>`,
  },
  es: {
    slug: 'ceremonia-de-juramento',
    nav: 'Ceremonia de juramento',
    card: 'Qué pasa en la ceremonia de juramento: el aviso N-445, el registro, la entrega de la tarjeta verde, el juramento, el certificado y luego el pasaporte y el voto.',
    title: 'Ceremonia de juramento 2026: el día de la naturalización',
    description: 'Ceremonia de juramento: el aviso N-445, qué llevar, el Juramento de Lealtad completo y sus variantes, el certificado y qué hacer en los días siguientes.',
    h1: 'La ceremonia de juramento: el día en que se hace ciudadano',
    intro: 'Indique la fecha de su entrevista. La línea de tiempo muestra la ventana de decisión, la ceremonia y el primer trámite después; la herramienta de abajo da las palabras exactas del juramento.',
    resume: (h) => `La ceremonia de juramento es la última etapa de la naturalización y el momento en que se hace ciudadano de Estados Unidos: USCIS indica que no es ciudadano hasta que presta el Juramento de Lealtad. Si su N-400 se aprueba, puede que jure el mismo día de la entrevista; si no, USCIS le envía por correo el Formulario N-445, aviso de la ceremonia, con la fecha, la hora y el lugar. Hay dos tipos de ceremonia: judicial, en la que un tribunal toma el juramento, y administrativa, en la que lo toma USCIS. USCIS celebra más de ${h.num(PT(h).ceremoniesPerYear)} ceremonias al año. Al registrarse, un oficial revisa sus respuestas al cuestionario del N-445, que usted completa antes, y usted entrega su tarjeta verde. Después del juramento recibe su Certificado de Naturalización, que debe revisar antes de salir. El paquete de bienvenida incluye una solicitud de pasaporte, y puede inscribirse para votar. USCIS aconseja esperar al menos ${PT(h).ssaWaitDays} días antes de actualizar su registro del Seguro Social.`,
    faqs: (h) => [
      { q: '¿Qué debo llevar a la ceremonia de juramento?', a: 'Su aviso N-445 con el cuestionario completado y su Tarjeta de Residente Permanente, que debe devolver al registrarse salvo que haya demostrado en la entrevista que la perdió. Consulte antes la lista federal de objetos prohibidos en los edificios federales y lea las instrucciones adicionales que USCIS envíe con el aviso.' },
      { q: '¿Qué hago si no puedo ir a mi ceremonia?', a: 'Devuelva el aviso N-445 a su oficina local de USCIS con una carta en la que pide una nueva fecha y explica por qué no puede asistir. Hágalo lo antes posible. USCIS advierte que no presentarse más de una vez a la ceremonia puede llevar a la denegación de la solicitud.' },
      { q: '¿Puedo jurar sin las cláusulas militares?', a: 'Sí, si demuestra con pruebas claras y convincentes que su formación y creencia religiosa, o un código moral o ético profundo, le impide portar armas o prestar servicio no combatiente. También puede afirmar en lugar de jurar y omitir «so help me God». La cláusula del trabajo de importancia nacional no se puede quitar.' },
      { q: '¿El certificado prueba mi ciudadanía?', a: 'Sí. USCIS indica que el Certificado de Naturalización sirve como prueba oficial de que es ciudadano. Revise cada dato antes de salir de la ceremonia y comunique cualquier error en el momento. Si lo pierde más tarde, el reemplazo se pide con el Formulario N-565.' },
    ],
    body: (h) => `
<h2>La ceremonia en cinco momentos</h2>
<ol>
<li><strong>El aviso.</strong> Una ceremonia el mismo día de la entrevista, o el Formulario N-445 por correo. Si presentó en línea, el aviso también aparece en su cuenta.</li>
<li><strong>El registro.</strong> Un oficial de USCIS revisa sus respuestas al cuestionario del N-445, que pregunta qué ha pasado desde la entrevista; respóndalo con sinceridad la víspera.</li>
<li><strong>La tarjeta verde.</strong> La devuelve; ya no la necesitará cuando tenga su certificado.</li>
<li><strong>El juramento.</strong> Pronuncia el Juramento de Lealtad, en inglés, con los demás candidatos. Desde ese momento es ciudadano.</li>
<li><strong>El certificado.</strong> Recibe su Certificado de Naturalización y lo revisa antes de salir.</li>
</ol>
<p>Las etapas siguen la página de USCIS sobre las ${h.src('us_ceremonies', 'ceremonias de naturalización')}, revisada el ${h.date(PT(h).ceremoniesReviewed)}.</p>
<h2>Las palabras exactas del juramento</h2>
<p>El texto procede de la página de USCIS sobre el ${h.src('us_oath', 'Juramento de Lealtad')} y del reglamento federal (8 CFR 337.1). Se pronuncia en inglés. Elija la forma que va a prestar; el texto cambia según lo que permite el ${h.src('us_pm_j3', 'Manual de Políticas')}.</p>
<!--tool:ustime|{"mode":"oath"}-->
<p>En resumen, quien jura renuncia a toda lealtad a otro Estado, se compromete a defender la Constitución y las leyes de Estados Unidos, a portar armas o prestar servicio no combatiente cuando la ley lo exija y a realizar trabajos de importancia nacional bajo dirección civil. El juramento modificado sin las dos cláusulas militares exige pruebas de una objeción religiosa o moral, como una declaración propia o de un testigo. La afirmación no exige pruebas. La exención total solo existe para quien no puede entender ni comunicar su sentido por una discapacidad física o del desarrollo o un trastorno mental, según la evaluación de un profesional médico.</p>
<h2>Judicial o administrativa</h2>
<p>En una ceremonia judicial, un tribunal toma el juramento; en una administrativa, lo toma USCIS. El efecto legal es el mismo. USCIS puede proyectar videos breves, como «Faces of America» y el himno nacional. La ${h.src('us_fod', 'Dirección de Operaciones de Campo de USCIS')} indica que celebra más de ${h.num(PT(h).ceremoniesPerYear)} ceremonias de naturalización al año en todo el país.</p>
<h2>Cuánto tiempo después de la entrevista</h2>
<p>USCIS no publica tiempos de espera para las ceremonias. Lo que está fijado es la decisión: el Manual de Políticas da a USCIS ${PT(h).decisionDaysAfterInterview} días desde la entrevista para decidir. Si su oficina celebra una ceremonia el mismo día, la línea de tiempo de arriba se reduce a un día; si no, el aviso N-445 trae una fecha posterior. La página del ${h.a('us-processing', 'tiempo de trámite')} trata la espera anterior a la entrevista.</p>
<h2>Los días siguientes</h2>
<ul>
<li><strong>Pasaporte.</strong> El paquete de bienvenida incluye una solicitud. Deje tiempo suficiente antes de cualquier viaje al extranjero, porque el pasaporte tarda en llegar.</li>
<li><strong>Voto.</strong> Recibe una solicitud de inscripción electoral después del juramento, y también puede inscribirse en oficinas de correos, de vehículos o electorales.</li>
<li><strong>Seguro Social.</strong> Actualice su registro con el Formulario SS-5, por correo o en persona, al menos ${PT(h).ssaWaitDays} días después de la ceremonia.</li>
<li><strong>Su certificado.</strong> Guárdelo bien; un certificado perdido se reemplaza con el Formulario N-565.</li>
</ul>
<p>¿Aún antes de la entrevista? La ${h.a('us-test', 'entrevista cívica de práctica')} usa las preguntas oficiales, y la página del ${h.a('us-steps', 'proceso del N-400')} muestra lo que viene antes de la ceremonia.</p>`,
  },
});
