

import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  socketId:string,
 
}

const userSchema = new Schema<IUser>({
  username: String,
  password: String,
  socketId:String,
  
});

export default mongoose.model<IUser>('User', userSchema);
