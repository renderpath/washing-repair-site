"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRequest = exports.updateRequestStatus = exports.getRequests = exports.loginAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const loginSchema = zod_1.z.object({
    login: zod_1.z.string(),
    password: zod_1.z.string(),
});
const statusSchema = zod_1.z.object({
    status: zod_1.z.enum([
        'new',
        'in_progress',
        'done',
        'cancelled',
    ]),
});
const loginAdmin = async (req, res) => {
    try {
        const data = loginSchema.parse(req.body);
        if (data.login !== process.env.ADMIN_LOGIN ||
            data.password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({
                message: 'Неверный логин или пароль',
            });
        }
        const token = jsonwebtoken_1.default.sign({
            role: 'admin',
        }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '7d',
        });
        return res.json({
            token,
        });
    }
    catch {
        return res.status(400).json({
            message: 'Ошибка авторизации',
        });
    }
};
exports.loginAdmin = loginAdmin;
const getRequests = async (_req, res) => {
    try {
        const requests = await prisma_1.prisma.request.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return res.json(requests);
    }
    catch {
        return res.status(500).json({
            message: 'Ошибка получения заявок',
        });
    }
};
exports.getRequests = getRequests;
const updateRequestStatus = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = statusSchema.parse(req.body);
        const request = await prisma_1.prisma.request.update({
            where: {
                id,
            },
            data: {
                status: data.status,
            },
        });
        return res.json(request);
    }
    catch {
        return res.status(400).json({
            message: 'Ошибка обновления статуса',
        });
    }
};
exports.updateRequestStatus = updateRequestStatus;
const deleteRequest = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma_1.prisma.request.delete({
            where: {
                id,
            },
        });
        return res.json({
            message: 'Заявка удалена',
        });
    }
    catch {
        return res.status(400).json({
            message: 'Ошибка удаления заявки',
        });
    }
};
exports.deleteRequest = deleteRequest;
