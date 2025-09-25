export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'Gelas Bambu' | 'Gelas Ampas Tebu' | 'Mix Eco Series' | 'Limited Edition';
  isPopular?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  address: string;
  phone: string;
  paymentMethod: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}