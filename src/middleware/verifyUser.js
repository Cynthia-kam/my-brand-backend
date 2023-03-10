import jwt from 'jsonwebtoken';


const verifyUser = (req, res, next) => {

  // check if the request has an authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({
      message: "please login to continue"
    });
  } else {
    // get token
   const token = authHeader.split(" ")[1];
    console.log(`our saved token is ${token}`)
    try {
      // vefify the token
      const verifiedUser = jwt.verify(token, 'hhhhhh', { expiresIn: '1d' });
      if (verifiedUser.userRole!==true) {
        return res.status(401).json({
          message: "You are not authorized for this action"
         
        });
      }
      console.log("you are an admin")
      next()
      
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }

  }
};

export default verifyUser;
