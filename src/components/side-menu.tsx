import { Link } from 'react-router-dom'
import schema from '../schemas/side-menu.json'

interface LinkItem {
    headerText: string
    bootstrapIcon?: string
    children?: LinkItem[],
    link?: string
}

export const createListMenu = (items: LinkItem[]) => {
    return items.map(item => {
        if (item.children?.length) {
            return <li key={`menu-item-${item.headerText}-${Math.random() * 100}`}>
                <details open>
                    <summary>
                        {item.bootstrapIcon && <i className={item.bootstrapIcon}></i>} {item.headerText}
                    </summary>
                    <ul>
                        { createListMenu(item.children) }
                    </ul>
                </details>
            </li>
        } else {
            return <li key={`menu-item-${item.headerText}-${Math.random() * 100}`}>
                <Link to={item.link as string}> {item.headerText} </Link>
            </li>
        }
    })
}

export const SideMenu = () => {

    return <div className="h-[calc(100vh-67px)] w-80 hidden md:block p-2 grow overflow-auto">
        <ul className="menu menu-md bg-base-200 rounded-box mb-2">
            {createListMenu(schema)}
        </ul>
    </div>
}