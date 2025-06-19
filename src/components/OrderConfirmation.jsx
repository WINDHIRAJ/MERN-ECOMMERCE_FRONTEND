import React from 'react'
import AppContext from '../context/AppContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ShowOrderProduct from './ShowOrderProduct'

const OrderConfirmation = () => {
    const { userOrder } = useContext(AppContext)
    const [LatestOrder, setLatestOrder] = useState([])
    useEffect(() => {
        if (userOrder) {
            setLatestOrder(userOrder[0]);
        }

    }, [userOrder])
    console.log("latest order", LatestOrder)

    return (
        <>
            <div className="container my-3">
                <h1 className='text-center'>your order has been confirm </h1>
                <h3 className='text-center'>it will deliver soon
                </h3>
            </div>


            <div className="container">


                <table className="table table-bordered border-primary bg-dark">
                    <thead className="bg-dark">
                        <tr>
                            <th scope="col" className="bg-dark text-light text-center">
                                OrderItems
                            </th>

                            <th scope="col" className="bg-dark text-light text-center">
                                Order deatils and Shipping Address
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-dark">
                        <tr>
                            <td className="bg-dark text-light">
                                {/* <TableProduct cart={cart} /> */}


                                <ShowOrderProduct items={LatestOrder?.orderItems} />
                            </td>
                            <td className="bg-dark text-light">
                                <ul style={{ fontWeight: "bold" }}>

                                    <li>OrderId : {LatestOrder?.orderId}</li>
                                    <li>PaymentId: {LatestOrder?.paymentId}</li>
                                    <li>Paymentstatus: {LatestOrder?.
                                        payStatus
                                    }</li>

                                    <li>Name : {LatestOrder?.userShipping?.fullName}</li>
                                    <li>Phone : {LatestOrder?.userShipping?.phoneNumber}</li>
                                    <li>Country : {LatestOrder?.userShipping?.country}</li>
                                    <li>State : {LatestOrder?.userShipping?.state}</li>
                                    <li>PinCode : {LatestOrder?.userShipping?.pincode}</li>
                                    <li>Near By : {LatestOrder?.userShipping?.address}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* <div className="container text-center my-5">
                <button
                    className="btn btn-secondary btn-lg"
                    style={{ fontWeight: "bold" }}
                >Procced to pay

                </button>
            </div> */}

        </>

    )
}

export default OrderConfirmation
