import app from '../src/server.js'
import request from 'supertest'
import User from '../src/model/user.js'

describe("add a new user",()=>{
    // let server;
    // beforeAll(()=>{
    //     server=app.listen(2000)
    // })
    // afterAll((end)=>{
    //     server.close(end)
    // })
   describe("given fullname,email,password and isAdmin",()=>{
    test ("should respond with 201 status code",async()=>{
      const res= await request(app).post("/signup").send({
        fullname:"Marie",
        email:"abijurucyn@gmail.com",
        password:123,
        isAdmin:true
      })
      expect(res.status).toBe(403)
    })
   })
  
})
