import express from 'express';
const app=express();
const router =express.Router();
import http from 'http';
const server =http.createServer(app);
import {Server} from "socket.io";
const io=new Server(server);
import User from "../models/user.model";
import Token from "../models/tokens.model";


const port =4000;

app.get('/chats', (req,res)=>{
    res.sendFile(__dirname+"/index.html")
    
});

io.on('connection', async (socket) => {
  try{

      const username = socket.handshake.headers.username;
      const password=socket.handshake.headers.password;
      const userDetails= await User.findOne({username});
      
  //Have to implement authantication here then have to emit message 
  // console.log(userDetails);

      if(userDetails){
        const {_id}=userDetails;
        const token= await Token.findOne({_id});
        if(token){
          await User.create({socketId:socket.id});
          socket.on('chat message', (msg) => {
          io.emit('chat message', msg);
          console.log(msg);
          });
          console.log(`${username} connected`);
        }
      }
      else{

      }
  }
  catch{


  }
    
  });


server.listen(port,()=>{
    console.log(`HTTP Server is running on port ${port}`);
});

export default router;