import React, { useState } from 'react'
import banner from '../assets/banner.jpg'
import Axios from '../utils/Axios'
import { useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import CategoryWiseProductDisplay from '../component/CategoryWiseProductDisplay'
import Carousel from '../component/Carousel'

const Home = () => {
  const allCategory = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  const handelRedirectProductListPage =(id,catName)=>{
    const subcategory = subCategoryData.find(sub =>{
      const filterData = sub.category.some(c =>{
        return c._id == id
      })
      return filterData ? true:null
    })
    const name=catName.replaceAll(" ", "-").replaceAll(",", "-").replaceAll("&", "-");
    const url = `/${name}-${id}/${subcategory.name}-${subcategory._id}`

    navigate(url)
  }


  return (
    <section className='bg-white'>
      <div className='mx-5'>
        <div className=' container mx-auto'>
          <div className={`w-full h-full bg-blue-100 rounded ${!banner && animate-pulse}`}>
            <Carousel/>
          </div>
        </div>

        <div className='container mx-auto my-2'>
          <div className='p-4 grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10'>
            {
              allCategory.map((category,index)=>{
                    return(
                        <div key={index+"&"+category} onClick={()=>handelRedirectProductListPage(category._id,category.name)}>
                            <img
                                alt={category.name}
                                src={category.image}
                                className='w-32 object-scale-down'
                            />
                        </div>
                    )
                })
            }
          </div>
        </div>

        {
          allCategory.map((c,index)=>{
            return(
              <CategoryWiseProductDisplay key={c?._id+"CategoryWiseProductDisplay"} id={c?._id} name={c?.name}/>
            )
          })
        }
        
      </div>
    </section>
  )
}

export default Home
