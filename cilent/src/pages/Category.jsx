import React, { useState } from 'react'
import UploadCategoryModel from '../component/UploadCategoryModel';
import Loading from '../component/Loading';
import { useEffect } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import NoData from '../component/NoData';
import EditCategory from '../component/EditCategory';
import CofirmBox from '../component/CofirmBox';
import AxiosToastError from '../utils/AxiosToastError';
import { useSelector } from 'react-redux';

const Category = () => {
    const [OpenUploadCategory,setOpenUploadCategory] = useState(false);
    const [loading,setLoading] = useState(false)
    const [categoryData,setCategoryData] = useState([])
    const [openEdit,setOpenEdit] = useState(false)
    const [enterData,setEnterData] = useState({
        name : "",
        image : "",
    })
    const [openDelete,setOpenDelete] = useState(false)
    const [deleteCategory,setDeleteCategory] = useState({
        _id : ""
    })

    const fetchCategory = async()=>{
        try{
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getCategory
            })
            const {data : responseData} = response
            if(responseData.success){
                setCategoryData(responseData.data)
            }
        }catch(error){
             AxiosToastError(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCategory()
    },[])

    const handleDeleteCategory = async()=>{
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data : deleteCategory
            })

            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                fetchCategory()
                setOpenDelete(false)
            }
        } catch (error) {
            console.log(error)
            AxiosToastError(error)
        }
    }

  return (
    <section>
        <div style={{backgroundColor: "rgb(0 121 107 / 90%)"}} className='p-2 shadow-md flex items-center justify-between'>
            <h2 className='font-semibold'>Category</h2>
            <button onClick={()=>setOpenUploadCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Category</button>
        </div>

        {
            !categoryData[0] && !loading && (
                <NoData/>
            )
        }
        
        <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
            {
                categoryData.map((category,index)=>{
                    return(
                        <div className='w-32 h-56 rounded shadow-md'>
                            <img
                                alt={category.name}
                                src={category.image}
                                className='w-32 object-scale-down'
                            />
                            <div className='items-center flex h-9 gap-2'>
                                <button onClick={()=>{setOpenEdit(true); setEnterData(category)}} className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded'>
                                    Edit
                                </button>
                                <b/>
                                <button onClick={()=>{setOpenDelete(true); setDeleteCategory(category)}} className='flex-1 bg-red-100 hover:bg-red-200 text-green-600 font-medium py-1 rounded'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>

        {
            loading && (
                <Loading/>
            )
        }

        {
            OpenUploadCategory && (
                <UploadCategoryModel fetchData={fetchCategory} close={()=>setOpenUploadCategory(false)}/>
            )
        }

        {
            openEdit && (
                <EditCategory data={enterData} fetchData={fetchCategory} close={()=>setOpenEdit(false)}/>
            )
        }

        {
            openDelete && (
                <CofirmBox close={()=>setOpenDelete(false)} cancel={()=>setOpenDelete(false)} confirm={handleDeleteCategory}/>
            )
        }
    </section>
  )
}

export default Category

