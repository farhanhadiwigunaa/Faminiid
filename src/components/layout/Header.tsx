import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { useCartContext } from '@/contexts/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCartContext();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Mission', href: '/mission' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-cream-warm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-eco-green border-b-2 border-eco-green pb-1'
                    : 'text-wood-brown hover:text-eco-green'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Cart & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative p-2 hover:bg-cream-warm rounded-lg transition-colors duration-200"
            >
              <ShoppingCart size={24} className="text-wood-brown" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-eco-green text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce-soft">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-cream-warm rounded-lg transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X size={24} className="text-wood-brown" />
              ) : (
                <Menu size={24} className="text-wood-brown" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-cream-warm animate-fade-in">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-eco-green bg-eco-green/10'
                      : 'text-wood-brown hover:text-eco-green hover:bg-cream-warm'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;