import { Drawer } from "./drawer"

export const Container = ({children}: ContainerProps) => {
    return <Drawer>
        {children}
    </Drawer>
}

interface ContainerProps {
    children: React.ReactNode
}