import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { logout } from '../store/useSlice'
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from '../utils/isAdmin'

const UserMenu = ({close}) => {
    const user = useSelector((state)=> state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout=async()=>{
      try{
        const response = await Axios({
          ...SummaryApi.logout
        })

        if(response.data.success){
          if(close){
            close()
          }
          dispatch(logout())
          localStorage.clear()
          toast.success(response.data.message)
          navigate("/")
        }
      } catch(error){
        AxiosToastError(error)
      }
    }

    const handleClose = ()=>{
      if(close){
        close()
      }
   }


  return (
    <div>
        <div className='ml-4'>
          <div className='font-semibold'>My Account</div>
          <div className='flex text-sm items-center gap-2'>
            <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile} <span className='text-red-500'>{user.role==="ADMIN" ? "(Admin)" : ""}</span></span>
            <Link onClick={handleClose} to={"/dashboard/profile"}>
              <HiOutlineExternalLink size={15}/>
            </Link>
          </div>
        </div>       
        <hr className='p-[0.2px] bg-slate-200 my-2'/>
        <div className='text-sm grid ml-3'>
            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/category"} className='px-2 hover:bg-orange-200 py-2 hover:border-orange-500 rounded-md'>
                  Category
                </Link>
              )
            }
            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/subcategory"} className='px-2 hover:bg-orange-200 py-2 hover:border-orange-500 rounded-md'>
                  Sub Category
                </Link>  
              )
            }
            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/upload-product"} className='px-2 hover:bg-orange-200 py-2 hover:border-orange-500 rounded-md'>
                  Upload Product
                </Link>          
              )
            }
            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/product"} className='px-2 hover:bg-orange-200 py-2 hover:border-orange-500 rounded-md'>
                  Product
                </Link>          
              )
            }
            <Link onClick={handleClose} to={"/dashboard/myorder"} className='px-2 hover:bg-orange-200 py-2 hover:border-orange-500 rounded-md'>
              My Order
            </Link>
            <Link onClick={handleClose} to={"/dashboard/save-address"} className='px-2 hover:bg-orange-200 py-2 hover:border-orange-500 rounded-md'>
              Save Address
            </Link>
            <button onClick={handleLogout} className='text-left px-2 hover:bg-orange-200 py-2 hover:border-orange-500 rounded-md'>Log Out</button>
        </div>
    </div>
  )
}

export default UserMenu