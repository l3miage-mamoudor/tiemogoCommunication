// Palette adaptative "caméléon vivant" — voir app/globals.css pour les
// valeurs hex (--hue-*). Un client/mot/catégorie reçoit toujours la même
// teinte (hash déterministe), jamais une couleur aléatoire à chaque rendu.

export const PALETTE = [
  "var(--hue-signal)",
  "var(--hue-amber)",
  "var(--hue-rust)",
  "var(--hue-emerald)",
];

export function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function hueForSeed(str) {
  return PALETTE[hashSeed(str) % PALETTE.length];
}

export function hueForIndex(i) {
  return PALETTE[i % PALETTE.length];
}
