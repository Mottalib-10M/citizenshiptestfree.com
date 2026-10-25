#!/usr/bin/env python3
"""Builds the US civics banks (src/data/questions/us-2025.json and us-2008.json).

Inputs, all in data/us/:
  official-2025-en.json, official-2008-en.json, official-2008-es.json
      the official USCIS lists (M-1778 for 2025, the 100 questions of 2008 in English and in USCIS's
      own Spanish translation), parsed by scripts/parse128.py and scripts/parse2008.py from the files
      downloaded on uscis.gov (data/raw/us/, not versioned). Works of the U.S. federal government:
      public domain (17 U.S.C. 105).
  options-2025-en.txt, options-2008-en.txt, options-2008-es.txt
      answer options of the multiple-choice practice, written by Radif Partners.
  es-2025.txt
      Radif Partners' unofficial Spanish translation of the 128 questions (USCIS publishes no Spanish
      version of the 2025 list), with its options.

Questions whose answer changes with elections ("now") take the names listed on the USCIS "Check for
Test Updates" page (CURRENT below); questions whose answer depends on where the applicant lives
(senator, representative, governor, state capital) stay in the bank with "answers vary" and are never
drawn in a scored test.

Usage: python3 scripts/build-us-banks.py   (exit 1 if a check fails)
"""
import json
import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
D = ROOT / "data" / "us"
OUT = ROOT / "src" / "data" / "questions"

UPDATES_URL = "https://www.uscis.gov/citizenship/find-study-materials-and-resources/check-for-test-updates"
RETRIEVED = "2026-10-25"
UPDATES_REVIEWED = "2025-09-18"  # "Last Reviewed/Updated" printed on the USCIS page when read
# Answers listed on the USCIS test updates page (read 2026-10-25).
CURRENT = {
    "2025": {
        30: (["Mike Johnson", "Johnson", "James Michael Johnson (birth name)"], ["Mike Johnson", "Johnson", "James Michael Johnson (nombre de nacimiento)"]),
        38: (["Donald J. Trump", "Donald Trump", "Trump"], ["Donald J. Trump", "Donald Trump", "Trump"]),
        39: (["JD Vance", "Vance"], ["JD Vance", "Vance"]),
        57: (["John Roberts", "John G. Roberts, Jr.", "Roberts"], ["John Roberts", "John G. Roberts, Jr.", "Roberts"]),
    },
    "2008": {
        28: (["Donald J. Trump", "Donald Trump", "Trump"], ["Donald J. Trump", "Donald Trump", "Trump"]),
        29: (["JD Vance", "Vance"], ["JD Vance", "Vance"]),
        39: (["nine (9)"], ["nueve (9)"]),
        40: (["John Roberts", "John G. Roberts, Jr."], ["John Roberts", "John G. Roberts, Jr."]),
        46: (["Republican (Party)"], ["Republicano (Partido)"]),
        47: (["Mike Johnson", "Johnson", "James Michael Johnson (birth name)"], ["Mike Johnson", "Johnson", "James Michael Johnson (nombre de nacimiento)"]),
    },
}
LOCAL = {"2025": {23, 29, 61, 62}, "2008": {20, 23, 43, 44}}
THEMES_ES_2025 = {
    "Principles of American Government": "Principios del gobierno estadounidense",
    "System of Government": "Sistema de gobierno",
    "Rights and Responsibilities": "Derechos y responsabilidades",
    "Colonial Period and Independence": "Época colonial e independencia",
    "1800s": "Siglo XIX (los años 1800)",
    "Recent American History and Other Important Historical Information": "Historia reciente y otra información histórica importante",
    "Symbols": "Símbolos",
    "Holidays": "Días feriados",
}
SOURCES = {
    "2025": {"doc": "128 Civics Questions and Answers (2025 version), USCIS form M-1778 (09/25)", "url": "https://www.uscis.gov/sites/default/files/document/questions-and-answers/2025-Civics-Test-128-Questions-and-Answers.pdf"},
    "2008": {"doc": "Civics Questions and Answers (2008 version), USCIS (rev. 08/21)", "url": "https://www.uscis.gov/sites/default/files/document/questions-and-answers/OoC_100_Questions_2008_Civics_Test_V1.pdf",
             "docEs": "Preguntas de Educación Cívica (Historia y Gobierno) del Examen de Naturalización, USCIS (rev. 01/19)", "urlEs": "https://www.uscis.gov/sites/default/files/document/questions-and-answers/100q_Spanish_2021_SPA.docx"},
}
errors: list[str] = []


def rows(name: str) -> dict[int, list[str]]:
    out = {}
    for line in (D / name).read_text(encoding="utf-8").splitlines():
        if not line.strip() or line.startswith("#"):
            continue
        parts = [p.strip() for p in line.split("|")]
        out[int(parts[0])] = parts[1:]
    return out


def norm(s: str) -> set[str]:
    s = unicodedata.normalize("NFKD", s.lower())
    s = "".join(c for c in s if not unicodedata.combining(c))
    stop = {"the", "of", "a", "an", "to", "and", "in", "for", "is", "el", "la", "los", "las", "de", "del", "y", "a", "en", "por", "que", "un", "una", "because", "porque", "their", "su", "sus", "u", "s"}
    return {w for w in re.findall(r"[a-z0-9]+", s) if w not in stop and len(w) > 1}


def matches(correct: str, accepted: list[str]) -> bool:
    c = norm(correct)
    if not c:
        return False
    pool = set().union(*(norm(a) for a in accepted))
    return len(c & pool) / len(c) >= 0.5


def perm(n: int, total: int = 4) -> list[int]:
    """Deterministic position of the right option (spread evenly over A-D), then the wrong ones."""
    pos = (n * 7 + 3) % total
    order = [1, 2, 3]
    rot = n % 3
    order = order[rot:] + order[:rot]
    res = order[:]
    res.insert(pos, 0)
    return res


def build(year: str) -> dict:
    off_en = json.loads((D / f"official-{year}-en.json").read_text(encoding="utf-8"))
    opt_en = rows(f"options-{year}-en.txt")
    if year == "2025":
        es_rows = rows("es-2025.txt")
        off_es = None
    else:
        off_es = {q["n"]: q for q in json.loads((D / "official-2008-es.json").read_text(encoding="utf-8"))}
        opt_es = rows("options-2008-es.txt")
    themes_en: list[str] = []
    themes_es: list[str] = []
    qs = []
    for q in off_en:
        n = q["n"]
        if q["sub"] not in themes_en:
            themes_en.append(q["sub"])
            themes_es.append(THEMES_ES_2025[q["sub"]] if year == "2025" else off_es[n]["sub"])
        local = n in LOCAL[year]
        cur = CURRENT[year].get(n)
        ans_en = cur[0] if cur else q["a"]
        if year == "2025":
            r = es_rows.get(n)
            if not r:
                errors.append(f"{year} #{n}: Spanish line missing")
                continue
            q_es, ans_es = r[0], [a.strip() for a in r[1].split(" ; ")]
            o_es = r[2:]
        else:
            q_es, ans_es = off_es[n]["q"].rstrip("."), off_es[n]["a"]
            o_es = opt_es.get(n, [])
        if cur:
            ans_es = cur[1]
        o_en = opt_en.get(n, [])
        item = {"id": f"us{year[2:]}-{n:03d}", "n": n, "theme": themes_en.index(q["sub"]), "star": q["star"]}
        if local:
            item["local"] = True
            if o_en or o_es:
                errors.append(f"{year} #{n}: local question should have no options")
        else:
            if cur:
                item["current"] = True
            if len(o_en) != 4 or len(o_es) != 4:
                errors.append(f"{year} #{n}: 4 options expected (en {len(o_en)}, es {len(o_es)})")
                continue
            if len(set(o_en)) != 4 or len(set(o_es)) != 4:
                errors.append(f"{year} #{n}: duplicate option")
            if not matches(o_en[0], ans_en):
                errors.append(f"{year} #{n} en: right option «{o_en[0]}» not found in the accepted answers {ans_en}")
            if not matches(o_es[0], ans_es):
                errors.append(f"{year} #{n} es: right option «{o_es[0]}» not found in the accepted answers {ans_es}")
            p = perm(n)
            item["answer"] = p.index(0)
            item["en"] = {"q": q["q"], "a": ans_en, "o": [o_en[i] for i in p]}
            item["es"] = {"q": q_es, "a": ans_es, "o": [o_es[i] for i in p]}
        if local:
            item["en"] = {"q": q["q"], "a": ans_en}
            item["es"] = {"q": q_es, "a": ans_es}
        if "note" in q:
            item["en"]["note"] = q["note"]
        for lang in ("en", "es"):
            txt = json.dumps(item[lang], ensure_ascii=False)
            if "—" in txt or "|" in txt:
                errors.append(f"{year} #{n} {lang}: forbidden character")
        qs.append(item)
    meta = {
        "year": year, "retrievedAt": RETRIEVED, "licence": "Public domain (work of the U.S. federal government, 17 U.S.C. 105)",
        "updatesUrl": UPDATES_URL, "updatesReviewed": UPDATES_REVIEWED, **SOURCES[year],
        "esOfficial": year == "2008",
        "optionsBy": "Radif Partners",
    }
    by = [0, 0, 0, 0]
    for x in qs:
        if "answer" in x:
            by[x["answer"]] += 1
    if max(by) / sum(by) >= 0.4:
        errors.append(f"{year}: right answers badly spread {by}")
    stars = sum(1 for x in qs if x["star"])
    if stars != 20:
        errors.append(f"{year}: {stars} questions marked 65/20, 20 expected")
    return {"meta": meta, "themes": {"en": themes_en, "es": themes_es}, "questions": qs}


def main() -> int:
    for year, total in (("2025", 128), ("2008", 100)):
        bank = build(year)
        if len(bank["questions"]) != total:
            errors.append(f"{year}: {len(bank['questions'])} questions, {total} expected")
        (OUT / f"us-{year}.json").write_text(json.dumps(bank, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        print(f"us-{year}.json: {len(bank['questions'])} questions, {sum(1 for q in bank['questions'] if 'answer' in q)} scorable, {len(bank['themes']['en'])} themes")
    for e in errors:
        print("!!", e)
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
