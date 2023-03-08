const comments = {
    '/comment/{id}': {
        post: {
            tags: ['Blog'],
            security: [],
            summary: 'comment on a blog',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                    },
                },
                {
                    in: 'body',
                    name: 'Comment',
                    required: true,
                    schema: {
                        example: {
                            name: 'cynthia Kamikazi',
                            comment: 'you did great',
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
    }};
    export default comments;