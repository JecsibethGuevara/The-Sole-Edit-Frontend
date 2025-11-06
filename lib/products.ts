import { ProductsResponse } from "@/types/productDetails";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const token = localStorage.getItem('access_token');


export const productsApi = {
    getStoreProducts: async (storeId: number, page: number = 1, limit: number = 12): Promise<ProductsResponse> => {

        const response = await fetch(
            `${API_BASE_URL}/stores/${storeId}/products?page=${page}&limit=${limit}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',

                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch store products');
        }

        return response.json();
    },

    searchProducts: async (storeId: number, search: string, category?: string): Promise<ProductsResponse> => {
        const params = new URLSearchParams({
            search,
            ...(category && category !== 'all' && { category })
        });

        const response = await fetch(
            `${API_BASE_URL}/stores/${storeId}/products?${params}`,
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
};