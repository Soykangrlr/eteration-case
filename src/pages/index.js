import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import ProductDetail from './ProductDetail/productDetail'

function Index() {
    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/product/:id' element={<ProductDetail/>}/>
        </Routes>
    )
}

export default Index
