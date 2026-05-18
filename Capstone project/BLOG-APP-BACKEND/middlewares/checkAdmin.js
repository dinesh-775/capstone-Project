import { UserTypeModel } from "../models/UserModel.js";

export const checkAdmin = async (req, res, next) => {
  //get author id
  let aid = req.body?.admin || req.params?.adminId;
  //verify author
  let admin = await UserTypeModel.findById(aid);
  //if author not found
  if (!admin ) {
    return res.status(401).json({ message: "User not found! " });
  }
  //if author found but role is different
  if(author.role!=='ADMIN'){
    return res.status(403).json({ message: "User is not an Admin" });
  }
  //forward req to next
  next();
};