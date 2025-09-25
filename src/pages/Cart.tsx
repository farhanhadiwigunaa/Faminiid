import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCartContext();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const shippingCost = getTotalPrice() > 100000 ? 0 : 15000;
  const discount = getTotalPrice() > 200000 ? getTotalPrice() * 0.1 : 0;
  const finalTotal = getTotalPrice() + shippingCost - discount;

  if (cartItems.length === 0) {
    return (
      <div className="py-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center space-y-6">
            <div className="w-24 h-24 bg-cream-warm rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag size={48} className="text-wood-brown/50" />
            </div>
            <h1 className="text-3xl font-bold text-wood-brown">
              Keranjang <span className="font-handlee text-eco-green">Kosong</span>
            </h1>
            <p className="text-wood-brown/80">
              Belum ada produk dalam keranjang Anda. Mari mulai berbelanja produk ramah lingkungan!
            </p>
            <Link to="/products">
              <Button className="btn-eco">
                Mulai Belanja
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link to="/products" className="inline-flex items-center gap-2 text-wood-brown hover:text-eco-green transition-colors mb-4">
            <ArrowLeft size={20} />
            <span>Lanjut Belanja</span>
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-wood-brown">
            Keranjang <span className="font-handlee text-eco-green">Belanja</span>
          </h1>
          <p className="text-wood-brown/80 mt-2">
            {getTotalItems()} item dalam keranjang Anda
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl p-6 border border-cream-warm hover:shadow-soft transition-shadow"
              >
                <div className="flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-xl bg-cream-warm flex-shrink-0"
                  />
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-wood-brown text-lg">
                          {item.product.name}
                        </h3>
                        <Badge variant="outline" className="text-xs mt-1">
                          {item.product.category}
                        </Badge>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-wood-brown/50 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-eco-green">
                        {formatPrice(item.product.price)}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-semibold text-wood-brown">
                        Subtotal: {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-gradient-soft rounded-2xl p-6 sticky top-6">
              <h2 className="text-xl font-bold text-wood-brown mb-6">
                Ringkasan Pesanan
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-wood-brown">
                  <span>Subtotal ({getTotalItems()} item)</span>
                  <span className="font-semibold">{formatPrice(getTotalPrice())}</span>
                </div>
                
                <div className="flex justify-between text-wood-brown">
                  <span>Ongkos Kirim</span>
                  <span className={`font-semibold ${shippingCost === 0 ? 'text-eco-green' : ''}`}>
                    {shippingCost === 0 ? 'GRATIS' : formatPrice(shippingCost)}
                  </span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-eco-green">
                    <span>Diskon (10%)</span>
                    <span className="font-semibold">-{formatPrice(discount)}</span>
                  </div>
                )}
                
                <div className="border-t border-cream-warm pt-4">
                  <div className="flex justify-between text-lg font-bold text-wood-brown">
                    <span>Total</span>
                    <span className="text-eco-green">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Info */}
              <div className="mt-6 space-y-2">
                {shippingCost > 0 && (
                  <div className="text-xs text-wood-brown/70 bg-wood-brown/5 p-3 rounded-lg">
                    💡 Gratis ongkir untuk pembelian di atas Rp 100.000
                  </div>
                )}
                {getTotalPrice() < 200000 && (
                  <div className="text-xs text-wood-brown/70 bg-eco-green/5 p-3 rounded-lg">
                    🎉 Dapatkan diskon 10% untuk pembelian di atas Rp 200.000
                  </div>
                )}
              </div>

              <Link to="/checkout" className="block mt-6">
                <Button className="w-full btn-eco text-lg py-6">
                  Lanjut ke Checkout
                </Button>
              </Link>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl p-6 border border-cream-warm">
              <h3 className="font-semibold text-wood-brown mb-4">Keuntungan Berbelanja di FAMINI</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-wood-brown/80">
                  <div className="w-2 h-2 bg-eco-green rounded-full"></div>
                  <span>Produk 100% ramah lingkungan</span>
                </div>
                <div className="flex items-center gap-2 text-wood-brown/80">
                  <div className="w-2 h-2 bg-eco-green rounded-full"></div>
                  <span>Garansi uang kembali 30 hari</span>
                </div>
                <div className="flex items-center gap-2 text-wood-brown/80">
                  <div className="w-2 h-2 bg-eco-green rounded-full"></div>
                  <span>Berkontribusi dalam program penanaman pohon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;