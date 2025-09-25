import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useContact } from '@/hooks/useContact';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const { submitContact, submitting } = useContact();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Form belum lengkap",
        description: "Mohon lengkapi semua field yang diperlukan.",
        variant: "destructive",
      });
      return;
    }

    const result = await submitContact({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });

    if (result.success) {
      toast({
        title: "Pesan terkirim!",
        description: "Terima kasih telah menghubungi kami. Tim kami akan segera merespon pesan Anda.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } else {
      toast({
        title: "Terjadi kesalahan",
        description: result.error || "Mohon coba lagi dalam beberapa saat.",
        variant: "destructive",
      });
    }
  };

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: 'Alamat',
      details: ['Bandung, Indonesia', 'Jawa Barat'],
    },
    {
      icon: <Phone size={24} />,
      title: 'WhatsApp',
      details: ['081585461271', 'Senin - Sabtu: 09:00 - 18:00'],
    },
    {
      icon: <Mail size={24} />,
      title: 'Email',
      details: ['faminiid@gmail.com', 'Respon dalam 24 jam'],
    },
    {
      icon: <Clock size={24} />,
      title: 'Jam Operasional',
      details: ['Senin - Sabtu: 09:00 - 18:00', 'Minggu: 10:00 - 16:00'],
    },
  ];

  return (
    <div className="py-16 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-wood-brown mb-6">
            Hubungi <span className="font-handlee text-eco-green">FAMINI</span>
          </h1>
          <p className="text-lg text-wood-brown/80 max-w-3xl mx-auto leading-relaxed">
            Punya pertanyaan tentang produk kami? Butuh bantuan dengan pesanan? 
            Atau ingin berkolaborasi dalam gerakan ramah lingkungan? Kami siap membantu!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-wood-brown mb-4">
                Kirim <span className="font-handlee text-eco-green">Pesan</span>
              </h2>
              <p className="text-wood-brown/80">
                Tim kami akan merespon pesan Anda dalam waktu 24 jam.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subjek</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="border-cream-warm focus:border-eco-green"
                  placeholder="Topik pesan Anda"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Pesan *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="border-cream-warm focus:border-eco-green resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full btn-eco text-lg py-6"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={20} />
                    Kirim Pesan
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-wood-brown mb-4">
                Informasi <span className="font-handlee text-eco-green">Kontak</span>
              </h2>
              <p className="text-wood-brown/80">
                Jangan ragu untuk menghubungi kami melalui berbagai cara berikut.
              </p>
            </div>

            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-6 bg-white rounded-2xl border border-cream-warm hover:shadow-soft transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-eco-green/10 rounded-xl flex items-center justify-center text-eco-green flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-wood-brown mb-2">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-wood-brown/70 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="font-semibold text-wood-brown">Hubungi Langsung</h3>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/6281585461271"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl font-medium transition-colors"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
                <a
                  href="mailto:faminiid@gmail.com"
                  className="flex-1 flex items-center justify-center gap-2 bg-wood-brown hover:bg-wood-brown-dark text-white px-4 py-3 rounded-xl font-medium transition-colors"
                >
                  <Mail size={20} />
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-gradient-soft rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wood-brown mb-4">
              Lokasi <span className="font-handlee text-eco-green">Kami</span>
            </h2>
            <p className="text-wood-brown/80">
              Kunjungi kantor kami di Bandung untuk konsultasi langsung atau pickup order
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center">
            <div className="w-full h-64 bg-cream-warm rounded-xl flex items-center justify-center mb-4">
              <div className="text-center">
                <MapPin size={48} className="text-wood-brown/50 mx-auto mb-2" />
                <p className="text-wood-brown/70">
                  Peta interaktif akan tersedia segera
                </p>
              </div>
            </div>
            <div className="text-wood-brown">
              <p className="font-semibold mb-1">FAMINI Eco Store</p>
              <p className="text-sm text-wood-brown/70">Bandung, Jawa Barat, Indonesia</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-wood-brown mb-4">
            Pertanyaan <span className="font-handlee text-eco-green">Umum</span>
          </h2>
          <p className="text-wood-brown/80 mb-8 max-w-2xl mx-auto">
            Mungkin pertanyaan Anda sudah terjawab di sini. Jika tidak, jangan ragu untuk menghubungi kami!
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-eco text-left">
              <h3 className="font-semibold text-wood-brown mb-2">Berapa lama produk dapat terurai?</h3>
              <p className="text-sm text-wood-brown/70">
                Produk FAMINI dapat terurai secara alami dalam 6-12 bulan di lingkungan yang tepat.
              </p>
            </div>
            
            <div className="card-eco text-left">
              <h3 className="font-semibold text-wood-brown mb-2">Apakah aman untuk makanan?</h3>
              <p className="text-sm text-wood-brown/70">
                Ya, semua produk kami food-grade dan aman untuk kontak langsung dengan makanan dan minuman.
              </p>
            </div>
            
            <div className="card-eco text-left">
              <h3 className="font-semibold text-wood-brown mb-2">Bagaimana cara perawatannya?</h3>
              <p className="text-sm text-wood-brown/70">
                Cuci dengan air hangat dan sabun ringan. Hindari microwave dan dishwasher untuk menjaga kualitas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;