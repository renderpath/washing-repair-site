import express from 'express';
import cors from 'cors';

import { requestRouter } from './routes/request.routes';
import { adminRouter } from './routes/admin.routes';

export const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/requests', requestRouter);
app.use('/api/admin', adminRouter);