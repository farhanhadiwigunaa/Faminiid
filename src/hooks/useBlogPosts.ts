import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types';

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform database data to match our BlogPost interface
      const transformedPosts: BlogPost[] = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        excerpt: item.content ? item.content.substring(0, 150) + '...' : '',
        content: item.content || '',
        image: item.image_url || '/api/placeholder/600/400',
        date: item.created_at,
        readTime: '5 min read', // Default read time
      }));

      setBlogPosts(transformedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
      console.error('Error fetching blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  return { blogPosts, loading, error, refetch: fetchBlogPosts };
};