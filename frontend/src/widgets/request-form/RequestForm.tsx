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
    address: string;
    message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
    name: '',
    phone: '',
    address: '',
    message: '',
};

const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    const normalized = digits.startsWith('8')
        ? `7${digits.slice(1)}`
        : digits.startsWith('7')
            ? digits
            : `7${digits}`;

    const phone = normalized.slice(0, 11);

    const part1 = phone.slice(1, 4);
    const part2 = phone.slice(4, 7);
    const part3 = phone.slice(7, 9);
    const part4 = phone.slice(9, 11);

    let result = '+7';

    if (part1) result += ` (${part1}`;
    if (part1.length === 3) result += ')';
    if (part2) result += ` ${part2}`;
    if (part3) result += `-${part3}`;
    if (part4) result += `-${part4}`;

    return result;
};

export const RequestForm = () => {
    const [form, setForm] = useState<FormState>(initialState);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'success' | 'error' | null>(null);

    const handleChange = (field: keyof FormState, value: string) => {
        const nextValue = field === 'phone' ? formatPhone(value) : value;

        setForm((prev) => ({
            ...prev,
            [field]: nextValue,
        }));

        setErrors((prev) => ({
            ...prev,
            [field]: '',
        }));

        setStatus(null);
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};
        const phoneDigits = form.phone.replace(/\D/g, '');

        if (form.name.trim().length < 2) {
            newErrors.name = 'Введите имя минимум из 2 символов';
        }

        if (phoneDigits.length !== 11) {
            newErrors.phone = 'Введите полный номер телефона';
        }

        if (form.address.trim().length < 5) {
            newErrors.address = 'Введите адрес выезда';
        }

        if (form.message.trim().length < 5) {
            newErrors.message = 'Опишите проблему минимум в 5 символов';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) {
            setStatus('error');
            return;
        }

        try {
            setIsLoading(true);

            await requestApi.post('/api/requests', {
                name: form.name.trim(),
                phone: form.phone,
                address: form.address.trim(),
                message: form.message.trim(),
            });

            setForm(initialState);
            setErrors({});
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

                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <h3>Оставить заявку</h3>

                    <label>
                        <input
                            type="text"
                            placeholder="Ваше имя"
                            value={form.name}
                            onChange={(event) => handleChange('name', event.target.value)}
                        />
                        {errors.name && <span>{errors.name}</span>}
                    </label>

                    <label>
                        <input
                            type="tel"
                            placeholder="+7 (___) ___-__-__"
                            value={form.phone}
                            onChange={(event) => handleChange('phone', event.target.value)}
                        />
                        {errors.phone && <span>{errors.phone}</span>}
                    </label>

                    <label>
                        <input
                            type="text"
                            placeholder="Адрес выезда"
                            value={form.address}
                            onChange={(event) => handleChange('address', event.target.value)}
                        />
                        {errors.address && <span>{errors.address}</span>}
                    </label>

                    <label>
            <textarea
                placeholder="Опишите проблему"
                value={form.message}
                onChange={(event) => handleChange('message', event.target.value)}
            />
                        {errors.message && <span>{errors.message}</span>}
                    </label>

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
                            Проверьте правильность заполнения формы.
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