import { Router } from 'express';
import {
  getAllInstitutions,
  getInstitutionById,
  createInstitution,
  updateInstitution,
  deleteInstitution,
} from '../controllers/institutionController';
import { authenticate } from '../middleware/auth';
import { authorizeAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getAllInstitutions);
router.get('/:id', getInstitutionById);
router.post('/', authenticate, authorizeAdmin, createInstitution);
router.put('/:id', authenticate, authorizeAdmin, updateInstitution);
router.delete('/:id', authenticate, authorizeAdmin, deleteInstitution);

export default router;
