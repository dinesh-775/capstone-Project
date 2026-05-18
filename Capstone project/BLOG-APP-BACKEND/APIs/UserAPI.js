import exp from "express";
import { register, authenticate } from "../services/authService.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { upload } from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";

export const userRoute = exp.Router();

//Register user
userRoute.post(
  "/users",
  upload.single("profilePic"),
  async (req, res, next) => {
    let cloudinaryResult;

    try {
      let userObj = req.body;

      //  Step 1: upload image to cloudinary from memoryStorage (if exists)
      if (req.file) {
        cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      }

      // Step 2: call existing register()
      const newUserObj = await register({
        ...userObj,
        role: "USER",
        profileImageUrl: cloudinaryResult?.secure_url,
      });

      res.status(201).json({
        message: "user created",
        payload: newUserObj,
      });

    } catch (err) {

      // Step 3: rollback 
      if (cloudinaryResult?.public_id) {
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);
      }

      next(err); // send to your error middleware
    }

  }
);
//Authenticate user
userRoute.post("/authenticate", async (req, res) => {
  //get user cred object
  let userCred = req.body;
  //call authenticate service
  let { token, user } = await authenticate(userCred);
  //save tokan as httpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  //send res
  res.status(200).json({ message: "login success", payload: user });
});

//Read all articles(protected route)

//Add comment to an article(protected route)
userRoute.put("/articles", verifyToken("USER"), async (req, res, next) => {
  const { user, articleId, comment } = req.body;

  if (user != req.user.userId) {
    return res.status(403).json({ message: "Forbidden" })
  }

  let articleWithComment = await ArticleModel.findByIdAndUpdate(articleId,
    { $push: { comments: { user, comment } } },
    { new: true, runValidators: true }
  )
  if (!articleWithComment) {
    return res.status(404).json({ message: "Article Not Found!" })
  }
  return res.status(200).json({ message: "Comment added successfully", payload: articleWithComment });

})
