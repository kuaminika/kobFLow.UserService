function UserService({ userRepository, logTool , userFactory,messageBoard})  {
    const self = this;

    self.messageBoard = messageBoard;

    self.getUserById = async (userId) => {
        logTool.info(`Fetching user by ID: ${userId}`);
        
        const user = await userRepository.getUserById(userId);

        if (!user) {
            logTool.warn(`User not found: ${userId}`);
        }

        return user;
    }

    self.getAllUsers = async () => {
        logTool.info("Fetching all users");
        return await userRepository.getAllUsers();
    }

    self.getByEmail = async (email) => {
        logTool.info(`Fetching user by email: ${email}`);
        return await userRepository.getByEmail(email);
    }

    self.addUser = async (user) => {
        logTool.info(`Adding new user: ${user.email}`);
        return await userRepository.addUser(user);
    }

    self.updateUser = async (user) => {
        let userToUpdate = userFactory.createUser(user);
        logTool.info(`Updating user: ${user.id}`);
        return await userRepository.updateUser(userToUpdate);
    }

    self.findOrCreateUserByEmail = async ({email, name, orgId,provider,providerUserId}) => {
        logTool.info(`Finding or creating user by email: ${email}`);
   
        try {
           if (!email) {
                logTool.warn("Email is required to find or create a user.");
                throw new Error(messageBoard.errorMessages.EMAIL_REQUIRED);
            }
        let user = await userRepository.getByEmail(email);
        if(user)
        {
            logTool.trace(`User found for email!!!: ${email}`);
            let updates = user;
            let shouldUpdate = false;
            if(provider)
            {shouldUpdate = true;
                updates.provider = provider;
            }
            
            if(providerUserId)
            {shouldUpdate = true;
                updates.providerUserId = providerUserId
            }
            if(shouldUpdate)
            {
                await userRepository.updateUser(updates);
                logTool.log("updated the user"+JSON.stringify(updates));
            }

        }

        if (!user) {
            logTool.trace(`User not found — creating new one for email: ${email}`);

          

            if(!orgId){
                logTool.warn("orgId is required to  create a user.");
                throw new Error(messageBoard.errorMessages.ORG_REQUIRED);
            }
            if(!provider){
                logTool.warn("provider is required to  create a user.");
                throw new Error(messageBoard.errorMessages.PROVIDER_REQUIRED);
            }
            if(!providerUserId){
                logTool.warn("providerUserId is required to   create a user.");
                throw new Error(messageBoard.errorMessages.PROVIDER_USER_ID_REQUIRED);
            }
              let newUser = userFactory.createUser({
                email,
                name,
                memberSince: new Date(),
                orgId,
                provider,
                providerUserId
            });
            user = await userRepository.addUser(newUser);

            logTool.info(`Created new user: ${user.id}`);
        }

        return user;





        } catch (error) {
            logTool.error(`Error in findOrCreateUserByEmail: ${error.message}`);

        logTool.error(error.stack);
            throw error;
        }
    }
}
export { UserService };