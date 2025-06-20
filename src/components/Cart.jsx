import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { useNavigate } from "react-router-dom";



const Cart = () => {

    const { cart, decreseQty, addToCart, removeFromCart, clearCart } = useContext(AppContext)
    const [qty, setqty] = useState(0)
    const [price, setprice] = useState(0)


    const navigate = useNavigate();

    useEffect(() => {
        let qty = 0;
        let price = 0;
        if (cart?.items) {
            for (let i = 0; i < cart.items?.length; i++) {
                qty += cart.items[i].qty
                price += cart.items[i].price
            }
        }
        setprice(price)
        setqty(qty)
    }, [cart])

    // console.log("mycart",cart)
    return (
        <>
            {cart?.items?.length == 0 ? (
                <>
                    <div className="text-center my-5">
                    <button className='btn btn-warning mx-3' style={{ fontWeight: "bold", fontSize: '1.2rem' }} onClick={()=>navigate('/')}>continue shoping.....</button>
                    </div>

                </>

            ) : (
                <>


            
            <div className='my-5 text-center' >

                <button className='btn btn-info mx-3' style={{ fontWeight: "bold", fontSize: '1.2rem' }}>total Qty:-{qty}</button>
                <button className='btn btn-warning mx-3' style={{ fontWeight: "bold", fontSize: '1.2rem' }}>total price:-{price}</button>
            </div>
                </>
            )}
            {cart?.items?.map((product) =>
                <div key={product._id} className='container bg-dark my-5 p-3 text-center'>
                    <div style={{
                        display: 'flex',
                        justifyContent: "space-around",
                        alignItems: "center"
                    }}>
                        <div className="cart_img">
                            <img src={product.imgSrc} alt="" style={{ width: "100px", height: "100px", borderRadius: "10px" }} />

                        </div>
                        <div className="cart_des">
                            <h2>{product.title}</h2>
                            <h4>{product.price}</h4>
                            <h4>qty:-{product.qty}</h4>

                        </div>
                        <div className="cart_action">
                            <button className="btn btn-warning mx-3" style={{ fontWeight: "bold" }} onClick={() => decreseQty(product.productId, 1)}>
                                qty--
                            </button>
                            <button className="btn btn-info mx-3" style={{ fontWeight: "bold" }} onClick={() => addToCart(
                                product?.productId,
                                product.title,
                                product.price /
                                product.qty,
                                1,
                                product.imgSrc)}>
                                Qty++
                            </button>
                            <button className="btn btn-danger mx-3" style={{ fontWeight: "bold" }} onClick={() => {
                                if (confirm("are you sure want to remove from cart")) {

                                    removeFromCart(product?.productId)
                                }

                            }
                            } >
                                Remove
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {cart?.items?.length > 0 && (
                <div className="container text-center my-3">
                    <button className='btn btn-warning mx-3' style={{ fontWeight: "bold" }} onClick={() => navigate('/shipping')}>checkout</button>
                    <button className='btn btn-danger mx-3' style={{ fontWeight: "bold" }} onClick={() => {
                        if (confirm("are you sure want to clear cart .....?")) {
                            clearCart()
                        }
                    }}>clear cart</button>
                </div>

            )}

        </>
    )
}

export default Cart
