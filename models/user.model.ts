

import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  email:string;
  stripeUser_id:string;
  
 
}

const userSchema = new Schema<IUser>({
  username: String,
  password: String,
  email:String,
  stripeUser_id:String

  
});

export default mongoose.model<IUser>('User', userSchema);
