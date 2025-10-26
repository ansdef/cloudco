import { Router } from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController';
import { authenticate } from '../middleware/auth';
import { authorizeAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', authenticate, authorizeAdmin, createCourse);
router.put('/:id', authenticate, authorizeAdmin, updateCourse);
router.delete('/:id', authenticate, authorizeAdmin, deleteCourse);

export default router;
