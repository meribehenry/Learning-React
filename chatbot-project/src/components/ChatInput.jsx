import { useState, useEffect } from 'react'
import LoadSpinner from '../assets/loading-spinner.gif'
import {Chatbot} from 'supersimpledev'
import dayjs from 'dayjs'
import './ChatInput.css'



export const ChatInput = ({chatMessages, setChatMessages}) => {
    const [inputText, setInputText] = useState("")

    useEffect(() => {
    Chatbot.addResponses(
        {
            "What is your name": "My name is B-CHAT and I love to answer your questions",
            "Who built you": "Meribe Henry built me as a practice project while learning react"
        }
    )
    }, [])


    const time =  dayjs().valueOf()

    function saveInputText(event) {
        setInputText(event.target.value)
    }

    async function sendMessage() {
        const newChatMessages = [
        ...chatMessages,
        {
            message: inputText,
            sender: "user",
            id: crypto.randomUUID(),
            time: dayjs(time).format("HH:mm")
        }
        ]

        localStorage.setItem("chatMessages", JSON.stringify(newChatMessages))
        setChatMessages(newChatMessages);
        setChatMessages([
            ...newChatMessages,
            {
            message: <img className="load-spinner" src={LoadSpinner}/>,
            sender: "robot",
            id: crypto.randomUUID(),
            date: ""
            }

        ]);

        const response = await Chatbot.getResponseAsync(inputText);
        const newChatMessagesWithResponse  = [
        ...newChatMessages,
        {
            message: response,
            sender: "robot",
            id: crypto.randomUUID(),
            time: dayjs(dayjs().valueOf()).format("HH:mm")
        }
        ]
        setChatMessages(newChatMessagesWithResponse);
        setInputText("")
        localStorage.setItem("chatMessages", JSON.stringify(newChatMessagesWithResponse))
    }

    function checkKeyType(event) {
        if (event.key === "Enter") {
            sendMessage(event.target.value)
        }
        
        if (event.key === "Escape") {
            setInputText("")
        }

    }

    function clearMessages() {
        setChatMessages([])
        localStorage.removeItem("chatMessages")
    }

    return (
    <div className="chat-input-container">
    <input 
        type="text" 
        placeholder="Send a message to chatbot" 
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={checkKeyType}
        className="chat-input"
    />
    <button onClick={sendMessage} className="send-button">Send</button>
    <button onClick={clearMessages} className="clear-button">Clear</button>

    </div>
)
};