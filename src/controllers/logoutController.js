
const logout= async (req,res)=>{

    res.clearCookie('token');
    return   res.status(200).send('You are logged out');
  }


export default logout