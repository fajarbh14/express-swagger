module.exports = {
    '/post/addPost': {
      post: {
        tags: ['post'],
        name: 'addPost',
        summary: 'add to your post',
        consumes: ['application/json'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          name: 'Post',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                    example: 'Riset JWT',
                  },
                  content: {
                    type: 'string',
                    example: 'Ini isi kontennya',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success Response',
            content: {
              'application/json': {
                example: {
                  code: 200,
                  status: 'success',
                  message: 'Insert post success!',
                  data: {
                    title: 'Riset JWT',
                    content: 'Ini konten',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/post/updatePost': {
      put: {
        tags: ['post'],
        name: 'updatePost',
        summary: 'update your post',
        consumes: ['application/json'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          name: 'Post',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: '5e9f8f8f8f8f8f8f8f8f8f8',
                  },
                  title: {
                    type: 'string',
                    example: 'Riset JWT',
                  },
                  content: {
                    type: 'string',
                    example: 'Ini isi kontennya',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success Response',
            content: {
              'application/json': {
                example: {
                  code: 200,
                  status: 'success',
                  message: 'Post updated!',
                  data: {
                    title: 'Riset JWT',
                    content: 'Ini konten',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/post/deletePost': {
      delete: {
        tags: ['post'],
        name: 'deletePost',
        summary: 'delete your post',
        consumes: ['application/json'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          name: 'Post',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: '5e9f8f8f8f8f8f8f8f8f8f8',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success Response',
            content: {
              'application/json': {
                example: {
                  code: 200,
                  status: 'success',
                  message: 'Post deleted!',
                  data: {
                    title: 'Riset JWT',
                    content: 'Ini konten',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/post/getAllPost': {
      get: {
        tags: ['post'],
        name: 'getAllPost',
        summary: 'get all post',
        consumes: ['application/json'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Success Response',
            content: {
              'application/json': {
                example: {
                  code: 200,
                  status: 'success',
                  message: 'Get all post success!',
                  data: [
                    {
                      _id: '5e9f8f8f8f8f8f8f8f8f8f8',
                      title: 'Riset JWT',
                      content: 'Ini konten',
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    '/post/getPostById/{id}': {
      get: {
        tags: ['post'],
        name: 'getPostById',
        summary: 'get post by id',
        consumes: ['application/json'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id post',
            required: true,
            schema: {
              type: 'string',
              example: '5e9f8f8f8f8f8f8f8f8f8f8',
            },
          },
        ],
        responses: {
          200: {
            description: 'Success Response',
            content: {
              'application/json': {
                example: {
                  code: 200,
                  status: 'success',
                  message: 'Get post by id success!',
                  data: {
                    _id: '5e9f8f8f8f8f8f8f8f8f8f8',
                    title: 'Riset JWT',
                    content: 'Ini konten',
                  },
                },
              },
            },
          },
        },
      },
    },
};