import { IUserData } from "."

export interface IAuth {
    api_token: string
    refreshToken?: string
    user?: IUserData
    token?: string
}

export interface IAuthState {
    isLoggedIn: boolean
    logging: boolean
    loadingRegister: boolean
    userData?: IUserData
}

export interface ILoginPayload {
    email: string
    password: string
}

export interface IRegisterPayload {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    acceptTerms?: boolean
}

export interface IResponseAuth<T> {
    data: {
        token?: string
        user: T
    }
    status?: string
    statusText?: string
    message?: string
}