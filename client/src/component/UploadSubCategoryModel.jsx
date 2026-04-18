import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import uploadImage from '../utils/UploadImages'
// import SubCategory from '../pages/SubCategory'
import { useSelector } from 'react-redux'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'

const UploadSubCategoryModel = ({close, fetchData}) => {
    const [data,setData] = useState({
        name: "",
        image: "",
        category: []
    })
    const [loading,setLoading] = useState(false)
    const allCategory = useSelector(state => state.product.allCategory)

    const handleOnChange =(e)=>{
        const { name, value } = e.target
        setData((preve)=>{
            return {
                ...preve,
                [name]:value
            }
        })
    }

    const handleUploadCategoryImage = async(e)=>{
        const file = e.target.files[0];
        console.log(file)
        if(!file){
           return
        }
        setLoading(true)
        const response = await uploadImage(file)
        const { data : ImageResponse } = response

        setData((preve)=>{
            return {
                ...preve,
                image : ImageResponse.data.url
            }
        })

        setLoading(false)
        
    }

    const handelRemoveCategorySelected=(categoryId)=>{

        const index = data.category.findIndex(el=>el._id===categoryId)
        data.category.splice(index,1)
        setData((preve)=>{
            return{
                ...preve
            }
        })
    }

    const handleSubCategorySubmit = async(e)=>{
        e.preventDefault()

        try{
            const response = await Axios({
                ...SummaryApi.createSubCategory,
                data: data
            })
            const {data : responseData } = response
            console.log("handleSubCategorySubmit",responseData.data)
            if(responseData.error){
                toast.error(responseData.message)
            }
            if(responseData.success){
                toast.success(responseData.message)
                if(close){
                    close()
                }
                if(fetchData){
                    fetchData()
                }
            }
        }catch(error){
            AxiosToastError(error)
        }
    }


  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
        <div className='bg-white max-w-4xl w-full p-4 round'>
            <div className='flex items-center justify-between'>
                <h1 className='font-semibold'>Sub Category</h1>
                <button onClick={close} className='block ml-auto'>
                    <IoClose size={25}/>
                </button>
            </div>
            <form className='my-3 grid gap-2' onSubmit={handleSubCategorySubmit}>
                <div className='grid gap-1'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        id='name'
                        placeholder='Enter category name'
                        className='bg-blue-50 p-2 border border-blue-100 rounded outline-none focus-within:border-primary-200'
                        name='name'
                        value={data.name}
                        onChange={handleOnChange}
                    />
                </div>
                <div>
                    <p>Image</p>
                    <div className='flex gap-4 flex-col lg:flex-row items-center'>
                        <div className='borecr bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center'>
                            {
                                data.image ? (
                                    <img
                                        src={data.image}
                                        alt='category'
                                        className='w-full h-full object-fill'
                                    />
                                ):(
                                    <p className='text-sm text-neutral-500'>No Image</p>
                                )
                            }
                        </div>
                        <label htmlFor='uploadCategoryImage'>
                            <div className={`
                                ${!data.name ? "bg-gray-400" : "border-primary-200" } border cursor-pointer 
                                px-4 py-1 rounded text-sm my-3 hover:bg-primary-200 font-medium
                            `}>
                            {
                                loading ? "loading..." : "Upload Image"
                            }
                            </div>
                            <input disabled={!data.name} onChange={handleUploadCategoryImage} type='file' id='uploadCategoryImage' className='hidden'/>
                        </label>
                    </div>
                </div>

                <div className='grid gap-1'>
                    <label>Select Category</label>
                    <div className='border focus-within:border-primary-200 rounded'>
                        <div className='flex flex-wrap gap-2'>
                            {
                                data?.category?.map((cat,index)=>{
                                    return(
                                        <p key={cat._id+"selectedValue"} className='bg-white shadow-md px-1 m-1 flex item'>
                                            {cat.name}
                                            <div className='cursor-pointer flex items-center hover:text-red-600' onClick={()=>handelRemoveCategorySelected(cat._id)}>
                                                <IoClose size={20}/>
                                            </div>
                                        </p>
                                    )
                                })
                            }
                        </div>

                        <select
                            className='w-full p-2 bg-transparent outline-none'
                            onChange={(e)=>{
                                const value= e.target.value
                                const categoryDetails = allCategory.find(el => el._id==value)

                                setData((preve)=>{
                                    return{
                                        ...preve,
                                        category: [...preve.category,categoryDetails]
                                    }
                                })

                            }}>
                            <option value={""} disabled>Select Category</option>
                            {
                                allCategory.map((category,index)=>{

                                    return(
                                        <option value={category?._id} key={category._id+"subcategory"}>{category?.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>

                <button className={`${data.name && data.image && data.category.length>0 ? "bg-primary-100 hover:bg-primary-200" : "bg-gray-400" } py-2 px-4 font-semibold`}>Submit</button>
            </form>
        </div>
    </section>
  )
}

export default UploadSubCategoryModel