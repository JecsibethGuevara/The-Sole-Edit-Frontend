
import { OneStoresResponse, Store, StoreFormData, StoresResponse } from "@/types/store.interfaces";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const storesApi = {
    getStores: async (): Promise<StoresResponse> => {
        const token = localStorage.getItem('access_token');

        const response = await fetch(`${API_BASE_URL}/stores`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch stores');
        }

        return response.json();
    },

    getOneStore: async (id: number): Promise<OneStoresResponse> => {
        const token = localStorage.getItem('access_token');

        const response = await fetch(`${API_BASE_URL}/stores/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch stores');
        }

        return response.json();
    },

    searchStores: async (search: string, isActive?: string): Promise<StoresResponse> => {
        const params = new URLSearchParams({
            search,
            ...(isActive && isActive !== '' && { isActive })
        });
        const token = localStorage.getItem('access_token');

        const response = await fetch(
            `${API_BASE_URL}/stores?${params}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,

                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to search products');
        }

        return response.json();
    },

    createStore: async (storeData: StoreFormData): Promise<Store> => {
        const token = localStorage.getItem('access_token');

        const response = await fetch(`${API_BASE_URL}/stores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(storeData),
        });

        if (!response.ok) {
            throw new Error('Failed to create store');
        }

        return response.json();
    },

    updateStore: async (storeId: number, storeData: StoreFormData): Promise<Store> => {
        const token = localStorage.getItem('access_token');
        const { id, is_active, deleted_at, updatedAt, ...dataToSend } = storeData as Store;

        const response = await fetch(`${API_BASE_URL}/stores/${storeId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
            throw new Error('Failed to update store');
        }

        return response.json();
    },

    deleteStore: async (storeId: number): Promise<void> => {
        const token = localStorage.getItem('access_token');

        const response = await fetch(`${API_BASE_URL}/stores/${storeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete store');
        }
    },

};