import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import env from ''


const AppState = (props) => {
    // const url = "http://localhost:1000/api"
    const url = "https://mern-e-commerce-api-project-1.onrender.com"

    
    const [products, setproducts] = useState([])
    const [token, settoken] = useState([])
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [filterdata, setfilterdata] = useState([])
    const [user, setuser] = useState()
    const [cart, setcart] = useState([])
    const [reload, setreload] = useState(false)
    const [useraddress, setuseraddress] = useState("")
    const [userOrder, setuserOrder] = useState([])




    useEffect(() => {
        const fetchProduct = async () => {
            const api = await axios.get(`${url}/product/all`, {
                headers: {
                    "Content-Type": "Application/json"
                },
                withCredentials: true
            })
            // console.log(api.data.products)
            setproducts(api.data.products)
            setfilterdata(api.data.products)
            userProfile();

        }
        fetchProduct()
        userCart()
        getAddress()
        user_Order()
    }, [token, reload])



    useEffect(() => {
        let lstoken = localStorage.getItem('token')
        //  settoken(localStorage.getItem("token"))
        if (lstoken) {
            settoken(lstoken)
            setisAuthenticated(true)

        }
        settoken(lstoken)
        // console.log("ls token",lstoken)
    }, [])


    // register user

    const register = async (name, email, password) => {
        const api = await axios.post(`${url}/user/register`, { name, email, password }, {
            headers: {
                "Content-Type": "Application/json"
            },
            withCredentials: true
        })
        // alert(api.data.message)
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        return api.data
        // console.log("user register",api)

    }


    // login user
    const login = async (email, password) => {
        const api = await axios.post(`${url}/user/login`, { email, password }, {
            headers: {
                "Content-Type": "Application/json"
            },
            withCredentials: true
        })
        // alert(api.data.message)
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        //  console.log("user login",api.data)
        settoken(api.data.token)
        setisAuthenticated(true)
        localStorage.setItem("token", api.data.token)
        return api.data


    }

    // logout user

    const logout = () => {
        setisAuthenticated(false)
        settoken(" ")
        localStorage.removeItem('token')
        toast.success('logout scucessfully...', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }


    // user profile
    const userProfile = async () => {
        const api = await axios.get(`${url}/user/profile`, {
            headers: {
                "Content-Type": "Application/json",
                "Auth": token
            },
            withCredentials: true
        })
        setuser(api.data.user)

    }

    // add To Cart
    const addToCart = async (productId, title, price, qty, imgSrc) => {
        // console.log("product id = ", productId);
        const api = await axios.post(
            `${url}/cart/add`,
            { productId, title, price, qty, imgSrc },
            {
                headers: {
                    "Content-Type": "Application/json",
                    Auth: token,
                },
                withCredentials: true,
            }
        );
        setreload(!reload);
        //  console.log("my cart ",api)
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    };


    // user Cart
    const userCart = async () => {
        const api = await axios.get(`${url}/cart/user`, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token,
            },
            withCredentials: true,
        });
        //  console.log("user cart ",api.data.cart);
        setcart(api.data.cart);
        //  setUser("user cart ",api);
    };


    // --qty

    const decreseQty = async (productId, qty) => {
        const api = await axios.post(`${url}/cart/--qty`, {
            productId, qty

        }, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token,
            },
            withCredentials: true,
        });
        setreload(!reload)
        console.log("drecrese cart items ", api);

        // setcart(api.data.cart);
        //  setUser("user cart ",api);
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    };


    // remove from cart
    const removeFromCart = async (productId, qty) => {
        const api = await axios.delete(`${url}/cart/remove/${productId}`, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token,
            },
            withCredentials: true,
        });
        setreload(!reload)
        // console.log("drecrese cart items ", api);

        // setcart(api.data.cart);
        //  setUser("user cart ",api);
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    };


    // clear cart
    const clearCart = async () => {
        const api = await axios.delete(`${url}/cart/clear`, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token,
            },
            withCredentials: true,
        });
        setreload(!reload)
        // console.log("drecrese cart items ", api);

        // setcart(api.data.cart);
        //  setUser("user cart ",api);
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    };

    // add shipng address
    const shippingAddress = async (fullName,
        address,
        city,
        state,
        country,
        pincode,
        phoneNumber) => {
        const api = await axios.post(`${url}/address/add`, {
            fullName,
            address,
            city,
            state,
            country,
            pincode,
            phoneNumber
        }, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token,
            },
            withCredentials: true,
        });
        setreload(!reload)
        // console.log("drecrese cart items ", api);

        // setcart(api.data.cart);
        //  setUser("user cart ",api);
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        return api.data
    };

    // get userlatest address
    const getAddress = async () => {
        const api = await axios.get(`${url}/address/get`, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token
            },
            withCredentials: true
        })
        // console.log("useraddress",api.data.userAddress)
        setuseraddress(api.data.userAddress)


    }
    // get user order
    const user_Order = async () => {
        const api = await axios.get(`${url}/payment/userorder`, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token
            },
            withCredentials: true
        })
        // console.log("user_order",api.data)
        setuserOrder(api.data)



    }
    // console.log("userorders",userOrder)


    return (
        <AppContext.Provider value={{
            products,
            register,
            login,
            token,
            setisAuthenticated,
            isAuthenticated,
            filterdata,
            setfilterdata,
            logout,
            user,
            addToCart,
            cart,
            decreseQty,
            removeFromCart,
            clearCart,
            shippingAddress,
            useraddress,
            url,
            userOrder




        }}>
            {props.children}

        </AppContext.Provider>
    )
}

export default AppState
