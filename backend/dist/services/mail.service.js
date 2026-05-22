"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRequestMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendRequestMail = async (data) => {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        connectionTimeout: 7000,
        greetingTimeout: 7000,
        socketTimeout: 7000,
        auth: {
            user: process.env.YANDEX_MAIL_USER,
            pass: process.env.YANDEX_MAIL_PASSWORD,
        },
    });
    await transporter.sendMail({
        from: `"Ремонт стиральных машин" <${process.env.YANDEX_MAIL_USER}>`,
        to: process.env.REQUEST_RECEIVER_EMAIL,
        subject: 'Новая заявка с сайта',
        html: `
      <h2>Новая заявка с сайта</h2>
      <p><b>Имя:</b> ${data.name}</p>
      <p><b>Телефон:</b> ${data.phone}</p>
      <p><b>Адрес:</b> ${data.address}</p>
      <p><b>Проблема:</b> ${data.message}</p>
    `,
    });
};
exports.sendRequestMail = sendRequestMail;
