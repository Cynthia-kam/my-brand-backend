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
  static async getMessages(req, res) {
   
    try {
      const messages = await Message.find();
      res.status(200).json({
        data: messages
      });
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }
}
  export default messageController;