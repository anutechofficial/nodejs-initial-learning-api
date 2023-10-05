import mongoose from "mongoose";

const uploadedFileSchema = new mongoose.Schema({
    docID: String,
    fileName: String,
    fileType: String,
    fileUrl: String,
    fileLocation: String, // Add this property to the schema
  });
  
  export default mongoose.model('uploadedFile', uploadedFileSchema);
  