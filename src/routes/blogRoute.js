import express from "express";
import blogController from "../controllers/blogController.js";
import verifyUser from "../middleware/verifyUser.js";
import multer from "multer";
//const upload = multer({ dest: 'uploads/' });

const router = express.Router();
//upload.single('image')
router.get("/", blogController.getBlogs);
router.get("/:id", blogController.getBlog)
router.post("/",blogController.createBlog)
router.put("/:id",blogController.updateBlog)
router.delete("/:id",blogController.deleteBlog)

export default router