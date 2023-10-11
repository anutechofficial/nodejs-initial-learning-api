//THIS ROUTE IS JUST TO TEST SOCKET.IO

import http from 'http';
import express from 'express';
import {Server} from 'socket.io';
const app=express();
const server =http.createServer(app);

const io=new Server(server);

//Socket.io
// server-side
io.on("connection", (socket) => {
    //  socket.emit("hello", "world");
    console.log(socket);
    socket.emit('start', 'Welcome to the Socket.io server!');
    // socket.broadcast.emit('hii ji mai server!');
    
    // socket.broadcast.emit('message', msg);

    socket.on('message',(msg)=>{
        console.log(typeof msg);
        socket.broadcast.emit('message', msg);
        // socket.broadcast.emit('hii ji mai server!',msg);
    })

     socket.on('disconnect', () => {
       console.log('User disconnected');
    });
  });
  
  

server.listen(9000,()=>{
    console.log(`server is running on port :9000`);
});

