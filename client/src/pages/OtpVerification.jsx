import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const OtpVerification = () => {
    const [data, setData] = useState(["","","","","",""])
    const navigate = useNavigate()
    const inputRef = useRef([])
    const location = useLocation();

    const validevalue = data.every(el=>el)
    
    const handleSubmit = async (e)=>{
        e.preventDefault()

        try{
            const response = await Axios({
                ...SummaryApi.forgot_password_otp_verification,
                data : {
                    otp: data.join(""),
                    email: location?.state?.email
                }
            })
            if(response.data.error){
                toast.error(response.data.message);
            }
            if(response.data.success){
                toast.success(response.data.message);
                setData(["","","","","",""])
                navigate("/reset-password",{
                    state : {
                        data: response.data,
                        email: location?.state?.email
                    }
                })
            }
    
        }catch(error){
            AxiosToastError(error)
        }

    }

    return (
        <section className='w-full container mx-auto mt-10'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-5 shadow'>
            <p className='font-semibold text-lg mb-5'>Enter OTP</p>
    
                <form className='grid gap-4 mt-8' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='otp'>Enter Your OTP :</label>
                        <div className='flex justify-center gap-2 mt-3'>
                            {
                                data.map((element,index)=>{
                                    return (
                                        <input 
                                            key={"otp"+index}
                                            type='next' 
                                            maxLength={1} 
                                            id='otp' 
                                            ref={(ref)=>{
                                                inputRef.current[index]=ref
                                                return ref
                                            }} 
                                            value={data[index]}
                                            onChange={(e)=>{
                                                const value = e.target.value    
                                                const newData = [...data]
                                                newData[index] = value
                                                setData(newData)
    
                                                if(value && index<5){
                                                    inputRef.current[index+1].focus()
                                                }
                                            }}
                                            className=' bg-blue-50 w-full max-w-16 p-2 mx-0.5 border rounded outline-none focus:border-primary-200 text-center font-semibold'/>)
                                })
                            }
                        </div>
                    </div>
    
                    <button disabled={!validevalue} className={` ${ validevalue ? "bg-green-800" : "bg-gray-500"} text-white w-full py-2 rounded font-semibold my-3 tracking-wide`}>Verify OTP</button>

                    <p>Already have account? <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800'>Register</Link></p>
                </form>
            </div>
        </section>
    )
}

export default OtpVerification

