import express from "express";
import blogController from "../controllers/blogController.js";
import verifyUser from "../middleware/verifyUser.js";
import multer from "multer";
//const upload = multer({ dest: 'uploads/' });

const router = express.Router();
//upload.single('image')
router.get("/", blogController.getBlogs);
router.get("/:id", blogController.getBlog)
router.post("/",verifyUser,blogController.createBlog)
router.put("/:id",verifyUser,blogController.updateBlog)
router.delete("/:id",verifyUser,blogController.deleteBlog)

export default router