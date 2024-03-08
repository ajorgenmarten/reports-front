import { Link } from "react-router-dom"
import { Response, useFetcher } from "../../../libs/http"
import { toast } from "react-toastify"

export const TableActions = (props: ActionsProps) => {
    const { fetcher } = useFetcher()

    const handleDelete = async () => {
        const response = await fetcher('/reports/delete/' + props.row._id, "delete") as Response
        if (response.success) { props.render() }
        else toast.error(response.message)
    }

    return <div className="flex gap-1">
        <Link to={`/reports/detail/${props.row._id}`} className="btn btn-info btn-outline btn-xs">Ver</Link>
        <button className="btn btn-error btn-xs" onClick={handleDelete}>borrar</button>
    </div>
}

interface ActionsProps {
    row: any
    render: () => void
}