import { useState, useEffect } from 'react';
import { coursesApi } from '@/lib/api';
import type { Course } from '@/types/api';

export const useCourses = (search?: string, institutionId?: string) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, institutionId]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const response = await coursesApi.getAll(search, institutionId);
      if (response.data) {
        setCourses(response.data as Course[]);
      } else {
        setError(response.error || 'Failed to load courses');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return { courses, loading, error, refetch: loadCourses };
};

export const useCourse = (id: string) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadCourse();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      const response = await coursesApi.getById(id);
      if (response.data) {
        setCourse(response.data as Course);
      } else {
        setError(response.error || 'Failed to load course');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return { course, loading, error, refetch: loadCourse };
};
