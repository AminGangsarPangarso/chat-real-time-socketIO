import React, { useEffect,useState } from 'react'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001")
import './App.css'

function App() {

  const [message ,setMessage] = useState("")
  const [room,setRoom] = useState("")
  const [messsageReceived ,setMesssageReceived] = useState("")

  const handleSend = () =>{
    socket.emit("send_message",{message , room})
  }

  const joinRoom = () =>{
    if(room !== "") {
      socket.emit("join_room",room)
    }
  }

  useEffect(()=> {
    socket.on('receive_message',(data)=>{
      setMesssageReceived(data.message)
    })
  },[socket])

  return (
    <>
      <div>
        <input onChange={(e)=>setRoom(e.target.value)} placeholder='Room Number' />
        <button onClick={joinRoom}>Join</button>
        <input type="text" placeholder='Send Massage' onChange={(e)=>{setMessage(e.target.value)}} />
        <button onClick={handleSend}>Send</button>
        <p>message: {messsageReceived}</p>
       </div>
    </>
  )
}

export default App
