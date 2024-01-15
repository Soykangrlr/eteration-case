import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SelectAllProducts, addBasket, removeBasket } from '../store/ProductSlice'

function Cart(props) {
    const {item}=props
    const {basket}=useSelector(state=>SelectAllProducts(state))
    const dispatch=useDispatch()
    function handleBasket(item){
      dispatch(addBasket(item))
    }
    function Action(){
      const index = basket.findIndex((basketItem) => basketItem.id === item.id);
      if(index !== -1){
        const item=basket[index]
        return(
         
            <div className='flex justify-center'>
                <button  onClick={(e)=>{
                  e.preventDefault()
                  dispatch(removeBasket(item))}} className='bg-gray-200 py-1  w-[50px] text-center  hover:bg-brand hover:text-blue-50'>-</button>
                <span  className='bg-brand py-1 w-[50px] text-center text-white'>{item.count }</span>
                <button onClick={(e)=>{
                  e.preventDefault()
                  dispatch(addBasket(item))}} className='bg-gray-200 py-1  w-[50px]  hover:bg-brand hover:text-blue-50'>+</button>
            </div>
      
        )
      }
      else{
        return (
          <button onClick={(e)=>{
            e.preventDefault()
            handleBasket(item)}} className='w-full bg-brand py-2 text-white'>Add to Cart</button>
        )
      }
    }
    return (
    <div className=' md:h-[310px] w-full md:max-w-[200px] p-2.5 shadow flex flex-col gap-[15px] '>
        <img className='' src={item.image} alt='product'/>
        <p class="text-brand text-sm font-medium">{item.price} ₺</p>
        <p className='font-semibold text-base h-[48px]'>{item.model} {item.brand}</p>
        <Action id={item.id}/>
       
    </div>
    )
}

export default Cart
