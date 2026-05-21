import type { Request, Response } from 'express';
import { z } from 'zod';

import { prisma } from '../lib/prisma';
import { sendRequestMail } from '../services/mail.service';

const requestSchema = z.object({
    name: z.string().min(2),
    phone: z.string().min(18),
    address: z.string().min(5),
    message: z.string().min(5),
});

export const createRequest = async (
    req: Request,
    res: Response
) => {
    try {
        console.log('BODY:', req.body);

        const data = requestSchema.parse(req.body);

        console.log('VALIDATED:', data);

        const request = await prisma.request.create({
            data: {
                name: data.name,
                phone: data.phone,
                address: data.address,
                message: data.message,
            },
        });

        console.log('REQUEST SAVED');

        await sendRequestMail(data);

        console.log('MAIL SENT');

        return res.status(201).json({
            message: 'Заявка успешно отправлена',
            request,
        });
    } catch (error) {
        console.error('CREATE REQUEST ERROR:', error);

        return res.status(500).json({
            message: 'Ошибка отправки заявки',
        });
    }
};