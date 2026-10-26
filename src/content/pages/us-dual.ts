import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-dual',
  group: 'us',
  order: 130,
  tool: { kind: 'mini:usdual' },
  related: ['us-oath', 'us-n400', 'us-greencard', 'us-n600', 'us-n565', 'us-interview'],
  sources: ['fam_dual', 'usc_1481', 'usc_1185', 'cfr8_337', 'cfr22_22_1', 'us_oath'],
  en: {
    slug: 'dual-citizenship',
    nav: 'Dual citizenship in the USA',
    card: 'Can you keep your first nationality when you naturalize, or take a second one as an American? What U.S. law says, the passport rule and how citizenship is really lost.',
    title: 'Dual Citizenship USA 2026: Rules, Oath and U.S. Passport',
    description: 'Dual citizenship USA in 2026: U.S. law allows it, what the oath means for your first nationality, the U.S. passport rule and the acts that cost citizenship.',
    h1: 'Dual citizenship in the USA: what U.S. law allows',
    intro: 'Pick what you do, or plan to do, with your other nationality. The tool shows whether U.S. law treats it as a loss of citizenship and which passport you must use at the border.',
    resume: (h) => `Dual citizenship is allowed in the United States: U.S. nationality law does not require a citizen to choose, and the Supreme Court has described dual nationality as a status long recognized in the law. The State Department does not encourage it, because the other country may treat you only as its own national while you are there, which limits U.S. consular help. When you naturalize, you swear to renounce allegiance to any foreign state, but the State Department notes that this oath does not by itself end your other nationality: whether you keep it depends on the law of that country. Two U.S. rules apply to every dual citizen. First, you must enter and leave the United States on a U.S. passport, under section 215(b) of the Immigration and Nationality Act. Second, you lose U.S. citizenship only by voluntarily performing one of the acts listed in section 349, such as naturalizing abroad after 18, with the intent to give up U.S. nationality; the State Department presumes the intent to keep it. A formal renunciation before a U.S. consul abroad costs ${h.usd(h.P.us.forms.renunciationFee)}.`,
    faqs: (h) => [
      { q: 'Will my home country let me keep its nationality after I naturalize?', a: 'That depends only on your home country’s law, not on U.S. law. The State Department notes that some countries do not treat naturalization elsewhere as a ground for losing their nationality, so you may keep it; other countries do end it. The State Department advises asking that country’s embassy or consulate in the United States. Ask before your oath ceremony, not after, so you can decide with all the facts.' },
      { q: 'Can I enter the United States on my other passport?', a: 'No, as a rule. Section 215(b) of the Immigration and Nationality Act and 22 CFR 53.1 require U.S. citizens to depart and enter the United States on a valid U.S. passport, with limited exceptions. Apply for the passport soon after your oath. To enter your other country, use the passport that country requires, which is usually its own.' },
      { q: 'Do my U.S.-born children have dual citizenship?', a: 'They are U.S. citizens by birth in the United States. Whether they also hold your nationality depends on your country’s law, which often passes nationality through a parent. The State Department notes that some people born in the United States are surprised to learn they hold another nationality through a parent or grandparent, with its obligations, such as military service.' },
      { q: 'What does renouncing U.S. citizenship involve?', a: `Renunciation under section 349(a)(5) is made by appearing before a U.S. diplomatic or consular officer in a foreign country and signing an oath of renunciation in the form the State Department prescribes (22 CFR 50.50). The fee for processing a request for a Certificate of Loss of Nationality is ${h.usd(h.P.us.forms.renunciationFee)} in 22 CFR 22.1. You then enter the United States as a foreigner; take legal and tax advice before you decide.` },
    ],
    body: (h) => `
<h2>What U.S. law says, in five points</h2>
${h.table(['Point', 'Rule', 'Source'], [['Dual nationality', 'allowed; current law does not address it, the Supreme Court recognized it in 1952', 'State Department, 7 FAM 082'], ['Naturalization oath', 'renounces foreign allegiance; the other country decides if you keep its nationality', '8 CFR 337.1, 7 FAM 084'], ['Border', 'U.S. citizens enter and leave the U.S. on a U.S. passport', 'INA 215(b), 22 CFR 53.1'], ['Loss of citizenship', 'only by a voluntary act listed in the law, done with intent to give up U.S. nationality', 'INA 349'], ['Renunciation fee', `${h.usd(h.P.us.forms.renunciationFee)}, before a consul abroad`, '22 CFR 22.1, item 8']], `Read on ${h.date(h.P.us.forms.retrieved_at)}.`, ['l', 'l', 'l'])}
<h2>The oath and your first nationality</h2>
<p>The Oath of Allegiance you take at the ${h.a('us-oath', 'naturalization ceremony')} includes a promise to “renounce and abjure” allegiance to any foreign state. The State Department’s manual is explicit that this oath does not mean the foreign country stops regarding you as its citizen. The same manual notes that some countries do not treat naturalization abroad as a ground for losing their nationality, so a naturalized American may keep the nationality of birth; other countries end it. The State Department sends such questions to that country’s embassy or consulate. U.S. law asks nothing more of you on this point.</p>
<h2>The acts that can cost U.S. citizenship</h2>
<p>Section 349(a) of the Immigration and Nationality Act lists the potentially expatriating acts. Each counts only if it is done voluntarily and with the intention of giving up U.S. nationality:</p>
<ol>
<li>Obtaining naturalization in a foreign state on your own application, after age 18.</li>
<li>Taking an oath or declaration of allegiance to a foreign state, after age 18.</li>
<li>Serving in a foreign army engaged in hostilities against the United States, or serving in one as an officer.</li>
<li>Working for a foreign government after age 18, if you hold that country’s nationality or the post requires an oath of allegiance.</li>
<li>Formally renouncing U.S. nationality before a U.S. diplomatic or consular officer abroad.</li>
<li>A formal written renunciation in the United States in time of war, approved by the Attorney General.</li>
<li>Treason or certain acts against the government, after a conviction.</li>
</ol>
<p>The State Department applies an administrative presumption: a citizen who naturalizes abroad or takes a routine foreign oath is presumed to intend to keep U.S. citizenship and need not prove it. The person who claims a loss carries the burden of proof. Loss happens when the person affirmatively tells a consular officer that the act was meant to give up citizenship.</p>
<h2>Practical points for dual citizens</h2>
<ul>
<li><strong>Passports.</strong> Use the U.S. passport at the U.S. border and the other country’s passport where that country requires it.</li>
<li><strong>Consular help.</strong> In your other country, that country may treat you as its national only, and U.S. consular access can be limited.</li>
<li><strong>Obligations.</strong> Your other nationality can carry its own duties, such as military service or taxes. Ask that country’s consulate.</li>
<li><strong>Proof of U.S. citizenship.</strong> Your Certificate of Naturalization is the document to keep; a lost one is replaced with ${h.a('us-n565', 'Form N-565')}. Children who became citizens through you can get a certificate with ${h.a('us-n600', 'Form N-600')}.</li>
</ul>
<p>This page explains the published rules. It is not legal advice: a person thinking of renouncing either nationality, or facing a question of loss, should consult an immigration attorney and, for tax consequences, a tax professional.</p>`,
  },
  es: {
    slug: 'doble-ciudadania',
    nav: 'Doble ciudadanía en Estados Unidos',
    card: '¿Se conserva la primera nacionalidad al naturalizarse, o se puede tener otra siendo estadounidense? Lo que dice la ley, la regla del pasaporte y cómo se pierde de verdad.',
    title: 'Doble ciudadanía en Estados Unidos 2026: reglas y pasaporte',
    description: 'Doble ciudadanía en Estados Unidos en 2026: la ley la permite, qué cambia el juramento para su otra nacionalidad, el pasaporte y los actos que la quitan.',
    h1: 'Doble ciudadanía en Estados Unidos: lo que permite la ley',
    intro: 'Elija lo que hace, o piensa hacer, con su otra nacionalidad. La herramienta indica si la ley lo trata como pérdida de la ciudadanía y qué pasaporte debe usar en la frontera.',
    resume: (h) => `La doble ciudadanía está permitida en Estados Unidos: la ley de nacionalidad no obliga a elegir, y la Corte Suprema describió la doble nacionalidad como una situación reconocida desde hace tiempo por el derecho. El Departamento de Estado no la fomenta, porque el otro país puede tratarle solo como nacional suyo mientras esté allí, lo que limita la ayuda consular estadounidense. Al naturalizarse, usted jura renunciar a la lealtad a cualquier Estado extranjero, pero el Departamento de Estado precisa que ese juramento no pone fin por sí solo a su otra nacionalidad: conservarla depende de la ley de ese país. Dos reglas estadounidenses se aplican a toda persona con doble ciudadanía. Primero, debe entrar y salir de Estados Unidos con pasaporte estadounidense, según la sección 215(b) de la Ley de Inmigración y Nacionalidad. Segundo, solo se pierde la ciudadanía estadounidense realizando voluntariamente uno de los actos de la sección 349, como naturalizarse en otro país después de los 18 años, con la intención de renunciar a ella; el Departamento de Estado presume la intención de conservarla. Una renuncia formal ante un cónsul de Estados Unidos en el extranjero cuesta ${h.usd(h.P.us.forms.renunciationFee)}.`,
    faqs: (h) => [
      { q: '¿Mi país de origen me deja conservar su nacionalidad al naturalizarme?', a: 'Depende solo de la ley de su país de origen, no de la ley estadounidense. El Departamento de Estado señala que algunos países no consideran la naturalización en otro país como causa de pérdida de su nacionalidad, así que puede conservarla; otros países sí la retiran. El Departamento de Estado aconseja preguntar a la embajada o al consulado de ese país en Estados Unidos. Pregunte antes de la ceremonia, no después, para decidir con todos los datos.' },
      { q: '¿Puedo entrar a Estados Unidos con mi otro pasaporte?', a: 'Por regla general, no. La sección 215(b) de la Ley de Inmigración y Nacionalidad y el 22 CFR 53.1 obligan a los ciudadanos a salir y entrar de Estados Unidos con un pasaporte estadounidense válido, salvo excepciones limitadas. Pida el pasaporte poco después del juramento. Para entrar a su otro país, use el pasaporte que ese país exija, que suele ser el suyo.' },
      { q: '¿Mis hijos nacidos en Estados Unidos tienen doble ciudadanía?', a: 'Son ciudadanos estadounidenses por haber nacido en el país. Si además tienen su nacionalidad depende de la ley de su país, que a menudo la transmite por un padre o una madre. El Departamento de Estado señala que algunas personas nacidas en Estados Unidos se sorprenden al saber que tienen otra nacionalidad por un padre o un abuelo, con sus obligaciones, como el servicio militar.' },
      { q: '¿Qué supone renunciar a la ciudadanía estadounidense?', a: `La renuncia de la sección 349(a)(5) se hace presentándose ante un funcionario diplomático o consular de Estados Unidos en un país extranjero y firmando un juramento de renuncia en la forma que fija el Departamento de Estado (22 CFR 50.50). La tarifa por tramitar un Certificado de Pérdida de la Nacionalidad es de ${h.usd(h.P.us.forms.renunciationFee)} según el 22 CFR 22.1. Después entrará a Estados Unidos como extranjero; pida asesoría legal y fiscal antes de decidir.` },
    ],
    body: (h) => `
<h2>Lo que dice la ley estadounidense, en cinco puntos</h2>
${h.table(['Punto', 'Regla', 'Fuente'], [['Doble nacionalidad', 'permitida; la ley vigente no la regula, la Corte Suprema la reconoció en 1952', 'Departamento de Estado, 7 FAM 082'], ['Juramento de naturalización', 'renuncia a la lealtad extranjera; el otro país decide si conserva su nacionalidad', '8 CFR 337.1, 7 FAM 084'], ['Frontera', 'los ciudadanos entran y salen con pasaporte estadounidense', 'INA 215(b), 22 CFR 53.1'], ['Pérdida de la ciudadanía', 'solo por un acto voluntario de la lista legal, con intención de renunciar', 'INA 349'], ['Tarifa de renuncia', `${h.usd(h.P.us.forms.renunciationFee)}, ante un cónsul en el extranjero`, '22 CFR 22.1, punto 8']], `Leído el ${h.date(h.P.us.forms.retrieved_at)}.`, ['l', 'l', 'l'])}
<h2>El juramento y su primera nacionalidad</h2>
<p>El Juramento de Lealtad de la ${h.a('us-oath', 'ceremonia de naturalización')} incluye la promesa de «renunciar y abjurar» la lealtad a cualquier Estado extranjero. El manual del Departamento de Estado dice expresamente que ese juramento no significa que el país extranjero deje de considerarle ciudadano suyo. El mismo manual señala que algunos países no consideran la naturalización en otro país como causa de pérdida de su nacionalidad, así que un estadounidense naturalizado puede conservar la de nacimiento; otros países la retiran. El Departamento de Estado remite esas preguntas a la embajada o al consulado de ese país. La ley estadounidense no le pide nada más sobre este punto.</p>
<h2>Los actos que pueden costar la ciudadanía estadounidense</h2>
<p>La sección 349(a) de la Ley de Inmigración y Nacionalidad enumera los actos que pueden hacer perder la nacionalidad. Cada uno solo cuenta si se hace voluntariamente y con la intención de renunciar a la nacionalidad estadounidense:</p>
<ol>
<li>Naturalizarse en un Estado extranjero a petición propia, después de los 18 años.</li>
<li>Prestar un juramento o una declaración de lealtad a un Estado extranjero, después de los 18 años.</li>
<li>Servir en un ejército extranjero en guerra contra Estados Unidos, o servir en uno como oficial.</li>
<li>Trabajar para un gobierno extranjero después de los 18 años, si tiene la nacionalidad de ese país o el puesto exige un juramento de lealtad.</li>
<li>Renunciar formalmente a la nacionalidad ante un funcionario diplomático o consular de Estados Unidos en el extranjero.</li>
<li>Una renuncia escrita formal en Estados Unidos en tiempo de guerra, aprobada por el Fiscal General.</li>
<li>La traición o ciertos actos contra el gobierno, tras una condena.</li>
</ol>
<p>El Departamento de Estado aplica una presunción administrativa: quien se naturaliza en otro país o presta un juramento extranjero de rutina se presume que quiere conservar la ciudadanía estadounidense y no tiene que probarlo. Quien afirma que hubo pérdida debe probarla. La pérdida se produce cuando la persona declara ante un funcionario consular que el acto buscaba renunciar a la ciudadanía.</p>
<h2>Consejos prácticos con doble ciudadanía</h2>
<ul>
<li><strong>Pasaportes.</strong> Use el pasaporte estadounidense en la frontera de Estados Unidos y el del otro país donde ese país lo exija.</li>
<li><strong>Ayuda consular.</strong> En su otro país, ese país puede tratarle solo como nacional suyo, y el acceso consular estadounidense puede ser limitado.</li>
<li><strong>Obligaciones.</strong> Su otra nacionalidad puede traer deberes propios, como el servicio militar o impuestos. Pregunte al consulado de ese país.</li>
<li><strong>Prueba de la ciudadanía.</strong> Su Certificado de Naturalización es el documento que debe guardar; si lo pierde, se reemplaza con el Formulario N-565. Los hijos que se hicieron ciudadanos a través de usted pueden obtener un certificado con el Formulario N-600.</li>
</ul>
<p>Esta página explica las reglas publicadas. No es asesoría legal: quien piense renunciar a una de sus nacionalidades, o tenga una duda sobre una posible pérdida, debe consultar a un abogado de inmigración y, por los efectos fiscales, a un profesional de impuestos.</p>`,
  },
});
