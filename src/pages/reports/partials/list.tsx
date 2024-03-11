import { useEffect, useState } from "react"
import { ThemeProvider, createTheme } from "@mui/material"
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid"
import { Response, useFetcher } from "../../../libs/http"
import { TableStatus } from "../ui-components/table-status"
import { TableActions } from "../ui-components/table-actions"

export const List = () => {    
    return <div className="p-2 h-full">
        <PaginationDemo />
    </div> 
}

export const PaginationDemo = () => {
    const { fetcher, fetching } = useFetcher()
    const [rowCount, setRowState] = useState(0)
    const [data, setData] = useState([])
    const [pagination, setPagination] = useState({page:0, pageSize: 50})

    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
    
    const muitheme = createTheme({
        palette: {
            mode: theme
        }
    })

    const columns: GridColDef[] = [
        { field: "author", headerName: "Autor", width: 240, valueGetter: params => params.row.author.name },
        { field: "title", headerName: "Titulo", minWidth: 180 },
        { field: "description", headerName: "Descripcion", minWidth: 180 },
        { field: "status", headerName: "Estado", filterable: false, minWidth: 140, renderCell: (params) => <TableStatus status={params.row.status} /> },
        { field: "type", headerName: "Tipo de reporte", filterable: false, minWidth: 140 },
        { field: "solution", headerName: "Solución", width: 200, sortable: false, valueGetter: params => params.row.solution ? params.row.solution : '-' },
        { field: "createdAt", headerName: "Fecha", minWidth: 150 },
        { field: "actions", headerName: "", minWidth: 120, sortable: false, filterable: false, renderCell: params => <TableActions row={params.row} render={getdata}/>},
    ]

    const getdata = async(page: number = 0) => {
        const response = await fetcher(`/reports/my-reports?page=${page}`)
        const { data } = response as Response
        setData( data.reports )
        setRowState( data.pagination.totalRegisters )
        const pagination: GridPaginationModel = { page: data.pagination.current, pageSize: 50 }
        setPagination(pagination)
    }

    useEffect(() => {
        getdata()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handlePagination = (model: any) => {
        getdata(model.page)
    }

    return <ThemeProvider theme={muitheme}>
        <DataGrid rowCount={rowCount}
                paginationModel={pagination} 
                loading={fetching} 
                rows={data} 
                columns={columns} 
                paginationMode="server" 
                onPaginationModelChange={handlePagination}
                getRowId={(row) => row._id}
                rowSelection={false}/>
    </ThemeProvider> 

}