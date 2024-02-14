import { createListMenu } from "./side-menu"
import schema from "../schemas/side-menu.json"
import { Link } from "react-router-dom"

export const Drawer = ({children}: DrawerProps) => {
    return <div className="drawer">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
            {children}
        </div>
        <div className="drawer-side">
            <label htmlFor="drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                <Link to='/' className="uppercase btn btn-ghost shadow">reports</Link>
                { createListMenu(schema) }
            </ul>
        </div>
    </div>
}

interface DrawerProps {
    children: React.ReactNode
}