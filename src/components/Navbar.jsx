import React, { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AppContext from '../context/AppContext'



const Navbar = () => {
    const [searchTerm, setsearchTerm] = useState(" ")
    const navigate = useNavigate()
    const location = useLocation()

    const { setfilterdata, products, logout, isAuthenticated, cart } = useContext(AppContext)


    // console.log("user cart=",cart)



  const filterbyCategory = (cat) => {
    setfilterdata(products.filter(
        (data) => (data?.category?.toLowerCase() || '') === cat.toLowerCase()
    ));
};
   const filterbyPrice = (price) => {
    setfilterdata(products.filter((data) => data.price >= price));
}


    const submitHandler = (e) => {
        e.preventDefault();
        navigate(`/product/search/${searchTerm}`)
        setsearchTerm(" ")


    }
    return (
        <>
            <div className="nav sticky-top">
                <div className="nav_bar ">

                    <Link to={"/"} className="left" style={{ textDecoration: 'none', color: 'white' }}>
                        <h3>MERN E- COMMERCE</h3>
                    </Link>
                    <form className="search_bar" onSubmit={submitHandler} >
                        <span className="material-symbols-outlined">
                            search
                        </span>
                        <input type="text" value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)} name="" id="" placeholder='Search products.....' />
                    </form>
                    <div className="right ">
                        {isAuthenticated && (
                            <>


                                <Link to={'/cart'} type="button" className="btn btn-primary position-relative mx-3">
                                    <span className="material-symbols-outlined">
                                        shopping_cart
                                    </span>
                                    {cart?.items?.length > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {cart?.items?.length}
                                            <span className="visually-hidden">unread messages</span>
                                        </span>

                                    )}
                                </Link>                                <Link to={'/profile'} className="btn btn-info mx-3">profile</Link>
                                <button className="btn btn-danger mx-3" onClick={() => {
                                    logout();
                                    navigate("/");
                                }}>logout</button>
                            </>



                        )}

                        {!isAuthenticated && (
                            <>

                                <Link to={"/login"} className="btn btn-secondary mx-3">login</Link>
                                <Link to={"/register"} className="btn btn-warning mx-3">register</Link>
                            </>

                        )}




                    </div>

                </div>

                {location.pathname == '/' && (


                    <div className="sub_bar">
                        <div className="items" onClick={() => setfilterdata(products)}>NO Filter</div>
                        <div className="items" onClick={() => filterbyCategory("mobiles")}>Mobiles</div>
                        <div className="items" onClick={() => filterbyCategory("Laptops")}>Laptops</div>
                        <div className="items" onClick={() => filterbyCategory("cameras")}>Cameras</div>
                        <div className="items" onClick={() => filterbyCategory("headphones")}>Headphones</div>
                        <div className="items" onClick={() => filterbyPrice(15999)}>15999</div>
                        <div className="items" onClick={() => filterbyPrice(25999)}>25999</div>
                        <div className="items" onClick={() => filterbyPrice(49999)}>49999</div>
                        <div className="items" onClick={() => filterbyPrice(69999)}>69999</div>
                        <div className="items" onClick={() => filterbyPrice(89999)}>89999</div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Navbar

