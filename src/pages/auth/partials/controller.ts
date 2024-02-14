import { fetcher } from "../../../libs/http";
import { ChangePwdData, ForgotData, LoginData, RegisterData } from "./types";

export const register = async (data: RegisterData) => await fetcher.post().data(data).fetch('/auth/register')

export const login = async (data: LoginData) => await fetcher.post().data(data).fetch('/auth/login')

export const active = async (token: string) => await fetcher.fetch(`/auth/active?code=${token}`)

export const forgot = async (data: ForgotData) => await fetcher.post().data(data).fetch('/auth/forgot')

export const changePassword = async (data: ChangePwdData & { code: string }) => await fetcher.post().data(data).fetch('/auth/change-password')

export const resendCode = async ( data: ForgotData ) => await fetcher.post().data(data).fetch('/auth/resend-code')