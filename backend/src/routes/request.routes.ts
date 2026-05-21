import { Router } from 'express';

import { createRequest } from '../controllers/request.controller';

export const requestRouter = Router();

requestRouter.post('/', createRequest);