import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import {
    deleteRequest,
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

type StatusFilter = 'all' | RequestStatus;
type SortField = 'date' | 'name';
type SortOrder = 'asc' | 'desc';

export const AdminPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('admin_token');

    const [requests, setRequests] = useState<RepairRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);

    const [search, setSearch] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [sortField, setSortField] = useState<SortField>('date');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

    const stats = useMemo(() => ({
        total: requests.length,
        new: requests.filter((item) => item.status === 'new').length,
        inProgress: requests.filter((item) => item.status === 'in_progress').length,
        done: requests.filter((item) => item.status === 'done').length,
    }), [requests]);

    const filteredRequests = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();
        const normalizedName = nameFilter.trim().toLowerCase();

        const filtered = requests.filter((request) => {
            const createdDate = new Date(request.createdAt);

            const searchString = [
                request.name,
                request.phone,
                request.address,
                request.message,
                statusLabels[request.status],
                new Date(request.createdAt).toLocaleString('ru-RU'),
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            const matchesSearch = normalizedSearch
                ? searchString.includes(normalizedSearch)
                : true;

            const matchesName = normalizedName
                ? request.name.toLowerCase().includes(normalizedName)
                : true;

            const matchesStatus = statusFilter === 'all'
                ? true
                : request.status === statusFilter;

            const matchesDateFrom = dateFrom
                ? createdDate >= new Date(`${dateFrom}T00:00:00`)
                : true;

            const matchesDateTo = dateTo
                ? createdDate <= new Date(`${dateTo}T23:59:59`)
                : true;

            return (
                matchesSearch &&
                matchesName &&
                matchesStatus &&
                matchesDateFrom &&
                matchesDateTo
            );
        });

        filtered.sort((a, b) => {
            if (sortField === 'name') {
                const compare = a.name.localeCompare(
                    b.name,
                    'ru',
                    { sensitivity: 'base' }
                );

                return sortOrder === 'asc'
                    ? compare
                    : -compare;
            }

            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();

            return sortOrder === 'asc'
                ? dateA - dateB
                : dateB - dateA;
        });

        return filtered;
    }, [
        requests,
        search,
        nameFilter,
        statusFilter,
        dateFrom,
        dateTo,
        sortField,
        sortOrder,
    ]);

    const loadRequests = async (silent = false) => {
        try {
            if (silent) {
                setIsRefreshing(true);
            } else {
                setIsLoading(true);
            }

            const data = await getRequests();

            setRequests(data);
            setLastUpdatedAt(new Date());
        } catch {
            localStorage.removeItem('admin_token');
            navigate('/admin/login');
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    const handleStatusChange = async (
        id: number,
        status: RequestStatus
    ) => {
        await updateRequestStatus(id, status);
        await loadRequests(true);
    };

    const handleDelete = async (request: RepairRequest) => {
        const isConfirmed = window.confirm(
            `Удалить заявку клиента "${request.name}"?\n\nТелефон: ${request.phone}\nАдрес: ${request.address || '—'}\n\nЭто действие нельзя отменить.`
        );

        if (!isConfirmed) {
            return;
        }

        await deleteRequest(request.id);
        await loadRequests(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    const resetFilters = () => {
        setSearch('');
        setNameFilter('');
        setStatusFilter('all');
        setDateFrom('');
        setDateTo('');
        setSortField('date');
        setSortOrder('desc');
    };

    useEffect(() => {
        loadRequests();

        const intervalId = window.setInterval(() => {
            loadRequests(true);
        }, 10000);

        return () => {
            window.clearInterval(intervalId);
        };
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

                    <p className={styles.updateInfo}>
                        {isRefreshing
                            ? 'Обновление данных...'
                            : lastUpdatedAt
                                ? `Последнее обновление: ${lastUpdatedAt.toLocaleTimeString('ru-RU')}`
                                : 'Данные ещё не обновлялись'}
                    </p>
                </div>

                <div className={styles.actions}>
                    <button type="button" onClick={() => loadRequests(true)}>
                        Обновить
                    </button>

                    <button type="button" onClick={handleLogout}>
                        Выйти
                    </button>
                </div>
            </header>

            <section className={styles.stats}>
                <div className={styles.statCard}>
                    <span>Всего</span>
                    <strong>{stats.total}</strong>
                </div>

                <div className={styles.statCard}>
                    <span>Новые</span>
                    <strong>{stats.new}</strong>
                </div>

                <div className={styles.statCard}>
                    <span>В работе</span>
                    <strong>{stats.inProgress}</strong>
                </div>

                <div className={styles.statCard}>
                    <span>Готово</span>
                    <strong>{stats.done}</strong>
                </div>
            </section>

            <section className={styles.filters}>
                <div className={styles.fieldLarge}>
                    <label htmlFor="search">Поиск по заявкам</label>
                    <input
                        id="search"
                        type="search"
                        placeholder="Имя, телефон, адрес, комментарий..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="name">Имя клиента</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Например: Иван"
                        value={nameFilter}
                        onChange={(event) => setNameFilter(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="status">Статус</label>
                    <select
                        id="status"
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(event.target.value as StatusFilter)
                        }
                    >
                        <option value="all">Все статусы</option>
                        {Object.entries(statusLabels).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="dateFrom">Дата от</label>
                    <input
                        id="dateFrom"
                        type="date"
                        value={dateFrom}
                        onChange={(event) => setDateFrom(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="dateTo">Дата до</label>
                    <input
                        id="dateTo"
                        type="date"
                        value={dateTo}
                        onChange={(event) => setDateTo(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="sortField">Сортировать по</label>
                    <select
                        id="sortField"
                        value={sortField}
                        onChange={(event) =>
                            setSortField(event.target.value as SortField)
                        }
                    >
                        <option value="date">Дате</option>
                        <option value="name">Имени</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="sortOrder">Порядок</label>
                    <select
                        id="sortOrder"
                        value={sortOrder}
                        onChange={(event) =>
                            setSortOrder(event.target.value as SortOrder)
                        }
                    >
                        <option value="desc">По убыванию</option>
                        <option value="asc">По возрастанию</option>
                    </select>
                </div>

                <button type="button" onClick={resetFilters}>
                    Сбросить
                </button>
            </section>

            {isLoading ? (
                <div className={styles.state}>Загрузка заявок...</div>
            ) : requests.length === 0 ? (
                <div className={styles.state}>Заявок пока нет</div>
            ) : (
                <section className={styles.tableCard}>
                    <div className={styles.tableHeader}>
                        <h2>Список заявок</h2>
                        <p>
                            Показано: {filteredRequests.length} из {requests.length}
                        </p>
                    </div>

                    {filteredRequests.length === 0 ? (
                        <div className={styles.empty}>
                            По выбранным фильтрам заявок не найдено.
                        </div>
                    ) : (
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
                                    <th>Действия</th>
                                </tr>
                                </thead>

                                <tbody>
                                {filteredRequests.map((request) => (
                                    <tr key={request.id}>
                                        <td>
                                            {new Date(request.createdAt).toLocaleString('ru-RU')}
                                        </td>

                                        <td>
                                            <strong>{request.name}</strong>
                                        </td>

                                        <td>
                                            <a href={`tel:${request.phone}`}>
                                                {request.phone}
                                            </a>
                                        </td>

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

                                        <td>
                                            <button
                                                type="button"
                                                className={styles.deleteButton}
                                                onClick={() => handleDelete(request)}
                                            >
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            )}
        </main>
    );
};