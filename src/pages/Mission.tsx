import React from 'react';
import { Target, TreePine, Users, Award, Calendar, Leaf } from 'lucide-react';

const Mission: React.FC = () => {
  const timeline = [
    {
      year: '2023',
      title: 'Awal Perjalanan',
      description: 'FAMINI didirikan dengan visi menciptakan produk ramah lingkungan berkualitas tinggi.',
      icon: <Leaf size={24} />,
    },
    {
      year: '2023',
      title: 'Produk Pertama',
      description: 'Meluncurkan koleksi pertama gelas bambu dan ampas tebu dengan respon positif dari pelanggan.',
      icon: <Award size={24} />,
    },
    {
      year: '2024',
      title: 'Ekspansi Produk',
      description: 'Mengembangkan lebih banyak varian produk dan mulai program penanaman pohon.',
      icon: <TreePine size={24} />,
    },
    {
      year: '2024',
      title: 'Komunitas Hijau',
      description: 'Membangun komunitas peduli lingkungan dengan 500+ anggota aktif.',
      icon: <Users size={24} />,
    },
  ];

  const impacts = [
    {
      number: '1,000+',
      label: 'Produk Ramah Lingkungan Terjual',
      description: 'Menggantikan ribuan gelas plastik sekali pakai',
    },
    {
      number: '50+',
      label: 'Pohon Bambu Ditanam',
      description: 'Berkontribusi langsung dalam penghijauan',
    },
    {
      number: '500+',
      label: 'Keluarga Bergabung',
      description: 'Mengadopsi gaya hidup ramah lingkungan',
    },
    {
      number: '100%',
      label: 'Material Biodegradable',
      description: 'Tidak meninggalkan jejak berbahaya',
    },
  ];

  return (
    <div className="py-16 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-wood-brown mb-6">
            Misi <span className="font-handlee text-eco-green">FAMINI</span>
          </h1>
          <p className="text-lg text-wood-brown/80 max-w-3xl mx-auto leading-relaxed">
            Kami berkomitmen untuk menciptakan dampak positif bagi lingkungan melalui 
            produk berkelanjutan dan edukasi kepada masyarakat tentang pentingnya gaya hidup ramah bumi.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="card-eco space-y-6">
            <div className="w-16 h-16 bg-eco-green rounded-2xl flex items-center justify-center">
              <Target className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-wood-brown mb-4">Visi Kami</h2>
              <p className="text-wood-brown/80 leading-relaxed">
                Menjadi pelopor gerakan gaya hidup berkelanjutan di Indonesia dengan 
                menyediakan alternatif produk ramah lingkungan yang berkualitas tinggi 
                dan terjangkau untuk semua kalangan.
              </p>
            </div>
          </div>

          <div className="card-eco space-y-6">
            <div className="w-16 h-16 bg-wood-brown rounded-2xl flex items-center justify-center">
              <TreePine className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-wood-brown mb-4">Misi Kami</h2>
              <div className="space-y-3 text-wood-brown/80">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-eco-green rounded-full mt-2"></div>
                  <span>Mengembangkan produk ramah lingkungan inovatif dan berkualitas</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-eco-green rounded-full mt-2"></div>
                  <span>Mengedukasi masyarakat tentang pentingnya kelestarian lingkungan</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-eco-green rounded-full mt-2"></div>
                  <span>Membangun komunitas peduli lingkungan yang aktif</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-eco-green rounded-full mt-2"></div>
                  <span>Berkontribusi nyata dalam pelestarian alam Indonesia</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wood-brown mb-4">
              Dampak <span className="font-handlee text-eco-green">Positif</span>
            </h2>
            <p className="text-wood-brown/80 max-w-2xl mx-auto">
              Setiap produk FAMINI yang Anda pilih berkontribusi langsung dalam menjaga kelestarian bumi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impacts.map((impact, index) => (
              <div
                key={index}
                className="card-eco text-center space-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl lg:text-4xl font-bold text-eco-green">
                  {impact.number}
                </div>
                <h3 className="font-semibold text-wood-brown text-lg">
                  {impact.label}
                </h3>
                <p className="text-sm text-wood-brown/70">
                  {impact.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wood-brown mb-4">
              Perjalanan <span className="font-handlee text-eco-green">FAMINI</span>
            </h2>
            <p className="text-wood-brown/80 max-w-2xl mx-auto">
              Langkah demi langkah menuju masa depan yang lebih hijau dan berkelanjutan
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-eco-green/20 rounded-full"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-8 animate-fade-in ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="card-eco space-y-3">
                      <div className="text-xl font-bold text-eco-green">{item.year}</div>
                      <h3 className="text-lg font-semibold text-wood-brown">{item.title}</h3>
                      <p className="text-wood-brown/70">{item.description}</p>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-eco-green rounded-full flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                  </div>

                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-eco text-white rounded-3xl p-8 lg:p-12 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">
              Bergabunglah dalam <span className="font-handlee">Gerakan Hijau</span>
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Setiap pilihan yang kita buat hari ini menentukan masa depan bumi. 
              Mari bersama-sama menciptakan perubahan positif untuk generasi mendatang.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-eco-green px-8 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors">
                Lihat Produk Kami
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-eco-green transition-colors">
                Gabung Komunitas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;