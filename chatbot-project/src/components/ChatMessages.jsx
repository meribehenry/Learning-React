import { ChatMessage } from "./ChatMessage";
import { useRef, useEffect } from 'react'
import './ChatMessages.css'

function useAutoScroll(dependencies) {
    const Ref = useRef(null);

    useEffect(() => {
        const containerElem = Ref.current
        if (containerElem) {
        containerElem.scrollTop = containerElem.scrollHeight
        }
    }, [dependencies])

    return Ref
    }

const ChatMessages = ({chatMessages}) => {

    const chatMessagesRef = useAutoScroll(chatMessages)

    return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
    {chatMessages.length !== 0 &&

        chatMessages.map((chatMessage) => {
        return (<ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
            time={chatMessage.time}
            />
        );
        })

    } 


    {chatMessages.length === 0 && <p className="empty-chat-text">Welcome to BCHAT-BOT, Send a message using the text box below</p>}
    </div>
    )
}

export default ChatMessages