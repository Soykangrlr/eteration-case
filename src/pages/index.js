import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import ProductDetail from './ProductDetail/productDetail'
import NotFoundPage from './NotFoundPage'

function Index() {
    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/product/:id' element={<ProductDetail/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    )
}

export default Index
