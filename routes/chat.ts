import express from 'express';
const app=express();
const router =express.Router();
import http from 'http';
const server =http.createServer(app);
import {Server} from "socket.io";
const io=new Server(server);
import jwt from "jsonwebtoken";


const port =4000;

app.get('/chats', (req,res)=>{
    res.sendFile(__dirname+"/index.html")
    
});

io.use( async (socket, next) => {
  try{
    // console.log(socket);
      const token = socket.handshake.headers.authorization;
 
      if(!token){
        return next(new Error('Authentication error'));
        
      }
      const decoded = jwt.verify(token, 'Anurag');
        socket.data=decoded;
        // console.log(socket.data.username);
        return next();
  }
  catch{
    return "Internal server error!";
  } 
  });

  io.on('connection',  (socket)=>{
    const {username}=socket.data;

    console.log(`User ${username} connected!`);

    socket.on('message', (msg)=>{

        socket.to(socket.id).emit(msg);
        
      // io.sockets.emit('new message', msg);

      console.log(`User ${username} send : ${msg}`);
    })
  });

server.listen(port,()=>{
    console.log(`HTTP Server is running on port ${port}`);
});

export default router;