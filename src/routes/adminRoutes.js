// server/src/routes/adminRoutes.js
import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roles.js';
import { getUsers, updateUserRole, stats } from '../controllers/adminController.js';

const router = Router();

router.get('/users', protect, authorize('admin'), getUsers);
router.put('/users/:id', protect, authorize('admin'), updateUserRole);
router.get('/stats', protect, authorize('admin'), stats);

export default router;   // <— Add this line