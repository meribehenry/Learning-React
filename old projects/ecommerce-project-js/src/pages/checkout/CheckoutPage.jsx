import "./CheckoutPage.css"
import { CheckoutHeader } from "./CheckoutHeader"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { OrderSummary } from "./OrderSummary"
import { PaymentSummary } from "./PaymentSummary"


export const CheckoutPage = ({ cart, loadCart}) => {
    const [deliveryOptions, setDeliveryOptions] = useState([])
    const [paymentSummary, setPaymentSummary] = useState(null)

    useEffect(() => {
        const getDeliveryOptions = async () => {
            const response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
            setDeliveryOptions(response.data)

        }
        getDeliveryOptions()

    }, [])

        useEffect(() => {
        const getPaymentSummary = async () => {

            const response = await axios.get("/api/payment-summary")
            setPaymentSummary(response.data)
        }
        
        getPaymentSummary()
    }, [cart])

    return (
        <>
            <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
            <title>Checkout</title>
            <CheckoutHeader />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart}/>
                    <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>


                </div>
            </div>
        </>
    )
}