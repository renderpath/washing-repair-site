"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTelegramNotification = void 0;
const axios_1 = __importDefault(require("axios"));
const sendTelegramNotification = async (data) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
        console.log('Telegram env not found');
        return;
    }
    const text = `
🔥 Новая заявка с сайта

👤 Имя: ${data.name}

📞 Телефон:
${data.phone}

📍 Адрес:
${data.address}

🛠 Проблема:
${data.message}
`;
    await axios_1.default.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text,
    });
};
exports.sendTelegramNotification = sendTelegramNotification;
