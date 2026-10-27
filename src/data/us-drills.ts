/**
 * Topic drills (Bill of Rights, amendments, branches, state capitals, presidents): multiple-choice
 * questions written by Radif Partners from the public-domain texts (Constitution and Bill of Rights,
 * National Archives transcripts), plus the USCIS civics questions on the same topic, taken from the
 * official 2025 list (`us-2025.json`, public domain) with their answer options. Nothing here is copied
 * from a third-party quiz. Every item: question, four options, index of the right one, a short reason.
 */
import US25 from './questions/us-2025.json';
import { STATES } from './us-states';

export interface DrillItem { q: string; o: string[]; a: number; why: string; uscis?: number }
export interface Drill { id: string; title: string; items: DrillItem[]; size: number; note: string }

interface BankQ { n: number; answer?: number; en: { q: string; a: string[]; o?: string[] } }
const BANK = (US25 as unknown as { questions: BankQ[] }).questions;
/** An official USCIS question, with the answer options of the site's bank. */
const official = (n: number): DrillItem => {
  const x = BANK.find((b) => b.n === n)!;
  return { q: x.en.q, o: x.en.o!, a: x.answer!, why: `USCIS 2025 civics question ${n}. Accepted answers include: ${x.en.a.slice(0, 3).join('; ')}.`, uscis: n };
};

/** Deterministic pseudo-random numbers (no clock, no Math.random): same build, same order. */
export function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}
/** Puts the right answer among three distractors at a position that depends on the seed. */
const mix = (right: string, wrong: string[], seed: number, q: string, why: string): DrillItem => {
  const r = rng(seed), o = [...wrong.slice(0, 3)];
  const at = Math.floor(r() * 4);
  o.splice(at, 0, right);
  return { q, o, a: at, why };
};
const ORD = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th'];
const amd = (n: number) => `${ORD[n - 1]} Amendment`;
/** Three other amendments near `n`, inside [lo, hi]. */
const near = (n: number, lo: number, hi: number, seed: number) => {
  const pool = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i).filter((x) => x !== n);
  const r = rng(seed * 7 + n);
  pool.sort((x, y) => Math.abs(x - n) - Math.abs(y - n) + (r() - 0.5) * 3);
  return pool.slice(0, 3).map(amd);
};

/* ---------------------------------------------------------------- Bill of Rights (amendments 1 to 10) */
const BOR: Array<[number, string, string]> = [
  [1, 'Which amendment protects freedom of religion, speech and the press?', 'The First Amendment bars Congress from making laws that restrict religion, speech, the press, assembly or petitions to the government.'],
  [1, 'Which amendment protects the right to ask the government to correct a wrong (to petition)?', 'Petitioning the government sits in the First Amendment, next to speech, press and peaceful assembly.'],
  [2, 'Which amendment deals with the right to keep and bear arms?', 'The Second Amendment links a well regulated militia to the right of the people to keep and bear arms.'],
  [3, 'Which amendment limits housing soldiers in private homes?', 'The Third Amendment: no soldier may be quartered in a house in peacetime without the owner’s consent.'],
  [4, 'Which amendment protects against unreasonable searches and seizures?', 'The Fourth Amendment requires warrants based on probable cause that describe the place and the things to be searched.'],
  [5, 'Which amendment lets a person refuse to be a witness against himself?', 'The Fifth Amendment: nobody can be compelled to testify against himself in a criminal case (“pleading the Fifth”).'],
  [5, 'Which amendment forbids trying a person twice for the same offense?', 'Double jeopardy is barred by the Fifth Amendment, together with the due process and takings clauses.'],
  [5, 'Which amendment requires just compensation when the government takes private property?', 'The last clause of the Fifth Amendment: private property cannot be taken for public use without just compensation.'],
  [6, 'Which amendment guarantees a speedy and public trial and the help of a lawyer?', 'The Sixth Amendment covers criminal trials: speed, publicity, an impartial jury, witnesses and counsel.'],
  [7, 'Which amendment keeps jury trials in many civil (non-criminal) cases?', 'The Seventh Amendment preserves the jury in suits at common law above twenty dollars.'],
  [8, 'Which amendment bans excessive bail and cruel and unusual punishment?', 'The Eighth Amendment limits bail, fines and punishments.'],
  [9, 'Which amendment says that listing some rights does not deny other rights of the people?', 'The Ninth Amendment: the rights written down are not the only rights people keep.'],
  [10, 'Which amendment reserves powers not given to the federal government to the states or the people?', 'The Tenth Amendment closes the Bill of Rights by protecting the powers of the states and the people.'],
];
const BOR_ITEMS: DrillItem[] = [
  ...BOR.map(([n, q, why], i) => mix(amd(n), near(n, 1, 10, i + 1), i + 11, q, why)),
  mix('Ten', ['Seven', 'Twelve', 'Twenty-seven'], 3, 'How many amendments make up the Bill of Rights?', 'The Bill of Rights is the name for the first ten amendments to the Constitution.'),
  mix('1791', ['1776', '1787', '1865'], 4, 'In which year were the first ten amendments ratified?', 'They were ratified in 1791, four years after the Constitution was signed in 1787.'),
  mix('James Madison', ['George Washington', 'Thomas Jefferson', 'Benjamin Franklin'], 5, 'Who proposed the amendments that became the Bill of Rights in the First Congress?', 'James Madison, then a member of the House of Representatives, introduced them in 1789.'),
  official(6),
  official(60),
];

/* ---------------------------------------------------------------- the 27 amendments */
const AMD: Array<[number, string, string]> = [
  [11, 'Which amendment limits lawsuits against a state by citizens of another state?', 'The 11th Amendment (1795) restricts the federal courts in suits against states.'],
  [12, 'Which amendment makes electors vote separately for President and Vice President?', 'The 12th Amendment (1804) changed the Electoral College ballot after the tied election of 1800.'],
  [13, 'Which amendment abolished slavery?', 'The 13th Amendment (1865) ended slavery and involuntary servitude, except as punishment for a crime.'],
  [14, 'Which amendment makes all persons born or naturalized in the United States citizens?', 'The 14th Amendment (1868) defines citizenship and promises equal protection of the laws.'],
  [15, 'Which amendment bars denying the vote because of race or color?', 'The 15th Amendment (1870) protects the vote of citizens regardless of race, color or previous servitude.'],
  [16, 'Which amendment allows a federal income tax?', 'The 16th Amendment (1913) lets Congress tax incomes without dividing the tax among the states by population.'],
  [17, 'Which amendment has the people elect U.S. senators directly?', 'Before the 17th Amendment (1913), state legislatures chose senators.'],
  [18, 'Which amendment banned alcoholic beverages (Prohibition)?', 'The 18th Amendment (1919) started Prohibition; it is the only amendment later repealed.'],
  [19, 'Which amendment gave women the right to vote?', 'The 19th Amendment was ratified in 1920.'],
  [20, 'Which amendment moved the start of presidential terms to January 20?', 'The 20th Amendment (1933) shortened the “lame duck” period after elections.'],
  [21, 'Which amendment repealed Prohibition?', 'The 21st Amendment (1933) repealed the 18th.'],
  [22, 'Which amendment limits a president to two elected terms?', 'The 22nd Amendment (1951) followed Franklin Roosevelt’s four elections.'],
  [23, 'Which amendment gives Washington, D.C. electors in presidential elections?', 'The 23rd Amendment (1961) gives the District electors, but not senators or a voting representative.'],
  [24, 'Which amendment bans poll taxes in federal elections?', 'The 24th Amendment (1964): no tax can be charged to vote for federal offices.'],
  [25, 'Which amendment deals with presidential disability and filling a vacant vice presidency?', 'The 25th Amendment (1967) sets the succession and disability procedures.'],
  [26, 'Which amendment lowered the voting age to 18?', 'The 26th Amendment was ratified in 1971.'],
  [27, 'Which amendment delays a congressional pay raise until after the next House election?', 'Proposed in 1789, the 27th Amendment was ratified only in 1992.'],
];
const AMD_ITEMS: DrillItem[] = [
  ...AMD.map(([n, q, why], i) => mix(amd(n), near(n, 11, 27, i + 21), i + 31, q, why)),
  mix('27th Amendment', ['26th Amendment', '21st Amendment', '14th Amendment'], 6, 'Which amendment was the last to be ratified, in 1992?', 'The 27th Amendment is the most recent; no amendment has been added since 1992.'),
  mix('18th Amendment', ['16th Amendment', '19th Amendment', '13th Amendment'], 7, 'Which amendment is the only one ever repealed?', 'The 21st Amendment repealed the 18th in 1933.'),
  mix('Three-fourths of the states', ['A majority of voters', 'The Supreme Court', 'The President'], 8, 'After Congress proposes an amendment, who must ratify it?', 'Article V: an amendment proposed by two-thirds of both houses takes effect when three-fourths of the states ratify it.'),
  official(5),
  official(7),
  official(97),
];

/* ---------------------------------------------------------------- branches of government */
const L = 'Legislative branch (Congress)', E = 'Executive branch (the President)', J = 'Judicial branch (the courts)';
const br = (right: string, q: string, why: string): DrillItem => {
  const o = [L, E, J, 'The states'];
  return { q, o, a: o.indexOf(right), why };
};
const BR_ITEMS: DrillItem[] = [
  br(L, 'Which branch writes federal laws?', 'Article I gives all legislative powers to Congress: the Senate and the House of Representatives.'),
  br(E, 'Which branch can veto a bill?', 'The President signs or vetoes bills passed by Congress (Article I, section 7).'),
  br(J, 'Which branch decides whether a law agrees with the Constitution?', 'The courts review laws in the cases brought before them; the Supreme Court has the final word.'),
  br(L, 'Which branch has the power to declare war?', 'Article I, section 8: Congress declares war; the President is commander in chief.'),
  br(L, 'Which branch sets federal taxes and approves spending?', 'Congress holds the power of the purse; revenue bills start in the House.'),
  br(E, 'The Cabinet and the federal departments belong to which branch?', 'They carry out the laws under the President, in the executive branch.'),
  br(J, 'The Supreme Court is part of which branch?', 'Article III creates the Supreme Court and lets Congress set up lower federal courts.'),
  br(E, 'Which branch nominates federal judges and ambassadors?', 'The President nominates them; the Senate confirms them.'),
  mix('The Senate', ['The House of Representatives', 'The Supreme Court', 'The Cabinet'], 9, 'Who confirms the President’s nominees to the Supreme Court?', 'Article II: the President appoints judges “by and with the Advice and Consent of the Senate.”'),
  mix('Two-thirds of both houses of Congress', ['A simple majority of the Senate', 'The Supreme Court', 'Three-fourths of the states'], 10, 'What vote does Congress need to override a presidential veto?', 'A vetoed bill becomes law if two-thirds of the House and two-thirds of the Senate pass it again.'),
  mix('The Senate', ['The House of Representatives', 'The Supreme Court', 'The Vice President alone'], 11, 'In an impeachment, which body holds the trial?', 'The House impeaches (brings the charges); the Senate tries the case.'),
  mix('Nine', ['Seven', 'Twelve', 'Fifteen'], 12, 'How many justices sit on the Supreme Court?', 'Congress sets the number by law; it has been nine since 1869.'),
  mix('Article I', ['Article II', 'Article III', 'Article V'], 13, 'Which article of the Constitution creates Congress?', 'Article I: Congress; Article II: the President; Article III: the courts.'),
  official(15),
  official(16),
  official(17),
  official(51),
];

/* ---------------------------------------------------------------- state capitals */
/** A larger, better-known city of the state: the usual wrong answer (general reference). */
const TRAP: Record<string, string> = { NY: 'New York City', CA: 'Los Angeles', IL: 'Chicago', PA: 'Philadelphia', FL: 'Miami', TX: 'Houston', WA: 'Seattle', NV: 'Las Vegas', KY: 'Louisville', MI: 'Detroit', OR: 'Portland', NJ: 'Newark', MO: 'Kansas City', MD: 'Baltimore', LA: 'New Orleans', AK: 'Anchorage', DE: 'Wilmington', VT: 'Burlington', NH: 'Manchester', WI: 'Milwaukee', SC: 'Charleston', NE: 'Omaha', ME: 'Portland', AL: 'Huntsville', MT: 'Billings', SD: 'Sioux Falls', ND: 'Fargo', KS: 'Wichita', NM: 'Albuquerque', VA: 'Virginia Beach', CT: 'Bridgeport', NC: 'Charlotte', MN: 'Minneapolis', };
const CAP_ITEMS: DrillItem[] = STATES.map((s, i) => {
  const r = rng(i + 101);
  const others = STATES.filter((x) => x.code !== s.code).map((x) => x.capital).filter((c) => c !== TRAP[s.code]);
  const picks: string[] = TRAP[s.code] ? [TRAP[s.code]] : [];
  while (picks.length < 3) { const c = others[Math.floor(r() * others.length)]; if (!picks.includes(c) && c !== s.capital) picks.push(c); }
  return mix(s.capital, picks, i + 201, `What is the capital of ${s.name}?`, TRAP[s.code] ? `${s.capital} is the capital of ${s.name}; ${TRAP[s.code]} is a larger city but not the seat of the state government.` : `${s.capital} is the seat of the ${s.name} state government.`);
});

/* ---------------------------------------------------------------- presidents */
export interface Presidency { n: number; name: string; from: number; to: number | null }
export const PRESIDENCIES: Presidency[] = [
  [1, 'George Washington', 1789, 1797], [2, 'John Adams', 1797, 1801], [3, 'Thomas Jefferson', 1801, 1809], [4, 'James Madison', 1809, 1817], [5, 'James Monroe', 1817, 1825],
  [6, 'John Quincy Adams', 1825, 1829], [7, 'Andrew Jackson', 1829, 1837], [8, 'Martin Van Buren', 1837, 1841], [9, 'William Henry Harrison', 1841, 1841], [10, 'John Tyler', 1841, 1845],
  [11, 'James K. Polk', 1845, 1849], [12, 'Zachary Taylor', 1849, 1850], [13, 'Millard Fillmore', 1850, 1853], [14, 'Franklin Pierce', 1853, 1857], [15, 'James Buchanan', 1857, 1861],
  [16, 'Abraham Lincoln', 1861, 1865], [17, 'Andrew Johnson', 1865, 1869], [18, 'Ulysses S. Grant', 1869, 1877], [19, 'Rutherford B. Hayes', 1877, 1881], [20, 'James A. Garfield', 1881, 1881],
  [21, 'Chester A. Arthur', 1881, 1885], [22, 'Grover Cleveland', 1885, 1889], [23, 'Benjamin Harrison', 1889, 1893], [24, 'Grover Cleveland', 1893, 1897], [25, 'William McKinley', 1897, 1901],
  [26, 'Theodore Roosevelt', 1901, 1909], [27, 'William H. Taft', 1909, 1913], [28, 'Woodrow Wilson', 1913, 1921], [29, 'Warren G. Harding', 1921, 1923], [30, 'Calvin Coolidge', 1923, 1929],
  [31, 'Herbert Hoover', 1929, 1933], [32, 'Franklin D. Roosevelt', 1933, 1945], [33, 'Harry S. Truman', 1945, 1953], [34, 'Dwight D. Eisenhower', 1953, 1961], [35, 'John F. Kennedy', 1961, 1963],
  [36, 'Lyndon B. Johnson', 1963, 1969], [37, 'Richard M. Nixon', 1969, 1974], [38, 'Gerald R. Ford', 1974, 1977], [39, 'Jimmy Carter', 1977, 1981], [40, 'Ronald Reagan', 1981, 1989],
  [41, 'George H. W. Bush', 1989, 1993], [42, 'Bill Clinton', 1993, 2001], [43, 'George W. Bush', 2001, 2009], [44, 'Barack Obama', 2009, 2017], [45, 'Donald J. Trump', 2017, 2021],
  [46, 'Joe Biden', 2021, 2025], [47, 'Donald J. Trump', 2025, null],
].map(([n, name, from, to]) => ({ n: n as number, name: name as string, from: from as number, to: to as number | null }));
const pname = (n: number) => PRESIDENCIES[n - 1].name;
const ordinal = (n: number) => `${n}${n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] ?? 'th'}`;
const years = (p: Presidency) => (p.to === null ? `since ${p.from}` : p.from === p.to ? `in ${p.from}` : `${p.from} to ${p.to}`);
const PRES_NTH: DrillItem[] = PRESIDENCIES.map((p, i) => {
  const pool = PRESIDENCIES.filter((x) => x.name !== p.name && Math.abs(x.n - p.n) <= 4).map((x) => x.name);
  const uniq = [...new Set(pool)];
  const r = rng(i + 301);
  uniq.sort(() => r() - 0.5);
  return mix(p.name, uniq.slice(0, 3), i + 401, `Who was the ${ordinal(p.n)} president of the United States?`, `${p.name} served as the ${ordinal(p.n)} president, ${years(p)}.`);
});
const PRES_EVENTS: DrillItem[] = [
  mix(pname(16), [pname(15), pname(17), pname(18)], 1, 'Who was president during the Civil War?', 'Abraham Lincoln led the Union from 1861 until his assassination in April 1865.'),
  mix(pname(3), [pname(2), pname(4), pname(5)], 2, 'Which president bought the Louisiana Territory from France in 1803?', 'Thomas Jefferson’s administration completed the Louisiana Purchase, doubling the size of the country.'),
  mix(pname(37), [pname(36), pname(38), pname(39)], 3, 'Which president resigned from office?', 'Richard Nixon resigned in August 1974, the only president to do so.'),
  mix(pname(2), [pname(1), pname(3), pname(4)], 4, 'Who was the first president to live in the White House?', 'John Adams moved into the unfinished White House in November 1800.'),
  mix('Grover Cleveland and Donald J. Trump', ['Theodore and Franklin D. Roosevelt', 'John Adams and John Quincy Adams', 'George H. W. Bush and George W. Bush'], 5, 'Which presidents served two non-consecutive terms?', 'Grover Cleveland was the 22nd and 24th president; Donald J. Trump the 45th and 47th.'),
  mix(pname(43), [pname(42), pname(44), pname(41)], 6, 'Who was president on September 11, 2001?', 'George W. Bush took office in January 2001.'),
  mix(pname(1), [pname(2), pname(3), pname(4)], 7, 'Who was the first president of the United States?', 'George Washington served two terms, from 1789 to 1797.'),
  official(38),
  official(105),
  official(36),
  official(37),
];

/* ---------------------------------------------------------------- the drills */
export const DRILLS: Record<string, Drill> = {
  bill: { id: 'bill', title: 'Bill of Rights quiz', items: BOR_ITEMS, size: 10, note: 'Questions written from the text of the Bill of Rights (National Archives transcript), plus USCIS 2025 civics questions 6 and 60.' },
  amendments: { id: 'amendments', title: 'Constitutional amendments quiz', items: AMD_ITEMS, size: 10, note: 'Amendments 11 to 27 and Article V, written from the National Archives transcripts, plus USCIS 2025 civics questions 5, 7 and 97. The first ten have their own quiz on the Bill of Rights page.' },
  branches: { id: 'branches', title: 'Branches of government quiz', items: BR_ITEMS, size: 10, note: 'Questions written from Articles I, II and III of the Constitution, plus USCIS 2025 civics questions 15, 16, 17 and 51.' },
  capitals: { id: 'capitals', title: 'State capitals quiz', items: CAP_ITEMS, size: 10, note: 'All 50 states. The wrong options include the largest city when it is the usual trap.' },
  presidents: { id: 'presidents', title: 'U.S. presidents quiz', items: [...PRES_EVENTS, ...PRES_NTH], size: 10, note: `${PRESIDENCIES.length} presidencies, ${new Set(PRESIDENCIES.map((p) => p.name)).size} people, plus USCIS 2025 civics questions 36, 37, 38 and 105.` },
};
