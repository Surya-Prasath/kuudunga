const express = require("express")
const app = express()

const http = require("http")
const server = http.createServer(app)

const {Server} = require("socket.io")
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }

})

io.on("connection", (socket)=>{
    console.log(socket.id)
    socket.broadcast.emit("message", "A user has joined the chat")
    socket.emit("message", "Welcome to chat!")


    socket.on("disconnect", ()=>{
        io.emit("message", "A user has left the chat")
    })
})

server.listen(5000, ()=>console.log("Running on port 5000\nhttp://localhost:5000"))


