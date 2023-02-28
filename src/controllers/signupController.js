import bcrypt from 'bcrypt';
import User from '../model/user.js';
import errorFunc from '../utils/errorFunc.js';

const emailRegrex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

const signupController = async (req, res) => {
  const { fullname, email, password, isAdmin } = req.body;
  if(fullname==null||fullname===""){
    res.status(403).json({
      message: "fullname field is required"
    })
  
  }
  else if(email==null||email===""){
    res.status(403).json({
      message: "Email field is required"
    })
  }
  else if(!emailRegrex.test(email)){
    res.status(403).json({
      message: "please enter a valid email"
    })
  }
  else if(password==null||password===""){
    res.status(403).json({
      message: "password field is required"
    })
    
  }
  else if(isAdmin===null){
    res.status(403).json({
      message: "isAdmin field is required"
    })
  }
  else if(isAdmin===""){
    res.status(403).json({
      message: "please enter a valid value for field 'isAdmin' it can only be true or false without qoutation marks"
    })
  }
  else{
  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create our new user
    const newUser = await User.create({ fullname, email, password: hashedPassword ,isAdmin});
    res.status(201).json({
      message: "New User created successfully",
      data: newUser
    });
  } 
  
  catch (error) {
    if(error.code===11000){
        return res.status(403).json({
            message: `User with email ${email} already exists`
          })
    }
    console.log(error)
    res.status(403).json({
        message: error.message.substring(error.message.indexOf(':')+2)
      });
  }}

};

export default signupController;