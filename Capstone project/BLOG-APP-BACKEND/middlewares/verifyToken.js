import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const verifyToken = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      //read token from req
      let token = req.cookies.token; //{ token :""}
      console.log("token :", token);
      if (token === undefined) {
        return res.status(400).json({ message: "Unauthorized req. PLz login" });
      }
      //verify the validity of the token( decoding the token)
      let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      //forward req to next middleware/route


      if (!allowedRoles.includes(decodedToken.role)) {
        return res.status(403).json({ message: "Forbidden. You dont have permission!" })
      }
      req.user = decodedToken;
      
      next();
    }
    catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Session expired. Please Re-login!" })
      }
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "JsonWebTokenError" })
      }
      next(err)
    }
  }
};