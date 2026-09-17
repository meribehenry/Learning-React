import { useState } from 'react'
import { ChatInput } from './components/ChatInput'
import './App.css'
import ChatMessages from './components/ChatMessages'
import RobotIcon from './assets/default.png'

    
    const App = () => {
      const array = useState(JSON.parse(localStorage.getItem("chatMessages")) || [])
      
      const chatMessages = array[0]
      const setChatMessages = array[1]
      const title = chatMessages.length + " Messages"
      

      return (
        <div className="app-container">
          <link rel="icon" type="image/svg+xml" href={RobotIcon} />
          <title>{title}</title>

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
