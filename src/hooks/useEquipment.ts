import { useState, useEffect } from 'react';
import { equipmentApi } from '@/lib/api';
import type { Equipment } from '@/types/api';

export const useEquipment = (search?: string, institutionId?: string) => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEquipment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, institutionId]);

  const loadEquipment = async () => {
    try {
      setLoading(true);
      const response = await equipmentApi.getAll(search, institutionId);
      if (response.data) {
        setEquipment(response.data as Equipment[]);
      } else {
        setError(response.error || 'Failed to load equipment');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return { equipment, loading, error, refetch: loadEquipment };
};
