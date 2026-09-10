import {useState} from "react"
import "./Inputs.css"


export const Inputs = () => {
    const [showPassword, setShowPassword] = useState(false)

    function handlePasswordField () {
        setShowPassword(showPassword === true ? false: true)
    }
    return (
        <div className="input-container">
            <input className="input-field" placeholder="Email"/>
            <div className="input-password-container">
                <input className="input-field" type={showPassword === false ? "password": "text"} placeholder="Password"/>
                <button onClick={handlePasswordField}>
                    {showPassword === false ? "Show": "Hide"}
                </button>
            </div>
        </div>
    )
    }