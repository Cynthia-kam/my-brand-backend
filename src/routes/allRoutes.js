import express from "express"
import blogRoute from "./blogRoute.js"
import signupRoute from "./signupRoute.js"
import loginRoute from "./loginRoute.js"
import messageRoute from "./messageRoute.js"
import commentRoute from "./commentRoute.js"
import logoutRoute from "./logoutRoute.js"

import documentation from "../docs/swaggerOptions.js"
import  SwaggerUi  from "swagger-ui-express";
import verifyUser from "../middleware/verifyUser.js"

const router = express.Router()
router.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(documentation),)
// all routes
router.use("/blogs", blogRoute)
router.use("/signup",verifyUser,signupRoute )
router.use("/login",loginRoute )
router.use("/message",messageRoute )
router.use("/comment",commentRoute )
router.use("/logout",logoutRoute )

export default router