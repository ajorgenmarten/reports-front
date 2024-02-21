import { toast } from "react-toastify"
import { ForgotData } from "../partials/types"
import { Response, useFetcher } from "../../../libs/http"

export const ResendAlert = ({username}: ForgotData) => {
    const { fetcher } = useFetcher()
    const resend = async () => {
        const response = await fetcher('/auth/resend-code', 'post', { body: {username} }) as Response
        if (response.success) toast.success(response.message)
        else toast.error(response.message)
    }
    return <div className="flex items-center justify-between">
        <span>Reenviar codigo de activacion</span>
        <button className="btn btn-sm btn-primary" onClick={resend}>Si</button>
    </div>
}