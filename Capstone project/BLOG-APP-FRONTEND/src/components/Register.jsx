import { useForm } from "react-hook-form"
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../store/authStore";
import {
    cardClass,
    pageWrapper,
    formTitle,
    submitBtn,
    inputClass,
    formGroup
} from "../common"
function Register() {
    const isAuthenticated = useAuth((state) => state.isAuthenticated)
    const { register, handleSubmit } = useForm();
    const [] = useState(false)
    const navigate = useNavigate()
    const [preview, setPreview] = useState(null);

    const onUserRegister = async (newUser) => {
        try {
            // Create form data object
            const formData = new FormData();
            //get user object
            let { role, profilePic, ...userObj } = newUser;
            //add all fields except profilePic to FormData object
            Object.keys(userObj).forEach((key) => {
                formData.append(key, userObj[key]);
            });
            // add profilePic to Formdata object
            formData.append("profilePic", profilePic[0]);
            console.log(typeof (userObj));

            if (role === "USER") {
                let res = await axios.post("http://localhost:4000/user-api/users", formData)
                let resObj = res.data
                console.log(resObj);
                navigate("/login");
            }
            if (role === "AUTHOR") {
                let res = await axios.post("http://localhost:4000/author-api/users", formData)
                let resObj = res.data
                console.log(resObj);
                navigate("/login");
            }
            useEffect(() => {
                return () => {
                    if (preview) {
                        URL.revokeObjectURL(preview);
                    }
                };
            }, [preview]);

        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className={pageWrapper}>

            <div className={cardClass}>
                <form onSubmit={handleSubmit(onUserRegister)}>
                    {preview && (
                        <div className="mt-3 flex justify-center">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-24 h-24 object-cover rounded-full border"
                            />
                        </div>
                    )}
                    <div className={formTitle}>
                        <h1> Registeration Form </h1>
                    </div>
                    <div>
                        <div className="flex text-[16px] ">
                            <div className="mr-5 content-center">
                                <input type="radio" name="role" id="role" value="USER" {...register("role", { required: true })} className="" />
                                <label > user</label>

                            </div>

                            <div className="">
                                <input type="radio" name="role" id="role" value="AUTHOR" {...register("role", { required: true })} />
                                <label > author </label>

                            </div>

                        </div>
                        <div className={formGroup}>
                            <div className="flex">
                                <input type="text" placeholder="FirstName" {...register("firstName", { required: true })} className={inputClass} />
                                <input type="text" placeholder="LastName" {...register("lastName", { required: true })} className={inputClass} />
                            </div>
                        </div>
                        <div className={formGroup}>
                            <input type="email" placeholder="E-Mail" {...register("email", { required: true })} className={inputClass} />
                        </div>
                        <div className={formGroup}>
                            <input type="password" placeholder="Password" {...register("password", { required: true })} className={inputClass} />
                        </div>
                        <div className={formGroup}>
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                {...register("profilePic", { required: true })}
                                className={inputClass}
                                onChange={(e) => {
                                    const file = e.target.files[0];

                                    if (file) {
                                        const previewUrl = URL.createObjectURL(file);
                                        setPreview(previewUrl);
                                    }
                                }}
                            />
                        </div>

                        <div className={formGroup}>
                            <input type="submit" value="Register" className={submitBtn} />
                        </div>
                        <span>
                            <p className='text-[12px] text-gray-500 mt-2 flex justify-center'>already have account.
                                <NavLink to={"/login"} className="pl-1">Sign in?</NavLink>
                            </p>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Register;


