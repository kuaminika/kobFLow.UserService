// Get the client
import mysql from 'mysql2/promise';

import DBGatewayArgs from "./DBGatewayArgs.js";


function MySQL_DBGateway(args)
{
    
    const {host , user ,database,password,dbPort} = args;
    const self = this;
 
  function connect() {
    return mysql.createConnection({ host, user, database, password});
  }

    self.testConnect = connect;

    self.doProcedure = function(procedureName,paramArray)
    {
        const connectionP =  connect();
        let conn;

        const executionPromise = connectionP.then(c=>{
            conn = c;
            const executionP  =  conn.execute(`CALL ${procedureName}(?)`,paramArray);
            return executionP;          
         })
       
        const promiseWithResults =  executionPromise.then(result=>{
                 
            return  conn.end().then(()=>{
                                               return result[0][0];
                                       });
        });

        return promiseWithResults;
        
    }

    self.doQuery =    function(query_args){
     

        const p = new Promise((acc,rej)=>{
          
                try{
                    const {queryStr,params } = query_args;
 
                    const connectionP =  connect();
                    connectionP.then(conn=>{
                       let qP =   conn.execute(queryStr, params);//conn.query(queryStr);
                    
                        qP.then(results =>acc(results[0]));
                        qP.catch(rej);
                    
                    
                    }); 
                    connectionP.catch(rej);

                }
                catch(err)
                {
                  rej(err);
                }
        })
        
        return p;




    }
}
  
//exports.dbGateway  = new MySQL_DBGateway();
export  {MySQL_DBGateway,DBGatewayArgs};