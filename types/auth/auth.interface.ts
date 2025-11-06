export interface LoginData {
    email: string
    password: string
}

export interface User {
    id: string
    email: string
    name: string
    createdAt: string
    updatedAt: string
    is_active: boolean

}

export interface AuthResponse {
    success: boolean
    user: User
    token: string
    message: string
    timestamp: string
}



export interface SignupData {
    email: string
    password: string
    name: string
}