import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'us-billofrights',
  group: 'us',
  order: 82,
  tool: { kind: 'usdrill', props: { drill: 'bill' } },
  related: ['us-amendments', 'us-branches', 'us-questions', 'us-test', 'us-civics'],
  sources: ['nara_bor', 'nara_const', 'us_128', 'us_study'],
  en: {
    slug: 'bill-of-rights',
    nav: 'Bill of Rights quiz',
    card: 'The first ten amendments in plain English, what each one protects, and a quiz that asks which amendment covers speech, searches, silence or a jury.',
    title: 'Bill of Rights 2026: The 10 Amendments Explained, Free Quiz',
    description: 'The Bill of Rights explained: what each of the first ten amendments protects, the year 1791, the civics test questions on it, and a free 10-question quiz.',
    h1: 'The Bill of Rights: the first ten amendments',
    intro: 'Ten questions at a time on the first ten amendments. After each answer you see what the amendment actually says, in a sentence.',
    resume: (h) => `The Bill of Rights is the name given to the first ten amendments to the U.S. Constitution, proposed by the First Congress in 1789 at the initiative of James Madison and ratified in 1791. They limit what the federal government may do to individuals: the First Amendment protects religion, speech, the press, peaceful assembly and petitions; the Second covers the right to keep and bear arms; the Third forbids housing soldiers in private homes in peacetime; the Fourth requires warrants based on probable cause; the Fifth protects against self-incrimination and double jeopardy and requires due process; the Sixth and Seventh guarantee jury trials; the Eighth bans excessive bail and cruel and unusual punishment; the Ninth says the list is not complete; the Tenth reserves to the states or the people the powers not given to the United States. The topic comes back several times in the naturalization civics test: the 2025 list of ${h.us.n25} questions asks what the Bill of Rights protects (question 6), what the 10th Amendment is for (question 60) and which rights everyone living in the United States has (question 65).`,
    faqs: () => [
      { q: 'Why was the Bill of Rights added after the Constitution?', a: 'Several states ratified the 1787 Constitution only after being promised a list of individual rights. Opponents of the new federal government feared it would grow too strong. Madison drafted amendments in the First Congress, Congress sent twelve to the states in 1789, and ten were ratified in 1791. One of the other two became the 27th Amendment in 1992.' },
      { q: 'Does the Bill of Rights protect people who are not citizens?', a: 'Most of its guarantees use the words “the people” or “person”, not “citizen”, so they protect everyone in the United States, including permanent residents and visitors: free speech, protection from unreasonable searches, due process, a lawyer and a jury in a criminal case. That is why USCIS question 65 asks for rights of “everyone living in the United States”.' },
      { q: 'Do I have to know the ten amendments by number for the citizenship test?', a: 'No. The officer asks what the Bill of Rights protects, or the purpose of the 10th Amendment, and accepts answers in your own words such as “the basic rights of Americans”. Knowing which amendment does what still helps with the free speech, voting and citizenship questions, which sit elsewhere in the list.' },
    ],
    body: (h) => `
<h2>The ten amendments, one line each</h2>
${h.table(['Amendment', 'What it protects'], [
  ['1st', 'Freedom of religion, speech and the press; peaceful assembly; petitioning the government'],
  ['2nd', 'The right of the people to keep and bear arms, linked in the text to a well regulated militia'],
  ['3rd', 'No soldiers lodged in a private house in peacetime without the owner’s consent'],
  ['4th', 'No unreasonable searches or seizures; warrants need probable cause and a precise description'],
  ['5th', 'Grand jury for serious crimes, no double jeopardy, no forced self-incrimination, due process, compensation for property taken'],
  ['6th', 'Speedy and public criminal trial, impartial local jury, notice of the charges, witnesses, a lawyer'],
  ['7th', 'Jury trial kept in civil suits at common law above twenty dollars'],
  ['8th', 'No excessive bail or fines, no cruel and unusual punishment'],
  ['9th', 'Listing some rights does not deny other rights the people keep'],
  ['10th', 'Powers not delegated to the United States belong to the states or to the people'],
], 'Summary in our words of the National Archives transcription of the Bill of Rights.', ['l', 'l'])}
<p>The full text is short and reads well aloud: the ${h.src('nara_bor', 'National Archives transcription')} gives it with the preamble Congress wrote in 1789.</p>
<h2>What the civics test asks</h2>
<p>Three questions of the 2025 list lean directly on these amendments. Question 6, “What does the Bill of Rights protect?”, expects an answer such as the basic rights of Americans or of people living in the United States. Question 60 asks the purpose of the 10th Amendment: powers not given to the federal government belong to the states or to the people. Question 65 asks for three rights of everyone living here; freedom of expression, of speech, of assembly, to petition the government, of religion and to bear arms are all accepted. The ${h.src('us_128', 'official list of 128 questions')} gives every accepted answer, and the ${h.a('us-questions', 'question bank page')} shows them by theme.</p>
<p>Question 5 adds the idea behind it all: the Constitution changes through amendments. The other seventeen amendments, from abolishing slavery to the voting age of 18, are on the ${h.a('us-amendments', 'constitutional amendments page')}, with their own quiz.</p>
<h2>Three ideas worth remembering</h2>
<ul>
<li><strong>It limits government, not private people.</strong> The First Amendment stops Congress from punishing speech; it does not force an employer or a website to publish anything.</li>
<li><strong>It reached the states later.</strong> In 1791 it bound only the federal government. After the 14th Amendment of 1868, the Supreme Court applied most of its guarantees to state and local governments, one right at a time.</li>
<li><strong>It is not the whole list.</strong> The Ninth Amendment says so expressly: rights not written down are not given up.</li>
</ul>
<h2>How to use the quiz</h2>
<p>Each set draws ten questions from the bank, mixing “which amendment protects…” items with the USCIS questions on the topic. Read the explanation after every answer, even a right one: the officer asks aloud, and you answer in a sentence, so the reason matters more than the number. When you can answer a full set without a miss, move to the ${h.a('us-test', 'mock civics test')}, which follows the officer’s stop rule on the whole list. The ${h.a('us-branches', 'branches of government quiz')} covers the articles of the Constitution that come before the amendments.</p>
<p>This site is independent: it is not run by USCIS or any government agency, and its quizzes are practice, not the official test.</p>`,
  },
});
