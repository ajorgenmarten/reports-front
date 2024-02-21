import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../../components/input"
import { useFormik } from "formik"
import { loginState, loginValidation } from "./formik"
import { toast } from "react-toastify"
import { ResendAlert } from "../ui-components/resend-alert"
import { useAuthStore } from "../../../stores/auth"
import { Response, useFetcher } from "../../../libs/http"

export const Login = () => {
    const { fetching, fetcher } = useFetcher()
    const authDispatch = useAuthStore().dispatch
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: loginState,
        validationSchema: loginValidation,
        onSubmit: async (data) => {
            const response = await fetcher('/auth/login', "post", { body: data }) as Response
            if ( response.success ) {
                authDispatch('auth', response)
                toast.success("Bienvenido!")
                return navigate('/')
            }
            if (response.message == "Su cuenta no ha sido activada aun.") toast(<ResendAlert username={data.username}/>)
            else toast.error(response.message)
        }
    })
    
    return <form onSubmit={formik.handleSubmit} className="max-w-full prose p-3 w-full flex-col justify-items-center justify-center">
        <h1 className='text-center uppercase mb-2'>iniciar sesion</h1>
        <Input icon='at' label='Nombre de usuario o correo' type='text' placeholder='username | ejemplo@thaba.cu'  {...formik.getFieldProps('username')} error={formik.touched.username && formik.errors.username} />
        <Input icon='lock' label='Contraseña' type='password' placeholder='••••••••'  {...formik.getFieldProps('password')} error={formik.touched.password && formik.errors.password} />
        <p className='m-0 pt-5'><Link to='register' >Registrarme</Link></p>
        <p className='m-0'>He olvidado mi <Link to="forgot">contraseña</Link></p>
        <button type="submit" className="btn btn-success w-full mt-5 uppercase gap-2" disabled={fetching}>
            {fetching && <span className="loading loading-spinner loading-md"></span>}
            continuar
        </button>
    </form>
}