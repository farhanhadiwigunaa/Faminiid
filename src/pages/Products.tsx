import React, { useState, useMemo } from 'react';
import { Filter, SortAsc, Loader2 } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Products: React.FC = () => {
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');

  const categories = [
    { id: 'all', name: 'Semua Produk' },
    { id: 'Gelas Bambu', name: 'Gelas Bambu' },
    { id: 'Gelas Ampas Tebu', name: 'Gelas Ampas Tebu' },
    { id: 'Mix Eco Series', name: 'Mix Eco Series' },
    { id: 'Limited Edition', name: 'Limited Edition' },
  ];

  const sortOptions = [
    { id: 'popular', name: 'Populer' },
    { id: 'newest', name: 'Terbaru' },
    { id: 'price-low', name: 'Harga Rendah → Tinggi' },
    { id: 'price-high', name: 'Harga Tinggi → Rendah' },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered: Product[] = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = products.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'popular':
        filtered = [...filtered].sort((a, b) => {
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          return 0;
        });
        break;
      case 'newest':
        filtered = [...filtered].sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
        break;
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filtered;
  }, [products, selectedCategory, sortBy]);

  return (
    <div className="py-16 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-wood-brown mb-6">
            Produk <span className="font-handlee text-eco-green">FAMINI</span>
          </h1>
          <p className="text-lg text-wood-brown/80 max-w-2xl mx-auto">
            Koleksi lengkap gelas ramah lingkungan berkualitas tinggi untuk gaya hidup berkelanjutan
          </p>
        </div>

        {/* Promo Banner */}
        <div className="bg-gradient-eco text-white rounded-2xl p-6 mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce-soft"></div>
            <span className="font-semibold">PROMO SPESIAL</span>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce-soft"></div>
          </div>
          <p className="text-lg">
            Diskon 20% untuk pembelian pertama + Gratis Ongkir!
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Filter size={20} className="text-wood-brown" />
                <span className="font-medium text-wood-brown">Filter Kategori</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={
                      selectedCategory === category.id
                        ? "btn-eco"
                        : "border-eco-green text-eco-green hover:bg-eco-green hover:text-white"
                    }
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <SortAsc size={20} className="text-wood-brown" />
                <span className="font-medium text-wood-brown">Urutkan</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={sortBy === option.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy(option.id)}
                    className={
                      sortBy === option.id
                        ? "btn-warm"
                        : "border-wood-brown text-wood-brown hover:bg-wood-brown hover:text-white"
                    }
                  >
                    {option.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {filteredAndSortedProducts.length} produk ditemukan
            </Badge>
            {selectedCategory !== 'all' && (
              <Badge className="bg-eco-green text-white">
                {categories.find(c => c.id === selectedCategory)?.name}
              </Badge>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-eco-green" />
            <span className="ml-2 text-wood-brown">Memuat produk...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter size={48} className="text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-wood-brown mb-2">
              Gagal Memuat Produk
            </h3>
            <p className="text-wood-brown/70 mb-4">
              {error}
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {filteredAndSortedProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-cream-warm rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter size={48} className="text-wood-brown/50" />
            </div>
            <h3 className="text-xl font-semibold text-wood-brown mb-2">
              Tidak ada produk ditemukan
            </h3>
            <p className="text-wood-brown/70 mb-4">
              Coba ubah filter atau kata kunci pencarian Anda
            </p>
            <Button
              onClick={() => {
                setSelectedCategory('all');
                setSortBy('popular');
              }}
              className="btn-eco"
            >
              Reset Filter
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-soft rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-wood-brown mb-4">
            Tidak Menemukan yang Anda Cari?
          </h3>
          <p className="text-wood-brown/80 mb-6 max-w-md mx-auto">
            Hubungi tim kami untuk konsultasi produk atau request khusus sesuai kebutuhan Anda
          </p>
          <Button className="btn-eco">
            Hubungi Kami
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;