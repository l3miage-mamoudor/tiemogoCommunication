// Motif SVG tuilé façon écailles de caméléon — overlay décoratif réutilisé
// sur les vignettes placeholder (réalisations, équipe) tant qu'aucune vraie
// photo n'est disponible. `id` doit être unique par instance montée dans le
// DOM (les <pattern> SVG partagent un espace de noms global).
export default function ScalePattern({ id, opacity = 0.14, className }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      aria-hidden="true"
      style={{ position: "absolute", inset: 0 }}
    >
      <defs>
        <pattern
          id={id}
          width="34"
          height="30"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1)"
        >
          <path
            d="M17 0 C 28 0, 34 8, 34 17 C 34 8, 40 0, 51 0 L 51 15 C 40 15, 34 23, 34 30 C 34 23, 28 15, 17 15 Z"
            fill="currentColor"
            opacity={opacity}
          />
          <path
            d="M0 15 C 11 15, 17 23, 17 30 C 17 23, 23 15, 34 15 L 34 30 L 0 30 Z"
            fill="currentColor"
            opacity={opacity * 0.7}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
