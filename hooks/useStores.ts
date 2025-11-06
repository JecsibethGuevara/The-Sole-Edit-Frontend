'use client'

import { storesApi } from '@/lib/stores';
import { Store } from '@/types/store.interfaces';
import { useState, useEffect } from 'react';

export const useStores = () => {
    const [stores, setStores] = useState<Store[]>([]);
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch all stores
    useEffect(() => {
        const fetchStores = async () => {
            try {
                setIsLoading(true);
                const response = await storesApi.getStores();
                setStores(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch stores');
            } finally {
                setIsLoading(false);
            }
        };

        fetchStores();
    }, []);



    // Function to clear selected store
    const clearSelectedStore = () => {
        setSelectedStore(null);
    };

    return {
        stores,
        selectedStore,
        isLoading,
        error,
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