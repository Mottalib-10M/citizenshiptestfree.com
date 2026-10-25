#!/usr/bin/env python3
"""Relit la source officielle des frais du Formulaire N-400 et la compare à data/params-2026.json.
(Royaume-Uni, Canada et Australie retirés le 2026-10-25 : ces pays ont désormais chacun leur site.)

Usage : python3 scripts/update-data.py [--write]
  sans --write : affiche les écarts et sort en code 2 s'il y en a (le cron ouvre alors une alerte) ;
  avec --write : écrit data/official-latest.json (valeurs lues + date + URL), jamais params-2026.json,
                 qui ne change qu'après relecture humaine de la règle (RECETTE §17.4).

Source (aucun scraping de concurrent) :
  US  page du Formulaire N-400 sur uscis.gov (domaine public), « Submit $760 … $710 … $380 ».
Dépendances : Python 3.10+ (stdlib).
"""
import datetime as dt
import html
import json
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PARAMS = ROOT / "src" / "data" / "params-2026.json"
OUT = ROOT / "data" / "official-latest.json"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"

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
    for key, fn, ref in (("us", us, params["us"]["fees"]),):
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
