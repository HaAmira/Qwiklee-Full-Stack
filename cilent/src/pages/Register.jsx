import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassWord: ""
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
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const validevalue = Object.values(data).every(el=>el)

    const navigate = useNavigate()
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(data.password !== data.confirmPassWord){
            toast.error("confirm password and password must be same")
            return
        }

        try{
            const response = await Axios({
                ...SummaryApi.register,
                data : data
            })
            if(response.data.error){
                toast.error(response.data.message);
            }
            if(response.data.success){
                toast.success(response.data.message);
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassWord: ""
                })
                navigate("/login")
            }            
        }catch(error){
            AxiosToastError(error)
            toast.error("catch");
        }

    }

    return (
        <section className='w-full container mx-auto'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-5 shadow'>
                <p>Welcome to Binkeyit</p>
    
                <form className='grid gap-2 mt-6' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            id='name'
                            autoFocus
                            className='bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                        />
                    </div>
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
                    <div className='grid gap-1'>
                        <label htmlFor='confirmPassWord'>Confirm Password:</label>
                        <div className='flex items-center bg-blue-50 p-2 border rounded focus-within:border-primary-200'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassWord'
                                name='confirmPassWord'
                                className='w-full outline-none'
                                value={data.confirmPassWord}
                                onChange={handleChange}
                            />
                            <div onClick={() => { setShowConfirmPassword(preve => !preve) }} className='cursor-pointer'>
                                {
                                    showConfirmPassword ? (
                                        <FaEye />
                                    ) : (
                                        <FaEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>
    
                    <button disabled={!validevalue} className={` ${ validevalue ? "bg-green-800" : "bg-gray-500"} text-white w-full py-2 rounded font-semibold my-3 tracking-wide`}>Register</button>

                    <p>Already have account? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>login</Link></p>
                </form>
            </div>
        </section>
    )
}

export default Register

