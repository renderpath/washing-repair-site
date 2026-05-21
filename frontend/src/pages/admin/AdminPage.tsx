import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    const [requests, setRequests] = useState<RepairRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadRequests = async () => {
        try {
            const data = await getRequests();
            setRequests(data);
        } catch {
            localStorage.removeItem('admin_token');
            navigate('/admin/login');
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (
        id: number,
        status: RequestStatus
    ) => {
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

    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1>Заявки с сайта</h1>
                    <p>Все обращения, отправленные через форму</p>
                </div>

                <button onClick={handleLogout}>Выйти</button>
            </div>

            {isLoading ? (
                <p>Загрузка...</p>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Имя</th>
                            <th>Телефон</th>
                            <th>Комментарий</th>
                            <th>Статус</th>
                        </tr>
                        </thead>

                        <tbody>
                        {requests.map((request) => (
                            <tr key={request.id}>
                                <td>
                                    {new Date(request.createdAt).toLocaleString('ru-RU')}
                                </td>
                                <td>{request.name}</td>
                                <td>
                                    <a href={`tel:${request.phone}`}>
                                        {request.phone}
                                    </a>
                                </td>
                                <td>{request.message || '—'}</td>
                                <td>
                                    <select
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

                        {requests.length === 0 && (
                            <tr>
                                <td colSpan={5}>Заявок пока нет</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
};