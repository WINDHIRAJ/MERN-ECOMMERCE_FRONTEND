import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import TableProduct from "./TableProduct";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, useraddress, url, user, clearCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  const handlePayment = async () => {
    try {
      // Debug log
      // console.log("Sending payment data:", {
      //   amount: price,
      //   qty: qty,
      //   cartItems: cart?.items,
      //   userShipping: useraddress,
      //   userId: user._id,
      // });

      const orderRepons = await axios.post(
        `${url}/payment/checkout`,
        {
          amount: price,
          qty: qty,
          cartItems: cart?.items,
          userShipping: useraddress,
          userId: user._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Order response:", orderRepons);
      const { orderId, amount: orderAmount } = orderRepons.data

      var options = {
        key: 'rzp_test_1qn1pWteS76Glh', // Enter the Key ID generated from the Dashboard
        amount: orderAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "web dev", //your business name
        description: "web dev",

        order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler:async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: user._id,
            userShipping: useraddress
          }


          const api =await axios.post(`${url}/payment/verify-payment`, paymentData);

          console.log("razorpay responce", api.data)
          if (api.data.success) {
            clearCart()
            navigate('/orderconfirmation')


          }


        },
        prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          "name": "web dev", //your customer's name
          "email": "webdev@example.com",
          "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
        },
        notes: {
          "address": "pune"
        },
        theme: {
          "color": "#3399cc"
        }
      };
      const rzp = new window.Razorpay(options)
      rzp.open();


    } catch (error) {
      // Check if there's a response from the server
      console.log(error)
    }
  };


  return (
    <>
      <div className="container  my-3">
        <h1 className="text-center">Order Summary</h1>

        <table className="table table-bordered border-primary bg-dark">
          <thead className="bg-dark">
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                Product Details
              </th>

              <th scope="col" className="bg-dark text-light text-center">
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark">
            <tr>
              <td className="bg-dark text-light">
                <TableProduct cart={cart} />
              </td>
              <td className="bg-dark text-light">
                <ul style={{ fontWeight: "bold" }}>
                  <li>Name : {useraddress?.fullName}</li>
                  <li>Phone : {useraddress?.phoneNumber}</li>
                  <li>Country : {useraddress?.country}</li>
                  <li>State : {useraddress?.state}</li>
                  <li>PinCode : {useraddress?.pincode}</li>
                  <li>Near By : {useraddress?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container text-center my-5">
        <button
          className="btn btn-secondary btn-lg"
          style={{ fontWeight: "bold" }}
          onClick={handlePayment}
        >
          Procced To Pay
        </button>
      </div>
    </>
  );
};

export default Checkout;