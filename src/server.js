import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import allRoutes from "./routes/allRoutes.js"
import cookieParser from "cookie-parser";
import response from "./utils/responses.js";


mongoose.set('strictQuery', false);

dotenv.config();
const app = express();

app.use(cors())
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
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
app.get('/',(req, res) => response.success(res, 200,"welcome to the my-brand-backend"));
const startServer=()=>app.listen(port);

Promise.all([con(),startServer()])
.then(()=>{
   console.log(`MONGODB connected and server listening at http://${host}:${port}`)
})
.catch((err)=>console.log(err))
 
export default app
