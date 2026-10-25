/**
 * Tirage reproductible des examens blancs américains (lib/engine/us.ts) : générateur pseudo-aléatoire
 * à graine (graine dans l'URL partagée) et graine stable tirée de l'identifiant de la page.
 * Les banques et la correction des examens du Royaume-Uni, de l'Australie et du Canada ont été retirées
 * le 2026-10-25 : ces pays ont désormais chacun leur site.
 */

/** Générateur pseudo-aléatoire mulberry32 : même graine, même examen (lien partageable, hydratation). */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/** Stable seed from a text (page id): the build and the browser draw the same first test. */
export function seedOf(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0;
  return h;
}
