'use client'

import { Category } from '@/components/stores/CategoryFilter';
import { storesApi } from '@/lib/stores';
import { Pagination, Store, StoreFormData, StoresResponse } from '@/types/store.interfaces';
import { useState, useEffect, useCallback } from 'react';

export const useStores = () => {
    const [stores, setStores] = useState<Store[]>([]);
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<Pagination>();

    // Fetch all stores
    useEffect(() => {
        const fetchStores = async () => {
            try {
                setIsLoading(true);
                const response = await storesApi.getStores();
                setStores(response.data);
                setPagination({
                    page: response.meta.page,
                    limit: response.meta.limit,
                    total: response.meta.total,
                    hasNext: response.meta.hasNext,
                    hasPrev: response.meta.hasPrev,
                    nextPageUrl: response.meta.nextPageUrl,
                    prevPageUrl: response.meta.prevPageUrl,
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch stores');
            } finally {
                setIsLoading(false);
            }
        };

        fetchStores();
    }, []);


    const searchStores = useCallback(async (search: string, isActive?: Category) => {
        try {
            setIsLoading(true);
            setError(null);
            const response: StoresResponse = await storesApi.searchStores(search, isActive?.value);

            setStores(response.data);
            setPagination({
                page: response.meta.page,
                limit: response.meta.limit,
                total: response.meta.total,
                hasNext: response.meta.hasNext,
                hasPrev: response.meta.hasPrev,
                nextPageUrl: response.meta.nextPageUrl,
                prevPageUrl: response.meta.prevPageUrl,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to search products');
        } finally {
            setIsLoading(false);
        }
    }, []);


    // Function to clear selected store
    const clearSelectedStore = () => {
        setSelectedStore(null);
    };

    const createStore = async (storeData: StoreFormData) => {
        try {
            setIsLoading(true);
            setError(null);
            await storesApi.createStore(storeData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create store');
        } finally {
            setIsLoading(false);
        }
    };

    const updateStore = async (storeId: number, storeData: StoreFormData) => {

        try {

            setIsLoading(true);

            setError(null);

            await storesApi.updateStore(storeId, storeData);


        } catch (err) {

            setError(err instanceof Error ? err.message : 'Failed to update store');

        } finally {

            setIsLoading(false);

        }

    };



    const deleteStore = async (storeId: number) => {

        try {

            setIsLoading(true);

            setError(null);

            await storesApi.deleteStore(storeId);


        } catch (err) {

            setError(err instanceof Error ? err.message : 'Failed to delete store');

        } finally {

            setIsLoading(false);

        }

    };

    return {
        stores,
        selectedStore,
        searchStores,
        pagination,
        isLoading,
        error,
        createStore,
        updateStore,
        deleteStore,
        clearSelectedStore,
        refetch: () => {
            setIsLoading(true);
            storesApi.getStores()
                .then(response => setStores(response.data))
                .catch(err => setError(err.message))
                .finally(() => setIsLoading(false));
        },
    };
};