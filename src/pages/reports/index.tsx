import { RouteObject } from "react-router-dom"
import { Create } from "./partials/create"

const router: RouteObject = {
    path: 'reports',
    children: [
        {
            index: true,
            element: <Create />
        }
    ]
}

export default router