import { ReportData } from "./types";
import * as Yup from 'yup'

export const reportState: ReportData = {
    title: "",
    description: "",
    type: "normal"
}

export const reportValidation = Yup.object({
    title: Yup.string().required("Es obligatorio ponerle un asunto")
})