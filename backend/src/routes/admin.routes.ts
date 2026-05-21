import { Router } from 'express';

export const adminRouter = Router();

adminRouter.post('/login', (req, res) => {
    console.log('LOGIN BODY:', req.body);

    return res.json({
        token: 'test-token',
    });
});

adminRouter.get('/requests', (_req, res) => {
    return res.json([]);
});