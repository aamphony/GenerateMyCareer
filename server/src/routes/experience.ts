import { Router } from 'express';
import { createExperience } from '../controllers/experience';
import { checkAuth } from '../middleware/checkAuth';

const experienceRouter = Router();

experienceRouter.post('/', checkAuth, createExperience);

export default experienceRouter;
