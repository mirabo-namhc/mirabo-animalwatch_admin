export interface IErrorAPI {
    response: {
        data: {
            error?: string
            message: string
            success?: boolean
        }

        [key: string]: any
    }
}