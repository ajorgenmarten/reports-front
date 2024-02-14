import { RouteObject } from "react-router-dom";
import { Base } from "./partials/base";
import { Login } from "./partials/login";
import { Register } from "./partials/register";
import { Forgot } from "./partials/forgot";
import { Resend } from "./partials/resend";
import { Success } from "./partials/success";
import { Active } from "./partials/active";
import { ChangePassword } from "./partials/change-password";
import { NotLogged } from "../../components/authorized";

const router: RouteObject = {
    path: 'auth',
    element: <NotLogged><Base /></NotLogged>,
    children: [
        {
            index: true,
            element: <Login />
        },
        {
            path: 'register',
            element: <Register />
        },
        {
            path: 'forgot',
            element: <Forgot />
        },
        {
            path: 'resend',
            element: <Resend />
        },
        {
            path: 'success',
            element: <Success />
        },
        {
            path: 'active',
            element: <Active />
        },
        {
            path: 'change-password',
            element: <ChangePassword />
        }
    ]
}

export default router