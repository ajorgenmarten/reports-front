import { createBrowserRouter, RouterProvider } from "react-router-dom";
import authRouter from './pages/auth'
import dashboradRouter from './pages/dashboard'
import reportsRouter from "./pages/reports"
import { Layout } from "./components/layout";
import { Authorized } from "./components/authorized";

const router = createBrowserRouter([
    authRouter,
    {
        path: '/',
        element: <Authorized><Layout /></Authorized>,
        children: [
            dashboradRouter,
            reportsRouter
        ]
    }
])

const Router = () => <RouterProvider router={router}/>

export default Router