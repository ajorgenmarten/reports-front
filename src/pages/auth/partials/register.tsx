import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../../components/input"
import { useFormik } from "formik"
import { registerState, registerValidation } from "./formik"
import { register } from "./controller"
import { toast } from "react-toastify"
import { useState } from "react"

export const Register = () => {
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    const formik = useFormik({
        validationSchema: registerValidation,
        initialValues: registerState,
        onSubmit: async (data) => {
            setSubmitting(true)
            const response = await register(data)
            if ( response.success ) {
                return navigate('../success')
            }
            toast.error(response.message)
            setSubmitting(false)
        }
    })

    return <form action="" className="max-w-full prose p-3 w-full flex-col items-center h-full overflow-y-auto" onSubmit={formik.handleSubmit}>
        <h1 className='text-center uppercase mb-2'>registrarse</h1>
        <Input icon='person' label='Nombre' placeholder='Nombre completo' {...formik.getFieldProps('name')} error={ formik.touched.name && formik.errors.name }/>
        <Input icon='person' label='Nombre de usuario' placeholder='Nombre de usuario' {...formik.getFieldProps('username')} error={ formik.touched.username && formik.errors.username }/>
        <Input icon='at' label='Correo' type='email' placeholder='Correo' {...formik.getFieldProps('email')} error={ formik.touched.email && formik.errors.email }/>
        <Input icon='lock' label='Contraseña' placeholder='••••••••' type="password" {...formik.getFieldProps('password')} error={ formik.touched.password && formik.errors.password }/>
        <p className='m-0 pt-5'><Link to='../' >Iniciar sesión</Link></p>
        <button type="submit" className="btn btn-success w-full mt-5 uppercase gap-2" disabled={submitting}>
            {submitting && <span className="loading loading-spinner loading-md"></span>}
            continuar
        </button>
    </form>
}