import mongoose, { Document, Schema } from 'mongoose';



const tokenSchema = new Schema({
  userId: String,
  username: String,
  token:String,
  socketId:String,
  renSecretKey:String,
});

export default mongoose.model('Token', tokenSchema);
