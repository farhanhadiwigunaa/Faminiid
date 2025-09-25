import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/types';

interface OrderData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  totalPrice: number;
  items: CartItem[];
}

export const useOrders = () => {
  const [submitting, setSubmitting] = useState(false);

  const submitOrder = async (orderData: OrderData) => {
    try {
      setSubmitting(true);
      
      // Insert order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: orderData.customerName,
          email: orderData.email,
          phone: orderData.phone,
          address: orderData.address,
          payment_method: orderData.paymentMethod,
          total_price: orderData.totalPrice,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Insert order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        subtotal: item.product.price * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return { success: true, orderId: order.id };
    } catch (err) {
      console.error('Error submitting order:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to submit order' 
      };
    } finally {
      setSubmitting(false);
    }
  };

  return { submitOrder, submitting };
};