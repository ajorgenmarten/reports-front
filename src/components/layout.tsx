import { Outlet } from "react-router-dom"
import { Container } from "./container"
import { Navbar } from "./navbar"
import { SideMenu } from "./side-menu"

export const Layout = () => {
    return <Container>
        <Navbar />
        <div className="flex">
            <SideMenu />
            <div className="w-full md:w-[calc(100vw-20rem)] h-[calc(100vh-67px)] overflow-y-auto">
                <Outlet />
            </div>
        </div>
    </Container>
}