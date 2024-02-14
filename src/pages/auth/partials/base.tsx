import { Outlet } from 'react-router-dom'
import loginImage from '../../../assets/images/login.jpg'

export const Base = () => {
    return <main className="h-screen flex items-center justify-center p-5">
        <div className="rounded-xl shadow-2xl grid md:grid-cols-[auto,350px] w-[1000px] max-w-full transition-[height]">
            <img src={loginImage} alt="Imagen de icicio de sessin de thaba" className='hidden md:block object-cover rounded-lg h-full rounded-r-none'/>
            <div className='h-[550px] flex items-center justify-center'>
                <Outlet />
            </div>
        </div>
    </main>
}