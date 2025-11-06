import { OneStoresResponse, StoresResponse } from "@/types/store.interfaces";

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

};