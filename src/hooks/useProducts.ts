import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) throw error;

      // Transform database data to match our Product interface
      const transformedProducts: Product[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image_url || '/api/placeholder/300/300',
        description: item.description || '',
        category: item.category as Product['category'],
        // Add default values for isPopular and isNew since they're not in DB
        isPopular: false,
        isNew: false,
      }));

      setProducts(transformedProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch: fetchProducts };
};