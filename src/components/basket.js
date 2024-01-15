import React from 'react'
import { SelectAllProducts, addBasket, removeBasket } from '../store/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'

function Basket() {
    const {basket}=useSelector(state=>SelectAllProducts(state))
    
    const dispatch=useDispatch()
    function totalPrice(basket){
        return basket.reduce((total, item) => total + item.price * item.count, 0);
    }
    function BasketItem(props){
        const {item}=props
        return(
            <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
                <span className='text-sm'>{item.model} {item.brand}</span>
                <span className='text-xs text-brand -mt-1 font-light'>{item.price}&#x20BA;</span>
            </div>
            <div className='flex'>
                <button  onClick={()=>dispatch(removeBasket(item))} className='bg-gray-100 py-1  w-[30px] text-center  hover:bg-brand hover:text-blue-50'>-</button>
                <span  className='bg-brand py-1 w-[30px] text-center text-white'>{item.count }</span>
                <button onClick={()=>dispatch(addBasket(item))} className='bg-gray-100 py-1  w-[30px]  hover:bg-brand hover:text-blue-50'>+</button>
            </div>
        </div>
        )
    }
    return (
        <div className='w-full '>
            <div className='flex flex-col gap-y-5  bg-white p-5 shadow-none md:shadow-md'>
                {basket.length===0&& <p className='text-xs'>Sepette ürün bulunmamaktadır.</p>}
             {basket.map((item,index)=>(
                <BasketItem item={item} key={index}/>
             ))}

            </div>
            <div className='md:mt-12 mt-2 bg-white p-5 shadow-none md:shadow-md flex flex-col gap-y-5'>
                <p className='font-semibold'>Total Price : <span className='text-brand font-semibold'>{basket.length===0?<span>0&#x20BA;</span>:<span>{totalPrice(basket).toFixed(3)}&#x20BA;</span>}</span></p>
                <button className='w-full bg-brand text-white py-1'>Checkout</button>
            </div>
        </div>
    )
}

export default Basket
