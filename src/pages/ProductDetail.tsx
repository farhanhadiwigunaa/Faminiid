import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Shield, Truck, Leaf, Plus, Minus } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const ProductDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartContext();
  const { toast } = useToast();
  const { products } = useProducts();

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold text-wood-brown mb-4">Produk Tidak Ditemukan</h1>
        <Link to="/products">
          <Button className="btn-eco">Kembali ke Produk</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Produk ditambahkan!",
      description: `${quantity}x ${product.name} berhasil ditambahkan ke keranjang.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="py-16 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/products" className="inline-flex items-center gap-2 text-wood-brown hover:text-eco-green transition-colors">
            <ArrowLeft size={20} />
            <span>Kembali ke Menu</span>
          </Link>
        </div>

        {/* Product Detail */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative bg-cream-warm rounded-3xl p-8">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-2xl"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
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
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-wood-brown mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <span className="text-wood-brown/70">(4.8/5 dari 127 ulasan)</span>
              </div>
              <div className="text-4xl font-bold text-eco-green mb-6">
                {formatPrice(product.price)}
              </div>
            </div>

            <div className="prose prose-wood-brown max-w-none">
              <p className="text-lg text-wood-brown/80 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-cream-warm rounded-xl">
                <Leaf className="text-eco-green mx-auto mb-2" size={24} />
                <div className="text-sm font-medium text-wood-brown">100% Natural</div>
              </div>
              <div className="text-center p-4 bg-cream-warm rounded-xl">
                <Shield className="text-eco-green mx-auto mb-2" size={24} />
                <div className="text-sm font-medium text-wood-brown">Food Safe</div>
              </div>
              <div className="text-center p-4 bg-cream-warm rounded-xl">
                <Truck className="text-eco-green mx-auto mb-2" size={24} />
                <div className="text-sm font-medium text-wood-brown">Free Delivery</div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium text-wood-brown">Jumlah:</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 p-0"
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 p-0"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              <div className="text-lg font-semibold text-wood-brown">
                Total: <span className="text-eco-green">{formatPrice(product.price * quantity)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                className="w-full btn-eco text-lg py-6"
              >
                <ShoppingCart className="mr-2" size={20} />
                Tambahkan ke Keranjang
              </Button>
              <Link to="/products" className="block">
                <Button variant="outline" className="w-full">
                  Kembali ke Menu
                </Button>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="space-y-3 text-sm text-wood-brown/70">
              <div className="flex items-center gap-2">
                <Shield size={16} />
                <span>Garansi 30 hari uang kembali</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={16} />
                <span>Gratis ongkir untuk pembelian di atas Rp 100.000</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf size={16} />
                <span>Dapat terurai secara alami dalam 6-12 bulan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-wood-brown mb-8 text-center">
              Produk <span className="font-handlee text-eco-green">Serupa</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product-detail?id=${relatedProduct.id}`}
                  className="block card-product group"
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover rounded-xl mb-4 bg-cream-warm"
                  />
                  <h3 className="font-semibold text-wood-brown mb-2">{relatedProduct.name}</h3>
                  <div className="text-xl font-bold text-eco-green">
                    {formatPrice(relatedProduct.price)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;