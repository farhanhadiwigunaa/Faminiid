import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartContext();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast({
      title: "Produk ditambahkan!",
      description: `${product.name} berhasil ditambahkan ke keranjang.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="card-product group">
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-xl mb-4 bg-cream-warm">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isNew && (
            <Badge className="bg-eco-green text-white">
              Baru
            </Badge>
          )}
          {product.isPopular && (
            <Badge className="bg-wood-brown text-white">
              <Star size={12} className="mr-1" />
              Populer
            </Badge>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleAddToCart}
            className="bg-white/90 text-wood-brown hover:bg-white"
          >
            <ShoppingCart size={16} className="mr-1" />
            Tambah
          </Button>
          <Link to={`/product-detail?id=${product.id}`}>
            <Button
              size="sm"
              className="bg-eco-green/90 text-white hover:bg-eco-green"
            >
              <Eye size={16} className="mr-1" />
              Detail
            </Button>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-wood-brown text-lg line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-wood-brown/70 line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-eco-green">
              {formatPrice(product.price)}
            </span>
          </div>
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={handleAddToCart}
            className="flex-1 btn-eco"
            size="sm"
          >
            <ShoppingCart size={16} className="mr-1" />
            Tambah
          </Button>
          <Link to={`/product-detail?id=${product.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              Lihat Detail
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};