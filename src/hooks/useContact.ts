import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const useContact = () => {
  const [submitting, setSubmitting] = useState(false);

  const submitContact = async (formData: ContactFormData) => {
    try {
      setSubmitting(true);
      
      const { error } = await supabase
        .from('contacts')
        .insert({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        });

      if (error) throw error;

      return { success: true };
    } catch (err) {
      console.error('Error submitting contact:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to submit contact form' 
      };
    } finally {
      setSubmitting(false);
    }
  };

  return { submitContact, submitting };
};