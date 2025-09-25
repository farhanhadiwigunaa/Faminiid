import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield, Check } from 'lucide-react';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useOrders } from '@/hooks/useOrders';

const Checkout: React.FC = () => {
  const { cartItems, getTotalPrice, clearCart } = useCartContext();
  const { toast } = useToast();
  const { submitOrder, submitting } = useOrders();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'transfer',
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Form belum lengkap",
        description: "Mohon lengkapi semua field yang diperlukan.",
        variant: "destructive",
      });
      return;
    }

    const result = await submitOrder({
      customerName: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      totalPrice: finalTotal,
      items: cartItems,
    });

    if (result.success) {
      clearCart();
      
      toast({
        title: "Pesanan berhasil!",
        description: "Terima kasih telah berbelanja di FAMINI. Tim kami akan segera memproses pesanan Anda.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        paymentMethod: 'transfer',
      });
    } else {
      toast({
        title: "Terjadi kesalahan",
        description: result.error || "Mohon coba lagi dalam beberapa saat.",
        variant: "destructive",
      });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold text-wood-brown mb-4">Keranjang Kosong</h1>
        <p className="text-wood-brown/80 mb-6">Tidak ada item untuk di-checkout.</p>
        <Link to="/products">
          <Button className="btn-eco">Mulai Belanja</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link to="/cart" className="inline-flex items-center gap-2 text-wood-brown hover:text-eco-green transition-colors mb-4">
            <ArrowLeft size={20} />
            <span>Kembali ke Keranjang</span>
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-wood-brown">
            <span className="font-handlee text-eco-green">Checkout</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Customer Information */}
              <div className="bg-white rounded-2xl p-6 border border-cream-warm">
                <h2 className="text-xl font-semibold text-wood-brown mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-eco-green text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  Informasi Pelanggan
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="border-cream-warm focus:border-eco-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-cream-warm focus:border-eco-green"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone">Nomor WhatsApp *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="border-cream-warm focus:border-eco-green"
                      placeholder="081234567890"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl p-6 border border-cream-warm">
                <h2 className="text-xl font-semibold text-wood-brown mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-eco-green text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  Alamat Pengiriman
                </h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat Lengkap *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="border-cream-warm focus:border-eco-green"
                      placeholder="Jalan, RT/RW, Kelurahan, Kecamatan"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Kota</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="border-cream-warm focus:border-eco-green"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Kode Pos</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="border-cream-warm focus:border-eco-green"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-6 border border-cream-warm">
                <h2 className="text-xl font-semibold text-wood-brown mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-eco-green text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  Metode Pembayaran
                </h2>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-cream-warm rounded-xl hover:bg-cream-warm/30 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="transfer"
                      checked={formData.paymentMethod === 'transfer'}
                      onChange={handleInputChange}
                      className="text-eco-green"
                    />
                    <CreditCard className="text-wood-brown" size={20} />
                    <span className="font-medium text-wood-brown">Transfer Bank</span>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border border-cream-warm rounded-xl hover:bg-cream-warm/30 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="text-eco-green"
                    />
                    <Truck className="text-wood-brown" size={20} />
                    <span className="font-medium text-wood-brown">Bayar di Tempat (COD)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-gradient-soft rounded-2xl p-6 sticky top-6">
                <h2 className="text-xl font-bold text-wood-brown mb-6">
                  Ringkasan Pesanan
                </h2>
                
                {/* Order Items */}
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center text-sm">
                      <div className="flex-1">
                        <div className="font-medium text-wood-brown">{item.product.name}</div>
                        <div className="text-wood-brown/70">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-semibold text-wood-brown">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 border-t border-cream-warm pt-4">
                  <div className="flex justify-between text-wood-brown">
                    <span>Subtotal</span>
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
                  
                  <div className="border-t border-cream-warm pt-3">
                    <div className="flex justify-between text-lg font-bold text-wood-brown">
                      <span>Total</span>
                      <span className="text-eco-green">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-eco text-lg py-6 mt-6"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Memproses...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2" size={20} />
                      Selesaikan Pesanan
                    </>
                  )}
                </Button>
              </div>

              {/* Security Badge */}
              <div className="bg-white rounded-2xl p-4 border border-cream-warm text-center">
                <Shield className="text-eco-green mx-auto mb-2" size={24} />
                <div className="text-sm font-medium text-wood-brown mb-1">Transaksi Aman</div>
                <div className="text-xs text-wood-brown/70">
                  Data Anda dilindungi dengan enkripsi SSL 256-bit
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;