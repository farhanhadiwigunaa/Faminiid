-- Fix all RLS security issues

-- Enable RLS on all public tables that don't have it
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create secure policies for products (public read access for website)
DROP POLICY IF EXISTS "Allow public to read products" ON public.products;
CREATE POLICY "Allow public to read products" 
ON public.products 
FOR SELECT 
USING (true);

-- Create secure policies for blog_posts (public read access for website)
DROP POLICY IF EXISTS "Allow public to read blog posts" ON public.blog_posts;
CREATE POLICY "Allow public to read blog posts" 
ON public.blog_posts 
FOR SELECT 
USING (true);

-- Create secure policies for contacts (only allow insert for contact form)
DROP POLICY IF EXISTS "Allow public to insert contact messages" ON public.contacts;
CREATE POLICY "Allow public to insert contact messages" 
ON public.contacts 
FOR INSERT 
WITH CHECK (true);

-- Remove dangerous public read policies from orders and order_items
DROP POLICY IF EXISTS "Allow public to read orders" ON public.orders;
DROP POLICY IF EXISTS "Allow public to read order items" ON public.order_items;

-- Keep only the necessary insert policies for checkout functionality
DROP POLICY IF EXISTS "Allow public to insert orders" ON public.orders;
CREATE POLICY "Allow public to insert orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public to insert order items" ON public.order_items;
CREATE POLICY "Allow public to insert order items" 
ON public.order_items 
FOR INSERT 
WITH CHECK (true);