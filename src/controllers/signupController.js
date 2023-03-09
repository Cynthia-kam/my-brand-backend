import bcrypt from 'bcrypt';
import User from '../model/user.js';
import errorFunc from '../utils/errorFunc.js';

const emailRegrex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

const signupController = async (req, res) => {
  const { fullname, email, password, isAdmin } = req.body;
  if (fullname == null || fullname === "") {
    res.status(403).json({
      message: "fullname field is required"
    })

  }
  if (email == null || email === "") {
   return res.status(403).json({
      message: "Email field is required"
    })
  }
  else if (!emailRegrex.test(email)) {
    return res.status(403).json({
      message: "please enter a valid email"
    })
  }
  else if (password == null || password === "") {
    return res.status(403).json({
      message: "password field is required"
    })

  }
  else if (isAdmin === null) {
   return  res.status(403).json({
      message: "isAdmin field is required"
    })
  }
  else if (isAdmin === "") {
   return  res.status(403).json({
      message: "please enter a valid value for field 'isAdmin' it can only be true or false without qoutation marks"
    })
  }
  else {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      
      const newUser = await User.create({ fullname, email, password: hashedPassword, isAdmin: req.body.isAdmin || false });
      const data = newUser
      console.log(data)
      return res.status(201).json({
        ok: true,
        message: "New User created successfully",
        data: data
      });
    }
    catch (error) {
      console.error(error);
      let mess;
      if (error.code === 11000) {
        mess = `User with email ${email} already exists`;
        return res.status(403).json({
          ok: true,
          message: mess
        });
      } else {
        mess = error.message;
        console.log(mess)
      }
    //console.log(message)
    }
  }

};

export default signupController;