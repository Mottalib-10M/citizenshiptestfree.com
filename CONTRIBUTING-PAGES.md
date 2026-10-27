# Adding or editing a page

One page = one file `src/content/pages/<id>.ts` exporting `definePage({...})` (types in
`src/lib/guide-types.ts`). The file name must equal `id`. The page is built at `/en/<en.slug>/` and at
`/es/<es.slug>/` when `es` is present (Spanish for the United States, `es-US`); hreflang, menus, home lists and sitemap
follow by themselves. Model: `us-test.ts`.

Since 2026-10-25 the site covers the United States only. The former UK, Australian and Canadian pages (and the whole
French tree `/fr/`) are redirect pages listed in `src/data/renvois.ts` (canonical + meta refresh + noindex, out of the
sitemap): never link to them, and never link from an indexable page to the new sites of those countries.

## Fields

- `group`: `us`; `order`: position in menus and on the home page (below 90: the test; 90 and above: Form N-400).
- `tool`: the main tool, shown right under the H1 (first screen, RECETTE §5). Every page has one:
  - `{ kind: 'usquiz', props: { version: '2025'|'2008', mode: 'exam'|'practice'|'6520', theme?: <index>, versionSelect?: true } }`
    (officer's stop rule), `usbank` (`{ version, theme | 'star', versionSelect? }`), `uswhich` (version and exemptions),
    `usenglish` (`{ mode: 'reading'|'writing' }`), `usdate` (`{ route: '5'|'3' }`, N-400 date with trips), `usfee` (household fee tier),
    `usfrise` (`{ variant: 'processing'|'timeline'|'steps'|'oath' }`, the trame's Frise, RECETTE §17.6, durations from `P.us.processing`),
    `ustime` (`{ mode: 'processing'|'timeline'|'oath' }`: decision date with the field office time, dated steps, oath text by form).
  - `usdrill` (`{ drill: 'bill'|'amendments'|'branches'|'capitals'|'presidents' }`, `src/data/us-drills.ts`), `ussenators`
    (senators by state, `src/data/us-states.ts`, dated), `uschecklist` (`{ list: 'biometrics'|'n400'|'n445' }`,
    `src/data/us-checklists.ts`), `usearly` (90-day early filing date), `uswordorder` (writing test sentences).
  - Inline SVG: `${h.us.svgVersions()}` draws which civics test applies by filing date (`src/lib/us-svg.ts`).
  - `{ kind: 'mini:<spec>' }`, specs in `src/lib/mini-specs.ts`: `uspass`, `usexempt`, `uspresence`, `usfee`.
- `mini`: a second tool under the citable block (optional, same kinds).
- In a body, `<!--tool:mini:usfee-->` or `<!--tool:usdate|{"route":"3"}-->` places a tool between paragraphs.
- `related`: 4–6 page ids (`home` allowed). Ids missing in a language are skipped.
- `sources`: keys of `src/data/params-2026.json` → `sources`.

## Text rules (checked by `npm run check`)

- `title` 50–60 characters, key term first ("Civics Test 2026: …"), never "How…", "What…", a country or "Calculator…".
- `description` 150–160 characters exactly.
- `resume(h)`: ONE paragraph of at least 130 words answering the page's query with figures; shown folded after its first sentence.
- `faqs(h)`: 3–5 questions unique to the page across the whole site, each answer 40–90 words.
- `body(h)`: HTML with `<h2>` sections, at least 450 words. No `<h1>`.
- No em dash (—) anywhere; colon, comma or parentheses instead. Percentages written `75%` in English, `75 %` in Spanish.
- Pages must read differently (check-unique fails above 30 % shared sentences between two pages).
- Links only to official sources (`h.src(key, text)`) and internal pages (`h.a(id, text)`). Never a competitor, app,
  law firm, adviser or affiliate; never mention Google, "first result" or any other site.
- Never present the site as a government body; no official logo.

## Figures

Never type a fee, a limit or a count: read them through `h` (`src/lib/helpers.ts`): `h.P` (params-2026.json),
`h.num`, `h.pc`, `h.date(iso)`, `h.table(headers, rows, caption, align)`, `h.usd(n)`, `h.P.us` (test rules, N-400, fees, poverty
guidelines), `h.us.n25|n08` (list sizes), `h.us.themes25|themes08`, `h.us.inTheme(year, i)`, `h.us.q(year, n)`,
`h.us.stars(year)`, `h.us.updatesReviewed`, `h.us.vocabR|vocabW|sentR|sentW` (`src/data/us-english.json`). A fact that is not on an official page is not written.

## Data

- `src/data/params-2026.json`: rules and fees read on the official sites (date in `retrieved_at`), checked monthly by
  `scripts/update-data.py` (workflow `.github/workflows/update-data.yml`, exit code 2 when an amount differs).
- `src/data/questions/us-2025.json`, `us-2008.json`: the official USCIS lists (public domain, 17 U.S.C. 105), built by
  `python3 scripts/build-us-banks.py` from `data/us/` (official lists parsed by `parse128.py` / `parse2008.py`, answer
  options and the unofficial Spanish translation of the 2025 list written by Radif Partners). Never edit the JSON by hand:
  edit `data/us/*.txt` and rebuild. `tests/us.test.ts` checks that every right option is an accepted USCIS answer.
- `data/raw/us/`: official USCIS documents (question lists, vocabulary, N-400 instructions), not versioned.
