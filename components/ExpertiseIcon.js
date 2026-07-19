// Icônes littérales, une par expertise (ordre fixe de lib/content.js
// EXPERTISES : conseil stratégique, création, digital, édition et print,
// événementiel) — plus abstraites, l'idée est d'être reconnaissables au
// premier coup d'œil plutôt que décoratives.
const ICONS = [
  // Conseil stratégique — courbe de croissance
  <>
    <polyline points="8,34 19,23 27,31 40,15" />
    <polyline points="29,15 40,15 40,26" />
  </>,
  // Création — crayon
  <g transform="rotate(45 24 24)">
    <rect x="18" y="6" width="12" height="24" rx="2" />
    <line x1="18" y1="15" x2="30" y2="15" />
    <path d="M18 30 L24 40 L30 30 Z" />
  </g>,
  // Digital — écran
  <>
    <rect x="8" y="10" width="32" height="22" rx="2" />
    <line x1="18" y1="40" x2="30" y2="40" />
    <line x1="24" y1="32" x2="24" y2="40" />
  </>,
  // Édition et print — livre ouvert
  <>
    <path d="M24 14 C18 10 11 10 8 12 L8 34 C11 32 18 32 24 36 C30 32 37 32 40 34 L40 12 C37 10 30 10 24 14 Z" />
    <line x1="24" y1="14" x2="24" y2="36" />
  </>,
  // Événementiel — calendrier
  <>
    <rect x="8" y="12" width="32" height="28" rx="3" />
    <line x1="8" y1="20" x2="40" y2="20" />
    <line x1="16" y1="8" x2="16" y2="16" />
    <line x1="32" y1="8" x2="32" y2="16" />
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
