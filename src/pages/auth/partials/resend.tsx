import { Link, useLocation, useNavigate } from "react-router-dom"
import { Input } from "../../../components/input"
import { useFormik } from "formik"
import { resendValidation } from "./formik"
import { useEffect } from "react"

export const Resend = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const email = new URLSearchParams(location.search).get('email') || ''

    useEffect(() => {
        if ( !email ) navigate('auth')
    })

    const formik = useFormik({
        initialValues: { email },
        validationSchema: resendValidation,
        onSubmit: () => {}
    })


    return <form onSubmit={formik.handleSubmit} className="max-w-full prose p-3 w-full flex-col justify-items-center justify-center">
        <h1 className='text-center uppercase mb-2'>Reenviar codigo</h1>
        <Input icon='at' label='Correo' type='email' placeholder='ejemplo@thaba.cu' {...formik.getFieldProps('email')} error={formik.errors.email} disabled/>
        <p className='m-0 pt-5'><Link to='register' >Registrarme</Link></p>
        <p className='m-0'>He olvidado mi <Link to="../">Login</Link></p>
        <button className='btn btn-success w-full mt-5 uppercase'>reenviar</button>
    </form>
}