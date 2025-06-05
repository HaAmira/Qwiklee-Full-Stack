import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'

const CofirmBox = ({close,cancel,confirm}) => {
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
        <div className='bg-white max-w-md w-full p-4 round'>
            <div className='flex items-center justify-between'>
                <h1 className='font-semibold'>Permanent Delete</h1>
                <button onClick={close} className='block ml-auto'>
                    <IoClose size={25}/>
                </button>
            </div>
            <div className='my-4'>
                <p>Are you sure Permanent delete ?</p>
            </div>
            <div className='w-fit ml-auto items-center flex gap-3'>
                <button onClick={cancel} className='border border-red-400 hover:bg-red-200 text-red-500 font-medium py-0.5 px-3 rounded'>
                    Cancel
                </button>
                <button onClick={confirm} className='border border-green-400 hover:bg-green-200 text-green-500 font-medium py-0.5 px-3 rounded'>
                    Cofirm
                </button>
            </div>
        </div>
    </section>
  )
}

export default CofirmBox