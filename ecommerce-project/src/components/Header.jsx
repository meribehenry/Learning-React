import { Link, NavLink } from "react-router"
import "./Header.css"
import Logo from "../assets/images/logo-white.png"
import MobileLogo from "../assets/images/mobile-logo-white.png"
import SearchIcon from "../assets/images/icons/search-icon.png"
import CartIcon from "../assets/images/icons/cart-icon.png"
import { useState } from "react"
import { useNavigate } from "react-router"


export const Header = ({cart, search}) => {
    const navigate = useNavigate()
    const [text, setText] = useState(search)

    const changeText = (event) => {
        setText(event.target.value)
    }

    const handleSearch = () => {
        navigate(`/?search=${text}`)
    }

    let totalQuantity = 0;
    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity
    }
    )
    return (
        <div className="header">
            <div className="left-section">
                <NavLink  to="/" className="header-link">
                <img className="logo"
                    src={Logo} />
                <img className="mobile-logo"
                    src={MobileLogo}/>
                </NavLink >
            </div>

            <div className="middle-section">
                <input onChange={changeText} value={text} className="search-bar" type="text" placeholder="Search" />

                <button onClick={handleSearch} className="search-button">
                <img className="search-icon" src={SearchIcon} />
                </button>
            </div>

            <div className="right-section">
                <NavLink  className="orders-link header-link" to="/orders">

                    <span className="orders-text">Orders</span>
                </NavLink >

                <NavLink  className="cart-link header-link" to="/checkout">
                <img className="cart-icon" src={CartIcon} />
                <div className="cart-quantity">{totalQuantity}</div>
                <div className="cart-text">Cart</div>
                </NavLink >
            </div>
        </div>
    )
}