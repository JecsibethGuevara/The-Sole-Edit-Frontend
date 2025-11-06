export interface Product {
    id: number;
    product: {
        id: number;
        store_id: number;
        name: string;
        description: string;
        category: string;
        brand: string;
        image_url: string;
        is_active: boolean;
        created_by: number;
        createdAt: string;
        updatedAt: string;
    };
    price: number;
    stock: number;
    is_available: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProductsResponse {
    success: boolean;
    data: Product[];
    meta: {
        page: number;
        limit: number;
        total: number;
        hasNext: boolean;
        hasPrev: boolean;
        nextPageUrl: string;
        prevPageUrl: string;
    };
    message: string;
    timestamp: string;
}
