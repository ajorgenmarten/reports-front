import { useCallback, useState } from "react"
import { useAuthStore } from "../stores/auth"

export type Response<T = any> = {
    success: boolean
    data?: T
    message?: string
    status?: number
}

interface FetcherOptions {
    contenttype?: "json" | "multipart" | "urlencoded"
    responsetype?: "json" | "text" | "html"
    body?: any
}

function getContentType(shortName: FetcherOptions['contenttype']) {
    switch (shortName) {
        case "json":
            return "application/json"
            break;
        case "multipart":
            return "multipart/form-data"
            break;
        case "urlencoded":
            return "application/x-www-form-urlencoded"
        default:
            throw new Error("Invalid Content-Type")
    }
}

function addToBase(url: string) {
    let backurl = import.meta.env.VITE_BACKEND_URL as string
    if (!backurl) return url
    if (backurl.endsWith('/')) backurl = backurl.slice(0, -1)
    if (url.startsWith('/')) url = url.slice(1)
    return `${backurl}/${url}`
}

export function useFetcher<T = any>() {
    const [fetching, setFetching] = useState(false)
    const { token: authorization } = useAuthStore()

    const fetcher = useCallback(async (url: string, method?: "get" | "post" | "put" | "delete", options?: FetcherOptions) => {
        setFetching(true)
        url = addToBase(url)
        const headers: HeadersInit = {}
        let bodyInit: BodyInit | undefined

        headers['Content-Type'] = options?.contenttype ? getContentType(options.contenttype) : getContentType("json")
        if (authorization) headers['authorization'] = `Bearer ${authorization}`

        if (!options?.contenttype) bodyInit = JSON.stringify(options?.body)
        else bodyInit = new FormData(options.body)

        try {
            const raw = await fetch(url, {
                method: method ?? "get",
                headers,
                credentials: "include",
                body: bodyInit
            })
            setFetching(false)

            switch (options?.responsetype) {
                case "html":
                    return await raw.formData() as FormData
                case "text":
                    return await raw.text() as string
                case "json":
                    return (await raw.json()) as Response<T>
                default:
                    return await raw.json() as Response<T>
            }
        } catch (error) {

            setFetching(false)
            
            return {
                success: false,
                message: (error as Error).message
            } as Response
        }

    }, [authorization])

    return { fetching, fetcher }
}