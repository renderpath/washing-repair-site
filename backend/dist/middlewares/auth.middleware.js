"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            message: 'Нет токена',
        });
    }
    const token = authHeader.replace('Bearer ', '');
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        next();
    }
    catch {
        return res.status(401).json({
            message: 'Неверный токен',
        });
    }
};
exports.authMiddleware = authMiddleware;
