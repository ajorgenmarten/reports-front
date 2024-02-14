import { toast } from "react-toastify"
import { resendCode } from "../partials/controller"
import { ForgotData } from "../partials/types"

export const ResendAlert = ({username}: ForgotData) => {
    
    const resend = async () => {
        const response = await resendCode({username})
        if (response.success) toast.success(response.message)
        else toast.error(response.message)
    }
    return <div className="flex items-center justify-between">
        <span>Reenviar codigo de activacion</span>
        <button className="btn btn-sm btn-primary" onClick={resend}>Si</button>
    </div>
}