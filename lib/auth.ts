import { AuthResponse, LoginData, SignupData, User } from "@/types/auth/auth.interface"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const authApi = {
    login: async (data: LoginData): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Login failed' }))
            throw new Error(errorData.message || `Login failed: ${response.status}`)
        }

        return response.json()
    },

    signup: async (data: SignupData): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Signup failed' }))
            throw new Error(errorData.message || `Signup failed: ${response.status}`)
        }

        return response.json()
    },

    getUsers: async (): Promise<User[]> => {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch users' }))
            throw new Error(errorData.message || `Failed to fetch users: ${response.status}`)
        }

        return response.json()
    },

    getUser: async (userId: string): Promise<User> => {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch user' }))
            throw new Error(errorData.message || `Failed to fetch user: ${response.status}`)
        }

        return response.json()
    },

    logout: async (): Promise<void> => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
    },
}