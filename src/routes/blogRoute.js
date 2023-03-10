import express from "express";
import blogController from "../controllers/blogController.js";
import verifyUser from "../middleware/verifyUser.js";
import multer from "multer";
const upload = multer({ dest: 'tmp/' });

const router = express.Router();

router.get("/", blogController.getBlogs);
router.get("/:id", blogController.getBlog)
router.post("/",verifyUser,upload.single('image'),blogController.createBlog)
router.put("/:id",verifyUser,blogController.updateBlog)
router.delete("/:id",verifyUser,blogController.deleteBlog)

export default router