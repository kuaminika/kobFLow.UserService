import { UserFactory } from '../models/UserFactory.js';
import { QueryHolder } from './QueryHolder.js';




function UserRepository({ dbGateway ,queryHolder, userFactory}) {


    const self = this;


    self.getUserById = async (userId) => {


        const results = await dbGateway.doQuery({
            queryStr: queryHolder.getUserByIdQuery,
            params: [userId]
        }) 

        if(results.length === 0) {
            return null;
        }

        return userFactory.createUser(results[0]);                      
    }

    self.getAllUsers = async () => {

        const results = await dbGateway.doQuery({
            queryStr: queryHolder.getAllUsersQuery,
            params: []
        }); 
        return results.map(row => userFactory.createUser(row));

    }

    self.getByEmail = async (email) => {

        const results = await dbGateway.doQuery({
            queryStr: queryHolder.getUserByEmailQuery,
            params: [email]
        });

        if(results.length === 0) {
            return null;
        }

        return userFactory.createUser(results[0]);
    
    }
    

    self.addUser = async (user) => {

        const insertQuery =queryHolder.addUserQuery;
        const insertIdentityQuery = queryHolder.addUserIdentityQuery;

        const result = await dbGateway.doQuery({
            queryStr: insertQuery,
            params: [user.email, user.name, user.memberSince,user.orgId]
        });

        const userId = result.insertId;

        await dbGateway.doQuery({
            queryStr: insertIdentityQuery,
            params: [userId, user.provider, user.providerUserId]
        });

        return userFactory.createUser({ ...user, id: userId });
    }


    self.updateUser = async (  user) => {
        console.log("Updating user:", user);
        const generalResult = {userResult :{}, identityResult:{}};
    
         generalResult.userResult =  await dbGateway.doQuery({queryStr:queryHolder.updateUserQuery,
            params: [user.name, user.email,  user.id]
        }); 

        if(user.provider && user.providerUserId)
            generalResult.identityResult = await dbGateway.doQuery({queryStr:queryHolder.updateUserIdentityQuery,
                    params: [user.provider, user.providerUserId, user.id]
                });
        console.log("Update results:", generalResult);

        return generalResult;

    }
}


export { UserRepository };