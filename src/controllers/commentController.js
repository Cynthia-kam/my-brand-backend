import response from "../utils/responses.js";
import blog from "../model/blog.js";
import jwt from "jsonwebtoken";

const commentController = async(req, res)=>{
    const { id } = req.params, _id = id;
    const { comment,name } = req.body;
    const objectToPush = { name: name, comment: comment };
    const blogToComment = await blog.findByIdAndUpdate(_id, { $push: { comments: objectToPush } }, { new: true })
    response.success(res, 200, "blog found", blogToComment)
  
}

export default commentController