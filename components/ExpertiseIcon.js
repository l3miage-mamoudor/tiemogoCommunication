// Marques simples, une par expertise (ordre fixe de lib/content.js EXPERTISES :
// conseil stratégique, création, digital, édition et print, événementiel).
// Même vocabulaire géométrique que les logos fictifs déjà produits pour les
// tests Sanity — cercles/traits/arches plutôt que de la photo.
const ICONS = [
  // Conseil stratégique — cible
  <>
    <circle cx="24" cy="24" r="16" />
    <circle cx="24" cy="24" r="8" />
    <circle cx="24" cy="24" r="1.6" fill="currentColor" stroke="none" />
  </>,
  // Création — plume
  <>
    <path d="M24 8 L38 20 L24 40 L18 28 Z" />
    <path d="M24 40 L31 33" />
  </>,
  // Digital — écrans superposés
  <>
    <rect x="9" y="11" width="22" height="15" rx="2" />
    <rect x="17" y="23" width="22" height="15" rx="2" />
  </>,
  // Édition et print — livre ouvert
  <path d="M24 14 C16 9 10 10 8 12 L8 34 C10 32 16 31 24 36 C32 31 38 32 40 34 L40 12 C38 10 32 9 24 14 Z M24 14 L24 36" />,
  // Événementiel — arche + projecteur
  <>
    <path d="M12 38 L12 24 A12 12 0 0 1 36 24 L36 38" />
    <circle cx="24" cy="9" r="2" fill="currentColor" stroke="none" />
  </>,
];

export default function ExpertiseIcon({ index, size = 32, className }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[index % ICONS.length]}
    </svg>
  );
}
