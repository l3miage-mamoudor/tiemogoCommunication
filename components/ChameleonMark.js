export default function ChameleonMark({ size = 40, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 40c0-9 6-15 14-15 5 0 8 2 11 5l3 3c2 2 4 3 7 3 3 0 5-1 7-3"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M40 33c3-3 5-7 5-11 0-3-1-5-3-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="38" cy="20" r="2.4" fill="currentColor" />
      <path
        d="M8 40c-1 3-3 5-6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M22 41c0 5-2 9-6 11"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
