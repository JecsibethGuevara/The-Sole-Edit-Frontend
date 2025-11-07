'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/auth'
import { AuthResponse, LoginData, SignupData, User } from '@/types/auth/auth.interface'
import { get } from 'http'

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        getUsers()
    }, [])

    const login = async (data: LoginData): Promise<AuthResponse> => {
        setIsLoading(true)
        setError(null)
        const response = await authApi.login(data)
        try {
            if (response.token) {
                localStorage.setItem('access_token', response.token)
                localStorage.setItem('user', JSON.stringify(response.user))
            }

            router.push('/home')
            return response
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Login failed'
            setError(message)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const signup = async (data: SignupData): Promise<AuthResponse> => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await authApi.signup(data)
            // Store token and user data
            if (response.token) {
                localStorage.setItem('access_token', response.token)
                localStorage.setItem('user', JSON.stringify(response.user))
            }

            router.push('/home')
            return response
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Signup failed'
            setError(message)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    const getUsers = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const users = await authApi.getUsers();
            setUsers(users);
            return users;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch users');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getUserById = useCallback(async (userId: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const user = await authApi.getUser(userId);
            setCurrentUser(user);
            return user;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch user');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = async () => {
        await authApi.logout()
        router.push('/login')
    }

    return {
        login,
        signup,
        logout,
        isLoading,
        error,
        currentUser,
        getUserById,
        users,
        getUsers,
    }
}