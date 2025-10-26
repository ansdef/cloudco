import { useState, useEffect } from 'react';
import { institutionsApi } from '@/lib/api';
import type { Institution } from '@/types/api';

export const useInstitutions = (search?: string) => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInstitutions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const loadInstitutions = async () => {
    try {
      setLoading(true);
      const response = await institutionsApi.getAll(search);
      if (response.data) {
        setInstitutions(response.data as Institution[]);
      } else {
        setError(response.error || 'Failed to load institutions');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return { institutions, loading, error, refetch: loadInstitutions };
};
