-- Enable Row Level Security on orders table
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert orders (for public e-commerce)
CREATE POLICY "Allow public to insert orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading orders (for order confirmation/tracking)
CREATE POLICY "Allow public to read orders" 
ON public.orders 
FOR SELECT 
USING (true);

-- Enable Row Level Security on order_items table
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert order items
CREATE POLICY "Allow public to insert order items" 
ON public.order_items 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading order items
CREATE POLICY "Allow public to read order items" 
ON public.order_items 
FOR SELECT 
USING (true);