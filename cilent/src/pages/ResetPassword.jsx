import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const [data,setData] = useState({
        email: `${location?.state?.email}`,
        newPassword: "",
        confirmPassword: ""
    })
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)

    const validevalue = Object.values(data).every(el=>el)

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()

        if(data.newPassword !== data.confirmPassword){
            toast.error("New password and confirm password must be same")
            return
        }

        try{
            const response = await Axios({
                ...SummaryApi.reset_password,
                data : data
            })
            if(response.data.error){
                toast.error(response.data.message);
            }
            if(response.data.success){
                toast.success(response.data.message);
                console.log("success")
                navigate("/login")
                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                })
            }    
        }catch(error){
            AxiosToastError(error)
        }

    }

  return (
    <section className='w-full container mx-auto mt-10'>
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-5 shadow'>
        <p className='font-semibold text-lg mb-5'>Enter your Password</p>

            <form className='grid gap-4 mt-8' onSubmit={handleSubmit}>
                <div className='grid gap-1'>
                    <label htmlFor='newPassword'>New Password:</label>
                        <div className='flex items-center bg-blue-50 p-2 border rounded focus-within:border-primary-200'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                name='newPassword'
                                className='w-full outline-none'
                                value={data.newPassword}
                                onChange={handleChange}
                                placeholder='Enter your new password'
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
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                        <div className='flex items-center bg-blue-50 p-2 border rounded focus-within:border-primary-200'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='password'
                                name='confirmPassword'
                                className='w-full outline-none'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder='Enter your confirm password'
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

                <button disabled={!validevalue} className={` ${ validevalue ? "bg-green-800" : "bg-gray-500"} text-white w-full py-2 rounded font-semibold my-3 tracking-wide`}>Change Passwod</button>
                <p>Already have account? <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800'>Register</Link></p>
            </form>
        </div>
    </section>
  )
}

export default ResetPassword