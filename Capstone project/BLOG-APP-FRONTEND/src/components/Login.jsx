import { NavLink } from 'react-router';
import { useForm } from 'react-hook-form';
import { useAuth } from '../store/authStore';
import { useNavigate } from 'react-router';
import { toast, Toaster } from "react-hot-toast"
import loggedIn from '../assets/already-logged-in.png'


import {
    headingClass,
    labelClass,
    cardClass,
    pageBackground,
    pageWrapper,
    formCard,
    formTitle,
    inputClass,
    submitBtn,
    formGroup
} from '../common'


function Login() {

    const { register, handleSubmit } = useForm()
    const login = useAuth(state => state.login)
    const isAuthenticated = useAuth((state) => state.isAuthenticated)
    const navigate = useNavigate();

    const userLogin = async (userCredObj) => {
        // user details in console
        console.log(userCredObj);
        // send userCred to login function in useAuth Store
        await login(userCredObj);
        // react hot toast
        toast.success('Login Successfully!')
        // navigate to home page
        navigate("/");
    }

    if (isAuthenticated) {
        return (
            <div>
                <div>
                    <img src={loggedIn} alt="You Have Already Logged In" className='w-screen h-100'/>
                </div>
            </div>
        )
    }
    return (
        <div className={pageWrapper}>
            <div>
                <Toaster
                    position="top-center"
                    reverseOrder={true}
                />
            </div>
            <form className={formCard} onSubmit={handleSubmit(userLogin)}>
                <h1 className={formTitle}>Login</h1>
                <hr className='mt-[-18px] mb-8' />
                <div className={formGroup}>
                    <input type="email" placeholder='E-mail' className={inputClass} {...register("email", { required: true })} />
                </div>
                <div className={formGroup}>
                    <input type="password" placeholder='Password' className={inputClass} {...register("password", { required: true })} />

                    <p className='text-[12px] text-gray-500 text-shadow-black justify-end flex'>Forgot password?</p>
                </div>
                <div className={formGroup}>
                    <input type="submit" value="Login" className={submitBtn} />
                    <p className='text-[12px] text-gray-500 mt-2 flex justify-center'>Don't have an account?
                        <NavLink to={"/register"} className="pl-1">create Account</NavLink></p>
                </div>
            </form>
        </div>
    )
}
export default Login;