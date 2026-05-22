import type { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import { z } from 'zod';

import { prisma } from '../lib/prisma';

const loginSchema = z.object({
    login: z.string(),
    password: z.string(),
});

const statusSchema = z.object({
    status: z.enum([
        'new',
        'in_progress',
        'done',
        'cancelled',
    ]),
});

export const loginAdmin = async (
    req: Request,
    res: Response
) => {
    try {
        const data = loginSchema.parse(req.body);

        if (
            data.login !== process.env.ADMIN_LOGIN ||
            data.password !== process.env.ADMIN_PASSWORD
        ) {
            return res.status(401).json({
                message: 'Неверный логин или пароль',
            });
        }

        const token = jwt.sign(
            {
                role: 'admin',
            },
            process.env.JWT_SECRET || 'secret',
            {
                expiresIn: '7d',
            }
        );

        return res.json({
            token,
        });
    } catch {
        return res.status(400).json({
            message: 'Ошибка авторизации',
        });
    }
};

export const getRequests = async (
    _req: Request,
    res: Response
) => {
    try {
        const requests = await prisma.request.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return res.json(requests);
    } catch {
        return res.status(500).json({
            message: 'Ошибка получения заявок',
        });
    }
};

export const updateRequestStatus = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const data = statusSchema.parse(req.body);

        const request = await prisma.request.update({
            where: {
                id,
            },
            data: {
                status: data.status,
            },
        });

        return res.json(request);
    } catch {
        return res.status(400).json({
            message: 'Ошибка обновления статуса',
        });
    }
};

export const deleteRequest = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        await prisma.request.delete({
            where: {
                id,
            },
        });

        return res.json({
            message: 'Заявка удалена',
        });
    } catch {
        return res.status(400).json({
            message: 'Ошибка удаления заявки',
        });
    }
};