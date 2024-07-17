import { Router } from 'express';
import {
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser,
} from '../controllers/auth';
import { checkAuth } from '../middleware/checkAuth';

const authRouter = Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);
authRouter.get('/me', checkAuth, getCurrentUser);

export default authRouter;
