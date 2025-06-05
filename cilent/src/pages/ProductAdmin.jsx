import React, { useEffect, useState } from 'react'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import Loading from '../component/Loading'
import ProductCardAdmin from '../component/ProductCardAdmin'
import { IoSearchOutline } from "react-icons/io5";

const ProductAdmin = () => {
  const [productData,setProductData] = useState([])
  const [page,setPage] = useState(1)
  const [totalPageCount,setTotalPageCount] = useState(1)
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchProductData = async()=>{
      try{
          setLoading(true)
          const response = await Axios({
              ...SummaryApi.getProduct,
              data: {
                  page : page,
                  limit : 12,
                  search : search
              }
          })

          const { data : responseData } = response
          if(responseData.success){
            setTotalPageCount(responseData.totalNoPage)
            setProductData(responseData.data)
          }
          
      }catch(error){
          AxiosToastError(error)
      }finally{
        setLoading(false)
      }
  }

  useEffect(()=>{
    fetchProductData()
  },[page])
  
  const handelPrev = ()=>{
    if(page>1){
      setPage(preve => preve-1)
    }
  }
  const handelNext = ()=>{
    if(page !== totalPageCount){
      setPage(preve => preve+1)
    }
  }
  
  const handelOnChange = (e)=>{
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }
  
  useEffect(()=>{
    let flag = true

    const interval = setTimeout(()=>{
      if(flag){
        fetchProductData()
        flag = false
      }
    },300)
    fetchProductData()

    return()=>{
      clearTimeout(interval)
    }
  },[search])

  return (
    <section>
      <div style={{backgroundColor: "rgb(0 121 107 / 90%)"}} className='p-2 shadow-md flex items-center justify-between gap-4'>
          <h2 className='font-semibold'>Product</h2>
          <div className='h-full flex px-2 bg-blue-50 items-center py-2 rounded border focus-within:border-primary-200'>
            <IoSearchOutline size={25}/>
            <input
              type='text'
              placeholder='Search product here ...'
              className='h-full bg-transparent outline-none'
              value={search}
              onChange={handelOnChange}
            />
          </div>
      </div>
      {
        loading && (
          <Loading/>
        )
      }

        <div style={{backgroundColor: "rgb(148 163 184 / 9%)"}} className='p-4'>
          <div className='min-h-[55vh]'>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
              {
                productData.map((p,index)=>{
                  return(
                    <ProductCardAdmin data={p} fetchProductData={fetchProductData}/>
                  )
                })
              }
            </div>
          </div>
          <div className='my-2 flex justify-between'>
            <button onClick={handelPrev} className='rounded-sm border border-primary-200 py-1 px-4 hover:bg-primary-200'>Previous</button>
            <button className='w-full bg-slate-100'>{page}/{totalPageCount}</button>
            <button onClick={handelNext} className='rounded-sm border border-primary-200 py-1 px-4 hover:bg-primary-200'>Next</button>
          </div>
        </div>

    </section>
  )
}

export default ProductAdmin