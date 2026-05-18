import { Navigate, NavLink } from 'react-router'
import { useArticles, useAuth } from '../store/authStore';

import {
    logoutbtn1
} from "../common"



function Header() {
    const isAuthenticated = useAuth((state) => state.isAuthenticated)
    const logout = useAuth((state) => state.logout)
    const readArt = useAuth((state) => state.readArticels)


    const readArticels = async () => {
        //
        await readArt();

        console.log()

    }
    const userLogout = async () => {
        // logout 
        await logout();
        // navigate to sign page
        Navigate("/login")


    }

    return (
        <div className='justify-between flex pr-10 items-center bg-blue-400'>
            <div>
                <img src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740&q=80" alt="Logo" className='w-20 h-20  rounded-[50%] p-2' />
            </div>
            <div>
                <ul className='flex gap-10 text-[18px] text-black'>
                    <li>
                        <NavLink to={"/"}>Home</NavLink>
                    </li>
                    <li className='flex'>
                        <NavLink to={"/Articles"}>

                        </NavLink>
                    </li>
                    {
                        !isAuthenticated &&
                        <li>
                            <NavLink to={"register"}>Register</NavLink>
                        </li>
                    }
                    {
                        !isAuthenticated &&
                        <li>
                            <NavLink to={"login"}>Login</NavLink>
                        </li>
                    }

                    {
                        isAuthenticated && <li>
                            <button onClick={userLogout} className={logoutbtn1} >Logout</button>
                        </li>
                    }
                </ul>
            </div>
        </div>
    )
}
export default Header;