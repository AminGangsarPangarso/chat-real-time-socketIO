const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const cors = require('cors')

app.use(cors())

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    // socket.on("send_message", (data)=>{
    //     console.log(data)
    // })

    socket.on("join_room",(data)=>{
        socket.join(data)
    })
    socket.on("send_message",(data)=>{
        socket.to(data.room).emit('receive_message',data)
    })

    
})

server.listen(3001, () => {
    console.log('socket io is running again')
})
