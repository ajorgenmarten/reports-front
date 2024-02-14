import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Input } from "../../../components/input"
import { useFormik } from "formik"
import { ChangeValidation, changePwdState } from "./formik"
import { changePassword } from "./controller"
import { toast } from "react-toastify"
import { ResendAlert } from "../ui-components/resend-alert"

export const ChangePassword = () => {
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()
    const token = new URLSearchParams( useLocation().search ).get('code') ?? ''

    const formik = useFormik({
        initialValues: changePwdState,
        validationSchema: ChangeValidation,
        onSubmit: async (data) => {
            setSubmitting(true)
            const response = await changePassword( { ...data, code: token} )
            if ( response.success )
                toast.success(response.message)
            else if ( response.message == "Su cuenta no ha sido activada aun." )
                toast(<ResendAlert username={response.data.username}/>)
            else
                toast.error(response.message)
            setSubmitting(false)
            navigate('../')
        }
    })

    if ( !token ) navigate('../')

    
    return <form onSubmit={formik.handleSubmit} className="max-w-full prose p-3 w-full flex-col justify-items-center justify-center">
        <h1 className='text-center uppercase mb-2'>Cambiar contraseña</h1>
        <Input icon='at' label='Contraseña' type='password' placeholder='••••••••'  {...formik.getFieldProps('password')} error={formik.touched.password && formik.errors.password} />
        <Input icon='lock' label='Repetir contraseña' type='password' placeholder='••••••••'  {...formik.getFieldProps('rpassword')} error={formik.touched.rpassword && formik.errors.rpassword} />
        <p className='m-0 pt-5'><Link to='../register' >Registrarme</Link></p>
        <p className='m-0'><Link to="../">Iniciar sesión</Link></p>
        <button type="submit" className="btn btn-success w-full mt-5 uppercase gap-2" disabled={submitting}>
            {submitting && <span className="loading loading-spinner loading-md"></span>}
            continuar
        </button>
    </form>
}