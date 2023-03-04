import app from '../src/server.js'
import request from 'supertest'


describe('Test logout route',() =>{
  // let mongoServer;
  let server;
  beforeAll(async () =>{
    server = app.listen(2000);
  })
  afterAll((end) =>{
    server.close(end)
  })
 test('test logout Route', async () =>{
  const response = await request(app).post('/logout');
  expect(response.status).toBe(200);
  expect(response.body).toEqual({})
 })

})
