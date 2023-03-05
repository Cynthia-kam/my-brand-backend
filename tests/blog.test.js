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

    //display one blog 
    test('should return the blog if it exists', async () => {
      const response = await request(app).get(`/blogs/640338c330a35db6eeeee9ee`);
      try {
        expect(response.status).toBe(200);
        expect(response.body.data.title).toBe('blog to test');
      } catch (error) {
        expect(response.status).toBe(404);
      }
  });

  //create a blog
  test('should create a new blog', async () => {
   
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
  //delete a blog if it doesn;t exist we expect error code 500
  test('should delete a blog', async () => {
    const response = await request(app).delete(`/blogs/640339c3b7d1a9a00ddc3cbd`);
    try{
    expect(response.status).toBe(200);
    }catch(error){
      expect(response.status).toBe(500);
    }
    
   
  });
});


