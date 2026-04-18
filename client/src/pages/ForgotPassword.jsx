import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [data, setData] = useState({
        email: "",
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

    
    const validevalue = Object.values(data).every(el=>el)

    const navigate = useNavigate()
    
    const handleSubmit = async (e)=>{
        e.preventDefault()

        try{
            const response = await Axios({
                ...SummaryApi.forgot_password,
                data : data
            })
            if(response.data.error){
                toast.error(response.data.message);
            }
            if(response.data.success){
                toast.success(response.data.message);
                navigate("/verification-otp",{
                    state: data
                })
                setData({
                    email: "",
                })
            }    
        }catch(error){
            AxiosToastError(error)
        }

    }

    return (
        <section className='w-full container mx-auto mt-10'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-5 shadow'>
            <p className='font-semibold text-lg mb-5'>Forgot Password</p>
    
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
    
                    <button disabled={!validevalue} className={` ${ validevalue ? "bg-green-800" : "bg-gray-500"} text-white w-full py-2 rounded font-semibold my-3 tracking-wide`}>Send OTP</button>

                    <p>Already have account? <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800'>Register</Link></p>
                </form>
            </div>
        </section>
    )
}

export default ForgotPassword
