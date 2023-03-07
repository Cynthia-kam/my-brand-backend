//import responses from "../responses.js";

const blogs = {
    '/blogs': {
      
        get: {
            tags: ['Blog'],
            security: [],
            summary: 'Get all blogs',
            parameters: [],
            consumes: ['application/json'],
            responses:{
                200:{
                    description:'OK',
                }
            }
        },
    },
    '/blog': {
      
        get: {
            tags: ['Blog'],
            security: [],
            summary: 'Get one blog',
            parameters: [],
            consumes: ['application/json'],
            // responses,
        },
    },
   
};

export default blogs;