import React, { useEffect, useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImages';
import { MdDelete  } from "react-icons/md";
import ViewImage from '../component/ViewImage';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5'
import AddFieldComponent from '../component/AddFieldComponent';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';
import toast from 'react-hot-toast';

const UploadProduct = () => {
  const [data,setData] = useState({
    name : "",
    image : [],
    category : [],
    subCategory : [],
    unit : "",
    stock : "",
    price: "",
    discount : "",
    description : "",
    more_details : {},
    publish : false
  })
  const [loading,setLoading] = useState(false)
  const [ViewImageURL,setViewImageURL] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory,setSelectCategory] = useState("")
  const [selectSubCategory,setSelectSubCategory] = useState("")
  const allSubCategory = useSelector(state => state.product.allSubCategory)

  const [openAddField,setOpenAddField] = useState(false)
  const [fieldName,setFieldName] = useState("")

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

    if(!file){
       return
    }
    setLoading(true)
    const response = await uploadImage(file)
    const { data : ImageResponse } = response

    const ImageUrl= ImageResponse.data.url;
    setData((preve)=>{
      return {
        ...preve,
        image : [...preve.image,ImageUrl]
      }
    })

    setLoading(false)
  }

  const handleDeleteImage=(imageId)=>{

    const index = data.image.findIndex(el=>el._id===imageId)
    data.image.splice(index,1)
    setData((preve)=>{
        return{
            ...preve
        }
    })
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

  const handelRemoveSubCategorySelected=(categoryId)=>{
    const index = data.subCategory.findIndex(el=>el._id===categoryId)
    data.subCategory.splice(index,1)
    setData((preve)=>{
        return{
            ...preve
        }
    })
  }

  const handelAddField = ()=>{
    setData((preve)=>{
      return{
        ...preve,
        more_details : {
          ...preve.more_details,
          [fieldName] : ""
        }
      }
    })
    setFieldName("")
    setOpenAddField(false)
  }

  const handelSubmitProduct = async(e)=>{
    e.preventDefault()
    try{
      const response = await Axios({
        ...SummaryApi.createProduct,
        data : data
      })
      const { data : responseData } = response
      if(responseData.success){
        toast.success(responseData.message)
        // successAlert(responseData.message)
        setData({
          name : "",
          image : [],
          category : [],
          subCategory : [],
          unit : "",
          stock : "",
          price: "",
          discount : "",
          description : "",
          more_details : {},
          publish : false
        })
      }
    }catch(error){
      AxiosToastError(error)
    }
  }


  return (
    <section>
      <div style={{backgroundColor: "rgb(0 121 107 / 90%)"}} className='p-2 shadow-md flex items-center justify-between'>
          <h2 className='font-semibold'>Upload Product</h2>
      </div>
      <div className='mx-2'>
        <form className='my-3 grid gap-2' onSubmit={handelSubmitProduct}>
            <div className='grid gap-1'>
                <label htmlFor='name' className='font-medium'>Name</label>
                <input
                    type='text'
                    id='name'
                    placeholder='Enter Product name'
                    className='bg-blue-50 p-2 border border-blue-100 rounded outline-none focus-within:border-primary-200'
                    name='name'
                    required
                    value={data.name}
                    onChange={handleOnChange}
                />
            </div>
            <div className='grid gap-1'>
                <label htmlFor='description' className='font-medium'>Description</label>
                <textarea
                    type='text'
                    id='description'
                    placeholder='Enter Product Description'
                    className='bg-blue-50 h-20 p-2 border border-blue-100 rounded outline-none focus-within:border-primary-200 resize-none'
                    name='description'
                    value={data.description}
                    onChange={handleOnChange}
                    required
                    multiple
                    row={3}
                />
            </div>
            <div>
                <p className='font-medium'>Image</p>
                <div>
                  <label htmlFor='productImage' className='bg-blue-50 h-36 w-full flex items-center justify-center cursor-pointer'>
                      <div className='text-center'>
                        <FaCloudUploadAlt size={35} className='inline'/>
                        <p>Upload Image</p>
                      </div>
                      <input onChange={handleUploadCategoryImage} type='file' id='productImage' className='hidden' accept='image/*'/>
                  </label>

                  <div className='flex flex-wrap gap-4'>
                    {
                      data.image.map((img,index)=>{
                        return(
                          <div key={img+index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group flex justify-center'>
                            <img
                              src={img}
                              alt={img}
                              className='w-fll h-full object-scale-down cursor-pointer'
                              onClick={()=>setViewImageURL(img)}
                            />
                            <div onClick={()=>handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer'>
                              <MdDelete/>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
            </div>
            <div className='grid gap-1'>
                <label className='font-medium'>Category</label>
                <div className='border focus-within:border-primary-200 rounded'>
                    <select
                        className='w-full p-2 bg-blue-50 outline-none'
                        value={selectCategory}
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
                    <div className='flex flex-wrap gap-2'>
                        {
                            data?.category?.map((cat,index)=>{
                                return(
                                    <p key={cat._id+"categorySelect"} className='bg-blue-50 shadow-md px-1 m-1 flex item'>
                                        {cat.name}
                                        <div className='cursor-pointer flex items-center hover:text-red-600' onClick={()=>handelRemoveCategorySelected(cat._id)}>
                                            <IoClose size={20}/>
                                        </div>
                                    </p>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='grid gap-1'>
                <label className='font-medium'>SubCategory</label>
                <div className='border focus-within:border-primary-200 rounded'>
                    <select
                        className='w-full p-2 bg-blue-50 outline-none'
                        value={selectSubCategory}
                        onChange={(e)=>{
                            const value= e.target.value
                            const subcategoryDetails = allSubCategory.find(el => el._id==value)
                            setData((preve)=>{
                                return{
                                    ...preve,
                                    subCategory: [...preve.subCategory,subcategoryDetails]
                                }
                            })
                        }}>
                        <option value={""} disabled>Select Category</option>
                        {
                          allSubCategory.map((category,index)=>{
                                return(
                                    <option value={category?._id} key={category._id+"subcategory"}>{category?.name}</option>
                                )
                            })
                        }
                    </select>
                    <div className='flex flex-wrap gap-2'>
                        {
                            data?.subCategory?.map((cat,index)=>{
                                return(
                                    <p key={cat._id+"subCategorySelect"} className='bg-blue-50 shadow-md px-1 m-1 flex item'>
                                        {cat.name}
                                        <div className='cursor-pointer flex items-center hover:text-red-600' onClick={()=>handelRemoveSubCategorySelected(cat._id)}>
                                            <IoClose size={20}/>
                                        </div>
                                    </p>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='grid gap-1'>
                <label htmlFor='name' className='font-medium'>Unit</label>
                <input
                    type='text'
                    id='unit'
                    placeholder='Enter Product unit'
                    className='bg-blue-50 p-2 border border-blue-100 rounded outline-none focus-within:border-primary-200'
                    name='unit'
                    required
                    value={data.unit}
                    onChange={handleOnChange}
                />
            </div>
            <div className='grid gap-1'>
                <label htmlFor='name' className='font-medium'>Number of Stock</label>
                <input
                    type='text'
                    id='stock'
                    placeholder='Enter Product stock'
                    className='bg-blue-50 p-2 border border-blue-100 rounded outline-none focus-within:border-primary-200'
                    name='stock'
                    required
                    value={data.stock}
                    onChange={handleOnChange}
                />
            </div>
            <div className='grid gap-1'>
                <label htmlFor='name' className='font-medium'>Price</label>
                <input
                    type='text'
                    id='price'
                    placeholder='Enter Product price'
                    className='bg-blue-50 p-2 border border-blue-100 rounded outline-none focus-within:border-primary-200'
                    name='price'
                    required
                    value={data.price}
                    onChange={handleOnChange}
                />
            </div>
            <div className='grid gap-1'>
                <label htmlFor='name' className='font-medium'>Discount</label>
                <input
                    type='text'
                    id='discount'
                    placeholder='Enter Product discount'
                    className='bg-blue-50 p-2 border border-blue-100 rounded outline-none focus-within:border-primary-200'
                    name='discount'
                    required
                    value={data.discount}
                    onChange={handleOnChange}
                />
            </div>

            <div>
              {
                Object?.keys(data?.more_details)?.map((k,index)=>{
                  return(
                    <div className='grid gap-1'>
                      <label htmlFor={k} className='font-medium'>{k}</label>
                      <input
                          type='text'
                          id={k}
                          className='bg-blue-50 p-2 border border-blue-100 rounded outline-none focus-within:border-primary-200'
                          required
                          value={data?.more_details[k]}
                          onChange={(e)=>{
                            const value = e.target.value
                            setData((preve)=>{
                              return{
                                ...preve,
                                more_details : {
                                  ...preve.more_details,
                                  [k]:value
                                }
                              }
                            })
                          }}
                      />
                    </div>
                  )
                })
              }
            </div>

            <div onClick={()=>setOpenAddField(true)} className='font-semibold bg-primary-200 border border-primary-200 py-1 w-32 flex justify-center rounded hover:text-neutral-900 cursor-pointer hover:bg-white'>
              Add Field
            </div>

            <button className='bg-primary-100 hover:bg-primary-200 py-2 text-center rounded mt-2'>
              Submit
            </button>
        </form>
      </div>

      {
        ViewImageURL && (
          <ViewImage url={ViewImageURL} close={()=>setViewImageURL("")}/>
        )
      }

      {
        openAddField && (
          <AddFieldComponent
           value={fieldName}
           onChange={(e)=>setFieldName(e.target.value)}
           submit={handelAddField}
           close={()=>setOpenAddField(false)}
          />
        )
      }

    </section>
  )
}

export default UploadProduct