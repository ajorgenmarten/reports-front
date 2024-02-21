import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Response, useFetcher } from "../../../libs/http"

export const Active = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const code = new URLSearchParams(location.search).get('code')
    
    const {fetching, fetcher} = useFetcher()
    const [response, setResponse] = useState<Response>({success: false})
    const [token] = useState(code)
    
    
    useEffect(() => {
        if (!token) navigate('../auth')
        else fetcher('/auth/active?code='+token)
            .then(response => {
                setResponse(response as Response)
            })
            
    }, [token,navigate])
    
    return <div className="max-w-full prose p-3 w-full flex-col justify-items-center justify-center">
        {fetching ? <Waitting /> : <Complete {...response} />}
    </div> 
}

const Waitting = () => {
    return <h1> <span className="loading loading-spinner loading-md"></span> Espere...</h1>
}

const Complete = (props: Response) => {
    return (
        <>
            <h1 className="text-center">{props.success ? 'Cuenta activada' : 'Error al activar la cuenta.'}</h1>
            <span>{props.message}</span>
            <Link to="../" className="btn btn-info w-full uppercase mt-10">ir a inicio</Link>
        </>
    )
}
