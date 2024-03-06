import { RouteObject } from "react-router-dom"
import { Create } from "./partials/create"
import { Seed } from "./partials/seed"
import { List } from "./partials/list"
import { Detail } from "./partials/detail"

const router: RouteObject = {
    path: 'reports',
    children: [
        {
            index: true,
            element: <List />
        },
        {
            path: 'add',
            element: <Create />
        },
        {
            path: 'seed',
            element: <Seed />
        },
        {
            path: 'detail/:id',
            element: <Detail />
        }
    ]
}

export default router