function UserService({ userRepository, logTool , userFactory})  {
    const self = this;

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

    self.findOrCreateUserByEmail = async (email, name, orgId) => {
        logTool.info(`Finding or creating user by email: ${email}`);

        let user = await userRepository.getByEmail(email);

        if (!user) {
            logTool.trace(`User not found — creating new one for email: ${email}`);

            let newUser = userFactory.createUser({
                email,
                name,
                memberSince: new Date(),
                orgId
            });

            user = await userRepository.addUser(newUser);

            logTool.info(`Created new user: ${user.id}`);
        }

        return user;
    }
}
export { UserService };