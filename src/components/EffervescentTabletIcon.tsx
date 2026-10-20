import React from 'react';

interface EffervescentTabletIconProps {
  className?: string;
  size?: number;
}

export const EffervescentTabletIcon: React.FC<EffervescentTabletIconProps> = ({ 
  className = "w-4 h-4", 
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
      aria-label="Pastilha Efervescente"
    >
      {/* Pastilha efervescente circular */}
      <circle cx="12" cy="14" r="6.8" />
      {/* Vinco / ranhura central da pastilha */}
      <line x1="8.5" y1="14" x2="15.5" y2="14" />
      
      {/* Bolhas efervescentes ativas subindo */}
      <circle cx="7.5" cy="4.5" r="1.5" strokeWidth="1.8" />
      <circle cx="12" cy="3" r="1.2" strokeWidth="1.8" />
      <circle cx="16.5" cy="5" r="1.5" strokeWidth="1.8" />
      <circle cx="11" cy="7.8" r="1" strokeWidth="1.5" />
    </svg>
  );
};
