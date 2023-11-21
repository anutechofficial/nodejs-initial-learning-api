import express from 'express';
import http from 'http';
import {Server} from "socket.io";
import jwt from "jsonwebtoken";
import Tokens from '../models/tokens.model';
import chatListModel from '../models/chatList.model';
import chatsModel from '../models/chats.model';
require('dotenv').config();


const app=express();
const router =express.Router();
const server =http.createServer(app);
const io=new Server(server);


const port =process.env.SOCKET_PORT;
const secretKey=process.env.SECRET_KEY as string;
let user1 :string;

let user2 :string;
app.get('/chats', (req,res)=>{
// #swagger.tags = ['Socket.io']

    res.sendFile(__dirname+"/index.html")
});

io.on('connection', async (socket) => {
  try{
        const token = socket.handshake.headers.authorization;
        if(!token){
        return (new Error('Authentication error')); 
        }
        // else{
          const decoded = jwt.verify(token, secretKey);
          socket.data=decoded;
          const {username}=socket.data; 
          console.log(`${username} connected`);

          const socketId=socket.id;
        
          await Tokens.findOneAndUpdate({username},{socketId:socketId});
        // }
        socket.on('message', async (msg)=>{
            const username=msg.username;
            user1=socket.data.username;

            console.log("user1 :",user1);
            user2=username;
            console.log("user2 :",user2);

            const targetUser = await Tokens.findOne({username});
          if(targetUser)
          {
              const {socketId}=targetUser;
              const targetSocketId=socketId as string;
              console.log(`Target User ${username} socket ID:`, targetSocketId);

              const msgEmmited= socket.to(targetSocketId).emit('message', msg.message);
              // console.log(typeof msgEmmited);
            if(msgEmmited)
            {
              
              console.log('msgemmited if blocks runs!!!!!!!!!');
              const chatListResult1= await chatListModel.findOne({$or:[{user1:user1,user2:user2},{user1:user2,user2:user1}]});
             
                if (chatListResult1){
                  const{_id}=chatListResult1;
                  await chatsModel.create({content:msg.message,senderUsername:user1,receiverUsername:user2,connectionId:_id});
                  // return 'chat list already exist';
                }
                else{
                  console.log('else blocks runs!!!')
                  const chatlistCreatedRes= await chatListModel.create({user1,user2});
                  console.log(chatlistCreatedRes);
                  const{_id}=chatlistCreatedRes;
                  await chatsModel.create({content:msg.message,senderUsername:user1,receiverUsername:user2,connectionId:_id});
                }
            }
               console.log(`${user1} send message : ${msg.message}`);
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