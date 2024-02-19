import { useFormik } from "formik"
import { Input, TextArea } from "../../../components/input"
import { reportState, reportValidation } from "./formik"
import { fetcher } from "../../../libs/http"
import { useAuthStore } from "../../../stores/auth"
import { toast } from "react-toastify"

export const Create = () => {
    const authStore = useAuthStore()

    const formik = useFormik({
        initialValues: reportState,
        validationSchema: reportValidation,
        onSubmit: async (data, helpers) => {
            const response = await fetcher.post()
                .setContentType('json')
                .data(data)
                .auth(authStore.token as string)
                .fetch('/reports/create')
            helpers.resetForm()
            toast(response.message, {type: response.success ? "success" : "error"})
        }
    })
    return <div className="pt-4 h-full">
        <form action="" onSubmit={formik.handleSubmit} className="w-full h-full flex flex-col px-2 pb-2">
            <div className="flex gap-2">
                <Input label="Asunto" placeholder="Escribe aquí" classcomponent="mb-2" {...formik.getFieldProps('title')} error={formik.touched.title && formik.errors.title} />
                <button className="btn self-start mt-9 btn-success text-base-100">Enviar</button>
            </div>
            <TextArea classcomponent="flex-grow" className="resize-none" placeholder="Escribe aquí la descripcion ..." {...formik.getFieldProps('description')} />
        </form>
    </div>
}