const auth = {
    '/login': {
      
        post: {
            tags: ['user'],
            security: [ 
                {
                JWT: [],
            },
        ],
            summary: 'User Authentication',
            parameters: [
                
                {
                    in: 'body',
                    name: 'user auth',
                    required: true,
                    schema: {
                        example: {
                            email: 'kamikazi@gmail.com',
                            password: 'password',
                        },
                    },
                },
                
            ],
            consumes: ['application/json'],
            responses:{
                200: {
                    description: 'login was successful',
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

export default auth;