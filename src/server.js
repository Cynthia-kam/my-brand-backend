import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import allRoutes from "./routes/allRoutes.js"
import cookieParser from "cookie-parser";

mongoose.set('strictQuery', false);

dotenv.config();
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

app.use("/", allRoutes)
const port = process.env.PORT;
const host = process.env.HOST;

//database connection instances
const con=()=>mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const startServer=()=>app.listen(port);

Promise.all([con(),startServer()])
.then(()=>{
   console.log(`MONGODB connected and server listening at http://${host}:${port}`)
})
.catch((err)=>console.log(err))
 
export default app
