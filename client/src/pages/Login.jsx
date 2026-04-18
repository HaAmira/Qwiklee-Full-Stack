import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/useSlice';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const [showPassword, setShowPassword] = useState(false)

    
    const validevalue = Object.values(data).every(el=>el)

    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    
    const handleSubmit = async (e)=>{
        e.preventDefault()

        try{
            const response = await Axios({
                ...SummaryApi.login,
                data : data
            })
            if(response.data.error){
                toast.error(response.data.message);
            }
            if(response.data.success){
                toast.success(response.data.message);
                localStorage.setItem('accessToken',response.data.data.accessToken)
                localStorage.setItem('refreshToken',response.data.data.refreshToken)

                const userDetails=await fetchUserDetails();
                dispatch(setUserDetails(userDetails.data))

                setData({
                    email: "",
                    password: "",
                })
                navigate("/")
            }
    
        }catch(error){
            AxiosToastError(error)
        }

    }

    return (
        <section className='w-full container mx-auto mt-10'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-5 shadow'>
    
                <form className='grid gap-4 mt-8' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            id='email'
                            className='bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='password'>Password:</label>
                        <div className='flex items-center bg-blue-50 p-2 border rounded focus-within:border-primary-200'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                name='password'
                                className='w-full outline-none'
                                value={data.password}
                                onChange={handleChange}
                            />
                            <div onClick={() => { setShowPassword(preve => !preve) }} className='cursor-pointer'>
                                {
                                    showPassword ? (
                                        <FaEye />
                                    ) : (
                                        <FaEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <Link className='ml-auto hover:text-primary-200 mt-0' to={"/forgot-password"}>Forgot-Passwod ?</Link>
    
                    <button disabled={!validevalue} className={` ${ validevalue ? "bg-green-800" : "bg-gray-500"} text-white w-full py-2 rounded font-semibold my-3 tracking-wide`}>Login</button>

                    <p>Don't have account? <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800'>Register</Link></p>
                </form>
            </div>
        </section>
    )
}

export default Login
