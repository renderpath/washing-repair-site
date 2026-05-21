import express from 'express';
import cors from 'cors';

import { requestRouter } from './routes/request.routes';

export const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
}));

app.use(express.json());

app.use('/api/requests', requestRouter);