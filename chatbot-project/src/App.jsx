import { useState } from 'react'
import { ChatInput } from './components/ChatInput'
import './App.css'
import ChatMessages from './components/ChatMessages'

    
    const App = () => {
      const array = useState(JSON.parse(localStorage.getItem("chatMessages")) || [])
      
      const chatMessages = array[0]
      const setChatMessages = array[1]

      return (
        <div className="app-container">

          <ChatMessages
            chatMessages={chatMessages}
          />
          <ChatInput
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
          />
        </div>
    )
    }

export default App
