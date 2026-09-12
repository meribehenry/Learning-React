import axios from "axios"
import { formatMoney } from "../../utils/money"
import { useState } from "react"

export const CartItemDetails = ({cartItem, loadCart}) => {
    const [updating, setUpdating] = useState(false)
    const [quantity, setQuantity] = useState()

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`)
        await loadCart()
    }

    const changeUpdating = async () => {
        setUpdating(true)

        if (updating === true) {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: Number(quantity)
            })

            await loadCart()
            setUpdating(false)
        }
    }
    const changeQuantity = (event) => {
        setQuantity(Number(event.target.value))
    }

    const checkKeyType = (event) => {
        if (event.key === "Enter") {
            changeUpdating()
        }

        if (event.key === "Escape") {
            setUpdating(false)
        }
    }

    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    ${formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity: {updating && <input onKeyDown={checkKeyType} value={quantity} onChange={changeQuantity} type="number" className="product-quantity-input" />} 
                        <span className="quantity-label">{cartItem.quantity}</span>
                    </span>
                    <span onClick={changeUpdating} className="update-quantity-link link-primary">
                        Update
                    </span>
                    <span onClick={deleteCartItem} className="delete-quantity-link link-primary">
                        Delete
                    </span>
                </div>
            </div>
        </>
        )
}