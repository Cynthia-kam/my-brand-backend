const users = {
    '/signup': {
      
        post: {
            tags: ['user'],
            security: [ 
                {
                JWT: [],
            },
        ],
            summary: 'Create a new user',
            parameters: [
                
                {
                    in: 'body',
                    name: 'user',
                    required: true,
                    schema: {
                        example: {
                            fullname: 'kamikazi',
                            email: 'abijurucyn@gmail.com',
                            password: 'password',
                            isAdmin:true
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
    },
   
};

export default users;