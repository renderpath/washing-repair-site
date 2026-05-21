import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginAdmin } from '../../shared/api/adminApi';

import styles from './AdminLoginPage.module.scss';

export const AdminLoginPage = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState('admin');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const data = await loginAdmin(login, password);

            localStorage.setItem('admin_token', data.token);
            navigate('/admin');
        } catch {
            setError('Неверный логин или пароль');
        }
    };

    return (
        <main className={styles.page}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Вход в админку</h1>

                <input
                    type="text"
                    placeholder="Логин"
                    value={login}
                    onChange={(event) => setLogin(event.target.value)}
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <button type="submit">Войти</button>

                {error && <p>{error}</p>}
            </form>
        </main>
    );
};