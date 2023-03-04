import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import allRoutes from ''
import allRoutes from "./routes/allRoutes.js"
import cors from 'cors';
import cookieParser from 'cookie-parser';
import response from './utils/responses.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(cookieParser())
app.use(bodyParser.json())
app.get('/',(req, res) => response.success(res, 200,"welcome to the back-end of my project"));
app.use(allRoutes);
const port = process.env.PORT;
mongoose.set('strictQuery', true);

 mongoose.connect(`${process.env.MONGODB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });
 
 export default app;