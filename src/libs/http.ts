type ContentTypes = "json" | "urlencoded" | "multipart"
export type Response<T = any> = {
    success: boolean
    data?: T
    message?: string
    status?: number
}

const URLENCODED = "application/x-www-form-urlencoded"
const MULTIPART = "multipart/form-data"
const JSONENCODED = "application/json"

interface FetcherConfig {
    method?: "get" | "post" | "put" | "delete"
    contentType?: ContentTypes
    body?: any
    headers?: Headers
    baseUrl?: string
}

class Fetcher implements FetcherConfig {
    private defaults: FetcherConfig
    method?: FetcherConfig['method']
    contentType?: ContentTypes
    content? = URLENCODED
    body?: any
    headers = new Headers()
    baseUrl?: string

    constructor(defaultConfigs: FetcherConfig = {
        method: "get",
        contentType: "urlencoded",
        body: undefined,
        headers: new Headers(),
    }) {
        this.setDefaults(defaultConfigs)
        this.defaults = defaultConfigs
        if (this.baseUrl && !/^(http|https):\/\//.test(this.baseUrl)) throw new Error(`Incorrect url base (${this.baseUrl})`)
    }

    private setDefaults(defaultConfigs: FetcherConfig) {
        this.defaults = defaultConfigs
        this.setContentType(defaultConfigs.contentType)
        this.method = defaultConfigs.method
        this.setHeaders(defaultConfigs.headers ?? new Headers())
        this.data(defaultConfigs.body)
        this.baseUrl = defaultConfigs.baseUrl
    }

    get() { this.method = "get"; return this }
    post() { this.method = "post"; return this }
    put() { this.method = "put"; return this }
    delete() { this.method = "delete"; return this }

    setContentType(type?: ContentTypes) {
        switch (type) {
            case "urlencoded":
                this.content = URLENCODED
                break;
            case "json":
                this.content = JSONENCODED
                break
            case "multipart":
                this.content = MULTIPART
                break;
            default:
                throw new Error("Invalid Content-Type")
        }
        return this
    }
    data(data: any) {
        switch (this.content) {
            case JSONENCODED:
                this.body = JSON.stringify(data)
                break;
            case MULTIPART:
                this.body = new FormData(data)
                break;
            case URLENCODED:
                this.body = new FormData(data)
        }
        return this
    }
    auth(token: string) {
        this.headers.set('authorization', `Bearer ${token}`)
        return this
    }
    /**
     * Establecer cabeceras
     * @param {HeadersInit} init Configuracion de cabecera
     */
    setHeaders(init: Headers) {
        this.headers = init
        return this
    }
    private addToBase(url: URL | RequestInfo) {
        if (!this.baseUrl) return url
        if (this.baseUrl.endsWith('/')) this.baseUrl = this.baseUrl.slice(0, -1)
        if (url.toString().startsWith('/')) url = url.toString().slice(1)
        return `${this.baseUrl}/${url}`
    }
    async fetch<T = any>(url: URL | RequestInfo = '/'): Promise<Response<T>> {
        try {
            this.headers.set('Content-Type', this.content as string)

            const request = await fetch(this.addToBase(url), {
                credentials: "include",
                body: this.body,
                method: this.method,
                headers: this.headers
            })
            
            this.setDefaults(this.defaults)

            const response = await request.json() as Response<T>

            return response

        } catch (e: any) {
            return {
                success: false,
                message: e.message
            } as Response
        }
    }
}

export const fetcher = new Fetcher({
    contentType: "json",
    baseUrl: import.meta.env.VITE_BACKEND_URL,
})