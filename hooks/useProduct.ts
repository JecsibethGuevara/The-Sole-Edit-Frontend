'use client'

import { useState, useCallback, useEffect } from 'react';
import { productsApi } from '@/lib/products';
import { ProductFormData, ProductResponse } from '@/types/productDetails';

export const useProduct = (productId?: number) => {
    const [product, setProduct] = useState<ProductResponse>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);




    const fetchOneProduct = useCallback(async (id: number, page: number = 1,) => {
        try {
            setIsLoading(true);
            setError(null);
            const response: ProductResponse = await productsApi.getOneProduct(id, page);

            setProduct(response);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch products');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (productId && productId > 0) {
            console.log('useEffect triggered with productId:', productId); // Debug log
            fetchOneProduct(productId);
        } else {
            console.log('No valid productId provided:', productId); // Debug log
            setIsLoading(false);
        }
    }, [productId, fetchOneProduct]);


    const deleteOneProduct = useCallback(async (id: number, store: number) => {
        try {
            setIsLoading(true);
            setError(null);
            const response: ProductResponse = await productsApi.deleteOneProduct(id, store);

            setProduct(response);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete  products');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createProduct = useCallback(async (productData: ProductFormData) => {
        try {
            setIsLoading(true);
            setError(null);
            await productsApi.createProduct(productData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create product');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateProduct = useCallback(async (productId: number, productData: ProductFormData, store: number) => {
        try {
            setIsLoading(true);
            setError(null);
            await productsApi.updateProduct(productId, productData, store);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update product');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        error,
        product,
        fetchOneProduct,
        deleteOneProduct,
        createProduct,
        updateProduct

    };
};