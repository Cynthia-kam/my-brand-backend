//import responses from "../responses.js";

const blogs = {
    '/blogs': {
        post: {
            tags: ['Blog'],
            security: [ 
                {
                JWT: [],
            },
        ],
            summary: 'Create a new blog',
            parameters: [
                {
                    in: 'formData',
                    name: 'title',
                    required: true,
                },
                {
                    in: 'formData',
                    name: 'author',
                    required: true,
                },
                {
                    in: 'formData',
                    name: 'content',
                    required: true,
                },
                {
                    name: 'image',
                    in: 'formData',
                    required: true,
                    type: 'file',
                },
            ],
            consumes: ['application/json'],
            responses:{
                201: {
                    description: 'Created',
                },
                400: {
                    description: 'Bad Request'
                },
                401: {
                    description: 'Unauthorized'
                },
                500: {
                    description: 'Internal Server Error'
                }
            }
        },
      
        get: {
            tags: ['Blog'],
           security: [],
           summary: 'Get all blogs',
           parameters: [],
           consumes: ['application/json'],
           responses:{
            201: {
                description: 'Created',
            },
            400: {
                description: 'Bad Request'
            },
            401: {
                description: 'Unauthorized'
            },
            500: {
                description: 'Internal Server Error'
            }
           }
       },

       

    },
    '/blogs/{id}':{
        get: {
            tags: ['Blog'],
            security: [],
            summary: 'Get one blog',
            parameters: [{
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                    },
                },
            ],
            consumes: ['application/json'],
            responses:{
                200: {
                    description: 'OK',
                },
                
                400: {
                    description: 'Bad Request'
                },
                401: {
                    description: 'Unauthorized'
                },
                500: {
                    description: 'Internal Server Error'
                }
            }
        },
        put: {
            tags: ['Blog'],
            security: [
                {
                    JWT: [],
                },
            ],
            summary: 'Update a blog',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                
                },
                {
                    in: 'formData',
                    name: 'title',
                    required: false,
                },
                {
                    in: 'formData',
                    name: 'content',
                    required: false,
                },
                {
                    name: 'image',
                    in: 'formData',
                    required: false,
                    type: 'file',
                },
            ],
           
            consumes: ['application/json'],
            responses:{
                200: {
                    description: 'OK',
                },
                
                400: {
                    description: 'Bad Request'
                },
                401: {
                    description: 'Unauthorized'
                },
                500: {
                    description: 'Internal Server Error'
                }
            }
            
        },
        delete: {
            tags: ['Blog'],
            security: [{
                JWT: [],
            },],
            summary: 'delete one blog',
            parameters: [{
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                    },
                },
            ],
            consumes: ['application/json'],
            responses:{
                200: {
                    description: 'OK',
                },
                
                400: {
                    description: 'Bad Request'
                },
                401: {
                    description: 'Unauthorized'
                },
                500: {
                    description: 'Internal Server Error'
                },
                404: {
                    description: 'not found'
                }
            }
            
        }

    },
   
};

export default blogs;