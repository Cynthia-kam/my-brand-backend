import app from '../src/server.js'
import request from 'supertest'
import { mongoServer } from '../setupTests.cjs';


describe("test CRUD on blogs",()=>{
   
    describe('GET /blogs', () => {
        beforeAll(async () => {
            await mongoServer.start();
          });
        
          afterAll(async () => {
            await mongoServer.stop();
          });
        test('it should retrieve all blogs', async () => {
          const response = await request(app)
            .get('/blogs')
            .set('Accept', 'application/json')
            .expect(200);
      
          expect(response.body.length).toBe(11);
        });
      });
    })
