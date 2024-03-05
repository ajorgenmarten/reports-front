export const TableStatus = ({status}: {status: boolean}) => {
    return <div className={`badge badge-md badge-${status ? 'success' : 'error'}`}> { status ? "Solucionado" : "No solucionado" } </div>
}