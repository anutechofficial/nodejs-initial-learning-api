import mongoose, { Document, Schema } from 'mongoose';



const tokenSchema = new Schema({
  userId: String,
  token:String,
  impKey:String,
});

export default mongoose.model('Token', tokenSchema);
