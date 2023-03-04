import app from '../src/server.js'
import request from 'supertest'
import Blog from '../src/model/blog.js';

describe('BlogController', () => {
    let server;
      beforeAll(async () =>{
        server = app.listen(2000);
      })
      afterAll((end) =>{
        server.close(end)
      })
      jest.setTimeout(30000);
      test('should desplay all blogs in the database', async () => {
        const itemsLength = await Blog.find();
        const blogCollectionLength = itemsLength.length;
      const blog1 = await Blog.create({
        author: 'toTest3',
        title: 'blog to test3',
        content: 'to test to test to test to test3',
        image:'jckjnsdoclmksdmc'
      });
     
      const response = await request(app).get('/blogs');
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(blogCollectionLength + 1);
    });
  });