
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Gender {
  id: number;
  name: string;
}

export const useGenders = () => {
  const [genders, setGenders] = useState<Gender[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGenders = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('genders')
        .select('id, name')
        .order('id');

      if (error) throw error;
      setGenders(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch genders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGenders();
  }, [fetchGenders]);

  return { genders, loading, error, refetch: fetchGenders };
};
