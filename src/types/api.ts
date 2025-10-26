export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface Institution {
  id: string;
  name: string;
  address: string;
  workingHours: string;
  phone: string;
  website?: string;
  logo?: string;
  images: string[];
  isOpen: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  institutionId: string;
  title: string;
  direction: string;
  description?: string;
  images: string[];
  totalSpots: number;
  availableSpots: number;
  Institution?: Institution;
  createdAt: string;
  updatedAt: string;
}

export interface Equipment {
  id: string;
  institutionId: string;
  name: string;
  description?: string;
  workingHours: string;
  isOpen: boolean;
  distance?: string;
  Institution?: Institution;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  courseId?: string;
  equipmentId?: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
