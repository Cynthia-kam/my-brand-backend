import multer from "multer";
import Blog from "../model/blog.js"
import errorFunc from "../utils/errorFunc.js";

const Storage = multer.diskStorage({
   destination: "uploads",
   filename:(req, file, cb) =>{
    cb(null,file.originalname);
   },
});

const upload=multer({
  storage:Storage
}).single('image')

class blogController {
  
  static async getBlogs(req, res) {
    try {
      const blogs = await Blog.find();
      res.status(200).json({
        data: blogs
      });
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }

  // get one blog
  static async getBlog(req, res) {
    try {
      const { id } = req.params; 
      const blog = await Blog.findOne({ _id: id });
      if (!blog) {
        return res.status(404).json({
          message: `Blog with id: ${id} was not found`
        });
      } else {
        return res.status(200).json({
          data: blog
        });
      }
    } catch (error) {
      console.log(error.message);
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }
 
 
  // create blog
  static async createBlog(req, res) {
    upload(req,res,(err)=>{
      if(err){
        console.log(err)
      }else{
        const newBlog=new Blog({
          title:req.body.title,
          author:req.body.author,
          content:req.body.content,
          image:{
            data:req.file.filename,
            contentType:'image/png'
          }
        })
        newBlog.save()
        .then(()=>res.send('successfully created a new blog'))
        .catch(err=>console.log(err))
      }
    })}


  // update blog
  static async updateBlog(req, res) {
    try {
      const { id } = req.params; 

      // body to be update
      const { title, content,image } = req.body;

      // id
      const _id = id;
      const blogUpdated = await Blog.findByIdAndUpdate(_id, { title, content,image}, { new: true });

      if (!blogUpdated) {
        return res.status(404).json({
          message: `Blog with id: ${id} was not found`
        });
      } else {

        return res.status(200).json({
          message: "Blog updated Successfully",
          data: blogUpdated
        });
      }

    } catch (error) {
      console.log(error)
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }


  // delete blog
  static async deleteBlog(req, res) {
    try {
      const { id } = req.params;
      // find blog
      
      const _id = id

      const blogToBeDeleted = await Blog.findByIdAndDelete(_id)

      if (!blogToBeDeleted) {
        return res.status(404).json({
          message: `Blog with id: ${id} was not found`
        });
      } else {
        return res.status(200).json({
          message: "Blog deleted successfully",
        });
      }
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }

}

export default blogController;
