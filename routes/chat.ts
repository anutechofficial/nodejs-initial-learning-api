import express from 'express';
const app=express();
const router =express.Router();
import http from 'http';
const server =http.createServer(app);
import {Server} from "socket.io";
const io=new Server(server);
import jwt from "jsonwebtoken";
import Tokens from '../models/tokens.model';


const port =4000;

app.get('/chats', (req,res)=>{
    res.sendFile(__dirname+"/index.html")
    
});

io.on('connection', async (socket) => {
  try{
        const token = socket.handshake.headers.authorization;
        if(!token){
        return (new Error('Authentication error')); 
        }
        // else{
          const decoded = jwt.verify(token, 'Anurag');
          socket.data=decoded;
          const {username}=socket.data;
          console.log(`${username} connected`);

          const socketId=socket.id;
        
          await Tokens.findOneAndUpdate({username},{socketId:socketId});
        // }
        socket.on('message', async (msg)=>{
            const username=msg.username;
            const targetUser = await Tokens.findOne({username});
            if(targetUser)
            {
            const {socketId}=targetUser;
            const targetSocketId=socketId as string;
            console.log(`Target User ${username} socket ID:` , socketId);

            socket.to(targetSocketId).emit('message', msg.message);
               console.log(`User send : ${msg.message}`);
            }
            else{
              console.log("Target user not found !")
            }
            });
      }
catch{
     return "Internal server error!";
     } 
  });
      server.listen(port,()=>{
          console.log(`HTTP Server is running on port ${port}`);
      });

export default router;