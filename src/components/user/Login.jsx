import React, { useState } from 'react'
import AppContext from '../../context/AppContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const { login } = useContext(AppContext)

    const navigate = useNavigate()
    const [formData, setformData] = useState({

        email: "",
        password: ""
    })


    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setformData({ ...formData, [name]: value })
    }
    const { email, password } = formData

    const submitHandler = async (e) => {
        e.preventDefault();

        // alert("your form has been submited")
        const result = await login( email, password)




        if (result.success) {
            navigate('/')
        }
        // console.log(formData)

    }
    return (
        <>
            <div className="container my-5 p-5" style={{ width: "600px", border: "2px solid yellow", borderRadius: "10px" }}>
                <h1 className='text-center'>User Login</h1>

                <form className='my-3' onSubmit={submitHandler}>




                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
                        <input name='email' value={formData.email} onChange={onChangeHandler} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input name='password' value={formData.password} onChange={onChangeHandler} type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className='d-grid col-6 mx-auto my-3'>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>

                </form>









            </div>






        </>
    )
}

export default Login
