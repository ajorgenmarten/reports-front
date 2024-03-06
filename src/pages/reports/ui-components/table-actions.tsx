import { useState } from "react"
import { Link } from "react-router-dom"
import { Response, useFetcher } from "../../../libs/http"
import { toast } from "react-toastify"

export const TableActions = (props: ActionsProps) => {
    const [completed, setCompleted] = useState(props.row.status)
    const { fetcher } = useFetcher()

    const handleComplete = async () => {
        const response = await fetcher('/reports/complete/'+props.row._id, "put") as Response
        if ( response.success ){ setCompleted(true); props.render() }
        else toast.error(response.message)
    } 

    const handleDelete = async () => {
        const response = await fetcher('/reports/delete/'+props.row._id, "delete") as Response
        if ( response.success ) { props.render() }
        else toast.error(response.message)
    }

    return <div className="flex gap-1">
        <Link to={`/reports/detail/${props.row._id}`} className="btn btn-info btn-outline btn-xs">Ver</Link>
        { !completed && <button className="btn btn-success btn-xs btn-outline" onClick={handleComplete}>solucionar</button> }
        <button className="btn btn-error btn-xs" onClick={handleDelete}>borrar</button>
    </div>
}

interface ActionsProps {
    row: any
    render: () => void
}