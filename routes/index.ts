import express from 'express'
import { RegisterController } from '../controllers/auth/RegisterController';
import { LoginController } from '../controllers/auth/LoginController';


const router = express.Router();

router.post("/auth/register",RegisterController)
router.post("/auth/login",LoginController)




export default router;
