export interface Store {
    id: number;
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    image?: string;
    is_active: boolean;
    created_at?: string;
    deleted_at?: string | null,
    created_by?: number,
    updatedAt?: string
}



export interface StoresResponse {
    success: boolean
    data: Store[];
    meta: Pagination;
    message: string;
    timestamp: string

}
export interface OneStoresResponse {
    success: boolean
    id: number;
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    image?: string;
    is_active: boolean;
    created_at?: string;
    deleted_at?: string | null,
    created_by?: number,
    updatedAt?: string
    meta: Pagination;
    message: string;
    timestamp: string

}

export interface Pagination {
    page: number
    limit: number
    total: number
    hasNext: boolean
    hasPrev: boolean
    nextPageUrl: string
    prevPageUrl: string
}


