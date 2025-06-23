
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Gender {
  id: number;
  name: string;
}

export const useGenders = () => {
  const [genders, setGenders] = useState<Gender[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const { data, error } = await supabase
          .from('genders')
          .select('id, name')
          .order('id');

        if (error) throw error;
        setGenders(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch genders');
      } finally {
        setLoading(false);
      }
    };

    fetchGenders();
  }, []);

  return { genders, loading, error };
};
