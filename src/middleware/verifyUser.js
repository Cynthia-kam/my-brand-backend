import jwt from 'jsonwebtoken';

const verifyUser = (req, res, next) => {

  // check if the request has an authorization header
  const authHeader = req.headers.authorization;
  // condition
  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided"
    });
  } else {
    // get token
    const token = authHeader.split(" ")[1];

    try {
      // vefify the token
      const verifiedUser = jwt.verify(token, 'hhhhhh', { expiresIn: '1d' });
      if (verifiedUser.isAdmin==='false') {
        return res.status(401).json({
          message: "You are not authorized for this action"
         
        });
      }
      next()
      
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }

  }
};

export default verifyUser;