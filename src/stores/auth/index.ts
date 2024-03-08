
import * as actions from "./actions";
import { createStore } from "../../libs/store";
import { User } from "../../pages/auth/partials/types";

export interface AuthState {
    isAuth: boolean
    token?: string
    me?: User
}

const initialState: AuthState = {
    isAuth: false,
}

export const useAuthStore = createStore(initialState, actions, 'auth')
