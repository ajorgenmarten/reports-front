
import * as actions from "./actions";
import { createStore } from "../../libs/store";

export interface AuthState {
    isAuth: boolean
    token?: string
}

const initialState: AuthState = {
    isAuth: false,
}

export const useAuthStore = createStore(initialState, actions, 'auth')
