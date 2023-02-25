import bcrypt from "bcrypt"
import User from "../model/user.js"

const loginController= async (req,res)=>{
const {email, password}= req.body
try {
    //find the user with the email
    const user= await User.findOne({email})
    if(!user){
        return res.status(400).json({
            message: "invalid credentials"
        })
    }else{
     //check password
     const checkPassword= await bcrypt.compareSync(password, User.password)
     console.log(checkPassword)
    //  if(!checkPassword){
    //     res.status(402).json({
    //         message:"invalid credentials"
    //     })
    //  }
    //  else{
    //     res.status(200).json({
    //         message:"login was successful"
    //     })
    //  }
    }
} catch (error) {
    
}
}
export default loginController