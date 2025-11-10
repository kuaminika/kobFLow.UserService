import dotenv from 'dotenv';
dotenv.config();
const port = process.env.HTTP_PORT;
const host = process.env.DB_HOST; 
const user = process.env.DB_USER;
const database = process.env.DB_NAME;
const password = process.env.DB_PWD;
const dbPort = process.env.DB_PORT;
const dbSettings = {host,user,database,password,dbPort};


export default {...dbSettings,port}