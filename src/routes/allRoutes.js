import express from "express"
import blogRoute from "./blogRoute.js"
import signupRoute from "./signupRoute.js"
import loginRoute from "./loginRoute.js"
import messageRoute from "./messageRoute.js"
import commentRoute from "./commentRoute.js"

const router = express.Router()

// all routes
router.use("/blogs", blogRoute)
router.use("/signup",signupRoute )
router.use("/login",loginRoute )
router.use("/message",messageRoute )
router.use("/comment",commentRoute )

export default router