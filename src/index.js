
import configs from "./configs.js";
import {UserServiceFactory} from "./UserServiceFactory.js";
 
import express from 'express';
import axios from 'axios';
import cors from 'cors';
const app = express();
app.use(express.json());

console.log(configs);
app.use(cors()); // No restrictions

const userServiceFactory = new UserServiceFactory(configs);
const userService = userServiceFactory.createUserService();

// Add global error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit the process
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Don't exit the process
});


app.get('/', (req, res) => {


    res.send('Hello from ES Module Express!');
  });


  app.get('/IPData', (req, res) => {

    axios.get('https://api.ipify.org?format=json')
    .then(res => console.log("Public IP is:", res.data.ip));
    
    res.send('It is consoled');
  });


app.post("/api/findOrCreateUser",async (req,res)=>{
  
    try
    {
        let  requestBody = req.body; 
        requestBody.orgId = requestBody.orgId || configs.defaultOrgId;
        
        let result = await  userService.findOrCreateUserByEmail(requestBody);
        res.send(result);


    }catch(err){
       
        if(userService.messageBoard.isCustomErrorMessage(err.message))
        {
            // This is one of our predefined validation errors
            return res.status(400).json({ error: err.message });
        }

        console.error("Error in findOrCreateUser:",err);
        res.status(500).send({error:"Internal Server Error"});
      
    }
});

 


app.listen(configs.port, () => {
    console.log(`Server is running at http://localhost:${configs.port}/`);
});
