import type { FormEvent } from 'react';
import { useState } from 'react';
import { FiLock, FiMapPin, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

import { Container } from '../../shared/ui/container/Container';
import { requestApi } from '../../shared/api/requestApi';

import styles from './RequestForm.module.scss';

type FormState = {
    name: string;
    phone: string;
    message: string;
};

const initialState: FormState = {
    name: '',
    phone: '',
    message: '',
};

export const RequestForm = () => {
    const [form, setForm] = useState<FormState>(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'success' | 'error' | null>(null);

    const handleChange = (
        field: keyof FormState,
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));

        setStatus(null);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!form.name.trim() || !form.phone.trim()) {
            setStatus('error');
            return;
        }

        try {
            setIsLoading(true);

            await requestApi.post('/api/requests', form);

            setForm(initialState);
            setStatus('success');
        } catch {
            setStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className={styles.request} id="request">
            <Container>
                <div className={styles.info}>
                    <h2>Нужен ремонт стиральной машины?</h2>

                    <p>
                        Звоните или оставьте заявку — я свяжусь с вами в ближайшее время!
                    </p>

                    <div className={styles.contact}>
                        <FiPhone />
                        <div>
                            <strong>+7 (495) 123-45-67</strong>
                            <span>Ежедневно с 8:00 до 22:00</span>
                        </div>
                    </div>

                    <div className={styles.contact}>
                        <FiMapPin />
                        <div>
                            <strong>Москва и область</strong>
                            <span>Выезжаю во все районы</span>
                        </div>
                    </div>

                    <div className={styles.contact}>
                        <FaWhatsapp />
                        <div>
                            <strong>WhatsApp и Telegram</strong>
                            <span>Также доступен для связи в мессенджерах</span>
                        </div>
                    </div>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <h3>Оставить заявку</h3>

                    <input
                        type="text"
                        placeholder="Ваше имя"
                        value={form.name}
                        onChange={(event) => handleChange('name', event.target.value)}
                    />

                    <input
                        type="tel"
                        placeholder="Телефон"
                        value={form.phone}
                        onChange={(event) => handleChange('phone', event.target.value)}
                    />

                    <textarea
                        placeholder="Опишите проблему"
                        value={form.message}
                        onChange={(event) => handleChange('message', event.target.value)}
                    />

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Отправка...' : 'Отправить заявку'}
                    </button>

                    {status === 'success' && (
                        <p className={styles.success}>
                            Заявка отправлена. Скоро мастер свяжется с вами.
                        </p>
                    )}

                    {status === 'error' && (
                        <p className={styles.error}>
                            Заполните имя и телефон. Если ошибка повторится — попробуйте позже.
                        </p>
                    )}

                    <small>
                        <FiLock />
                        Ваши данные не передаются третьим лицам
                    </small>
                </form>
            </Container>
        </section>
    );
};