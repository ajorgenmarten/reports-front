import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Response, useFetcher } from "../../../libs/http"
import { ReportData } from "./types"
import { TextArea } from "../../../components/input"
import { useFormik } from "formik"
import { reportSolution } from "./formik"
import { toast } from "react-toastify"

export const Solution = () => {
    const { id } = useParams()
    const {fetcher} = useFetcher()
    const navigate = useNavigate()
    const [report, setReport] = useState<ReportData|undefined>()

    const getReport = async () => {
        const response = await fetcher('/reports/details/' + id) as Response
        setReport(response.data)
    }

    const solve = async (data: any) => {
        const response = await fetcher('/reports/solution/'+id, "put", {
            body: data
        }) as Response
        if (response.success) { 
            navigate('/reports/detail/'+id)
            toast(response.message, { type: 'success' })
        }
        else toast(response.message, { type: 'error' })
    }

    const formik = useFormik({
        initialValues: { solution: report?.solution },
        validationSchema: reportSolution,
        onSubmit: solve
    })

    useEffect(() => {
        getReport()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <form className="flex flex-col h-full p-2 gap-2" onSubmit={formik.handleSubmit}>
        <h1>Solucionar reporte de <b> { report?.author?.name ?? '👻 Cuenta eliminada...' } </b> </h1>
        <span>Asunto: `` { report?.title } ``</span>
        <button className="btn btn-success btn-sm w-fit" type="submit"> <i className="bi bi-send"></i>Enviar </button>
        <TextArea classcomponent="flex-grow" className="resize-none" placeholder="Escribe aquí la solución ..." {...formik.getFieldProps('solution')} error={formik.touched.solution && formik.errors.solution} />
    </form>
}