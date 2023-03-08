import dotenv from 'dotenv';
import swaggerDoc from './swagger.js';
import blogs from './blogs/index.js';
import users from './users/index.js';
import message from './messages/index.js';
import comments from './comments/index.js';
import auth from './login/index.js';
import express from "express";
import cors from "cors";

const defaults = swaggerDoc.paths;

dotenv.config();
const app = express();
app.use(cors())


const host =  'pink-thankful-oyster.cyclic.app'
    // process.env.NODE_ENV === 'production'
    //     ? process.env.HOST.split('https://')[1]
    //     : process.env.HOST.split('http://')[1];

const paths = {
    // ...defaults,
     ...blogs,
     ...users,
     ...message,
     ...comments,
     ...auth,
     
};

const documentation = {
    swagger: '2.0',
    info: {
        version: '1.0.0.',
        title: 'My brand APIs Documentation',
        description: '',
    },
    host,
    basePath: '/',
    schemes: ['http', 'https'],
    securityDefinitions: {
        JWT: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
        },
    },
    tags: [
        {
            name: 'My brand APIs Documentation',
        },
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    paths,
};
export default documentation;