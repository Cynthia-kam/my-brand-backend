import Message from "../model/message.js"
import errorFunc from "../utils/errorFunc.js";

class messageController{
    //create a new message
static async createMessage(req, res) {
    try {
      // create new message
      const {fullname, email, content} = req.body;
      const newMessage = await Message.create({fullname, email, content});
      res.status(201).json({
        message: "Message sent sucessfully",
        data: newMessage
      });
    } catch (error) {
        console.log(error)
      res.status(500).json({
          message: error.message
        });
    }
  
  };
  //get allMessage from database
}
  export default messageController;