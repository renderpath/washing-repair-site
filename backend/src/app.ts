import express from 'express';

import { requestRouter } from './routes/request.routes';
import { adminRouter } from './routes/admin.routes';

export const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);

    res.header('Access-Control-Allow-Origin', '*');

    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
    });
});

app.use('/api/requests', requestRouter);

app.use('/api/admin', adminRouter);