import express from 'express';
import { RegisterController } from '../controllers/auth/RegisterController.js';
import { LoginController } from '../controllers/auth/LoginController.js';
const router = express.Router();
router.post("/auth/register", RegisterController);
router.post("/auth/login", LoginController);
export default router;
