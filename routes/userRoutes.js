import express from "express";
import { registerUser,  loginUser, getAllAdmins } from '../controllers/ authController.js';
import { uploadAssignment} from '../controllers/assignmentController.js';
import { auth } from '../middleware/authMiddleware.js';
const router = express.Router();

// User registration and login
router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/upload', auth, uploadAssignment);
router.get('/admins', auth, getAllAdmins);

export default router;
