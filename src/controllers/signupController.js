import bcrypt from 'bcrypt';
import User from '../model/user.js';
import errorFunc from '../utils/errorFunc.js';

const signupController = async (req, res) => {
  const { fullname, email, password, isAdmin } = req.body;
  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create our new user
    const newUser = await User.create({ fullname, email, password: hashedPassword ,isAdmin});
    res.status(201).json({
      message: "New User created successfully",
      data: newUser
    });
  } catch (error) {
    if(error.code===11000){
        return res.status(403).json({
            message: `User with email ${email} already exists`
          })
    }
    console.log(error)
    res.status(500).json({
        message: error.message.substring(error.message.indexOf(':')+2)
      });
  }

};

export default signupController;