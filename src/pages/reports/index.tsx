import { RouteObject } from "react-router-dom"
import { Create } from "./partials/create"
import { Seed } from "./partials/seed"

const router: RouteObject = {
    path: 'reports',
    children: [
        {
            index: true,
            element: <Create />
        },
        {
            path: 'seed',
            element: <Seed />
        }
    ]
}

export default router