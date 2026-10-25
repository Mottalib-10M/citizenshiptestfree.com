import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-fee',
  group: 'us',
  order: 110,
  tool: { kind: 'usfee' },
  related: ['us-n400', 'us-eligibility', 'us-test', 'us-which', 'us-civics', 'us-english'],
  sources: ['us_n400', 'us_reduced', 'us_fpg', 'us_i912'],
  en: {
    slug: 'n-400-fee',
    nav: 'N-400 fee, reduced fee and waiver',
    card: 'What naturalization costs a household: $710 online or $760 on paper per applicant, the $380 reduced fee below 400% of the poverty guidelines, or a fee waiver.',
    title: 'N-400 Fee 2026: $710 Online, $760 Paper, $380 Reduced',
    description: 'N-400 fee in 2026: $710 online or $760 on paper, $380 reduced fee for household incomes under 400% of the poverty guidelines, and the I-912 fee waiver.',
    h1: 'N-400 fee: what citizenship costs your household',
    intro: 'Enter how many people file, your household size and income. The tool gives the fee you can ask for, the total, and the income limits that decide it.',
    resume: (h) => `The N-400 fee is the only government fee to become a U.S. citizen by naturalization: ${h.usd(h.P.us.fees.online)} per applicant when filed online and ${h.usd(h.P.us.fees.paper)} on paper, biometrics included, as listed on the USCIS N-400 page last reviewed on ${h.date(h.P.us.fees.pageReviewed)}. The civics and English tests and the oath ceremony have no separate fee. Households with a documented income below ${h.P.us.fees.reducedMaxPctFpg} percent of the federal poverty guidelines can pay a reduced fee of ${h.usd(h.P.us.fees.reduced)}, requested in Part 10 of a paper N-400. At or below ${h.P.us.fees.waiverMaxPctFpg} percent, or when someone in the household receives a means-tested benefit, or in financial hardship, you can ask for a full fee waiver with Form I-912, also on paper only. For a household of three in the 48 contiguous states, the limits in force since ${h.date(h.P.us.fpg.effective)} are ${h.usd(h.P.us.fpg.contiguous.p400[2])} a year for the reduced fee and ${h.usd(h.P.us.fpg.contiguous.p150[2])} for the waiver. Each applicant pays separately, so a couple filing online pays ${h.usd(2 * h.P.us.fees.online)}. The calculator above applies the official table to your household.`,
    faqs: (h) => [
      { q: 'Why is filing online cheaper?', a: `USCIS set a lower fee for online filing, ${h.usd(h.P.us.fees.online)} instead of ${h.usd(h.P.us.fees.paper)}, in its current fee schedule. Online filing needs a USCIS online account and a card or bank payment. It is not available if you ask for the reduced fee or a fee waiver: those requests go with a paper N-400.` },
      { q: 'Who counts in my household size?', a: 'USCIS counts you, your spouse living with you, your unmarried children under 21 living with you, some older dependent children, your parents living with you and other dependents on your tax return. A separated spouse is left out. Use the same household for the size and for the income you declare.' },
      { q: 'Is the fee refunded if my application is denied?', a: 'No. USCIS states that filing and biometric service fees are final and nonrefundable, whatever decision it takes on the application. That is one more reason to file only once the residence conditions are met and you feel ready for the English and civics tests.' },
    ],
    body: (h) => `
<h2>The fees in force</h2>
${h.table(['Case', 'Fee per applicant', 'How to file'], [['Standard, online', h.usd(h.P.us.fees.online), 'USCIS online account'], ['Standard, paper', h.usd(h.P.us.fees.paper), 'by mail'], [`Reduced fee (income below ${h.P.us.fees.reducedMaxPctFpg}% of the guidelines)`, h.usd(h.P.us.fees.reduced), 'paper only, Part 10 of the N-400'], [`Fee waiver (at or below ${h.P.us.fees.waiverMaxPctFpg}%, means-tested benefit or hardship)`, h.usd(0), 'paper only, with Form I-912']], `USCIS N-400 page (reviewed ${h.date(h.P.us.fees.pageReviewed)}) and reduced fee page, read on ${h.date(h.P.us.retrieved_at)}.`, ['l', 'r', 'l'])}
<p>Do not file both a reduced fee request and a fee waiver request for the same application: USCIS asks you to choose one.</p>
<h2>The income limits for 2026</h2>
<p>USCIS uses the HHS poverty guidelines in its own table, effective ${h.date(h.P.us.fpg.effective)}. The limits depend on household size and on where you live:</p>
${h.table(['Household size', `Waiver: ${h.P.us.fees.waiverMaxPctFpg}% (48 states)`, `Reduced: ${h.P.us.fees.reducedMaxPctFpg}% (48 states)`, `Reduced: ${h.P.us.fees.reducedMaxPctFpg}% (Alaska)`, `Reduced: ${h.P.us.fees.reducedMaxPctFpg}% (Hawaii)`], [1, 2, 3, 4, 5, 6].map((n) => [n, h.usd(h.P.us.fpg.contiguous.p150[n - 1]), h.usd(h.P.us.fpg.contiguous.p400[n - 1]), h.usd(h.P.us.fpg.alaska.p400[n - 1]), h.usd(h.P.us.fpg.hawaii.p400[n - 1])]), `Yearly household income. Add ${h.usd(h.P.us.fpg.contiguous.p400Add)} per extra person for the reduced fee in the 48 states. USCIS poverty guidelines page.`, ['r', 'r', 'r', 'r', 'r'])}
<p>The reduced fee needs an income strictly below the limit, while the waiver accepts an income equal to it. In the USCIS table, the 48 states column also covers the District of Columbia, Puerto Rico, the U.S. Virgin Islands, Guam and the Northern Mariana Islands.</p>
<h2>Three examples</h2>
<ul>
<li>A single applicant earning ${h.usd(70000)} in Texas: above ${h.usd(h.P.us.fpg.contiguous.p400[0])}, so the standard fee, ${h.usd(h.P.us.fees.online)} online.</li>
<li>A couple with one child, ${h.usd(95000)} a year, both parents filing: below ${h.usd(h.P.us.fpg.contiguous.p400[2])}, so ${h.usd(h.P.us.fees.reduced)} each on paper, ${h.usd(2 * h.P.us.fees.reduced)} in all instead of ${h.usd(2 * h.P.us.fees.online)} online.</li>
<li>A household of four earning ${h.usd(45000)}: at or below ${h.usd(h.P.us.fpg.contiguous.p150[3])}, so a fee waiver can be requested with Form I-912.</li>
</ul>
<h2>What the fee does not cover</h2>
<p>The government fee is the whole official cost. What may come on top is your own choice: translations of foreign documents (USCIS requires a full English translation of any document in another language), passport photos, travel to the interview and, if you hire one, a lawyer or accredited representative. This site never offers such services and does not recommend any provider.</p>
<h2>Before you pay</h2>
<p>Fees are final once paid, so check two things first. That you can file at all on that date: the ${h.a('us-n400', 'N-400 date tool')} counts your days and trips. And that you are ready for the interview: the ${h.a('us-test', 'mock citizenship test')} uses the official questions. If USCIS changes its fees, it announces the new schedule in advance; we check the N-400 page every month and update this page when the amounts change.</p>`,
  },
  es: {
    slug: 'tarifa-n-400',
    nav: 'Tarifa del N-400, reducida y exención',
    card: 'Lo que cuesta la naturalización a su hogar: $710 en línea o $760 en papel por solicitante, $380 de tarifa reducida o la exención con el I-912.',
    title: 'Tarifa N-400 2026: $710 en línea, $760 en papel, $380',
    description: 'Tarifa del N-400 en 2026: $710 en línea o $760 en papel, $380 reducida para ingresos bajo el 400 % de las pautas de pobreza y la exención con el I-912.',
    h1: 'Tarifa del N-400: lo que cuesta la ciudadanía a su hogar',
    intro: 'Indique cuántas personas presentan, el tamaño de su hogar y sus ingresos. La herramienta da la tarifa que puede pedir, el total y los límites de ingresos que la deciden.',
    resume: (h) => `La tarifa del N-400 es la única tarifa oficial para hacerse ciudadano de Estados Unidos por naturalización: ${h.usd(h.P.us.fees.online)} por solicitante si se presenta en línea y ${h.usd(h.P.us.fees.paper)} en papel, datos biométricos incluidos, según la página del N-400 de USCIS revisada el ${h.date(h.P.us.fees.pageReviewed)}. Los exámenes de inglés y de educación cívica y la ceremonia de juramento no tienen tarifa aparte. Los hogares con ingresos documentados inferiores al ${h.P.us.fees.reducedMaxPctFpg} % de las pautas federales de pobreza pueden pagar una tarifa reducida de ${h.usd(h.P.us.fees.reduced)}, que se pide en la Parte 10 de un N-400 en papel. Con ingresos iguales o inferiores al ${h.P.us.fees.waiverMaxPctFpg} %, si alguien del hogar recibe un beneficio sujeto a ingresos o en caso de dificultades económicas, se puede pedir la exención total con el Formulario I-912, también solo en papel. Para un hogar de tres personas en los 48 estados contiguos, los límites vigentes desde el ${h.date(h.P.us.fpg.effective)} son ${h.usd(h.P.us.fpg.contiguous.p400[2])} al año para la tarifa reducida y ${h.usd(h.P.us.fpg.contiguous.p150[2])} para la exención. Cada solicitante paga por separado: una pareja que presenta en línea paga ${h.usd(2 * h.P.us.fees.online)}.`,
    faqs: (h) => [
      { q: '¿Por qué es más barato presentar en línea?', a: `USCIS fijó una tarifa más baja para la presentación en línea, ${h.usd(h.P.us.fees.online)} en lugar de ${h.usd(h.P.us.fees.paper)}, en su tabla de tarifas vigente. Hace falta una cuenta en línea de USCIS y un pago con tarjeta o cuenta bancaria. No es posible si pide la tarifa reducida o la exención: esas solicitudes van con un N-400 en papel.` },
      { q: '¿Quién cuenta en el tamaño de mi hogar?', a: 'USCIS cuenta a usted, a su cónyuge si vive con usted, a sus hijos solteros menores de 21 años que viven con usted, a algunos hijos mayores dependientes, a sus padres si viven con usted y a otros dependientes de su declaración de impuestos. Un cónyuge separado no cuenta. Use el mismo hogar para el tamaño y para los ingresos.' },
      { q: '¿Me devuelven la tarifa si niegan mi solicitud?', a: 'No. USCIS indica que las tarifas de presentación y de datos biométricos son definitivas y no reembolsables, decida lo que decida sobre la solicitud. Es una razón más para presentar solo cuando se cumplen las condiciones de residencia y se siente preparado para los exámenes.' },
    ],
    body: (h) => `
<h2>Las tarifas vigentes</h2>
${h.table(['Caso', 'Tarifa por solicitante', 'Cómo presentar'], [['Normal, en línea', h.usd(h.P.us.fees.online), 'cuenta en línea de USCIS'], ['Normal, en papel', h.usd(h.P.us.fees.paper), 'por correo'], [`Tarifa reducida (ingresos bajo el ${h.P.us.fees.reducedMaxPctFpg} % de las pautas)`, h.usd(h.P.us.fees.reduced), 'solo en papel, Parte 10 del N-400'], [`Exención (hasta el ${h.P.us.fees.waiverMaxPctFpg} %, beneficio sujeto a ingresos o dificultades)`, h.usd(0), 'solo en papel, con el Formulario I-912']], `Página del N-400 de USCIS (revisada el ${h.date(h.P.us.fees.pageReviewed)}) y página de la tarifa reducida, leídas el ${h.date(h.P.us.retrieved_at)}.`, ['l', 'r', 'l'])}
<p>No pida a la vez la tarifa reducida y la exención para la misma solicitud: USCIS pide elegir una.</p>
<h2>Los límites de ingresos de 2026</h2>
<p>USCIS usa las pautas de pobreza del HHS en su propia tabla, vigente desde el ${h.date(h.P.us.fpg.effective)}. Los límites dependen del tamaño del hogar y del lugar donde vive:</p>
${h.table(['Tamaño del hogar', `Exención: ${h.P.us.fees.waiverMaxPctFpg} % (48 estados)`, `Reducida: ${h.P.us.fees.reducedMaxPctFpg} % (48 estados)`, `Reducida: ${h.P.us.fees.reducedMaxPctFpg} % (Alaska)`, `Reducida: ${h.P.us.fees.reducedMaxPctFpg} % (Hawái)`], [1, 2, 3, 4, 5, 6].map((n) => [n, h.usd(h.P.us.fpg.contiguous.p150[n - 1]), h.usd(h.P.us.fpg.contiguous.p400[n - 1]), h.usd(h.P.us.fpg.alaska.p400[n - 1]), h.usd(h.P.us.fpg.hawaii.p400[n - 1])]), `Ingresos anuales del hogar. Sume ${h.usd(h.P.us.fpg.contiguous.p400Add)} por persona adicional para la tarifa reducida en los 48 estados. Página de pautas de pobreza de USCIS.`, ['r', 'r', 'r', 'r', 'r'])}
<p>La tarifa reducida exige ingresos estrictamente inferiores al límite; la exención acepta ingresos iguales. En la tabla de USCIS, la columna de los 48 estados cubre también el Distrito de Columbia, Puerto Rico, las Islas Vírgenes de EE. UU., Guam y las Islas Marianas del Norte.</p>
<h2>Tres ejemplos</h2>
<ul>
<li>Un solicitante solo que gana ${h.usd(70000)} en Texas: por encima de ${h.usd(h.P.us.fpg.contiguous.p400[0])}, así que paga la tarifa normal, ${h.usd(h.P.us.fees.online)} en línea.</li>
<li>Una pareja con un hijo, ${h.usd(95000)} al año, los dos padres presentan: por debajo de ${h.usd(h.P.us.fpg.contiguous.p400[2])}, así que ${h.usd(h.P.us.fees.reduced)} cada uno en papel, ${h.usd(2 * h.P.us.fees.reduced)} en total en lugar de ${h.usd(2 * h.P.us.fees.online)} en línea.</li>
<li>Un hogar de cuatro personas con ${h.usd(45000)} de ingresos: igual o por debajo de ${h.usd(h.P.us.fpg.contiguous.p150[3])}, así que puede pedir la exención con el Formulario I-912.</li>
</ul>
<h2>Lo que la tarifa no cubre</h2>
<p>La tarifa oficial es todo el costo del gobierno. Lo demás depende de usted: traducciones de documentos extranjeros (USCIS exige una traducción completa al inglés de cualquier documento en otro idioma), fotos de pasaporte, el viaje a la entrevista y, si contrata uno, un abogado o representante acreditado. Este sitio nunca ofrece esos servicios ni recomienda a ningún proveedor.</p>
<h2>Antes de pagar</h2>
<p>Las tarifas son definitivas una vez pagadas, así que compruebe dos cosas antes. Que puede presentar en esa fecha: la herramienta del ${h.a('us-n400', 'Formulario N-400')} cuenta sus días y viajes. Y que está preparado para la entrevista: el ${h.a('us-test', 'examen de práctica')} usa las preguntas oficiales. Si USCIS cambia sus tarifas, lo anuncia con antelación; revisamos la página del N-400 cada mes y actualizamos esta página cuando cambian los importes.</p>`,
  },
});
