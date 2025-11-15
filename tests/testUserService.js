// Standard ES module imports
import assert from 'assert';
import { UserServiceFactory } from '../src/UserServiceFactory.js';  
import config from './configs.js'; 

// Optional: print header for readability
console.log('🧪 Running UserService test...');

try {  
  const userServiceFactory = new UserServiceFactory(config);
 const userService = userServiceFactory.createUserService();
  // Assert
  assert.ok(userService, 'UserService should be instantiated');
  console.log('✅ Test passed: UserRepository instantiated successfully!');
} catch (err) {
  console.error('❌ Test failed:', err);
  console.error('❌ Test failed:', err.message);
  process.exit(1);
}

// Test fetching user by ID
console.log('\n🧪 Running fetching user by id...');

try {
  // Arrange
  const userServiceFactory = new UserServiceFactory(config);
 const userService = userServiceFactory.createUserService();

  // Act & Assert
  userService.getUserById(1).then((user) => {
    console.log("Fetched user by ID:", user);
    assert.ok(user !== null, 'User should not be null');
    assert.strictEqual(user.id, 1, 'User ID should be 1');
    console.log('✅ Test passed: Fetched user by ID successfully!');
    
    // After fetching, run the fetch all users test
   testFetchAllUsers();
  }).catch((err) => {
    console.error('❌ Test failed:', err.message|| err.code);
    process.exit(1);
  });

} catch (err) {
  console.error('❌ Test failed:', err.message|| err.code);
  process.exit(1);
}

 
function testFetchAllUsers() {

      // Test fetching user by ID
      console.log('\n🧪 Running fetching all users...');

      try {
        // Arrange
  const userServiceFactory = new UserServiceFactory(config);
 const userService = userServiceFactory.createUserService();
        // Act & Assert
        userService.getAllUsers().then((users) => {
          console.log("users:", users);
          assert.ok(users !== null, 'Users be an array'); 
          console.log('✅ Test passed fetching users!');
          
          // After fetching, run the add user test
          testAddUser();
        }).catch((err) => {
          console.error('❌ Test failed:', err.message|| err.code);
          process.exit(1);
        });

      } catch (err) {
        console.error('❌ Test failed:', err.message|| err.code);
        process.exit(1);
      }


}

 

// Test adding a new user
async function testAddUser() {
  console.log('\n🧪 Testing adding a new user...');
  
  try {
   const userServiceFactory = new UserServiceFactory(config);
 const userService = userServiceFactory.createUserService();

    // Create a new user object
    const newUserData = {
      email: `testuser${Date.now()}@example.com`, // Unique email
      name: 'Test User',
      provider: 'local',
      orgId: config.defaultOrgId,
      providerUserId: `test${Date.now()}`,
      memberSince: new Date() ,
      updatedAt: new Date() 
    };

    // Act - Add the user
    const addedUser = await userService.addUser(newUserData);
    
    // Assert
    assert.ok(addedUser, 'User should be added successfully');
    assert.ok(addedUser.id, 'Added user should have an ID');
    assert.strictEqual(addedUser.email, newUserData.email, 'Email should match');
    assert.strictEqual(addedUser.name, newUserData.name, 'Name should match');
    
    console.log('✅ Test passed: User added successfully!');
    console.log('Added user:', addedUser);
    
    // After adding, run the update test
    testUpdateUser(addedUser.id);
    
  } catch (err) {
    console.error('❌ Test failed adding user:', err.message);
    process.exit(1);
  }
}

// Test updating a user
async function testUpdateUser(userId) {
  console.log('\n🧪 Testing updating a user...');
  
  try {
   const userServiceFactory = new UserServiceFactory(config);
 const userService = userServiceFactory.createUserService();
    // Updated user data
    const updatedUserData = {
      name: 'Updated Test User',
      email: `updated${Date.now()}@example.com`,
      updatedAt: new Date(),
      id: userId
    };

    // Act - Update the user
    const updateResult = await userService.updateUser(  updatedUserData);
    
    // Assert
    assert.ok(updateResult, 'User should be updated successfully');
 
    // Verify the update by fetching the user again
    const updatedUser= await userService.getUserById(userId);
   
     assert.strictEqual(updatedUser.name, updatedUserData.name, 'Name should be updated');
    assert.strictEqual(updatedUser.email, updatedUserData.email, 'Email should be updated');
    
    console.log('✅ Test passed: User updated successfully!');
    console.log('Updated user:', updatedUser);
    
    console.log('\n🎉 All tests passed!');
    
  } catch (err) {
    console.error('❌ Test failed updating user:', err.message);
    process.exit(1);
  }
}