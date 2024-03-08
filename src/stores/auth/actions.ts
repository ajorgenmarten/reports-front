
import { toast } from "react-toastify"
import { AuthState } from "."
import { Response } from "../../libs/http"

export const auth = (state: AuthState, response: Response) => {
    if ( response.success ) {
        state.isAuth = true
        state.token = response.data.accessToken
    }

    return state
}

export const refresh = (state: AuthState, response: Response) => {
    if ( !response.success ) {
        state.isAuth = false
        state.token = undefined
    } else {
        state.token = response.data.accessToken
    }
    return state
}

export const logout = (state: AuthState, response: Response) => {
    if ( response.success ) {
        return { isAuth: false, token: undefined }
    }
    toast.error(response.message)
    return state
}

export const me = (state: AuthState, response: Response) => {
    if ( !response.success ) {
        state.isAuth = false
        state.token = undefined
        state.me = undefined
    } else {
        state.me = response.data
    }
    return state
}