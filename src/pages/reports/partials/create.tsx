import { useFormik } from "formik"
import { Input, TextArea } from "../../../components/input"
import { reportState, reportValidation } from "./formik"
import { Response, useFetcher } from "../../../libs/http"
import { toast } from "react-toastify"

export const Create = () => {
    const {fetcher} = useFetcher()

    const formik = useFormik({
        initialValues: reportState,
        validationSchema: reportValidation,
        onSubmit: async (data, helpers) => {
            const response = await fetcher('/reports/create', "post", { body: data }) as Response
            helpers.resetForm()
            toast(response.message, {type: response.success ? "success" : "error"})
        }
    })
    return <div className="pt-4 h-full">
        <form action="" onSubmit={formik.handleSubmit} className="w-full h-full flex flex-col px-2 pb-2">
            <div className="flex gap-2">
                <Input label="Asunto" placeholder="Escribe aquí" classcomponent="mb-2" tabIndex={1} {...formik.getFieldProps('title')} error={formik.touched.title && formik.errors.title} />
                <button type="submit" className="btn self-start mt-9 btn-success text-base-100" tabIndex={3}>Enviar</button>
            </div>
            <TextArea classcomponent="flex-grow" className="resize-none" placeholder="Escribe aquí la descripcion ..." {...formik.getFieldProps('description')} tabIndex={2}/>
        </form>
    </div>
}