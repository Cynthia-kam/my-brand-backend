import express from "express"
import blogRoute from "./blogRoute.js"
import signupRoute from "./signupRoute.js"
import messageRoute from "./messageRoute.js"
import commentRoute from "./commentRoute.js"
import logoutRoute from "./logoutRoute.js"
import loginroute from "./loginRoute.js"

const router = express.Router()

// all routes
router.use("/blogs", blogRoute)
router.use("/signup",signupRoute )
router.use("/message",messageRoute )
router.use("/comment",commentRoute )
router.use("/logout",logoutRoute )
router.use("/login",loginroute)

export default router