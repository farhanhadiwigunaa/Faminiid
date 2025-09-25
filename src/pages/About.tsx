import React from 'react';
import { Leaf, Users, Award, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="py-16 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-wood-brown mb-6">
            Tentang <span className="font-handlee text-eco-green">FAMINI</span>
          </h1>
          <p className="text-lg text-wood-brown/80 max-w-3xl mx-auto leading-relaxed">
            FAMINI lahir dari kepedulian terhadap lingkungan dan keinginan untuk menciptakan 
            produk berkualitas yang ramah bumi. Kami percaya bahwa setiap pilihan kecil dapat 
            membuat dampak besar untuk planet kita.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 animate-slide-up">
            <h2 className="text-3xl font-bold text-wood-brown">
              Cerita <span className="font-handlee text-eco-green">Kami</span>
            </h2>
            <div className="space-y-4 text-wood-brown/80 leading-relaxed">
              <p>
                FAMINI dimulai dari keprihatinan melihat banyaknya sampah plastik yang 
                mengotori lingkungan. Kami yakin bahwa perubahan besar dimulai dari 
                langkah kecil dalam kehidupan sehari-hari.
              </p>
              <p>
                Dengan memanfaatkan bahan alami seperti serat bambu dan ampas tebu, 
                kami menciptakan produk yang tidak hanya berkualitas tinggi, tetapi 
                juga dapat terurai secara alami di alam.
              </p>
              <p>
                Setiap produk FAMINI dibuat dengan cinta dan komitmen penuh untuk 
                menciptakan masa depan yang lebih hijau dan berkelanjutan.
              </p>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="bg-gradient-eco rounded-3xl p-8 text-white">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">1000+</div>
                  <div className="text-sm">Produk Terjual</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm">Pelanggan Setia</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-sm">Pohon Ditanam</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm">Ramah Lingkungan</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card-eco text-center space-y-4">
            <div className="w-16 h-16 bg-eco-green rounded-2xl flex items-center justify-center mx-auto">
              <Leaf className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-wood-brown">Berkelanjutan</h3>
            <p className="text-wood-brown/70">
              Semua produk kami dibuat dari bahan alami yang dapat terurai 
              dengan sendirinya, tanpa meninggalkan jejak berbahaya.
            </p>
          </div>

          <div className="card-eco text-center space-y-4">
            <div className="w-16 h-16 bg-wood-brown rounded-2xl flex items-center justify-center mx-auto">
              <Award className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-wood-brown">Berkualitas</h3>
            <p className="text-wood-brown/70">
              Kami tidak berkompromi dengan kualitas. Setiap produk melalui 
              kontrol kualitas ketat untuk memastikan kepuasan pelanggan.
            </p>
          </div>

          <div className="card-eco text-center space-y-4">
            <div className="w-16 h-16 bg-eco-green-light rounded-2xl flex items-center justify-center mx-auto">
              <Users className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-wood-brown">Komunitas</h3>
            <p className="text-wood-brown/70">
              Kami membangun komunitas peduli lingkungan dan mendukung 
              UMKM lokal dalam setiap langkah produksi.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-soft rounded-3xl p-8 lg:p-12 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="w-20 h-20 bg-eco-green rounded-full flex items-center justify-center mx-auto">
              <Target className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-wood-brown">
              Misi <span className="font-handlee text-eco-green">Kami</span>
            </h2>
            <p className="text-lg text-wood-brown/80 leading-relaxed">
              "Menciptakan produk berkualitas tinggi yang ramah lingkungan, 
              mengedukasi masyarakat tentang gaya hidup berkelanjutan, dan 
              berkontribusi nyata dalam menjaga kelestarian bumi untuk 
              generasi mendatang."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;