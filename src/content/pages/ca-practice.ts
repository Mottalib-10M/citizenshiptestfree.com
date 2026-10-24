import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-practice',
  group: 'ca',
  order: 51,
  tool: { kind: 'quiz', props: { country: 'ca', mode: 'practice' } },
  mini: { kind: 'mini:catestage' },
  related: ['ca-test', 'ca-questions', 'ca-discover', 'ca-presence', 'home'],
  sources: ['ca_study', 'ca_guide', 'ca_eligibility'],
  en: {
    slug: 'canadian-citizenship-test/practice',
    nav: 'Canadian citizenship test practice',
    card: 'Ten-question practice sets by chapter of Discover Canada, corrected as you answer.',
    title: 'Citizenship Test Practice Canada: Free Sets by Chapter',
    description: 'Canadian citizenship test practice by chapter of Discover Canada: free ten-question sets corrected as you go, from government to regions, answers explained.',
    h1: 'Canadian citizenship test practice, chapter by chapter',
    intro: 'Pick a chapter of Discover Canada, or mix them all, and answer ten questions with the correction shown at once.',
    resume: (h) => `Practising chapter by chapter is the fastest way to find the parts of Discover Canada you do not know yet. Each set on this page holds ten questions from the chapter you choose, drawn from our bank of ${h.count.caEn} English questions, and every answer is corrected straight away with a short explanation of the fact behind it. A new set draws other questions from the same chapter. The guide has ten chapters, from the rights and responsibilities of citizenship to Canada's regions, and the real test can ask about any of them: its ${h.P.ca.test.questions} questions are spread across the whole guide and you need ${h.need.ca} right answers. Once each chapter gives you eight or more out of ten on fresh sets, move to the full ${h.a('ca-test', 'practice exam')}, which is marked like the IRCC test. Applicants aged ${h.P.ca.test.ages[0]} to ${h.P.ca.test.ages[1]} take the test; the small tool below tells you whether you are one of them.`,
    faqs: () => [
      { q: 'Which chapter of Discover Canada should I start with?', a: 'Start with the one you find least familiar rather than the first one. For most applicants that is the chapter on how Canadians govern themselves, because it describes three levels of government and a constitutional monarchy that work differently from most other countries. History and regions follow. Symbols and the economy are quick to learn and make good revision at the end.' },
      { q: 'How many practice sets should I do before the real test?', a: 'There is no official number. A practical target is to clear eight out of ten on two fresh sets of every chapter, then pass three or four full practice exams in a row with a margin above the mark. If one chapter keeps pulling your score down, read that chapter of the guide again before drawing new sets.' },
      { q: 'Why do some practice answers seem close to each other?', a: 'Because the real difficulty of the test lies in near misses: a provincial power offered next to a federal one, a date a few years off, the right person in the wrong role. Our options are written to train that attention. The explanation under each answer says which detail decides it, so read it even when you answered correctly.' },
    ],
    body: (h) => `
<h2>The chapters and what they hold</h2>
${h.table(['Chapter', 'Questions in our bank', 'What it is about'], [[h.chapters.ca[0], h.inChapter('ca', 0), 'Charter rights, equality, responsibilities such as jury duty and voting'], [h.chapters.ca[1], h.inChapter('ca', 1), 'Indigenous peoples, English and French Canadians, diversity'], [h.chapters.ca[2], h.inChapter('ca', 2), 'From the first peoples and New France to Confederation and the World Wars'], [h.chapters.ca[3], h.inChapter('ca', 3), 'The country after 1945: trade, social programmes, arts, sports'], [h.chapters.ca[4], h.inChapter('ca', 4), 'Federal state, parliamentary democracy, constitutional monarchy'], [h.chapters.ca[5], h.inChapter('ca', 5), 'Ridings, voting, how a government is formed'], [h.chapters.ca[6], h.inChapter('ca', 6), 'Courts, police, the presumption of innocence'], [h.chapters.ca[7], h.inChapter('ca', 7), 'Flag, anthem, emblems, honours'], [h.chapters.ca[8], h.inChapter('ca', 8), 'Main industries and trade'], [h.chapters.ca[9], h.inChapter('ca', 9), 'Provinces, territories, capitals and the five regions']], 'Our English bank, by chapter of Discover Canada.', ['l', 'r', 'l'])}
<h2>A method that works with short sessions</h2>
<p>Ten questions take five minutes. That makes it easy to practise on a bus, on a lunch break or before bed, which is better than a single long evening: facts are kept far better when they are revisited over several days. Pick one chapter per session, read the explanation of every answer, and note on paper the facts you missed. The next day, start with a new set of the same chapter before moving on. A chapter where you miss the same fact twice is a chapter to reread in the guide itself, which is free on the IRCC site in text, PDF, eBook and audio.</p>
<h2>Mixed sets for the last days</h2>
<p>Choose "All chapters" in the menu to draw ten questions from the whole bank. This is closer to the real test, where a question on the Charter can follow one on the Prairies, and it shows whether your knowledge holds without the context of a chapter. Alternate mixed sets with full ${h.a('ca-test', 'practice exams')} in the last week.</p>
<h2>What practice cannot replace</h2>
<p>Our questions are written from the guide's facts, not taken from the real test, which IRCC does not publish. Reading the guide itself remains the basis. And the test is only one requirement: before IRCC invites you to it, your application must show ${h.num(h.P.ca.presence.requiredDays)} days of physical presence in ${h.P.ca.presence.windowYears} years, which the ${h.a('ca-presence', 'physical presence calculator')} works out, and proof of language at level ${h.P.ca.presence.languageLevel} for applicants aged ${h.P.ca.test.ages[0]} to ${h.P.ca.test.ages[1]}.</p>
<h2>Practising in French</h2>
<p>If you plan to take the test in French, practise in French from the start: the vocabulary of government and history is not always the one you expect, from « circonscription » for a riding to « gouverneur général ». The ${h.a('home', 'French version of the site')} has its own ${h.count.caFr} questions written directly in French.</p>`,
  },
  fr: {
    slug: 'examen-citoyennete-pratique',
    nav: 'S’entraîner par chapitre',
    card: 'Séries de dix questions par chapitre de Découvrir le Canada, corrigées au fur et à mesure.',
    title: 'Examen citoyenneté canadienne pratique : séries gratuites',
    description: 'Examen de citoyenneté canadienne, pratique par chapitre de Découvrir le Canada : séries gratuites de dix questions corrigées aussitôt, réponse expliquée.',
    h1: 'S’entraîner à l’examen de citoyenneté, chapitre par chapitre',
    intro: 'Choisissez un chapitre du guide, ou mélangez-les, puis répondez à dix questions corrigées aussitôt.',
    resume: (h) => `S’entraîner chapitre par chapitre permet de repérer vite les parties du guide Découvrir le Canada qui restent floues. Chaque série compte dix questions du chapitre choisi, tirées de nos ${h.count.caFr} questions rédigées en français, et chaque réponse est corrigée immédiatement, avec une courte explication du fait en cause. Une nouvelle série puise d’autres questions dans le même chapitre. L’examen officiel, lui, mélange tout le guide : ${h.P.ca.test.questions} questions, ${h.P.ca.test.minutes} minutes et ${h.need.ca} bonnes réponses pour réussir. Lorsque chaque chapitre vous donne au moins huit sur dix sur des séries nouvelles, passez à l’examen blanc complet de la page d’accueil, noté comme celui d’IRCC. Seules les personnes de ${h.P.ca.test.ages[0]} à ${h.P.ca.test.ages[1]} ans passent l’examen : le petit outil ci-dessous indique si c’est votre cas.`,
    faqs: () => [
      { q: 'Par quel chapitre du guide commencer ?', a: 'Par celui qui vous est le moins familier plutôt que par le premier. Pour beaucoup de candidats, c’est le chapitre sur le mode de gouvernement canadien : trois ordres de gouvernement, une monarchie constitutionnelle, un parlement à deux chambres. Viennent ensuite l’histoire et les régions. Les symboles et l’économie s’apprennent vite et servent de révision à la fin.' },
      { q: 'Combien de séries faire avant l’examen ?', a: 'Aucun nombre n’est fixé. Une cible raisonnable : huit sur dix sur deux séries nouvelles de chaque chapitre, puis trois ou quatre examens blancs réussis d’affilée avec une marge. Si un chapitre fait toujours baisser la note, relisez-le dans le guide avant de tirer de nouvelles séries.' },
      { q: 'Faut-il apprendre les dates par cœur ?', a: 'Quelques-unes seulement : celles qui marquent un tournant, comme la Confédération ou le rapatriement de la Constitution avec la Charte. Pour le reste, l’ordre des événements et leur portée comptent davantage. Nos explications replacent chaque fait dans son contexte, ce qui aide à le retenir sans liste à mémoriser.' },
    ],
    body: (h) => `
<h2>Dix chapitres, dix séries</h2>
<p>Notre banque française suit le découpage du guide : ${h.chapters.ca.map((c, i) => `${c} (${h.inChapter('ca', i)} questions)`).join(', ')}. Les questions ont été écrites en français, sans passer par l’anglais : le vocabulaire est celui du guide et de l’examen en français.</p>
<h2>Des séances courtes et répétées</h2>
<p>Dix questions se font en cinq minutes, dans l’autobus ou à la pause du midi. Plusieurs séances brèves valent mieux qu’une longue soirée : un fait revu sur plusieurs jours se retient beaucoup mieux. Prenez un chapitre par séance, lisez l’explication de chaque réponse, même juste, et notez les faits manqués. Le lendemain, recommencez une série du même chapitre avant de passer au suivant. Un fait raté deux fois signale un passage à relire dans le guide lui-même, offert gratuitement par IRCC en ligne, en PDF, en livre numérique et en version audio.</p>
<h2>Les pièges les plus fréquents</h2>
<ul>
<li><strong>Les ordres de gouvernement.</strong> Qui s’occupe de l’éducation, de la défense, des services municipaux : une réponse fédérale proposée à côté d’une réponse provinciale est le piège classique.</li>
<li><strong>Les fonctions.</strong> Le souverain, le gouverneur général, le lieutenant-gouverneur, le premier ministre et le premier ministre provincial ont chacun leur rôle ; le guide les distingue avec soin.</li>
<li><strong>Les capitales.</strong> Dix provinces et trois territoires, chacun avec sa capitale, se confondent facilement à la dernière minute.</li>
</ul>
<h2>Les séries mélangées</h2>
<p>Choisissez « Tous les chapitres » pour tirer dix questions dans toute la banque. C’est plus proche de l’examen réel, où une question sur la Charte peut suivre une question sur les Prairies. Alternez ces séries avec l’${h.a('home', 'examen blanc complet')} pendant la dernière semaine.</p>
<h2>Ce que l’entraînement ne remplace pas</h2>
<p>Nos questions viennent des faits du guide, pas de l’examen officiel, qu’IRCC ne publie pas. Et l’examen n’est qu’une condition parmi d’autres : la demande doit d’abord réunir ${h.num(h.P.ca.presence.requiredDays)} jours de présence effective en ${h.P.ca.presence.windowYears} ans, que le ${h.a('ca-presence', 'calculateur de présence physique')} compte jour par jour.</p>`,
  },
});
