import { Link } from "react-router-dom"

export const TableActions = (props: ActionsProps) => {
    return <div className="flex gap-1">
        <Link to={`/reports/detail/${props.row._id}`} className="btn btn-info btn-outline btn-xs">Ver</Link>
        <button className="btn btn-success btn-xs btn-outline">solucionar</button>
        <button className="btn btn-error btn-xs">borrar</button>
    </div>
}

interface ActionsProps {
    row: any
}