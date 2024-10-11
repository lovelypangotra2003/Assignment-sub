import express from 'express';
import { registerAdmin,loginAdmin, getAllAdmins } from '../controllers/ authController.js';  // Add .js extensions
import { viewAssignments, acceptAssignment, rejectAssignment } from '../controllers/assignmentController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin registration and login
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Admin assignment management
router.get('/assignments', auth, viewAssignments);
router.post('/assignments/:id/accept', auth, acceptAssignment);
router.post('/assignments/:id/reject', auth, rejectAssignment);

export default router;