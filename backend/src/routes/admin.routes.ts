import { Router } from 'express';

import {
    getRequests,
    loginAdmin,
    updateRequestStatus,
} from '../controllers/admin.controller';

import { authMiddleware } from '../middlewares/auth.middleware';

export const adminRouter = Router();

adminRouter.post('/login', loginAdmin);
adminRouter.get('/requests', authMiddleware, getRequests);
adminRouter.patch('/requests/:id/status', authMiddleware, updateRequestStatus);