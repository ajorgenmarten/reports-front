export interface ReportData {
    title: string
    description: string
    seed?: string
    module?: string
    department?: string
    type?: 'normal' | 'versat_lic' | 'versat_db'
}