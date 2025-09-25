import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Recycle, Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import heroImage from '@/assets/hero-image.png';
import productCollection from '@/assets/product-collection.jpg';

const Index: React.FC = () => {
  const { products } = useProducts();
  const featuredProducts = products.filter(p => p.isPopular).slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-wood-brown leading-tight">
                  <span className="font-handlee text-eco-green">FAMINI:</span>
                  <br />
                  Gelas untuk Bumi
                </h1>
                <p className="text-lg text-wood-brown/80 leading-relaxed max-w-lg">
                  Produk ramah lingkungan berbahan serat bambu dan ampas tebu. 
                  Lindungi bumi dengan pilihan yang berkelanjutan dan berkualitas tinggi.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button className="btn-eco text-lg px-8 py-4">
                    Jelajahi Produk
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="text-lg px-8 py-4">
                    Tentang Kami
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Leaf className="text-eco-green" size={20} />
                  <span className="text-sm text-wood-brown/70">100% Natural</span>
                </div>
                <div className="flex items-center gap-2">
                  <Recycle className="text-eco-green" size={20} />
                  <span className="text-sm text-wood-brown/70">Biodegradable</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="text-eco-green" size={20} />
                  <span className="text-sm text-wood-brown/70">Eco-Friendly</span>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="relative">
                <img
                  src={heroImage}
                  alt="FAMINI Eco-Friendly Glasses"
                  className="w-full h-auto rounded-3xl shadow-eco"
                />
                <div className="absolute -top-4 -right-4 bg-eco-green text-white px-4 py-2 rounded-full font-semibold animate-bounce-soft">
                  100% Alami!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-wood-brown mb-4">
              Produk <span className="font-handlee text-eco-green">Unggulan</span>
            </h2>
            <p className="text-lg text-wood-brown/70 max-w-2xl mx-auto">
              Koleksi terbaik kami yang dipilih khusus untuk gaya hidup ramah lingkungan Anda
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button className="btn-eco-outline text-lg px-8 py-4">
                Lihat Semua Produk
                <ShoppingBag className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <img
                src={productCollection}
                alt="FAMINI Product Collection"
                className="w-full h-auto rounded-3xl shadow-warm"
              />
            </div>

            <div className="space-y-8 animate-slide-up">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="text-eco-green" size={24} />
                  <span className="text-eco-green font-semibold">PROMO SPESIAL</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-wood-brown">
                  Promo Spesial untuk <span className="font-handlee text-eco-green">Kamu</span>
                </h2>
                <p className="text-lg text-wood-brown/80 leading-relaxed">
                  Nikmati diskon 20% untuk pembelian pertama dan gratis ongkir untuk wilayah tertentu. 
                  Waktunya beralih ke gaya hidup ramah lingkungan!
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-eco-green rounded-full"></div>
                  <span className="text-wood-brown">Diskon 20% untuk pembelian pertama</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-eco-green rounded-full"></div>
                  <span className="text-wood-brown">Gratis ongkir untuk wilayah Jabodetabek</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-eco-green rounded-full"></div>
                  <span className="text-wood-brown">Garansi kualitas produk 100%</span>
                </div>
              </div>

              <Link to="/products">
                <Button className="btn-eco text-lg px-8 py-4">
                  Lihat Promo
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-wood-brown text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Siap Bergabung dalam <span className="font-handlee text-eco-green-light">Gerakan Hijau?</span>
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Setiap pilihan yang kita buat hari ini menentukan masa depan bumi. 
              Mari mulai dengan langkah kecil menggunakan produk ramah lingkungan.
            </p>
            <Link to="/products">
              <Button className="bg-eco-green hover:bg-eco-green-light text-white text-lg px-8 py-4">
                Beli Sekarang
                <ShoppingBag className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;