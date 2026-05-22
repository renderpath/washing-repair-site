"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequest = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const mail_service_1 = require("../services/mail.service");
const telegram_service_1 = require("../services/telegram.service");
const requestSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    phone: zod_1.z.string().min(18),
    address: zod_1.z.string().min(5),
    message: zod_1.z.string().min(5),
});
const createRequest = async (req, res) => {
    try {
        const data = requestSchema.parse(req.body);
        const request = await prisma_1.prisma.request.create({
            data: {
                name: data.name,
                phone: data.phone,
                address: data.address,
                message: data.message,
            },
        });
        (0, mail_service_1.sendRequestMail)(data).catch((error) => {
            console.error('MAIL ERROR:', error);
        });
        (0, telegram_service_1.sendTelegramNotification)(data).catch((error) => {
            console.error('TELEGRAM ERROR:', error);
        });
        return res.status(201).json({
            message: 'Заявка успешно отправлена',
            request,
        });
    }
    catch (error) {
        console.error('CREATE REQUEST ERROR:', error);
        return res.status(400).json({
            message: 'Ошибка отправки заявки',
        });
    }
};
exports.createRequest = createRequest;
