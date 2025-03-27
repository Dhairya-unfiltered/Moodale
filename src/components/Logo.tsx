
import React from 'react';

interface LogoProps {
  variant?: 'default' | 'white' | 'black';
  className?: string;
}

const Logo = ({ variant = 'default', className = '' }: LogoProps) => {
  let textColor1 = 'text-white';
  let textColor2 = 'text-moodale-orange';

  if (variant === 'black') {
    textColor1 = 'text-moodale-black';
    textColor2 = 'text-moodale-orange';
  } else if (variant === 'white') {
    textColor1 = 'text-white';
    textColor2 = 'text-moodale-orange';
  }

  return (
    <div className={`font-display font-bold ${className}`}>
      <span className={textColor1}>M</span>
      <span className={textColor2}>OO</span>
      <span className={textColor1}>DAL</span>
      <span className={textColor2}>E</span>
    </div>
  );
};

export default Logo;
