import { ReportData } from "./types";
import * as Yup from 'yup'

export const reportState: Partial<ReportData> = {
    title: "",
    description: "",
    type: "normal"
}

export const reportValidation = Yup.object({
    title: Yup.string().required("Es obligatorio ponerle un asunto")
})

export const reportSeedState: Partial<ReportData> = {
    title: "versat licencia",
    description: "",
    module: "",
    seed: "",
    department: "",
    type: "versat_lic"
}

export const reportSeedValidation = Yup.object({
    title: Yup.string().required("Es obligatorio"),
    module: Yup.string().required("Es obligatorio"),
    seed: Yup.string().required("Es obligatorio"),
    department: Yup.string().required("Es obligatorio")
})