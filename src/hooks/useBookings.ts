import { useState, useEffect } from 'react';
import { bookingsApi } from '@/lib/api';

export const useBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingsApi.getAll();
      if (response.data) {
        setBookings(response.data as any[]);
      } else {
        setError(response.error || 'Failed to load bookings');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return { bookings, loading, error, refetch: loadBookings };
};
