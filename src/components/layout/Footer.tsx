import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Mission', href: '/mission' },
  ];

  const shopLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'Cart', href: '/cart' },
    { name: 'Checkout', href: '/checkout' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-gradient-to-br from-wood-brown to-wood-brown-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Logo className="text-white" size="md" />
            <p className="text-sm text-white/80 leading-relaxed">
              FAMINI menyediakan gelas ramah lingkungan berbahan serat bambu dan ampas tebu. 
              Bersama kita jaga bumi untuk generasi mendatang.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://instagram.com/faminiid"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://tiktok.com/@faminiid"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com/faminiid"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <MapPin size={16} />
                <span>Bandung, Indonesia</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Phone size={16} />
                <span>081585461271</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Mail size={16} />
                <span>faminiid@gmail.com</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Newsletter</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Email Anda"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button variant="secondary" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-sm text-white/60">
            © 2024 FAMINI. All rights reserved. Made with 💚 for the Earth.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;