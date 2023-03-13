import multer from "multer";
import Blog from "../model/blog.js"
import errorFunc from "../utils/errorFunc.js"
//import cloudinary from "cloudinary"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fs from "fs"
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();
cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`
})

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
    try {
      // const { title, author, content } = req.body;
      // const result = await cloudinary.uploader.upload(req.file.path);
      // const newBlog = await Blog.create({
      //   title,
      //   author,
      //   content,
      //   image: result.url,
      // });
      // await newBlog.save();
      // res.status(201).send('successfully created a new blog');
      const storage = new CloudinaryStorage({
        cloudinary,
        params: {
          folder: 'blogImage',
          allowed_formats: ['jpg', 'png']
        }
      });
      const upload = multer({ storage }).single('image');
      upload(req, res, async (err) => {
        if (err) {
          return console.log(err)
        }

        const { title, author, content, image } = req.body
        const newBlog = await Blog.create({
          title,
          author,
          content,
          image
        });
        await newBlog.save();
        console.log(newBlog)
      })
      return res.status(201).json({
        message: "Blog created Successfully",

      })
    }
    catch (error) {
      console.log(error);
      res.status(500).send('internal server error while creating a blog');
    }
  }

  //update a blog
  static async updateBlog(req, res) {
    const storage = new CloudinaryStorage({
      cloudinary,
      params: {
        folder: 'blogImage',
        allowed_formats: ['jpg', 'png']
      }
    });
    const upload = multer({ storage }).single('image');
    
    
      try {
        const { id } = req.params;
        const { title, author, content } = req.body;
        let image;
        if (req.file) {
          image = req.file.path;
        }
        const blogUpdated = await Blog.findByIdAndUpdate(id, { title, author, content, image }, { new: true });
        if (!blogUpdated) {
          return res.status(404).json({
            message: 'Blog not found'
          });
        }
        return res.status(200).json({
          message: "Blog updated successfully",
          data: blogUpdated
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: "Server error",
          error: error.message
        });
      }
  
    // try {
    //   const { id } = req.params;

    //   // body to be update
    //   const { title, content, image, author } = req.body;
    //   console.log('title:', title);
    //   console.log('author:', author);
    //   console.log('content:', content);
    //   console.log('image:', image);
    //   const _id = id;
    //   const blogUpdated = await Blog.findByIdAndUpdate(_id, { title, author, content, image }, { new: true });

    //   if (!blogUpdated) {
    //     return res.status(404).json({
    //       // message: `Blog with id: ${id} was not found`
    //       message: 'error updating blog'
    //     });
    //   } else {

    //     return res.status(200).json({
    //       message: "Blog updated Successfully",
    //       data: blogUpdated
    //     });
    //   }

    // } catch (error) {
    //   console.log(error)
    //   const messageContent = error.message;
    //   const status = 500;
    //   errorFunc(res, messageContent, status);
    // }
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
