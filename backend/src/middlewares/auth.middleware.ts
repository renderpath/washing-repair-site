import type {
    Request,
    Response,
    NextFunction,
} from 'express';

import jwt from 'jsonwebtoken';

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: 'Нет токена',
        });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        jwt.verify(
            token,
            process.env.JWT_SECRET || 'secret'
        );

        next();
    } catch {
        return res.status(401).json({
            message: 'Неверный токен',
        });
    }
};