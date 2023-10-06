import express from 'express';
const app=express();
const router =express.Router();
import http from 'http';
const server =http.createServer(app);
import {Server} from "socket.io";
const io=new Server(server);


app.get('/chats', (req,res)=>{
    res.sendFile(__dirname+"/index.html")
    
});

io.on('connection', (socket) => {
    socket.on('chat message', msg => {
      io.emit('chat message', msg);
       

    });
    console.log('A user connected');
  });

server.listen(4000,()=>{
    console.log(`HTTP Server is running on port 4000`);
});


export default router;