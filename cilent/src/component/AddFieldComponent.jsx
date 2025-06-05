import React from 'react'
import { IoClose } from 'react-icons/io5'

const AddFieldComponent = ({close,value,onChange,submit}) => {
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
        <div className='bg-white w-full p-4 rounded max-w-md'>
            <div className='flex'>
                <h1 className='font-semibold'>Add Field</h1>
                <button onClick={close} className='block ml-auto'>
                    <IoClose size={25}/>
                </button>
            </div>
            <input
                placeholder='Enter field name'
                className='w-full p-2 bg-blue-50 rounded border outline-none focus-within:border-primary-200'
                value={value}
                onChange={onChange}
            />
            <button
             onClick={submit}
             className='bg-primary-200 hover:bg-primary-100 rounded mt-2 mx-auto py-1 px-3 flex justify-center'
            >Add Field</button>
        </div>
    </section>
  )
}

export default AddFieldComponent