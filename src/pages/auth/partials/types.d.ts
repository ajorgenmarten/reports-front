export interface LoginData {
    username: string
    password: string
}

export interface RegisterData {
    name: string
    username: string
    email: string
    password: string
}

export interface ForgotData {
    username: string
}

export interface ChangePwdData {
    password: string
    rpassword: string
}