export interface LoginResponse {
    code: number
    status: string
    message: string
    data?: {
        id: string
        name: string
        surname: string
        email: string
        username: string
        accessToken: string
    }
}