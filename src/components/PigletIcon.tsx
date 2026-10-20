import React from 'react';

interface PigletIconProps {
  className?: string;
  size?: number;
}

export const PigletIcon: React.FC<PigletIconProps> = ({ 
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
      aria-label="Ícone de Leitão"
    >
      {/* Orelhas empinadas e características do leitão */}
      <path d="M6.2 8.5C4.8 5.5 5.8 3 8.2 3.8C9.7 4.3 10 6.5 10 7.5" />
      <path d="M17.8 8.5C19.2 5.5 18.2 3 15.8 3.8C14.3 4.3 14 6.5 14 7.5" />
      
      {/* Contorno da cabeça redonda do leitão */}
      <circle cx="12" cy="13.5" r="7.5" />
      
      {/* Olhos do leitão */}
      <circle cx="9" cy="11.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="15" cy="11.5" r="0.8" fill="currentColor" stroke="none" />
      
      {/* Focinho suíno */}
      <ellipse cx="12" cy="15.2" rx="3.6" ry="2.4" strokeWidth="1.8" />
      
      {/* Narinas */}
      <circle cx="10.7" cy="15.2" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="13.3" cy="15.2" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
};
