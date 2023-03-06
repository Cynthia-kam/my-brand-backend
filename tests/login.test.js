import app from '../src/server.js'
import request from 'supertest'
import User from '../src/model/user.js';

let server;
beforeAll(async () =>{
  server = app.listen(2000);
})
afterAll((end) =>{
  server.close(end)
})

jest.setTimeout(30000);
describe('user auntentication', () => {
    it('Should Login the user successfully', async () => {
      const res = await request(app)
        .post('/login')
        .send(
          {
              email:"johndoe@example.com",
              password:"password@123"
          }
        )
      expect(res.statusCode).toEqual(200)
     expect(res.body.message).toEqual("Login successful")
    })
    it('Should NOT login the user with incorrect password', async () => {
        const res = await request(app)
          .post('/login')
          .send(
            {
                email:"johndoe@example.com",
                password:"password123"
            }
          )
        expect(res.statusCode).toEqual(401)
       expect(res.body.message).toEqual("invalid login credentials")
      })

      it('Should know that email field is empty', async () => {
        const emailRegrex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        const res = await request(app)
          .post('/login')
          const user={
            email:"",
            password:"password123"
        }
         try{
          res.send(user)
          expect(email).not.toMatch(emailRegrex);
          expect(res.statusCode).toEqual(400)
         } 
        catch(error){
            expect(res.body.message).toEqual("Email field is required")
        }
      })
})