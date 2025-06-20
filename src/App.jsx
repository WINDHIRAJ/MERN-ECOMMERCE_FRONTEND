import React, { useContext } from 'react'
import AppContext from './context/AppContext'
import ShowProduct from './components/product/ShowProduct'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductDetails from './components/product/ProductDetails'
import Navbar from './components/Navbar'
import SearchProduct from './components/product/SearchProduct'
import Register from './components/user/Register'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/user/Login'
import Profile from './components/user/Profile'
import Cart from './components/Cart'
import Address from './components/Address'
import Checkout from './components/Checkout'
import OrderConfirmation from './components/OrderConfirmation'


const App = () => {
  // const {  } = useContext(AppContext)
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>

          <Route path='/' element={<ShowProduct />} />
          <Route path='/product/search/:term' element={<SearchProduct />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login/>}  />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/shipping' element={<Address/>}   />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='/orderConfirmation'element={<OrderConfirmation />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
