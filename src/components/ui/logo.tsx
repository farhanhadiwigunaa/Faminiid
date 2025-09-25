import { Leaf } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 36
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="p-2 bg-gradient-eco rounded-xl">
        <Leaf size={iconSizes[size]} className="text-white" />
      </div>
      <span className={`font-handlee font-bold text-eco-green ${sizeClasses[size]}`}>
        FAMINI
      </span>
    </div>
  );
};