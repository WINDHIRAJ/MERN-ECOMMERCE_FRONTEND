import React, { useEffect, useState } from 'react'


const ShowOrderProduct = ({ items }) => {

    
    const [qty, setqty] = useState(0)
    const [price, setprice] = useState(0)

    useEffect(() => {
        let qty = 0;
        let price = 0;
        if (items) {
            for (let i = 0; i < items?.length; i++) {
                qty += items[i].qty
                price += items[i].price
            }
        }
        setprice(price)
        setqty(qty)
    }, [items])

    return (
        <>
            <table className="table text-center table-dark table-bordered border-primary bg-dark">
                <thead>
                    <tr>
                        <th scope="col">Product Img</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope='col'>Qty</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {items?.map((product) => (

                        <tr key={product._id}>
                            <th scope="row">
                                <img src={product.imgSrc} alt="" style={{ width: "50px", height: "50px" }} />
                            </th>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.qty}</td>
                          
                        </tr>

                    ))}
                    <tr>
                     
                        <th scope="row" className='bg-dark text-light'>
                        <td className='bg-dark text-light'>
                        {" "}
                        </td>
                        </th>
                        <td>
                            <button className='btn btn-primary' style={{ fontWeight: "bold" }}>Total</button>
                        </td>
                        <td>
                            <button className='btn btn-warning' style={{ fontWeight: "bold" }}>{price}</button>
                        </td>
                        <td>
                            <button className='btn btn-info' style={{ fontWeight: "bold" }}>{qty}</button>
                        </td>
                        
                    </tr>


                </tbody>
            </table>

        </>

    )
}

export default ShowOrderProduct
