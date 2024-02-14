import { Navigate } from "react-router-dom"
import { useAuthStore } from "../stores/auth"
import { useEffect } from "react"
import { fetcher } from "../libs/http"

export const Authorized = ({children}: AuthProps) => {
    const authState = useAuthStore()

    useEffect(() => {
        fetcher.fetch('/auth/refresh').then(response => authState.dispatch('refresh', response))
    }, [])

    useEffect(() => {
        const interval = setInterval(async () => {
            const response = await fetcher.fetch('/auth/refresh')
            authState.dispatch('refresh', response)
        }, 1000 * 60 * 14.5)

        return () => clearInterval(interval)
    }, [])

    return authState.isAuth ? children : <Navigate to='/auth' />
}

export const NotLogged = ({children}:AuthProps) => {
    const authState = useAuthStore()

    return !authState.isAuth ? children : <Navigate to='/' />
} 

interface AuthProps {
    children: React.ReactNode
}