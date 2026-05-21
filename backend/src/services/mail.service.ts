import nodemailer from 'nodemailer';

type RequestMailData = {
    name: string;
    phone: string;
    address: string;
    message: string;
};

export const sendRequestMail = async (data: RequestMailData) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
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