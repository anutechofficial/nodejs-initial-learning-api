import express,{ Request, Response } from "express";
import Blog from '../models/blog.model';
import User from '../models/user.model';
import Token from '../models/tokens.model';


const router=express.Router();

router.post("/blog", async (req:Request, res:Response)=>{
    try{
            const { username,blogtitle,blog,date } = req.body;
            
            const isUser:any = await User.findOne({username});
            if(isUser){
                const {_id }= isUser;
                console.log("User ID ",_id);
                const isToken:any =await Token.findOne({_id});
                // const {token}= isToken;
                // console.log("User Existing Token ",token);
            if(isToken){
                await Blog.create({username,blogtitle,blog,date})
                .then((result)=>{
                    res.status(201).json({ message: 'Blog Created successfully !',result});
                })
                .catch((err)=>{
                    console.log("there are error while posting blog !",err);
                });

                // console.log("Blog details ",blogDetails);
            }
            else{
                res.status(400).json({message:'You have to singin first to post Blog!'})
            }
            }
            else{
                res.status(400).json({message:'User not found You have to signup first to Post Blog!'})
            }    
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
 
export default router;