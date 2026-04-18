import React, { useEffect } from 'react'
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { useMobile } from '../hooks/useMobile';
import { FaArrowLeft } from "react-icons/fa";

const Search = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile] = useMobile();
  const isSearchPage = location.pathname==="/search"
  const params = useLocation()
  const searchText = params?.search?.slice(3)

  const redirectToSearchPage = ()=>{
    navigate("/search")
  }

  const handleOnChange = (e)=>{
    const value = e.target.value
    const url = `/search?q=${value}`
    navigate(url);
  }

  return (
    <div className='min-w-[300px] lg:min-w-[420px] h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200'>
        {
          (isSearchPage && isMobile) ?(
            <Link to="/" className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200 bg-white rounded-e-2xl shadow'>
              <FaArrowLeft size={22}/>
            </Link>
          ):(
            <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200'>
                <IoSearch size={22}/>
            </button>
          )
        }
        <div>
          {
            !isSearchPage?(
              <div onClick={redirectToSearchPage} className='w-full h-full'>
                  <TypeAnimation
                      sequence={[
                        'search "milk"',
                        1000,
                        'search "bread"',
                        1000,
                        'search "sugar"',
                        1000,
                        'search "panner"',
                        1000,
                        'search "chocolate"',
                        1000,
                        'search "curd"',
                        1000,
                        'search "rice"',
                        1000,
                        'search "egg"',
                        1000,
                        'search "chips"',
                        1000,
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                  />
              </div>
            ):(
              <div className='w-full h-full'>
                <input type='text' placeholder='search' autoFocus defaultValue={searchText} className='bg-transparent w-full h-full outline-none' onChange={handleOnChange}/>
              </div>
            )
          }
        </div>
    </div>
  )
}

export default Search
