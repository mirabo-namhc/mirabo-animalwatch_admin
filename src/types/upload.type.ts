export interface IResponseApiUpload {
    data?: IDataFile
    code?: string
    message?: string
}

export interface IDataFile {
    path?: string
    url?: string
}