import mongoose from "mongoose";

const blogSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    image:{
        // data:Buffer,
        // contentType:String,
        type:String,
        
        
     },
     comments: {
        type: Array
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Blog=mongoose.model("Blog",blogSchema)
export default Blog