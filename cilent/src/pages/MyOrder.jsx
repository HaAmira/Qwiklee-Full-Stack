import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import NoData from '../component/NoData'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { pricewithDiscount } from '../utils/PriceWithDiscount'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)
  const [createdDate,setCreateDate] = useState("");

  const Date = (e) =>{
    console.log("Date Length:- ",e.length);
  }

  return (
    <div className=''>
        <div style={{backgroundColor: "rgb(0 121 107 / 90%)"}} className='p-2 shadow-md flex items-center justify-between mb-2'>
            <h2 className='font-semibold'>My Order</h2>
        </div>
        {
          !orders[0] && (
            <NoData/>
          )
        }
        {
          orders.map((order,index)=>{
            return(
              <div key={order._id+index+"order"} className='order rounded p-4 text-sm border-2 border-black-10 mb-2'>
                  <p>Date:- {Date(order.createdAt)}</p>
                  <div className='flex gap-1'>
                    <p>Payment:- </p>
                    <p className={`${order.payment_status=="CASH ON DELIVERY" ? "text-red-500" : "text-green-500"}`}>{order.payment_status}</p>
                  </div>

                  <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
                    {
                      order.product_details.list_items.map((order_list,no)=>{
                        return(
                          <div key={order._id+index+"order"} className='flex order rounded p-4 text-sm w-28 border-2 border-black-10'>
                            <div className='gap-3 mx-auto'>
                              <img
                                src={order_list.productId?.image?.[0] ?? ''} alt='ERROR'
                                className='w-14 h-14 mx-auto'
                              />  
                              <div className=''>
                                <p className='text-ellipsis line-clamp-2 font-medium'>{order_list.productId?.name}</p>
                                <div className=' mb-0'>
                                  <p className='font-medium'>{order_list?.quantity}</p>
                                  <p className='font-semibold'>{DisplayPriceInRupees(pricewithDiscount(order_list.productId?.price,order_list.productId?.discount))}</p>
                                </div>
                              </div>
                            </div>
                            {console.log(order_list.productId)}
                          </div>
                        )
                      })
                    }
                  </div>

                  <div className='flex gap-1 pt-4'>
                    <p>Total:-</p>
                    <p className='font-semibold'>{DisplayPriceInRupees(order.totalAmt)}</p>
                  </div>
              </div>
            )
          })
        }
    </div>
  )
}

export default MyOrders