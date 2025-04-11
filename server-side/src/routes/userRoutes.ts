import { Router } from "express";
import { createUser, loginUser, getProfile } from "../controllers/userController";

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/profile/:username', getProfile)

export default router;
