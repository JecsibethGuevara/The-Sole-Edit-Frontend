'use client'

import { storesApi } from '@/lib/stores';
import { Store } from '@/types/store.interfaces';
import { useState, useEffect } from 'react';

export const useStore = (id?: number) => {
    const [store, setStore] = useState<Store | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id && id > 0) {
            fetchStore(id);
        }
    }, [id]);

    const fetchStore = async (storeId: number) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await storesApi.getOneStore(storeId);
            setStore(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch store');
        } finally {
            setIsLoading(false);
        }
    };

    const clearStore = () => {
        setStore(null);
        setError(null);
    };

    return {
        store,
        isLoading,
        error,
        fetchStore,
        clearStore,
    };
};