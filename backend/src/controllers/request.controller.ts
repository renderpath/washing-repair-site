import type { Request, Response } from 'express';
import { z } from 'zod';

import { prisma } from '../lib/prisma';
import { sendRequestMail } from '../services/mail.service';

const requestSchema = z.object({
    name: z.string().min(2),
    phone: z.string().min(5),
    message: z.string().optional(),
});

export const createRequest = async (req: Request, res: Response) => {
    try {
        const data = requestSchema.parse(req.body);

        const request = await prisma.request.create({
            data: {
                name: data.name,
                phone: data.phone,
                message: data.message,
            },
        });

        await sendRequestMail(data);

        return res.status(201).json({
            message: 'Заявка успешно отправлена',
            request,
        });
    } catch (error) {
        console.error(error);

        return res.status(400).json({
            message: 'Ошибка отправки заявки',
        });
    }
};