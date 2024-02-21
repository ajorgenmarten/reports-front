import { Link } from "react-router-dom"
import { Response, useFetcher } from "../libs/http"
import { useAuthStore } from "../stores/auth"

export const Navbar = () => {
    const { fetcher } = useFetcher()
    const { dispatch } = useAuthStore()

    const handleLogout:React.MouseEventHandler<HTMLAnchorElement> = async (e) => {
        e.preventDefault()
        const response = await fetcher('/auth/logout', "delete") as Response
        dispatch("logout", response)
    }
    return <div className="navbar bg-base-100 border-b-[1px]">
        <div className="flex-none md:hidden">
            <label htmlFor="drawer" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
        </div>
        <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl uppercase">reportes</Link>
        </div>
        <div className="flex-none">
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
                    <li>
                        <a className="justify-between">Perfil</a>
                    </li>
                    <li><a onClick={handleLogout}>Salir</a></li>
                </ul>
            </div>
        </div>
    </div>
}