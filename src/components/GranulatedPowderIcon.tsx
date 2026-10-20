import React from 'react';

interface GranulatedPowderIconProps {
  className?: string;
  size?: number;
}

export const GranulatedPowderIcon: React.FC<GranulatedPowderIconProps> = ({
  className = "w-5 h-5",
  size
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Pó Granulado"
    >
      {/* Monte de pó granulado na base */}
      <path d="M2.5 19.5C4.2 15.5 7.5 13.5 12 13.5C16.5 13.5 19.8 15.5 21.5 19.5H2.5Z" />
      {/* Camada / textura de dispersão do pó */}
      <path d="M7 17.2C9.5 16 14.5 16 17 17.2" strokeWidth="1.5" />
      
      {/* Grânulos e micropartículas de pó em dispersão */}
      <circle cx="12" cy="3.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="8" cy="6.2" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="5.8" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="8.8" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="6.5" cy="10.2" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="9.8" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="11.2" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="11" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
};
