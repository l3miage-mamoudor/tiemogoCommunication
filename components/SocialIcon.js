// Icônes simples (formes de base + glyphes texte réels pour "f"/"in" plutôt
// que des tracés approximatifs) — pas de dépendance à une librairie d'icônes.
export default function SocialIcon({ type, size = 18 }) {
  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <text
          x="12"
          y="16.5"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fontFamily="Georgia, serif"
          fontStyle="italic"
          fill="currentColor"
        >
          f
        </text>
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="800" fill="currentColor">
          in
        </text>
      </svg>
    );
  }

  // instagram — pictogramme appareil photo
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}
