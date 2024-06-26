import { Link } from 'react-router-dom'
import schema from '../schemas/side-menu.json'
import { useAuthStore } from '../stores/auth'
import { User } from '../pages/auth/partials/types'

export interface LinkItem {
    headerText: string
    bootstrapIcon?: string
    children?: LinkItem[],
    link?: string
    roles?: ("user"|"admin")[]
}

export const RenderMenuList = ({items}: {items: LinkItem[]}) => {
    const state = useAuthStore()
    return items.map(item => {
        const key = `menu-item-${item.headerText.toUpperCase()}-${Math.random() * 100}`
        if (item.roles && !item.roles.includes(state.me?.role as User['role'])) return <></>
        if (item.children?.length) {
            return <li key={key}>
                <details open>
                    <summary>
                        {item.bootstrapIcon && <i className={item.bootstrapIcon}></i>} {item.headerText}
                    </summary>
                    <ul>
                        <RenderMenuList items={item.children} />
                    </ul>
                </details>
            </li>
        } else {
            return <li key={key}>
                <Link to={item.link as string}> {item.headerText} </Link>
            </li>
        }
    })
}

export const SideMenu = () => {

    return <div className="h-[calc(100vh-67px)] w-80 hidden md:block p-2 grow overflow-auto">
        <ul className="menu menu-md bg-base-200 rounded-box mb-2">
            <RenderMenuList items={(schema as LinkItem[])} />
        </ul>
    </div>
}