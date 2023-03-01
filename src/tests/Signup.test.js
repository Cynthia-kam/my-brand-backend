const axios=require ("axios")
const host="http://localhost:3000";
//const signup=require(signupController);

describe("add a new user",()=>{
   describe("given fullname,email,password and isAdmin",()=>{
    //return sucessfully cretaed a user
    //resturn status code of 201
    test ("should respond with 201 status code",()=>{
      const res= axios.post(`${host}/signup`)
      expect(res.status).toBe(403)
    })
   })
  
})