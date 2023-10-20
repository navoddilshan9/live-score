import logo from './logo.svg'
import './App.css'

import { useEffect, useRef, useState } from 'react'
import ScoreCard from './ScoreCard'

function App() {
  const wsRef = useRef(null)
  const [liveScore, setLiveScore] = useState(null)
  useEffect(() => {
    const WEB_SOCKET_URL =
      'wss://bzkg9tjte7.execute-api.ap-south-1.amazonaws.com/production'
    wsRef.current = new WebSocket(WEB_SOCKET_URL)

    wsRef.current.onopen = () => {
      console.log('opened')
      const data = { action: 'sendMessage', message: 'hello server' }
      wsRef.current.send(JSON.stringify(data))
    }

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.score.length > 0) {
        setLiveScore(data.score)
      }
    }

    wsRef.current.onclose = (event) => {
      console.log('WebSocket connection closed:', event)
    }

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  useEffect(() => {
    console.log(liveScore)
  }, [liveScore])
  return (
    <div className='App'>
      {liveScore ? (
        liveScore?.map((match, index) => {
          return <ScoreCard matchData={match} key={index} />
        })
      ) : (
        <h1>Loading</h1>
      )}
      {}
    </div>
  )
}

export default App
