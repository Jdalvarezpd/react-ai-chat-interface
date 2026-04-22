import { useChat } from './hooks/useChat'
import ChatWidget from './components/ChatWidget'

function App() {
  const chatState = useChat();

  return (
    <div className="app-container" style={{
      width: '100vw',
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <ChatWidget chatState={chatState} />
    </div>
  )
}

export default App
