// import express from 'express';
// import bodyParser from 'body-parser';
// import jwt from 'jsonwebtoken';
// import crypto from 'crypto';
// import mongoose from 'mongoose';
// import signup from './models/signup.model';
// import router from "./routes/auth";

// let connection= mongoose.connect("mongodb://127.0.0.1:27017/databaseUser")
//                 .then(()=>{
//                   console.log("Database connected successfully ")
//                 })
//                 .catch((err)=>{
//                   console.log(err);
//                 })
                

// const app=express();
// const port =3005;
// const rendSecretKey =crypto.randomBytes(32).toString('hex');

// app.use(bodyParser.json());

// // const users:{username:string , password:string,}[]=[];
// app.post('/signup', (req,res)=>{
//   const {username, password}=req.body;
  
//   signup.find({username:`${username}`})
//   .then((result)=>{
//     console.log("Username alredey exist!",result);
//   })
//   .catch(()=>{

//     let token=jwt.sign(username,rendSecretKey,{expiresIn:"7d"});
//         const newUser=new signup({
//           username:username,
//           password:password,
//         });

//     newUser.save()
//     .then((result)=>{
//       console.log("User data saved in Database",result);
//     })
//     .catch((err)=>{
//       console.log("User data not saved in database :",err);
//     });
//     res.status(201).json({message:'User created successfully', token});
//     })
  
// });

// connection
// app.listen(port,()=>{
//     console.log(`Running on port no ::::${port}`);
// });


import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import blogRouter from "./routes/blogPost";
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json'; 
import S3Upload from "./routes/upload";
// import multer from 'multer';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes,swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/post',blogRouter,swaggerUi.serve,swaggerUi.setup(swaggerFile));
app.use('/upload', S3Upload ,swaggerUi.serve, swaggerUi.setup(swaggerFile) );


mongoose.connect('mongodb://127.0.0.1:27017/databaseUser')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });
