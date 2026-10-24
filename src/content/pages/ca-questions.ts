import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-questions',
  group: 'ca',
  order: 52,
  tool: { kind: 'bank', props: { country: 'ca', chapter: 4 } },
  mini: { kind: 'mini:capass' },
  related: ['ca-test', 'ca-practice', 'ca-discover', 'ca-eligibility', 'home'],
  sources: ['ca_study', 'ca_guide'],
  en: {
    slug: 'canadian-citizenship-test/questions',
    nav: 'Citizenship test questions',
    card: 'Every practice question with its answer and explanation, one chapter of Discover Canada at a time.',
    title: 'Citizenship Test Questions Canada: Answers Explained, 2026',
    description: 'Citizenship test questions for Canada with answers: our full bank by chapter of Discover Canada, each answer explained with the guide section to check it in.',
    h1: 'Canadian citizenship test questions and answers',
    intro: 'Choose a chapter and open any question to see the answer, why it is right and where it is in the guide.',
    resume: (h) => `This page lists all ${h.count.caEn} questions of our English Canadian bank, one chapter of Discover Canada at a time, with the answer and a short explanation under each question. Open a question to reveal its answer: the four options are shown, the right one ticked, followed by the fact that decides it and the section of the guide where you can read it. The list opens on the chapter on how Canadians govern themselves, the one that applicants most often find unfamiliar; the menu switches to any of the other nine. These are practice questions written by Radif Partners from the guide's facts. IRCC does not publish the questions of the real test, which has ${h.P.ca.test.questions} questions and is passed with ${h.need.ca} correct answers. Reading the questions with their answers is a good way to revise; testing yourself without seeing them first, on the ${h.a('ca-practice', 'practice page')} or the ${h.a('ca-test', 'practice exam')}, shows whether the facts have stuck.`,
    faqs: () => [
      { q: 'Are these the questions IRCC asks?', a: 'No. IRCC does not publish its question bank. Every question here was written from a fact in Discover Canada, so it trains you on the right material, but the wording on test day will differ. A question that relies on a detail you can only memorise word for word is a sign you should read the passage of the guide around it.' },
      { q: 'Why are there no questions about current office holders?', a: 'Because the answer changes with elections and appointments, and the guide itself was printed years ago. Questions on the roles of the Governor General, the Prime Minister or a premier are kept, since roles are stable; questions on the name of the person in office are left out so that no answer here is out of date.' },
      { q: 'Can I print the questions?', a: 'Yes: open the questions you want and use the print function of your browser. Only the opened questions show their answers, which lets you print a sheet of questions alone for a family quiz or a study group, then a second sheet with the answers.' },
    ],
    body: (h) => `
<h2>How the bank is organised</h2>
<p>Each of the ten chapters of the guide has its own set: ${h.chapters.ca.map((c, i) => `${c}, ${h.inChapter('ca', i)}`).join('; ')}. Within a chapter, questions follow the order of the guide's own sections, which is why the source line names a section: you can go straight to the passage and read the context.</p>
<h2>Types of questions you will meet</h2>
<ul>
<li><strong>Who does what.</strong> Which level of government is in charge of a service, who signs a bill into law, who forms a government after an election.</li>
<li><strong>When and in what order.</strong> The main stages of the history chapter, from New France to Confederation and the World Wars.</li>
<li><strong>Where.</strong> Provinces, territories, capitals, the regions and their resources.</li>
<li><strong>What it means.</strong> A right of the Charter, a responsibility of citizenship, the meaning of a symbol.</li>
</ul>
<p>The real test mixes multiple-choice questions and true-or-false statements. Ours all have four options, a slightly harder format that trains you to rule out near misses.</p>
<h2>Reading a question well</h2>
<p>Take a question on the role of the Governor General. The options might mention the Prime Minister's duties, a provincial office and a court: the trap is not ignorance of the answer but reading too quickly. Read the whole question, eliminate the two options that belong to another level of government or another branch, then choose between the last two. The explanation under the answer shows this reasoning.</p>
<h2>From reading to testing</h2>
<p>Use this page to revise, not to test yourself: seeing the answer before you think makes everything look easy. A good routine is to read one chapter of the guide, answer a ${h.a('ca-practice', 'practice set')} of the same chapter without help, then come here to read the questions you missed with their explanations. In the last days, sit full ${h.a('ca-test', 'practice exams')} with the correction at the end.</p>
<h2>French and English</h2>
<p>Our French bank is not a translation of this one: its ${h.count.caFr} questions were written directly in French and many of them test other facts. Applicants who will take the test in French should practise on the ${h.a('home', 'French version')}.</p>`,
  },
  fr: {
    slug: 'questions-examen-citoyennete',
    nav: 'Questions et réponses',
    card: 'Toutes les questions d’entraînement avec la réponse et son explication, un chapitre à la fois.',
    title: 'Questions examen citoyenneté canadienne : réponses, 2026',
    description: 'Questions de l’examen de citoyenneté canadienne avec réponses : notre banque française par chapitre de Découvrir le Canada, chaque réponse expliquée et sourcée.',
    h1: 'Questions de l’examen de citoyenneté et leurs réponses',
    intro: 'Choisissez un chapitre et ouvrez une question pour voir la réponse, pourquoi elle est juste et où la vérifier.',
    resume: (h) => `Cette page présente nos ${h.count.caFr} questions françaises, un chapitre du guide Découvrir le Canada à la fois, avec la réponse et une courte explication sous chaque question. Ouvrez une question pour afficher les quatre choix, la bonne réponse cochée, le fait qui la justifie et la section du guide où le lire. La liste s’ouvre sur le chapitre consacré au mode de gouvernement canadien, celui qui déroute le plus souvent les candidats ; le menu donne accès aux neuf autres. Il s’agit de questions d’entraînement rédigées par Radif Partners, directement en français, à partir des faits du guide. IRCC ne publie pas les questions de l’examen réel, qui en compte ${h.P.ca.test.questions} et se réussit avec ${h.need.ca} bonnes réponses. Lire les questions avec leurs réponses sert à réviser ; pour savoir si les faits sont acquis, faites plutôt une série sur la page d’entraînement ou l’examen blanc de l’accueil.`,
    faqs: () => [
      { q: 'Ces questions sont-elles celles d’IRCC ?', a: 'Non. IRCC garde sa banque de questions confidentielle. Chaque question de ce site a été rédigée à partir d’un fait du guide Découvrir le Canada : elle entraîne sur la bonne matière, mais la formulation de l’examen sera différente. Une question qui semble exiger un détail appris mot à mot invite surtout à relire le passage du guide qui l’entoure.' },
      { q: 'Les questions françaises traduisent-elles les questions anglaises ?', a: 'Non. La banque française a été écrite à part, directement en français, et une bonne partie de ses questions portent sur d’autres faits que la banque anglaise. Les deux banques suivent les mêmes dix chapitres. Un candidat bilingue peut donc s’entraîner dans les deux langues sans retrouver les mêmes phrases.' },
      { q: 'Peut-on imprimer les questions pour réviser en groupe ?', a: 'Oui : ouvrez les questions voulues et utilisez la fonction d’impression du navigateur. Seules les questions ouvertes affichent leur réponse, ce qui permet d’imprimer une feuille de questions seules pour une révision en famille ou en classe de francisation, puis une seconde avec les réponses.' },
    ],
    body: (h) => `
<h2>Une banque rangée comme le guide</h2>
<p>Chacun des dix chapitres a sa série : ${h.chapters.ca.map((c, i) => `${c} (${h.inChapter('ca', i)})`).join(', ')}. La ligne « Où vérifier » nomme la section du guide d’où vient le fait, pour aller droit au passage et le lire dans son contexte.</p>
<h2>Les genres de questions</h2>
<ul>
<li><strong>Qui fait quoi.</strong> Quel ordre de gouvernement s’occupe d’un service, qui sanctionne un projet de loi, qui forme le gouvernement après des élections.</li>
<li><strong>Quand et dans quel ordre.</strong> Les grandes étapes de l’histoire, de la Nouvelle-France à la Confédération et aux deux guerres mondiales.</li>
<li><strong>Où.</strong> Provinces, territoires, capitales, régions et leurs ressources.</li>
<li><strong>Ce que cela veut dire.</strong> Un droit garanti par la Charte, une responsabilité du citoyen, le sens d’un symbole.</li>
</ul>
<p>L’examen officiel combine des questions à choix multiples et des énoncés vrais ou faux. Les nôtres ont toutes quatre choix, une forme un peu plus exigeante qui apprend à écarter les réponses voisines.</p>
<h2>Bien lire une question</h2>
<p>Prenons une question sur le rôle du lieutenant-gouverneur. Les choix peuvent mêler une fonction fédérale, une fonction municipale et un tribunal : le piège tient moins à l’ignorance qu’à la lecture trop rapide. Lisez la question jusqu’au bout, écartez les deux choix qui relèvent d’un autre ordre de gouvernement ou d’un autre pouvoir, puis tranchez entre les deux restants.</p>
<h2>Réviser, puis se tester</h2>
<p>Voir la réponse avant de réfléchir donne l’impression que tout est facile. Lisez plutôt un chapitre du guide, faites une ${h.a('ca-practice', 'série d’entraînement')} du même chapitre sans aide, puis revenez ici relire les questions manquées avec leur explication. Dans les derniers jours, faites l’${h.a('home', 'examen blanc complet')} avec la correction à la fin.</p>`,
  },
});
