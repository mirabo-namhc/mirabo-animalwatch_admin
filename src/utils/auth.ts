import { IAuth } from '~/types'
import { AUTH_LOCAL_STORAGE_KEY } from '~constants/auth'
import { APP_ROUTE_URL } from '~constants/endpoint'

const getAuth = (key: string = AUTH_LOCAL_STORAGE_KEY): IAuth | undefined => {
    if (!localStorage) {
        return
    }

    const lsValue: string | null = localStorage.getItem(key)

    if (!lsValue) {
        return
    }
    try {
        const auth = JSON.parse(lsValue) as IAuth
        if (auth) {
            // You can easily check auth_token expiration also
            return auth
        }
    } catch (error) {
        console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
    }
}

const removeAuth = () => {
    if (!localStorage) {
        return
    }

    try {
        localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
    } catch (error) {
        console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
    }
}

const setAuth = (auth: IAuth | undefined) => {
    if (!localStorage) {
        return
    }

    try {
        const lsValue = JSON.stringify(auth)
        localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
    } catch (error) {
        console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
    }
}

const logout = () => {
    if (window.location.pathname !== APP_ROUTE_URL.LOGIN) {
        localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
    }
}

const getSessionStorage = (key: string): any => {
    if (!sessionStorage) {
        return
    }

    const lsValue: string | null = sessionStorage.getItem(key)

    if (!lsValue) {
        return
    }

    try {
        const auth: any = JSON.parse(lsValue)

        if (auth) {
            return auth
        }
    } catch (error) {
        console.error('AUTH SESSION STORAGE PARSE ERROR', error)
    }
}

const removeSessionStorage = (key: string) => {
    if (!sessionStorage) {
        return
    }

    try {
        sessionStorage.removeItem(key)
    } catch (error) {
        console.error('AUTH SESSION STORAGE PARSE ERROR', error)
    }
}

export { getAuth, setAuth, removeAuth, logout, getSessionStorage, removeSessionStorage }
