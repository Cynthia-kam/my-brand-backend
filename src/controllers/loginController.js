import bcrypt from "bcrypt"
import User from "../model/user.js"
import jwt from "jsonwebtoken"

const secret = "hhhhhh";
const emailRegrex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

const loginController= async (req,res)=>{
const {email, password} = req.body
 if(email==null||email===""){
    return res.status(403).json({
      message: "Email field is required"
    })
  }
  else if(!emailRegrex.test(email)){
    return res.status(403).json({
      message: "please enter a valid email format"
    })
  }
  else
try {
    //find the user with the email
    const user= await User.findOne({email})
    if(!user){
        return res.status(400).json({
            message: "invalid login credentials"
        })
    }else{
     //check password
     const checkPassword = await bcrypt.compare(password, user.password)
     if(!checkPassword){
       
        res.status(401).json({
            message:"invalid login credentials"
        })
     }
     else{
        // res.status(200).json({
        //     message:"login was successful"
        // })
        const token = jwt.sign({ userRole: user.isAdmin }, secret, { expiresIn: '1d' });

        res.cookie('token', token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        res.status(200).json({
          message: 'Login successful',
          token: token
          
        });
      }  
     }
    
} catch (error) {
   console.log(error) 
}
}
export default loginController