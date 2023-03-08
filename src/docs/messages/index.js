const message = {
    '/message': {
      
        post: {
            tags: ['message'],
            security: [ 
                {
                JWT: [],
            },
        ],
            summary: 'New message',
            parameters: [
                
                {
                    in: 'body',
                    name: 'message',
                    required: true,
                    schema: {
                        example: {
                            name: 'kamikazi',
                            email: 'abijurucyn@gmail.com',
                            content: 'dear admin,....',
                           
                        },
                    },
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
            tags: ['message'],
           security: [],
           summary: 'Get all messages',
           parameters: [],
           consumes: ['application/json'],
           responses:{
            200: {
                description: 'successfully retrieved all messages',
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
   
};

export default message;