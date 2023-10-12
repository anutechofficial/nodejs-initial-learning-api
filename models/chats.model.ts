import mongoose,{Schema} from "mongoose";

const chats=new mongoose.Schema({
    content:String,
    senderUsername:String,
    receiverUsername:String,
    connectionId:String,
    timestamp:{type:Date,default:Date.now},

})

export default mongoose.model('chats',chats);