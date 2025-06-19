import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'

const TableProduct = ({ cart }) => {

    const { decreseQty, addToCart, removeFromCart, clearCart } = useContext(AppContext)
    const [qty, setqty] = useState(0)
    const [price, setprice] = useState(0)

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

    return (
        <>
            <table className="table text-center table-dark table-bordered border-primary bg-dark">
                <thead>
                    <tr>
                        <th scope="col">Product Img</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope='col'>Qty</th>
                        <th scope="col">Qty++</th>
                        <th scope="col">Qty--</th>
                        <th scope="col">remove</th>
                    </tr>
                </thead>
                <tbody>
                    {cart?.items?.map((product) => (

                        <tr key={product._id}>
                            <th scope="row">
                                <img src={product.imgSrc} alt="" style={{ width: "50px", height: "50px" }} />
                            </th>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.qty}</td>
                            <td>
                                <span className="material-symbols-outlined"onClick={() => addToCart(
                                product?.productId,
                                product.title,
                                product.price /
                                product.qty,
                                1,
                                product.imgSrc)}>
                                    add_circle
                                </span>
                            </td>
                            <td>
                                <span className="material-symbols-outlined" onClick={() => decreseQty(product.productId, 1)}>
                                    do_not_disturb_on
                                </span>
                            </td>
                            <td>
                                <span className="material-symbols-outlined"onClick={() => {
                                if (confirm("are you sure want to remove from cart")) {

                                    removeFromCart(product?.productId)
                                }

                            }
                            }>
                                    delete
                                </span>
                            </td>
                        </tr>

                    ))}
                    <tr >
                        <th scope="row" className='bg-dark text-light'>
                        <td className='bg-dark text-light'>
                        {" "}
                        </td>
                        </th>
                        <td></td>
                        <td>
                            <button className='btn btn-primary' style={{ fontWeight: "bold" }}>Total</button>
                        </td>
                        <td>
                            <button className='btn btn-warning' style={{ fontWeight: "bold" }}>{price}</button>
                        </td>
                        <td>
                            <button className='btn btn-info' style={{ fontWeight: "bold" }}>{qty}</button>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>


                </tbody>
            </table>

        </>

    )
}

export default TableProduct
