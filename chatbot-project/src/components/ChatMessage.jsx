import RobotProfileImage from '../assets/default.png'
import UserProfileImage from '../assets/henry.jpg'
import './ChatMessage.css'

export const ChatMessage = (props) => {
    const message = props.message
    const sender = props.sender
    const time = props.time
    const id = props.id

    
    return (
    <div className={sender === "user" ? "chat-message-user": "chat-message-robot"} id={id}>
        {sender === "robot" && <img src={RobotProfileImage} alt="" className="chat-message-profile-robot"/>}
        <div className="chat-message-text-container">
            <p className='chat-message-text'>{message}</p>
            <p className='chat-message-time'>{time}</p>
        </div>
        {sender === "user" && <img src={UserProfileImage} alt="" className="chat-message-profile-user"/>}
        
    </div>
    )
}