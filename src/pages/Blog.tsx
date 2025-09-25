import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Leaf, Users, Lightbulb, Loader2 } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Blog: React.FC = () => {
  const { blogPosts, loading, error } = useBlogPosts();
  const categories = [
    { name: 'Tips Eco-Living', icon: <Lightbulb size={16} /> },
    { name: 'Proyek Sosial', icon: <Users size={16} /> },
    { name: 'Edukasi Lingkungan', icon: <Leaf size={16} /> },
  ];

  return (
    <div className="py-16 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-wood-brown mb-6">
            Blog & <span className="font-handlee text-eco-green">Proyek Kami</span>
          </h1>
          <p className="text-lg text-wood-brown/80 max-w-3xl mx-auto leading-relaxed">
            Ikuti perjalanan FAMINI dalam menciptakan dampak positif untuk lingkungan. 
            Temukan inspirasi untuk gaya hidup berkelanjutan dan update proyek-proyek hijau kami.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <Badge
              key={index}
              variant="outline"
              className="px-4 py-2 text-sm border-eco-green text-eco-green hover:bg-eco-green hover:text-white cursor-pointer transition-colors"
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </Badge>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-eco-green" />
            <span className="ml-2 text-wood-brown">Memuat artikel...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-wood-brown mb-2">
              Gagal Memuat Artikel
            </h3>
            <p className="text-wood-brown/70 mb-4">
              {error}
            </p>
          </div>
        )}

        {/* Featured Post */}
        {!loading && !error && blogPosts.length > 0 && (
          <div className="mb-16">
            <div className="card-eco lg:grid lg:grid-cols-2 gap-8 items-center">
              <div className="mb-6 lg:mb-0">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-64 lg:h-80 object-cover rounded-2xl"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-wood-brown/70">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{new Date(blogPosts[0].date).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                </div>
                <Badge className="bg-eco-green text-white">Featured</Badge>
                <h2 className="text-2xl lg:text-3xl font-bold text-wood-brown">
                  {blogPosts[0].title}
                </h2>
                <p className="text-wood-brown/80 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <Button className="btn-eco">
                  Baca Selengkapnya
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && !error && blogPosts.length > 1 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.slice(1).map((post, index) => (
            <article
              key={post.id}
              className="card-product group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-xl bg-cream-warm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-wood-brown/60">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{new Date(post.date).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-wood-brown line-clamp-2 group-hover:text-eco-green transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-sm text-wood-brown/70 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Button variant="ghost" className="text-eco-green hover:text-eco-green-dark p-0 h-auto font-medium">
                  Baca Selengkapnya
                  <ArrowRight className="ml-1" size={14} />
                </Button>
              </div>
              </article>
            ))}
          </div>
        )}

        {/* Projects Section */}
        <div className="bg-gradient-soft rounded-3xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wood-brown mb-4">
              Proyek <span className="font-handlee text-eco-green">Berkelanjutan</span>
            </h2>
            <p className="text-wood-brown/80 max-w-2xl mx-auto">
              Inisiatif nyata FAMINI dalam menciptakan dampak positif untuk lingkungan dan masyarakat
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-eco-green rounded-full flex items-center justify-center mx-auto">
                <TreePine className="text-white" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-wood-brown">Program Tanam Bambu</h3>
              <p className="text-sm text-wood-brown/70">
                Setiap 100 produk terjual, kami menanam 1000 bibit bambu di berbagai daerah Indonesia
              </p>
              <div className="text-2xl font-bold text-eco-green">50+ Pohon</div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-wood-brown rounded-full flex items-center justify-center mx-auto">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-wood-brown">Edukasi Komunitas</h3>
              <p className="text-sm text-wood-brown/70">
                Workshop dan seminar gratis tentang gaya hidup ramah lingkungan untuk masyarakat
              </p>
              <div className="text-2xl font-bold text-eco-green">12 Workshop</div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-eco-green-light rounded-full flex items-center justify-center mx-auto">
                <Leaf className="text-white" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-wood-brown">Kampanye Zero Waste</h3>
              <p className="text-sm text-wood-brown/70">
                Mengajak masyarakat mengurangi penggunaan plastik sekali pakai dalam kehidupan sehari-hari
              </p>
              <div className="text-2xl font-bold text-eco-green">500+ Peserta</div>
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="bg-wood-brown text-white rounded-3xl p-8 lg:p-12 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">
              Jangan Lewatkan <span className="font-handlee text-eco-green-light">Update Terbaru</span>
            </h2>
            <p className="text-lg text-white/90">
              Dapatkan tips eco-living, update proyek berkelanjutan, dan inspirasi gaya hidup ramah lingkungan 
              langsung di inbox Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-3 rounded-xl text-wood-brown focus:outline-none focus:ring-2 focus:ring-eco-green-light"
              />
              <Button className="bg-eco-green hover:bg-eco-green-light text-white px-6 py-3">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-white/70">
              Kami menghormati privasi Anda. Unsubscribe kapan saja.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TreePine = ({ className, size }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"/>
    <path d="M12 22v-3"/>
  </svg>
);

export default Blog;