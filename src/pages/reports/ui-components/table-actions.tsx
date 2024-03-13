import { Link } from "react-router-dom"
import { Response, useFetcher } from "../../../libs/http"
import { toast } from "react-toastify"
import { useAuthStore } from "../../../stores/auth"

export const TableActions = (props: ActionsProps) => {
    const authStore = useAuthStore()
    const { fetcher } = useFetcher()

    const handleDelete = async () => {
        const response = await fetcher('/reports/delete/' + props.row._id, "delete") as Response
        if (response.success) { props.render() }
        else toast.error(response.message)
    }

    return <div className="flex gap-1 justify-end w-full">
        <Link to={`/reports/detail/${props.row._id}`} className="btn btn-info btn-outline btn-xs">Ver</Link>
        { authStore.me?.role == "admin" && !props.row.status && <Link to={'/reports/solution/' + props.row._id} className="btn btn-success btn-xs">solucionar</Link> }
        <button className="btn btn-error btn-xs" onClick={handleDelete}>borrar</button>
    </div>
}

interface ActionsProps {
    row: any
    render: () => void
}