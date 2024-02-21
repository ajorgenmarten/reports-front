import { useEffect, useState } from "react"
import { Response, useFetcher } from "../../../libs/http"

export const List = () => {
    const {fetcher} = useFetcher()
    const [response, setResponse] = useState<any[]>([])

    useEffect(() => {
        (fetcher('/reports/my-reports') as Promise<Response>)
        .then(res => setResponse(res.data.items))
    }, [])
    
    
    return <div className="p-2 h-full">
        {response.map(item => <div className="card" key={item._id}>{item.author.name} {item.title} {item.status}</div>)}
    </div> 
}
