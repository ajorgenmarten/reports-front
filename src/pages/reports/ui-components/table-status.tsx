export const TableStatus = ({status}: {status: boolean}) => {
    return <div className={`badge badge-md ${status ? 'badge-success' : 'badge-error'}`}> { status ? "Solucionado" : "No solucionado" } </div>
}