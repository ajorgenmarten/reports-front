import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../../components/input"
import { useFormik } from "formik"
import { forgotState, forgotValidation } from "./formik"
import { toast } from "react-toastify"
import { Response, useFetcher } from "../../../libs/http"

export const Forgot = () => {
    const { fetcher, fetching} = useFetcher()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: forgotState,
        validationSchema: forgotValidation,
        onSubmit: async (data) => {
            const response = await fetcher('/auth/forgot', 'post', { body: data }) as Response
            if(response.success) {
                return navigate('../success')
            }
            toast.error(response.message)
        }
    })
    return <form onSubmit={formik.handleSubmit} className="max-w-full prose p-3 w-full flex-col justify-items-center justify-center">
        <h1 className='text-center uppercase mb-2'>Recuperar</h1>
        <Input icon='at' label='Nombre de usuario o correo' classcomponent="mt-10" type='text' {...formik.getFieldProps('username')} error={ formik.touched.username && formik.errors.username } placeholder='username | example@email.com' />
        <p className='m-0 pt-5'><Link to='../register' >Registrarme</Link></p>
        <p className='m-0'><Link to="../">Iniciar sesión</Link></p>
        <button type="submit" className="btn btn-success w-full mt-5 uppercase gap-2" disabled={fetching}>
            {fetching && <span className="loading loading-spinner loading-md"></span>}
            continuar
        </button>
    </form>
}