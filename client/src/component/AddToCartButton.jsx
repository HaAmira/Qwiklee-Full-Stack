import React, { useEffect, useState, useRef } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { FaMinus, FaPlus } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const AddToCartButton = ({ data }) => {
    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const [qty, setQty] = useState(0)
    const qtyRef = useRef(0)
    const [cartItemDetails, setCartItemsDetails] = useState()

    const isUpdatingRef = useRef(false);
    const updateTimerRef = useRef(null);

    const handleADDTocart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            setLoading(true)

            const response = await Axios({
                ...SummaryApi.addTocart,
                data: {
                    productId: data?._id
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchCartItem) {
                    fetchCartItem()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }

    }

    //checking this item in cart or not
    useEffect(() => {
        const product = cartItem.find(item => item.productId._id === data._id)
        setIsAvailableCart(!!product)
        setCartItemsDetails(product)

        // Only update local qty from Redux if we aren't currently debouncing an optimistic update
        if (product && !isUpdatingRef.current) {
            setQty(product.quantity)
            qtyRef.current = product.quantity
        } else if (!product) {
            setQty(0)
            qtyRef.current = 0
        }
    }, [data, cartItem])

    const changeQuantity = (newQty) => {
        setQty(newQty);
        qtyRef.current = newQty;

        isUpdatingRef.current = true;
        if (updateTimerRef.current) clearTimeout(updateTimerRef.current);

        updateTimerRef.current = setTimeout(async () => {
            try {
                await updateCartItem(cartItemDetails?._id, newQty)
            } catch (error) {
                console.error(error)
            } finally {
                isUpdatingRef.current = false;
            }
        }, 500);
    }

    const increaseQty = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (qtyRef.current >= data?.stock) {
            return
        }

        const newQty = qtyRef.current + 1;
        changeQuantity(newQty);
    }

    const decreaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (qtyRef.current === 1) {
            isUpdatingRef.current = true;
            try {
                await deleteCartItem(cartItemDetails?._id)
            } catch (error) {
                console.error(error)
            } finally {
                isUpdatingRef.current = false;
            }
            return
        }

        const newQty = qtyRef.current - 1;
        changeQuantity(newQty);
    }

    return (
        <div className='w-full max-w-[150px]'>
            {
                isAvailableCart ? (
                    <div className='flex w-full h-full'>
                        <button onClick={decreaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center' ><FaMinus /></button>

                        <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>{qty}</p>

                        <button onClick={increaseQty} className={`${qty >= data?.stock ? "opacity-50" : "opacity-100"} bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center`} disabled={qty >= data?.stock}><FaPlus /></button>
                    </div>
                ) : (
                    data?.stock === 0 ? (
                        <button className='bg-red-600 text-white px-2 lg:px-4 py-1 rounded w-full' disabled>
                            Out of Stock
                        </button>
                    ) : (
                        <button onClick={handleADDTocart} className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded w-full'>
                            {loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : "Add"}
                        </button>
                    )
                )
            }

        </div>
    )
}

export default AddToCartButton