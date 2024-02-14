import { Link } from "react-router-dom"

export const Success = () => {
    return <div className="max-w-full prose p-3 w-full flex-col justify-items-center justify-center">
        <h1 className="text-center">Completado</h1>
        <span>Se ha enviado un correo a su dirección para completar la operación.</span>
        <Link to="../" className="btn btn-info w-full uppercase mt-10">Iniciar sesión</Link>
    </div>
}