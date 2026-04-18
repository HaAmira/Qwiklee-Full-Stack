import React from 'react'
import UserMenu from '../component/UserMenu'
import { IoClose } from "react-icons/io5";

const UserMenuMobile = () => {
  return (
    <section className='bg-white h-full w-full py-8'>
        <button onClick={()=>window.history.back()} className='text-neutral-800 block w-fit ml-auto px-4'>
            <IoClose size={25}/>
        </button>
        <div className='container mx-auto p-3 pb-8'>
            <UserMenu/>
        </div>
    </section>
  )
}

export default UserMenuMobile