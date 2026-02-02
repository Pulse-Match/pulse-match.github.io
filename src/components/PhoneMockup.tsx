import './PhoneMockup.css';

interface PhoneMockupProps {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'phone-sm',
  md: 'phone-md',
  lg: 'phone-lg',
  xl: 'phone-xl',
};

export function PhoneMockup({
  lightSrc,
  darkSrc,
  alt,
  size = 'md',
  className = ''
}: PhoneMockupProps) {
  return (
    <div className={`phone-mockup ${sizeClasses[size]} ${className}`}>
      <img src={lightSrc} alt={alt} className="phone-screen screen-light" />
      <img src={darkSrc} alt={alt} className="phone-screen screen-dark" />
    </div>
  );
}
