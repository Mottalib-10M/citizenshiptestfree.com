#!/usr/bin/env python3
"""Relit les sources officielles des frais et délais (États-Unis, UK, Canada, Australie) et les compare à
data/params-2026.json.

Usage : python3 scripts/update-data.py [--write]
  sans --write : affiche les écarts et sort en code 2 s'il y en a (le cron ouvre alors une alerte) ;
  avec --write : écrit data/official-latest.json (valeurs lues + date + URL), jamais params-2026.json,
                 qui ne change qu'après relecture humaine de la règle (RECETTE §17.4).

Sources (aucun scraping de concurrent) :
  UK  gov.uk « Home Office immigration and nationality fees » (OGL v3.0), tableau ODS le plus récent ;
  AU  formulaire 1298i « Citizenship application fees » (PDF Home Affairs) et page des délais ;
  CA  page des frais d'IRCC (canada.ca), section « Citizenship » ;
  US  page du Formulaire N-400 sur uscis.gov (domaine public), « Submit $760 … $710 … $380 ».
Dépendances : Python 3.10+ (stdlib) ; pypdf pour le PDF australien (pip install pypdf).
"""
import datetime as dt
import html
import io
import json
import re
import sys
import urllib.request
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PARAMS = ROOT / "src" / "data" / "params-2026.json"
OUT = ROOT / "data" / "official-latest.json"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"

UK_PUB = "https://www.gov.uk/government/publications/visa-regulations-revised-table"
AU_FEES = "https://immi.homeaffairs.gov.au/form-listing/forms/1298i.pdf"
AU_TIMES = "https://immi.homeaffairs.gov.au/citizenship/citizenship-processing-times/citizenship-processing-times"
CA_FEES = "https://ircc.canada.ca/english/information/fees/fees.asp"
US_N400 = "https://www.uscis.gov/n-400"


def get(url: str, ua: bool = True, tries: int = 4) -> bytes:
    import time

    req = urllib.request.Request(url, headers={"User-Agent": UA} if ua else {})
    for i in range(tries):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except OSError:
            if i == tries - 1:
                raise
            time.sleep(10 * (i + 1))  # résolveur DNS ou serveur passagèrement muet


def text_of(raw: bytes) -> str:
    s = raw.decode("utf-8", errors="ignore")
    # pages SharePoint de Home Affairs : contenu en JSON échappé (\u003c…)
    s = re.sub(r"\\u([0-9a-fA-F]{4})", lambda m: chr(int(m.group(1), 16)), s).replace('\\"', '"').replace("\\n", " ").replace("\\t", " ")
    s = html.unescape(s)
    s = re.sub(r"(?s)<script.*?</script>|<style.*?</style>", " ", s)
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", s).replace("\xa0", " "))


def money(s: str) -> int:
    return int(round(float(s.replace(",", ""))))


# ---------- Royaume-Uni ----------
def uk() -> dict:
    page = get(UK_PUB).decode("utf-8", errors="ignore")
    links = re.findall(r'https://assets\.publishing\.service\.gov\.uk/media/[^"]+?\.ods', page)
    if not links:
        raise RuntimeError("UK : aucun tableau ODS trouvé sur " + UK_PUB)
    ods_url = links[0]  # la page liste le plus récent en premier
    z = zipfile.ZipFile(io.BytesIO(get(ods_url)))
    root = ET.fromstring(z.read("content.xml"))
    T = "{urn:oasis:names:tc:opendocument:xmlns:table:1.0}"
    P = "{urn:oasis:names:tc:opendocument:xmlns:text:1.0}p"
    rows = []
    for r in root.iter(T + "table-row"):
        cells = []
        for c in r.findall(T + "table-cell"):
            txt = re.sub(r"\s+", " ", " ".join("".join(p.itertext()) for p in c.findall(P)).replace("\xa0", " ")).strip()
            n = min(int(c.get(T + "number-columns-repeated", "1")), 20)
            cells += [txt] * n
        rows.append([c for c in cells if c])

    def fee(label_re: str) -> int:
        for cells in rows:
            if cells and re.search(label_re, cells[0], re.I):
                for c in cells[1:]:
                    m = re.match(r"£([\d,]+)", c)
                    if m:
                        return money(m.group(1))
        raise RuntimeError(f"UK : ligne introuvable « {label_re} » dans {ods_url}")

    title = re.search(r"Fees_?Table_?([^/]+?)\.ods", ods_url)
    return {
        "naturalisation": fee(r"^Naturalisation \(British citizenship\)"),
        "ceremony": fee(r"^The arrangement of a citizenship ceremony"),
        "registrationAdult": fee(r"^Nationality registration as a British citizen - adult"),
        "registrationChild": fee(r"^Nationality registration as a British citizen - child"),
        "ilr": fee(r"^Indefinite leave to remain - main applicant"),
        "lifeInUkTest": fee(r"^Life in the UK test"),
        "sourceFile": ods_url,
        "table": title.group(1) if title else "",
    }


# ---------- Australie ----------
def au() -> dict:
    from pypdf import PdfReader  # import local : seule dépendance hors stdlib

    pdf = PdfReader(io.BytesIO(get(AU_FEES)))
    t = re.sub(r"\s+", " ", " ".join((p.extract_text() or "") for p in pdf.pages))
    g = re.search(r"Gener ?al eligibility \$([\d,]+) Concession fee\* \$([\d,]+)", t)
    o = re.search(r"Other situations \$([\d,]+) Concession fee\* \$([\d,]+)", t)
    d = re.search(r"Design date (\d\d/\d\d)", t)
    if not g or not o:
        raise RuntimeError("AU : montants introuvables dans " + AU_FEES)
    times = text_of(get(AU_TIMES))
    c = re.search(r"conferral: 90% of applications are processed within (\d+) months", times)
    u = re.search(r"Last updated: (\d+/\d+/\d{4})", times)
    return {
        "general": money(g.group(1)),
        "generalConcession": money(g.group(2)),
        "otherSituations": money(o.group(1)),
        "otherSituationsConcession": money(o.group(2)),
        "form": f"1298i (Design date {d.group(1)})" if d else "1298i",
        "conferral90pct": f"{c.group(1)} months" if c else None,
        "processingPageUpdated": u.group(1) if u else None,
    }


# ---------- Canada ----------
def ca() -> dict:
    t = text_of(get(CA_FEES, ua=False))  # canada.ca refuse certains User-Agent de navigateur
    i = t.find("Citizenship - application fees Fees")
    if i < 0:
        i = t.find("Citizenship")
    seg = t[i : i + 3000]
    # la page écrit « Fees $CAN » en en-tête puis les montants sans symbole (« 653.00 »)
    adult = re.search(r"Adult \(18 and over\).{0,200}?\$?([\d,]+\.\d\d)", seg)
    minor = re.search(r"Minor \(under 18\).{0,200}?\$?([\d,]+\.\d\d)", seg)
    right = re.search(r"Right of Citizenship (?:fee )?\$?([\d,]+\.\d\d)", t)
    mod = re.search(r"Date modified: (\d{4}-\d\d-\d\d)", t)
    if not adult or not minor:
        raise RuntimeError("CA : frais introuvables dans " + CA_FEES)
    return {
        "adult": money(adult.group(1)),
        "minor": money(minor.group(1)),
        "rightOfCitizenship": money(right.group(1)) if right else None,
        "dateModified": mod.group(1) if mod else None,
    }


# ---------- États-Unis ----------
def us() -> dict:
    t = text_of(get(US_N400))
    full = re.search(r"Submit \$([\d,]+) if filing by paper, or \$([\d,]+) if filing online", t)
    red = re.search(r"reduced fee:.{0,200}?Submit \$([\d,]+)", t)
    if not full or not red:
        raise RuntimeError("US : tarifs introuvables dans " + US_N400)
    return {"paper": money(full.group(1)), "online": money(full.group(2)), "reduced": money(red.group(1))}


def main() -> int:
    params = json.loads(PARAMS.read_text())
    lu = dt.date.today().isoformat()
    out, diffs, errors = {"_lu": lu}, [], []
    for key, fn, ref in (("uk", uk, params["uk"]["fees"]), ("au", au, {**params["au"]["fees"], **params["au"]["processing"]}), ("ca", ca, params["ca"]["fees"]), ("us", us, params["us"]["fees"])):
        try:
            got = fn()
        except Exception as e:  # une source muette n'arrête pas les autres
            errors.append(f"{key}: {e}")
            continue
        out[key] = got
        for k, v in got.items():
            if k in ref and v is not None and ref[k] != v:
                diffs.append(f"{key}.{k} : params={ref[k]} → source={v}")
    for e in errors:
        print("ERREUR", e)
    for d in diffs:
        print("ÉCART ", d)
    if not diffs and not errors:
        print(f"OK : frais et délais identiques aux sources officielles ({lu}).")
    if "--write" in sys.argv:
        OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n")
        print("écrit", OUT.relative_to(ROOT))
    return 2 if diffs else (1 if errors else 0)


if __name__ == "__main__":
    sys.exit(main())
