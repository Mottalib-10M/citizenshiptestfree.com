import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-discover',
  group: 'ca',
  order: 53,
  tool: { kind: 'quiz', props: { country: 'ca', mode: 'practice', chapter: 2 } },
  related: ['ca-practice', 'ca-questions', 'ca-test', 'ca-eligibility', 'home'],
  sources: ['ca_guide', 'ca_guide_fr', 'ca_study'],
  en: {
    slug: 'discover-canada',
    nav: 'Discover Canada study guide',
    card: 'The official study guide chapter by chapter, with a quiz on each chapter.',
    title: 'Discover Canada Study Guide 2026: Chapters and Free Quiz',
    description: 'Discover Canada, the official citizenship study guide: what each of its ten chapters covers, the formats IRCC offers, what has changed since, and a quiz.',
    h1: 'Discover Canada: the study guide, chapter by chapter',
    intro: 'The quiz opens on the history chapter, the longest; pick any other chapter in the menu.',
    resume: (h) => `Discover Canada: The Rights and Responsibilities of Citizenship is the official study guide for the Canadian citizenship test, published by Immigration, Refugees and Citizenship Canada. IRCC says that all test questions are based on it. It is free and comes in several formats: you can read it online, download it as a PDF or an eBook, listen to it as audio or order a paper copy, and it exists in French as Découvrir le Canada. Its ten chapters run from the rights and responsibilities of citizenship and who Canadians are, through history and modern Canada, to government, elections, justice, symbols, the economy and the regions. The guide is Crown copyright and its terms forbid commercial reproduction, so this page describes it in our own words and quotes none of it. The quiz above draws ten of our questions from the chapter you choose, out of the ${h.count.caEn} we wrote from the guide's facts, to check what you retained after reading it.`,
    faqs: () => [
      { q: 'Is there a newer guide than Discover Canada?', a: 'Not at the date of our last check: the IRCC study page still names Discover Canada as the guide on which all questions are based. Some passages are older than recent changes, for instance on the Crown, so our questions avoid facts that have changed since it was written. If IRCC publishes a new guide, the test will follow it and so will this page.' },
      { q: 'Which format of the guide is best for studying?', a: 'The one you will actually use. The audio version suits commutes and helps with pronunciation of names; the PDF is easy to annotate; the online version is the quickest to search. Many applicants read the text once and then listen to the audio of the chapters they find hardest. All formats hold the same content.' },
      { q: 'How long does it take to read Discover Canada?', a: 'A few hours for a first reading at a steady pace. It is short compared with a textbook, but every page carries facts the test can ask about, so a second reading after the practice sets, focused on the chapters where you missed questions, is time well spent.' },
    ],
    body: (h) => `
<h2>The ten chapters in brief</h2>
${h.table(['Chapter', 'In a sentence'], [[h.chapters.ca[0], 'The Charter, the equality of women and men, and the duties that come with citizenship.'], [h.chapters.ca[1], 'Indigenous peoples, the English and French heritage and the diversity of today’s population.'], [h.chapters.ca[2], 'The longest chapter: first peoples, exploration, New France, British rule, Confederation, expansion west, the World Wars.'], [h.chapters.ca[3], 'Canada after the Second World War: trade, social programmes, culture and sport.'], [h.chapters.ca[4], 'A federal state, a parliamentary democracy and a constitutional monarchy, with three branches and three levels of government.'], [h.chapters.ca[5], 'How MPs are elected in electoral districts and how a government is formed.'], [h.chapters.ca[6], 'Courts, police and the principles of justice.'], [h.chapters.ca[7], 'The Crown, the flag, the anthem, emblems and honours.'], [h.chapters.ca[8], 'The main sectors of the economy and the importance of trade.'], [h.chapters.ca[9], 'The five regions, the provinces and territories and their capitals.']], 'Discover Canada, summarised by Radif Partners.', ['l', 'l'])}
<h2>How to read it</h2>
<p>A first reading should be quick and complete: the aim is the overall picture, how the history explains the institutions and how the institutions explain the rights. On a second reading, slow down on the chapters that produce test questions out of every paragraph: government, elections and regions. Make your own list of the offices (Sovereign, Governor General, Lieutenant Governor, Prime Minister, premier, mayor) with one line for each, and a table of provinces and capitals. These two sheets cover a large share of the questions people get wrong.</p>
<h2>Check each chapter with a quiz</h2>
<p>After each chapter, switch the quiz above to it and answer ten questions. Reading gives a feeling of knowing; answering without help shows what is really there. Our ${h.count.caEn} questions are split by chapter (between ${Math.min(...h.chapters.ca.map((_, i) => h.inChapter('ca', i)))} and ${Math.max(...h.chapters.ca.map((_, i) => h.inChapter('ca', i)))} each), and every answer names the section of the guide where the fact is, so you can go back to the right page. The ${h.a('ca-questions', 'question list')} shows them all with their answers, and the ${h.a('ca-test', 'practice exam')} mixes the chapters as the real test does.</p>
<h2>What the guide does not tell you</h2>
<p>Discover Canada is about the country, not about the application. It does not tell you when you can apply, how the ${h.num(h.P.ca.presence.requiredDays)} days of physical presence are counted or what the application costs. For those, see the ${h.a('ca-eligibility', 'eligibility page')}, the ${h.a('ca-presence', 'physical presence calculator')} and the ${h.a('ca-fee', 'fee page')}.</p>
<h2>The French edition</h2>
<p>Découvrir le Canada is the French edition of the same guide, with the same chapters. If you will take the test in French, read it in French: terms such as « circonscription » or « sanction royale » are those the test will use. Our ${h.a('home', 'French practice test')} has ${h.count.caFr} questions written in French.</p>`,
  },
  fr: {
    slug: 'decouvrir-le-canada',
    nav: 'Le guide Découvrir le Canada',
    card: 'Le guide d’étude officiel chapitre par chapitre, avec un questionnaire sur chacun.',
    title: 'Découvrir le Canada 2026 : guide d’étude et quiz gratuit',
    description: 'Découvrir le Canada, guide d’étude de l’examen de citoyenneté : les dix chapitres résumés, les formats offerts par IRCC, ce qui a changé, un quiz par chapitre.',
    h1: 'Découvrir le Canada : le guide d’étude, chapitre par chapitre',
    intro: 'Le questionnaire s’ouvre sur le chapitre d’histoire, le plus long ; choisissez-en un autre dans le menu.',
    resume: (h) => `Découvrir le Canada : les droits et responsabilités liés à la citoyenneté est le guide d’étude officiel de l’examen, publié par Immigration, Réfugiés et Citoyenneté Canada. Selon IRCC, toutes les questions de l’examen en découlent. Il est gratuit et offert sous plusieurs formes : lecture en ligne, PDF, livre numérique, version audio ou exemplaire papier sur commande ; l’édition anglaise s’intitule Discover Canada. Ses dix chapitres vont des droits et responsabilités du citoyen à l’histoire, au Canada moderne, au gouvernement, aux élections, à la justice, aux symboles, à l’économie et aux régions. Le guide est protégé par le droit d’auteur de la Couronne, dont les conditions interdisent la reproduction commerciale : cette page le présente donc dans nos mots, sans le citer. Le questionnaire ci-dessus tire dix questions du chapitre choisi parmi nos ${h.count.caFr} questions rédigées en français, pour vérifier ce qui reste après la lecture.`,
    faqs: () => [
      { q: 'Existe-t-il un guide plus récent que Découvrir le Canada ?', a: 'Pas à la date de notre dernière vérification : la page d’IRCC consacrée à l’étude nomme toujours ce guide comme base de toutes les questions. Certains passages sont antérieurs à des changements récents, par exemple sur la Couronne ; nos questions évitent donc les faits qui ont changé depuis sa rédaction.' },
      { q: 'Quelle version du guide choisir pour étudier ?', a: 'Celle que vous utiliserez vraiment. La version audio convient aux trajets et aide à prononcer les noms propres ; le PDF se prête aux annotations ; la version en ligne permet de chercher un mot. Beaucoup de candidats lisent le texte une fois, puis écoutent les chapitres les plus difficiles. Le contenu est le même partout.' },
      { q: 'Le guide explique-t-il comment présenter la demande ?', a: 'Non. Découvrir le Canada porte sur le pays, pas sur la démarche. La date à laquelle la demande devient recevable, le calcul des jours de présence et les frais se trouvent sur les pages d’IRCC consacrées à la citoyenneté ; notre calculateur de présence physique et la page d’accueil les reprennent.' },
    ],
    body: (h) => `
<h2>Les dix chapitres en une phrase</h2>
${h.table(['Chapitre', 'En bref'], [[h.chapters.ca[0], 'La Charte, l’égalité entre les femmes et les hommes, les devoirs du citoyen.'], [h.chapters.ca[1], 'Les peuples autochtones, l’héritage français et anglais, la diversité du pays.'], [h.chapters.ca[2], 'Le plus long : premiers peuples, exploration, Nouvelle-France, régime britannique, Confédération, expansion vers l’Ouest, guerres mondiales.'], [h.chapters.ca[3], 'Le Canada d’après-guerre : commerce, programmes sociaux, culture, sport.'], [h.chapters.ca[4], 'Un État fédéral, une démocratie parlementaire, une monarchie constitutionnelle.'], [h.chapters.ca[5], 'L’élection des députés par circonscription et la formation du gouvernement.'], [h.chapters.ca[6], 'Les tribunaux, la police et les principes de la justice.'], [h.chapters.ca[7], 'La Couronne, le drapeau, l’hymne, les emblèmes et les distinctions.'], [h.chapters.ca[8], 'Les grands secteurs de l’économie et le poids du commerce.'], [h.chapters.ca[9], 'Les cinq régions, les provinces, les territoires et leurs capitales.']], 'Découvrir le Canada, résumé par Radif Partners.', ['l', 'l'])}
<h2>Comment le lire</h2>
<p>Une première lecture rapide et complète donne la vue d’ensemble : l’histoire explique les institutions, et les institutions expliquent les droits. À la deuxième lecture, ralentissez sur les chapitres où chaque paragraphe peut devenir une question : le mode de gouvernement, les élections, les régions. Dressez vous-même deux fiches : la liste des fonctions (souverain, gouverneur général, lieutenant-gouverneur, premier ministre, premier ministre provincial, maire) avec une ligne pour chacune, et le tableau des provinces et capitales.</p>
<h2>Un questionnaire après chaque chapitre</h2>
<p>Après chaque chapitre, choisissez-le dans le menu du questionnaire et répondez à dix questions. Lire donne l’impression de savoir ; répondre sans aide montre ce qui est acquis. Chaque réponse indique la section du guide d’où vient le fait. La ${h.a('ca-questions', 'liste des questions')} les montre toutes avec leur réponse, et l’${h.a('home', 'examen blanc')} mélange les chapitres comme l’examen réel.</p>
<h2>Ce que le guide ne dit pas</h2>
<p>Le guide ne dit rien de la demande elle-même : ni de la date à partir de laquelle elle est recevable, ni du calcul des ${h.num(h.P.ca.presence.requiredDays)} jours, ni des frais de ${h.cad(h.P.ca.fees.adult)} par adulte. Pour la date, voyez le ${h.a('ca-presence', 'calculateur de présence physique')}.</p>`,
  },
});
