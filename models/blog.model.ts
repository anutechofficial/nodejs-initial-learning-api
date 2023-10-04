import mongoose from "mongoose";

const blogSchema=new mongoose.Schema({
    username:String,
    blogtitle:String,
    blog:String,
    date:{ type:Date,default:Date.now},
})


export default mongoose.model('Blog',blogSchema);