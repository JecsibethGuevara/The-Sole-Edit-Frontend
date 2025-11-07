import { Product, ProductFormData, ProductResponse, ProductsResponse } from "@/types/productDetails";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const productsApi = {

    getOneProduct: async (productId: number, page: number = 1, limit: number = 12): Promise<ProductResponse> => {
        const token = localStorage.getItem('access_token');

        const response = await fetch(
            `${API_BASE_URL}/products/${productId}?page=${page}&limit=${limit}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }

        return response.json();
    },
    getStoreProducts: async (storeId: number, page: number = 1, limit: number = 12): Promise<ProductsResponse> => {
        const token = localStorage.getItem('access_token');

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



    searchProducts: async (storeId: number, search: string, inStock?: string): Promise<ProductsResponse> => {
        const params = new URLSearchParams({
            search,
            ...(inStock && inStock !== 'all' && { inStock })
        });
        const token = localStorage.getItem('access_token');

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

    deleteOneProduct: async (productId: number, store: number): Promise<ProductResponse> => {
        const token = localStorage.getItem('access_token');

        const response = await fetch(
            `${API_BASE_URL}/stores/${store}/products/${productId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }

        return response.json();
    },

    createProduct: async (productData: ProductFormData): Promise<Product> => {
        const token = localStorage.getItem('access_token');
        const { price, stock, ...dataToSend } = productData;

        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
            throw new Error('Failed to create product');
        }

        return response.json();
    },

    updateProduct: async (productId: number, productData: ProductFormData, store: number): Promise<ProductResponse> => {
        const token = localStorage.getItem('access_token');
        console.log(productData)
        const response = await fetch(`${API_BASE_URL}/stores/${store}/products/${productId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error('Failed to update product');
        }
        return response.json();
    },
};