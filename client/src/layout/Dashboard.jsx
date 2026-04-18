import React from 'react'
import UserMenu from '../component/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector(state => state.user)

  console.log("user dashboard",user)
  return (
    <section className='bg-white'>
        <div className='container mx-auto grid lg:grid-cols-[250px,1fr]  '>
                <div className='py-0 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block border-r'>
                    <UserMenu/>
                </div>


                <div style={{backgroundColor: "rgb(148 163 184 / 9%)"}} className=' min-h-[78vh] '>
                    <Outlet/>
                </div>
        </div>
    </section>
  )
}

export default Dashboard