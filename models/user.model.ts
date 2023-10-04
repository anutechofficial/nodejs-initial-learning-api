// import mongoose from "mongoose";

// const Schema = mongoose.Schema;

// const userSignUpSchema = new Schema({
//     username: { type: String },
//     password: { type: String },
//     token: { type : String },
    
// });




// export default mongoose.model("User", userSignUpSchema);


import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
 
}

const userSchema = new Schema<IUser>({
  username: String,
  password: String,
  
});

export default mongoose.model<IUser>('User', userSchema);
