import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import {
    getRequests,
    updateRequestStatus,
    type RepairRequest,
    type RequestStatus,
} from '../../shared/api/adminApi';

import styles from './AdminPage.module.scss';

const statusLabels: Record<RequestStatus, string> = {
    new: 'Новая',
    in_progress: 'В работе',
    done: 'Готово',
    cancelled: 'Отменена',
};

export const AdminPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('admin_token');

    const [requests, setRequests] = useState<RepairRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const stats = useMemo(() => ({
        total: requests.length,
        new: requests.filter((item) => item.status === 'new').length,
        inProgress: requests.filter((item) => item.status === 'in_progress').length,
        done: requests.filter((item) => item.status === 'done').length,
    }), [requests]);

    const loadRequests = async () => {
        try {
            setIsLoading(true);
            const data = await getRequests();
            setRequests(data);
        } catch {
            localStorage.removeItem('admin_token');
            navigate('/admin/login');
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (id: number, status: RequestStatus) => {
        await updateRequestStatus(id, status);
        await loadRequests();
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    useEffect(() => {
        loadRequests();
    }, []);

    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <div>
                    <p className={styles.label}>Панель управления</p>
                    <h1>Заявки с сайта</h1>
                    <p className={styles.subtitle}>
                        Управление заявками с лендинга ремонта стиральных машин
                    </p>
                </div>

                <div className={styles.actions}>
                    <button type="button" onClick={loadRequests}>Обновить</button>
                    <button type="button" onClick={handleLogout}>Выйти</button>
                </div>
            </header>

            <section className={styles.stats}>
                <div className={styles.statCard}><span>Всего</span><strong>{stats.total}</strong></div>
                <div className={styles.statCard}><span>Новые</span><strong>{stats.new}</strong></div>
                <div className={styles.statCard}><span>В работе</span><strong>{stats.inProgress}</strong></div>
                <div className={styles.statCard}><span>Готово</span><strong>{stats.done}</strong></div>
            </section>

            {isLoading ? (
                <div className={styles.state}>Загрузка заявок...</div>
            ) : requests.length === 0 ? (
                <div className={styles.state}>Заявок пока нет</div>
            ) : (
                <section className={styles.tableCard}>
                    <div className={styles.tableHeader}>
                        <h2>Список заявок</h2>
                        <p>{requests.length} записей</p>
                    </div>

                    <div className={styles.tableScroll}>
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th>Дата</th>
                                <th>Клиент</th>
                                <th>Телефон</th>
                                <th>Адрес</th>
                                <th>Комментарий</th>
                                <th>Статус</th>
                            </tr>
                            </thead>

                            <tbody>
                            {requests.map((request) => (
                                <tr key={request.id}>
                                    <td>{new Date(request.createdAt).toLocaleString('ru-RU')}</td>
                                    <td><strong>{request.name}</strong></td>
                                    <td><a href={`tel:${request.phone}`}>{request.phone}</a></td>
                                    <td>{request.address || '—'}</td>
                                    <td>{request.message || '—'}</td>
                                    <td>
                                        <select
                                            className={`${styles.statusSelect} ${styles[request.status]}`}
                                            value={request.status}
                                            onChange={(event) =>
                                                handleStatusChange(
                                                    request.id,
                                                    event.target.value as RequestStatus
                                                )
                                            }
                                        >
                                            {Object.entries(statusLabels).map(([value, label]) => (
                                                <option key={value} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </main>
    );
};