import axios from 'axios';

interface TelegramRequestData {
    name: string;
    phone: string;
    address: string;
    message: string;
}

export const sendTelegramNotification = async (
    data: TelegramRequestData
) => {
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

    await axios.post(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
            chat_id: chatId,
            text,
        }
    );
};