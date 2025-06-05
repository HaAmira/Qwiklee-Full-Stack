import './App.css'
import { Outlet } from "react-router-dom";
import Header from './component/header';
import Footer from './component/Footer';
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllCategory,setAllSubCategory, setLoadingCategory } from './store/productSlice';
import { setUserDetails } from './store/useSlice';
import Axios from './utils/Axios';
import SummaryApi from './common/SummaryApi';
import AxiosToastError from './utils/AxiosToastError';
import GlobalProvider, { useGlobalContext } from './provider/GlobalProvider';
import { FaCartShopping } from 'react-icons/fa6';
import CartMobileLink from './component/CartMobile';


function App() {
  const dispatch = useDispatch()

  const fetchUser = async()=>{
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async()=>{
      try{
        dispatch(setLoadingCategory(true))
        const response = await Axios({
          ...SummaryApi.getCategory
        })
        const {data : responseData} = response
        if(responseData.success){
          dispatch(setAllCategory(responseData.data))
        }
      }catch(error){
        AxiosToastError(error)
      }finally{
        dispatch(setLoadingCategory(false))
      }
  }

  const fetchSubCategory = async()=>{
    try {
        const response = await Axios({
            ...SummaryApi.getSubCategory
        })
        const { data : responseData } = response

        if(responseData.success){
           dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    } catch (error) {
        AxiosToastError(error)
    }finally{
    }
  }

  useEffect(()=>{
    fetchUser()
    fetchCategory()
    fetchSubCategory()
  },[])

  return (
    <GlobalProvider>
      <Header/>
      <main style={{backgroundColor: "rgb(148 163 184 / 9%)"}} className='min-h-[78vh]'>
        <Outlet/>
      </main>
      <Footer/>
      <Toaster/>
      {
        location.pathname !== '/checkout' && (
          <CartMobileLink/>
        )
      }
      {/* <CartMobileLink/> */}
    </GlobalProvider>
  )
}

export default App
