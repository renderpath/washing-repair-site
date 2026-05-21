import { requestApi } from './requestApi';

export type RequestStatus = 'new' | 'in_progress' | 'done' | 'cancelled';

export type RepairRequest = {
    id: number;
    name: string;
    phone: string;
    message: string | null;
    status: RequestStatus;
    createdAt: string;
};

export const loginAdmin = async (login: string, password: string) => {
    const response = await requestApi.post('/api/admin/login', {
        login,
        password,
    });

    return response.data;
};

export const getRequests = async (): Promise<RepairRequest[]> => {
    const token = localStorage.getItem('admin_token');

    const response = await requestApi.get('/api/admin/requests', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const updateRequestStatus = async (
    id: number,
    status: RequestStatus
) => {
    const token = localStorage.getItem('admin_token');

    const response = await requestApi.patch(
        `/api/admin/requests/${id}/status`,
        { status },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};