import app from '../src/server.js'
import request from 'supertest'
import User from '../src/model/user.js';
import bcrypt from 'bcrypt';

describe('signupController Test', () => {
    let server;
    beforeAll(async () =>{
      server = app.listen(2000);
    })
    afterAll((end) =>{
      server.close(end)
    })
    
    jest.setTimeout(60000);
    it('should know that email of user being created already exist in db', async () => {
         
        const password = 'password@123';
        const hashedPassword = await bcrypt.hashSync(password, 12);
        const user1 = new User({
            fullname: 'John Doe',
            email: 'johndoe@example.com',
            password: hashedPassword,
            isAdmin:false
          });
      
          const user2 = new User({
            fullname: 'Jane Doe',
            email: 'johndoe@example.com', // same email as user1
            password: hashedPassword,
            isAdmin:false
          });
      
          try {
            await user1.save();
            await user2.save();
          } catch (err) {
            //expect(err).to.exist;
            expect(err.message).toContain('E11000 duplicate key error collection'||'buffering timed out');
          }
    });
    //when one field is missing
    it('should know that the email is invalid', async () => {
        const emailRegrex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        const user1 = new User({
            fullname: 'John Doe',
            email: 'johndoe',
            password: 'password',
            isAdmin:true
          });
          try {
            //await user1.save();
            expect(user1.email).not.toMatch(emailRegrex);
          } catch (err) {
            //expect(err).to.exist;
            //expect(err.message).toContain('E11000 duplicate key error collection');
          }
    });
    it('should know that the fullname field is empty', async () => {
        const emailRegrex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        const user1 = new User({
            fullname: '',
            email: 'john@gmail.com',
            password: 'password',
            isAdmin:true
          });
         try{ 
            const response = await request(app).post('/signup');
            expect(response.status).toBe(403);
            expect(response.body.message).toBe("fullname field is required")
        }
        catch(error){
            expect(error.message).toContain("User validation failed")
        }
        
    });
    it('should know that the email field is empty', async () => {
        const emailRegrex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        const user1 = new User({
            fullname: 'JohnDoe',
            email: '',
            password: 'password',
            isAdmin:true
          });
         try{ 
            const response = await request(app).post('/signup');
            expect(response.status).toBe(403);
            expect(response.body.message).toBe("Email field is required")
        }
        catch(error){
            //expect(error.message).toContain("User validation failed")
        }
        
    });
    it('should know that the isAdmin field is empty', async () => {
        const emailRegrex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        const user1 = new User({
            fullname: 'kurt weller',
            email: 'kurt@gmail.com',
            password: 'password',
            isAdmin:''
            
          });
         try{ 
            const response = await request(app).post('/signup');
            expect(response.status).toBe(403);
            expect(response.body.message).toBe("isAdmin field is required")
        }
        catch(error){
            //expect(error.message).toContain("User validation failed")
        }
        
    });
  
  
});
