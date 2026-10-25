# Adding or editing a page

One page = one file `src/content/pages/<id>.ts` exporting `definePage({...})` (types in
`src/lib/guide-types.ts`). The file name must equal `id`. Model: `uk-test.ts`. The page is built at
`/en/<en.slug>/`, at `/fr/<fr.slug>/` when `fr` is present (Canadian pages only) and at `/es/<es.slug>/` when `es` is
present (U.S. pages only, Spanish for the United States, `es-US`); hreflang, menus, home lists and sitemap follow by
themselves. Models: `uk-test.ts`, and `us-test.ts` for a U.S. page with its Spanish version.

## Fields

- `group`: `us`, `uk`, `au`, `ca` or `all` (`us` comes first in menus and on the home page); `order`: position in its group.
- `tool`: the main tool, shown right under the H1 (first screen, RECETTE §5). Every page has one:
  - `{ kind: 'quiz', props: { country: 'uk'|'au'|'ca', mode: 'exam'|'practice', chapter?: <index>, timed?: true, countrySelect?: true } }`
  - `{ kind: 'bank', props: { country, chapter: <index> } }` (questions with answers, one chapter at a time)
  - `{ kind: 'date', props: { country } }` (earliest date to apply, trips day by day)
  - `{ kind: 'cost', props: { country } }` (official fees for a household)
  - United States: `{ kind: 'usquiz', props: { version: '2025'|'2008', mode: 'exam'|'practice'|'6520', theme?: <index>, versionSelect?: true } }`
    (officer's stop rule), `usbank` (`{ version, theme | 'star', versionSelect? }`), `uswhich` (version and exemptions),
    `usenglish` (`{ mode: 'reading'|'writing' }`), `usdate` (`{ route: '5'|'3' }`, N-400 date with trips), `usfee` (household fee tier),
    `usfrise` (`{ variant: 'processing'|'timeline'|'steps'|'oath' }`, the trame's Frise, RECETTE §17.6, durations from `P.us.processing`),
    `ustime` (`{ mode: 'processing'|'timeline'|'oath' }`: decision date with the field office time, dated steps, oath text by form).
  - Inline SVG: `${h.us.svgVersions()}` draws which civics test applies by filing date (`src/lib/us-svg.ts`).
  - `{ kind: 'mini:<spec>' }`, specs in `src/lib/mini-specs.ts`: `ukpass`, `ukexempt`, `ukattempts`, `aupass`, `auproc`,
    `aufee`, `capass`, `cadays`, `cafee`, `catestage`, `compare`, `uspass`, `usexempt`, `uspresence`, `usfee`.
- `mini`: a second tool under the citable block (optional, same kinds).
- In a body, `<!--tool:mini:cadays-->` or `<!--tool:date|{"country":"ca"}-->` places a tool between paragraphs.
- `related`: 4–6 page ids (`home` allowed). Ids missing in a language are skipped.
- `sources`: keys of `src/data/params-2026.json` → `sources`.

## Text rules (checked by `npm run check`)

- `title` 50–60 characters, key term first ("Life in the UK Test 2026: …"), never "How…", "What…", a country or "Calculator…".
- `description` 150–160 characters exactly.
- `resume(h)`: ONE paragraph of at least 130 words answering the page's query with figures; shown folded after its first sentence.
- `faqs(h)`: 3–5 questions unique to the page across the whole site, each answer 40–90 words.
- `body(h)`: HTML with `<h2>` sections, at least 450 words. No `<h1>`.
- No em dash (—) anywhere; colon, comma or parentheses instead. British spelling in English (licence, programme), Canadian
  French with « guillemets » and a no-break space before ? ! : ; (write ` `).
- Pages must read differently (check-unique fails above 30 % shared sentences between two pages).
- Links only to official sources (`h.src(key, text)`) and internal pages (`h.a(id, text)`). Never a competitor, app,
  law firm, adviser or affiliate; never mention Google, "first result" or any other site.
- Never present the site as a government body; no official logo.

## Figures

Never type a fee, a limit or a count: read them through `h` (`src/lib/helpers.ts`): `h.P` (params-2026.json),
`h.gbp/h.aud/h.cad(n)`, `h.num`, `h.pc`, `h.date(iso)`, `h.need.uk|au|ca` (correct answers to pass),
`h.count.uk|au|auValues|ca|caEn|caFr` (bank sizes), `h.chapters.uk|au|ca`, `h.inChapter(bank, i)`, `h.ukTotal`,
`h.table(headers, rows, caption, align)`; United States: `h.usd(n)`, `h.P.us` (test rules, N-400, fees, poverty
guidelines), `h.us.n25|n08` (list sizes), `h.us.themes25|themes08`, `h.us.inTheme(year, i)`, `h.us.q(year, n)`,
`h.us.stars(year)`, `h.us.updatesReviewed`, `h.us.vocabR|vocabW|sentR|sentW` (`src/data/us-english.json`). A fact that is not on an official page is not written.

## Data

- `src/data/params-2026.json`: rules and fees read on the official sites (date in `retrieved_at`), checked monthly by
  `scripts/update-data.py` (workflow `.github/workflows/update-data.yml`, exit code 2 when an amount differs).
- `src/data/questions/*.json`: question banks written by Radif Partners from the official guides (facts only).
  Licences: Our Common Bond CC BY 4.0 (except the coat of arms); Discover Canada and the UK handbook are Crown or
  publisher copyright, nothing reproduced. `npx vitest run` lints every bank.
- `src/data/questions/us-2025.json`, `us-2008.json`: the official USCIS lists (public domain, 17 U.S.C. 105), built by
  `python3 scripts/build-us-banks.py` from `data/us/` (official lists parsed by `parse128.py` / `parse2008.py`, answer
  options and the unofficial Spanish translation of the 2025 list written by Radif Partners). Never edit the JSON by hand:
  edit `data/us/*.txt` and rebuild. `tests/us.test.ts` checks that every right option is an accepted USCIS answer.
- `data/raw/`: official documents read in phase 1 (fees table ODS, form 1298i, FOI document, guidance PDF).
