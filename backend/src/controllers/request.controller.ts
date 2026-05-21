import type { Request, Response } from 'express';
import { z } from 'zod';

import { sendRequestMail } from '../services/mail.service';

const requestSchema = z.object({
    name: z.string().min(2),
    phone: z.string().min(5),
    message: z.string().optional(),
});

export const createRequest = async (
    req: Request,
    res: Response
) => {
    try {
        const data = requestSchema.parse(req.body);

        await sendRequestMail(data);

        return res.status(201).json({
            message: 'Заявка успешно отправлена',
        });
    } catch {
        return res.status(400).json({
            message: 'Ошибка отправки заявки',
        });
    }
};