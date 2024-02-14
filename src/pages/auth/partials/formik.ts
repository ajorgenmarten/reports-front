import { ChangePwdData, ForgotData, LoginData, RegisterData } from "./types";
import * as Yup from 'yup'

export const registerState: RegisterData = {
    name: "",
    username: "",
    email: "",
    password: ""
}

export const registerValidation = Yup.object({
    name: Yup.string().min(3, "Mínimo 3 caracteres").max(150, "Máximo 150 caracteres").required("Es obligatorio"),
    username: Yup.string().matches(/^[a-z][a-z0-9_.]+$/, "Solo puede contener letras, numeros, punto y guión bajo").min(3, "Mínimo 3 caracteres").max(150, "Máximo 150 caracteres").required("Es obligatorio"),
    email: Yup.string().email("Debe ser una dirección de correo válida").required("Es obligatorio"),
    password: Yup.string().min(8, "Mínimo 8 caracteres").max(40, "Máximo 40 caracteres").required("Es obligatorio")
})

export const loginState: LoginData = {
    username: "",
    password: ""
}

export const loginValidation = Yup.object({
    username: Yup.string().required("Es obligatorio"),
    password: Yup.string().required("Es obligatorio")
})

export const resendValidation = Yup.object({
    email: Yup.string().email("Debe ser una dirección de correo válida").required("Es obligatorio")
})

export const forgotState: ForgotData = {
    username: ""
}

export const forgotValidation = Yup.object<ForgotData>({
    username: Yup.string().required("Es obligatorio")
})

export const changePwdState: ChangePwdData = {
    password: "",
    rpassword: ""
}

export const ChangeValidation = Yup.object({
    password: Yup.string().min(8, "Mínimo 8 caracteres").max(40, "Máximo 40 caracteres").required("Es obligatorio"),
    rpassword: Yup.string().oneOf([Yup.ref('password')], "No coincide")
})