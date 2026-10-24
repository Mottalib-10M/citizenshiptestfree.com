import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-presence',
  group: 'ca',
  order: 55,
  tool: { kind: 'date', props: { country: 'ca' } },
  related: ['ca-eligibility', 'ca-fee', 'ca-test', 'ca-practice', 'home'],
  sources: ['ca_bulletin', 'ca_rescalc', 'ca_eligibility'],
  en: {
    slug: 'canadian-citizenship/physical-presence-calculator',
    nav: 'Physical presence calculator',
    card: 'The first date your 1,095 days are met, with every trip counted day by day, planned ones included.',
    title: 'Physical Presence Calculator Canada: Your First Date, 2026',
    description: 'Physical presence calculator for Canadian citizenship: the first date your 1,095 days are met, with half days before PR, the 365-day cap and every trip counted.',
    h1: 'Physical presence calculator: when can I apply?',
    intro: 'Enter your PR date, your time in Canada before it and every trip abroad, past or planned: the first day your application meets the 1,095 days appears on the right.',
    resume: (h) => `This calculator finds the first date on which you meet the physical presence requirement for Canadian citizenship: ${h.num(h.P.ca.presence.requiredDays)} days in Canada within the ${h.P.ca.presence.windowYears} years before the date you apply. It tries each day from today onwards and stops at the first one that works. Days as a permanent resident count in full; each day in Canada before that, as a temporary resident or protected person, counts as half a day, with at most ${h.P.ca.presence.preprMaxCredit} days of credit, so at least ${h.num(h.P.ca.presence.requiredDays - h.P.ca.presence.preprMaxCredit)} days must be as a permanent resident. A day of absence is a day spent entirely outside Canada: as IRCC's instructions put it, absences are calculated only for days with no time at all in Canada, so the days you leave and come back count as present. The day of the application itself is not counted. Because you can enter trips you have only planned, you can see how a long holiday next summer moves your date before you book it.`,
    faqs: (h) => [
      { q: 'Why does my date move when I add a trip in the past?', a: `Because the ${h.P.ca.presence.windowYears}-year window slides. A trip taken four years ago is still inside the window today and costs you days; in a few months it will fall out of the window and stop counting. Adding or removing an old trip can therefore change the first date by exactly the number of whole days you were away, or by nothing if the trip is already outside the window on that date.` },
      { q: 'Is a day trip to the United States an absence?', a: 'No. If you leave Canada and come back the same day, or leave one day and return the next, there is no full day outside Canada, so no day of absence. Only the days in between a departure and a return count. A weekend away from Friday to Sunday is one day of absence: the Saturday.' },
      { q: 'Should I apply on the very first day the calculator gives?', a: 'Only if you are sure of every date you entered. A one-day error in a typed date, a forgotten trip or a stamp that differs from your memory can make the official count fall short. When the result is within five days of the limit the tool warns you; many applicants keep a margin of a few weeks for that reason.' },
    ],
    body: (h) => `
<h2>How the count works, with an example</h2>
<p>Suppose you arrived on a work permit on 1 September 2021, became a permanent resident on 15 May 2023 and travelled twice: from 20 December 2024 to 10 January 2025, and from 1 to 21 July 2026. The days on the work permit inside the window count for half, up to ${h.P.ca.presence.preprMaxCredit}; the days as a permanent resident count in full; each trip removes only its whole days abroad (20 days for the first, 19 for the second). The calculator above opens on exactly these dates, so you can see the result and then replace them with your own.</p>
${h.table(['Rule', 'How it is applied'], [['Window', `the ${h.P.ca.presence.windowYears} years ending the day before you apply`], ['Required', `${h.num(h.P.ca.presence.requiredDays)} days`], ['Before PR', `each day counts as half, at most ${h.P.ca.presence.preprMaxCredit} days in total`], ['As PR', 'each day counts in full'], ['Absence', 'only a day spent entirely outside Canada'], ['Not counted', 'time in prison, on parole or on probation']], 'Rules from the IRCC eligibility page and its instructions on calculating physical presence.', ['l', 'l'])}
<h2>Why the official calculator and this one differ</h2>
<p>IRCC's ${h.src('ca_rescalc', 'online calculator')} answers one question: on the date you choose, are your days enough? This page answers the next one: which is the first date that works? It also lets you add trips you have not taken yet. The two should agree on any given date; if they do not, check the dates you typed in each, and rely on the official one, which IRCC uses.</p>
<h2>Where to find your dates</h2>
<p>The date you became a permanent resident is on your confirmation of permanent residence. For temporary residence, use the date you first entered Canada with a permit or as a visitor whose stay led to it. For trips, your passport stamps help, but Canada does not stamp every exit; travel bookings, boarding passes and the records the Canada Border Services Agency can provide are more complete. Enter each trip with the day you left and the day you returned.</p>
<h2>What the date does not include</h2>
<p>Being present long enough is one condition. You also need valid permanent resident status, tax filing where required, and for applicants aged ${h.P.ca.test.ages[0]} to ${h.P.ca.test.ages[1]} language proof and the ${h.a('ca-test', 'citizenship test')}. The ${h.a('ca-eligibility', 'eligibility page')} lists them, and the ${h.a('ca-fee', 'fee page')} adds up what the application costs.</p>`,
  },
  fr: {
    slug: 'calculateur-presence-physique',
    nav: 'Calculateur de présence physique',
    card: 'La première date où vos 1 095 jours sont atteints, chaque voyage compté jour par jour.',
    title: 'Présence physique : le calculateur pour la citoyenneté',
    description: 'Calculateur de présence physique pour la citoyenneté canadienne : la première date où vos 1 095 jours sont atteints, demi-jours avant la RP et voyages compris.',
    h1: 'Calculateur de présence physique : à partir de quand demander ?',
    intro: 'Indiquez la date de votre résidence permanente, votre séjour d’avant et chaque voyage, passé ou prévu : la première date recevable s’affiche à droite.',
    resume: (h) => `Ce calculateur cherche la première date à laquelle vous remplissez l’exigence de présence effective pour la citoyenneté canadienne : ${h.num(h.P.ca.presence.requiredDays)} jours au Canada pendant les ${h.P.ca.presence.windowYears} ans qui précèdent la date de la demande. Il essaie chaque jour à partir d’aujourd’hui et s’arrête au premier qui convient. Les jours comme résident permanent comptent en entier ; chaque jour passé au Canada auparavant, comme résident temporaire ou personne protégée, compte pour une demi-journée, avec un crédit plafonné à ${h.P.ca.presence.preprMaxCredit} jours : il faut donc au moins ${h.num(h.P.ca.presence.requiredDays - h.P.ca.presence.preprMaxCredit)} jours comme résident permanent. Seule une journée passée entièrement hors du Canada est une absence : le jour du départ et celui du retour comptent comme jours de présence. Le jour même de la demande n’est pas compté. Comme vous pouvez saisir des voyages seulement prévus, vous voyez l’effet d’un long séjour à l’étranger l’été prochain avant de réserver.`,
    faqs: (h) => [
      { q: 'Pourquoi ma date change-t-elle quand j’ajoute un vieux voyage ?', a: `Parce que la période de ${h.P.ca.presence.windowYears} ans glisse avec la date de la demande. Un voyage d’il y a quatre ans est encore dans la période aujourd’hui et vous coûte des jours ; dans quelques mois, il en sortira et ne comptera plus. Ajouter ou retirer un ancien voyage peut donc déplacer la date du nombre exact de jours entiers passés dehors, ou ne rien changer.` },
      { q: 'Un aller-retour aux États-Unis dans la journée compte-t-il ?', a: 'Non. Partir et revenir le même jour, ou partir un jour et revenir le lendemain, ne crée aucune journée entière hors du Canada, donc aucune absence. Seuls comptent les jours entre le départ et le retour. Une fin de semaine du vendredi au dimanche représente une seule journée d’absence : le samedi.' },
      { q: 'Faut-il déposer la demande dès la première date affichée ?', a: 'Seulement si chaque date saisie est sûre. Une erreur d’un jour, un voyage oublié ou un tampon différent de vos souvenirs peuvent faire échouer le calcul officiel. Lorsque le résultat tombe à moins de cinq jours du seuil, l’outil le signale ; beaucoup de candidats gardent une marge de quelques semaines pour cette raison.' },
    ],
    body: (h) => `
<h2>Les règles appliquées</h2>
${h.table(['Règle', 'Application'], [['Période', `les ${h.P.ca.presence.windowYears} ans qui se terminent la veille de la demande`], ['Exigé', `${h.num(h.P.ca.presence.requiredDays)} jours`], ['Avant la RP', `chaque jour compte pour moitié, ${h.P.ca.presence.preprMaxCredit} jours au plus`], ['Comme RP', 'chaque jour compte en entier'], ['Absence', 'une journée passée entièrement hors du Canada'], ['Non compté', 'le temps en prison, en libération conditionnelle ou en probation']], 'Règles tirées de la page d’admissibilité d’IRCC et de ses instructions sur le calcul de la présence effective.', ['l', 'l'])}
<h2>Un exemple</h2>
<p>Arrivée avec un permis de travail le 1er septembre 2021, résidence permanente le 15 mai 2023, deux voyages : du 20 décembre 2024 au 10 janvier 2025, puis du 1er au 21 juillet 2026. Les jours sous permis de travail comptent pour moitié dans la limite du plafond, les jours comme résident permanent en entier, et chaque voyage ne retire que ses jours entiers à l’étranger : 20 pour le premier, 19 pour le second. Le calculateur s’ouvre sur ces dates ; remplacez-les par les vôtres.</p>
<h2>Le calculateur d’IRCC et celui-ci</h2>
<p>Le ${h.src('ca_rescalc', 'calculateur en ligne d’IRCC')} vérifie si vos jours suffisent à la date que vous choisissez. Celui-ci cherche la première date qui convient et accepte des voyages à venir. Les deux doivent concorder pour une même date ; sinon, vérifiez les dates saisies et fiez-vous à l’outil officiel, celui qu’utilise IRCC.</p>
<h2>Retrouver ses dates</h2>
<p>La date de la résidence permanente figure sur la confirmation de résidence permanente. Pour les voyages, les tampons du passeport aident, mais le Canada ne tamponne pas chaque sortie : réservations, cartes d’embarquement et relevés d’entrées et de sorties que l’Agence des services frontaliers du Canada peut fournir sont plus complets.</p>
<h2>Les autres conditions</h2>
<p>La présence effective n’est qu’une condition. Il faut aussi la résidence permanente valide, les déclarations de revenus lorsqu’elles sont exigées et, de ${h.P.ca.test.ages[0]} à ${h.P.ca.test.ages[1]} ans, une preuve de langue et l’${h.a('home', 'examen de citoyenneté')}, pour lequel ce site propose des examens blancs.</p>`,
  },
});
