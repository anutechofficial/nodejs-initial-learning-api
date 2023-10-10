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
        console.log(socket.data.username);
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
        socket.emit(msg);
      console.log(`User ${username} send : ${msg}`);
    })
  });

server.listen(port,()=>{
    console.log(`HTTP Server is running on port ${port}`);
});

export default router;

// import * as socketio from 'socket.io';
// import * as http from 'http';



// import * as jwt from 'jsonwebtoken';
// import { Server } from 'socket.io';
// import * as http from 'http';

// const server = http.createServer((req, res) => {
//   // Handle HTTP requests if needed
// });

// const io = new Server(server);


// io.use(async (socket, next) => {
//   try {
//     // Extract the token from the 'Authorization' header
//     const token = socket.handshake.headers.authorization;

//     if (!token) {
//       // If no token is provided, reject the connection
//       return next(new Error('Authentication error'));
//     }

//     // Verify the token
//     const decoded = jwt.verify(token, 'your-secret-key'); // Replace with your secret key

//     // Attach user information to the socket object
//     socket.user = decoded;

//     // If verification succeeds, allow the connection
//     return next();
//   } catch (error) {
//     // If verification fails, reject the connection
//     return next(new Error('Authentication error'));
//   }
// });

// io.on('connection', (socket) => {
//   // At this point, the user is authenticated and their information is available in socket.user
//   const { username } = socket.user;

//   console.log(`User ${username} connected`);

//   // Handle WebSocket events
//   socket.on('message', (message) => {
//     console.log(`Received from ${username}: ${message}`);
//     // Handle the message as needed
//   });
// });

// server.listen(4000, () => {
//   console.log('WebSocket server is listening on port 4000');
// });
