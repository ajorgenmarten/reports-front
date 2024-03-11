import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Response, useFetcher } from "../../../libs/http"
import { ReportData } from "./types"
import { toast } from "react-toastify"

export const Detail = () => {
    const { id } = useParams()
    const { fetcher } = useFetcher()
    const [report, setReport] = useState< ReportData | null >(null)
    const navigate = useNavigate()

    const getReoprt = async () => {
        const response = await fetcher('/reports/details/'+id) as Response
        if ( !(response).success ) {
            toast.error(response.message)
            return navigate('/')
        }
        setReport((response).data)
    }

    useEffect(() => {
        getReoprt()
    }, [])

    return <div className="p-2 h-full flex flex-col gap-2">
        <h1 className="text-2xl"> 
            <b> {report?.title} </b> 
            <div className={`badge badge-xl ${report?.status ? "badge-success" : "badge-error"} `}> { report?.status ? 'Solucionado' : 'No solucionado aun' } </div>
        </h1>
        { report?.type == "versat_lic" && <h3> Licencia de <b> { report.module } </b>, { report.department } </h3> }
        <h3> <b> Enviado por: </b> {report?.author.name} </h3>
        { report?.seed && <span className="whitespace-nowrap break-words"> Semilla: <b className="break-words"> {report.seed} </b> </span> }
        <h3> <b> Descripcion: </b>  </h3>
        <textarea className="textarea border border-gray-700 min-h-52 text-lg" value={report?.description} readOnly></textarea>
        { report?.solution && 
            <>
                <h3> <b> Solucion: </b> </h3>
                <textarea className="textarea border border-gray-700 text-lg" value={report?.solution} readOnly></textarea> 
            </> }
    </div>
}