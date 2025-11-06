'use client'

import { useState, useEffect, useCallback } from 'react';
import { productsApi } from '@/lib/products';
import { Product, ProductsResponse } from '@/types/productDetails';

export const useProducts = (storeId?: number) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
        total: 0,
        hasNext: false,
        hasPrev: false,
    });

    useEffect(() => {
        if (storeId) {
            fetchProducts(storeId);
        }
    }, [storeId]);

    const fetchProducts = useCallback(async (id: number, page: number = 1) => {
        try {
            setIsLoading(true);
            setError(null);
            const response: ProductsResponse = await productsApi.getStoreProducts(id, page);

            setProducts(response.data);
            setPagination({
                page: response.meta.page,
                limit: response.meta.limit,
                total: response.meta.total,
                hasNext: response.meta.hasNext,
                hasPrev: response.meta.hasPrev,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch products');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const searchProducts = useCallback(async (search: string, category?: string) => {
        if (!storeId) return;

        try {
            setIsLoading(true);
            setError(null);
            const response: ProductsResponse = await productsApi.searchProducts(storeId, search, category);

            setProducts(response.data);
            setPagination({
                page: response.meta.page,
                limit: response.meta.limit,
                total: response.meta.total,
                hasNext: response.meta.hasNext,
                hasPrev: response.meta.hasPrev,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to search products');
        } finally {
            setIsLoading(false);
        }
    }, [storeId]); // Add storeId as dependency


    const loadNextPage = () => {
        if (storeId && pagination.hasNext) {
            fetchProducts(storeId, pagination.page + 1);
        }
    };

    const loadPrevPage = () => {
        if (storeId && pagination.hasPrev) {
            fetchProducts(storeId, pagination.page - 1);
        }
    };

    useEffect(() => {
        if (storeId) {
            fetchProducts(storeId);
        }
    }, [storeId]);

    return {
        products,
        isLoading,
        error,
        pagination,
        fetchProducts,
        searchProducts,
        loadNextPage,
        loadPrevPage,
        refetch: () => storeId && fetchProducts(storeId),
    };
};