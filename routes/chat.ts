import express from 'express';
const app =express();
import http from 'http';
const server =http.createServer(app);
import {Server} from "socket.io";
const io=new Server(server);


app.get('/chat', (req,res)=>{

    res.sendFile(__dirname+"/index.html")
});

io.on('connection',(socket)=>{
    console.log('a user in connected!');
    socket.emit("hello");
});

app.listen(3000,);