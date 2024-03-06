import { User } from "../../auth/partials/types"

export interface ReportData {
    author: User
    title: string
    description: string
    seed?: string
    module?: string
    department?: string
    type?: 'normal' | 'versat_lic' | 'versat_db'
}