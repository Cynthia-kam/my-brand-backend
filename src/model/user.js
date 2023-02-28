import mongoose from "mongoose";
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
    fullname: {
    type: String,
    required:true
   
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  },
  password: {
    type: String,
    required: true,
    minlength:3
    
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
 isAdmin: {
    type: Boolean,
    required:true
  }
});

// define the compare password function (this help to compare the harshed password and the entered password)
userSchema.methods.comparePassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match
}


const User = mongoose.model("User", userSchema)

export default User