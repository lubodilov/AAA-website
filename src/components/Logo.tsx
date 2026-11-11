type Props = { className?: string };

/** The UV monogram: the up-arrow sits in the negative space between U and V. */
export function Monogram({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 301 188" className={className} aria-hidden="true" fill="currentColor">
      <path d="M1.7 1.7H47V121Q47 130.5 56.5 130.5H119L147.5 175H58A56.3 56.3 0 0 1 1.7 118.7Z" />
      <path d="M98.75 0H148.5L102.5 75.75H140V110H98.75Z" />
      <path d="M150 0H172.5L233.75 144.5L212.5 186.25L163 77H194.5Z" style={{ fill: '#ff2b1e' }} />
      <path d="M260 1.5H298.5L252 104L233 60.5Z" />
    </svg>
  );
}

export function Logo({ className = '' }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Monogram className="h-[17px] w-auto" />
      <span className="text-[16px] font-medium leading-none tracking-[-0.015em]">Upgrade Vision</span>
    </span>
  );
}
