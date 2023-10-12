import mongoose,{Schema} from 'mongoose';

const chatList =new mongoose.Schema({
    user1:String,
    user2:String
})

export default mongoose.model('chatList', chatList);