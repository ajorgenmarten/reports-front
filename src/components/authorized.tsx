import { Navigate } from "react-router-dom"
import { useAuthStore } from "../stores/auth"
import { useEffect } from "react"
import { Response, useFetcher } from "../libs/http"

export const Authorized = ({children}: AuthProps) => {
    const { fetcher } = useFetcher()
    const { dispatch, isAuth } = useAuthStore()

    const refreshToken = async () => {
        const response = await fetcher('/auth/refresh') as Response
        if(response.message != "Failed to fetch")
            dispatch('refresh', response)
    }

    const getMyProfile = async () => {
        const response = await fetcher('/auth/me') as Response
        if ( response.message != "Failed to fetch" )
            dispatch('me', response)
    }

    useEffect(() => {
        refreshToken()
        getMyProfile()
    }, [])

    useEffect(() => {
        const interval = setInterval(refreshToken, 1000 * 60 * 14.5)

        return () => clearInterval(interval)
    }, [])

    return isAuth ? children : <Navigate to='/auth' />
}

export const NotLogged = ({children}:AuthProps) => {
    const authState = useAuthStore()

    return !authState.isAuth ? children : <Navigate to='/' />
} 

interface AuthProps {
    children: React.ReactNode
}