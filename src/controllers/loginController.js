import bcrypt from "bcrypt"
import User from "../model/user.js"
import jwt from "jsonwebtoken"

const secret = "hhhhhh";

const loginController= async (req,res)=>{
const {email, password} = req.body
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
        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1d' });

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