import React, { useState } from 'react'

import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../context/AppContext'


const Address = () => {


    const { shippingAddress, useraddress } = useContext(AppContext)

    const navigate = useNavigate()
    const [formData, setformData] = useState({
        fullName: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        phoneNumber: ""
    })


    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setformData({ ...formData, [name]: value })
    }
    const { fullName, address, city, state, country, pincode, phoneNumber } = formData

    const submitHandler = async (e) => {
        e.preventDefault();

        // alert("your form has been submited")
        // console.log(formData)
        // alert(formData)
        const result = await shippingAddress(fullName, address, city, state, country, pincode, phoneNumber)

        console.log("address addred", result)


        if (result.success) {
            navigate('/checkout')
        }
        // console.log(formData)

        setformData({
            fullName: "",
            address: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
            phoneNumber: ""
        })

    }
    return (
        <>
            <div className="container my-3 p-5" style={{ border: "2px solid yellow", borderRadius: "10px" }}>
                <h1 className='text-center'>Shipping address</h1>

                <form className='my-3' onSubmit={submitHandler}>

                    <div className="row">
                        <div className="mb-3 col-md-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                            <input name='fullName' value={formData.fullName} onChange={onChangeHandler} type="text" className="form-control bg-dark text-light" id="exampleInputEmail77" aria-describedby="emailHelp" />

                        </div>


                        <div className="mb-3 col-md-4">
                            <label htmlFor="country" className="form-label">country</label>
                            <input name='country' value={formData.country} onChange={onChangeHandler} type="text" className="form-control bg-dark text-light" id="country" aria-describedby="emailHelp" />

                        </div>
                        <div className="mb-3 col-md-4">
                            <label htmlFor="state" className="form-label">State</label>
                            <input name='state' value={formData.state} onChange={onChangeHandler} type="text" className="form-control bg-dark text-light" id="state" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col-md-4">
                            <label htmlFor="city" className="form-label">city</label>
                            <input name='city' value={formData.city} onChange={onChangeHandler} type="text" className="form-control bg-dark text-light" id="city" aria-describedby="emailHelp" />

                        </div>




                        <div className="mb-3 col-md-4">
                            <label htmlFor="pincode" className="form-label">pincode</label>
                            <input name='pincode' value={formData.pincode} onChange={onChangeHandler} type="number" className="form-control bg-dark text-light" id="pincode" aria-describedby="emailHelp" />

                        </div>
                        <div className="mb-3 col-md-4">
                            <label htmlFor="PhoneNumber" className="form-label">PhoneNumber</label>
                            <input name='phoneNumber' value={formData.phoneNumber} onChange={onChangeHandler} type="number" className="form-control bg-dark text-light" id="PhoneNumber" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 ">
                            <label htmlFor="address" className="form-label">Address near by</label>
                            <textarea name='address' value={formData.address} onChange={onChangeHandler} type="text" className="form-control bg-dark text-light" id="address" />
                        </div>

                    </div>




                    <div className='d-grid col-6 mx-auto my-3'>
                        <button type="submit" className="btn btn-primary"style={{fontWeight:"bold"}}>submit</button>
                    </div>

                </form>
                {useraddress && (
                    <div className="d-grid col-6 mx-auto my-3">
                        <button className="btn btn-warning" onClick={()=>navigate('/checkout')}style={{fontWeight:"bold"}}>use old address</button>
                    </div>

                )
                }










            </div>






        </>
    )
}

export default Address
