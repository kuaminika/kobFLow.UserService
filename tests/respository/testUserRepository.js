// Standard ES module imports
import assert from 'assert';
import { UserRepository } from '../../src/repository/UserRepository.js';
import { UserFactory } from '../../src/models/UserFactory.js';
import DBGatewayArgs from '../../src/utils/DBGatewayArgs.js';
import { MySQL_DBGateway } from '../../src/utils/DBGateway.js';
import config from '../configs.js';
import { QueryHolder } from '../../src/repository/QueryHolder.js';

// Optional: print header for readability
console.log('🧪 Running UserRepository test...');

try {
  // Arrange
  const dbArgs = new DBGatewayArgs(config);
  const dbGateway = new MySQL_DBGateway(dbArgs);
  const queryHolder = new QueryHolder();
  const userFactory = new UserFactory();

  // Act
  const userRepository = new UserRepository({ dbGateway, queryHolder, userFactory });

  // Assert
  assert.ok(userRepository, 'UserRepository should be instantiated');
  console.log('✅ Test passed: UserRepository instantiated successfully!');
} catch (err) {
  console.error('❌ Test failed:', err.message);
  process.exit(1);
}

// Test fetching user by ID
console.log('\n🧪 Running fetching user by id...');

try {
  // Arrange
  const dbArgs = new DBGatewayArgs(config);
  const dbGateway = new MySQL_DBGateway(dbArgs);
  const queryHolder = new QueryHolder();
  const userFactory = new UserFactory();
  const userRepository = new UserRepository({ dbGateway, queryHolder, userFactory });

  // Act & Assert
  userRepository.getUserById(1).then((user) => {
    console.log("Fetched user by ID:", user);
    assert.ok(user !== null, 'User should not be null');
    assert.strictEqual(user.id, 1, 'User ID should be 1');
    console.log('✅ Test passed: Fetched user by ID successfully!');
    
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

// Test adding a new user
async function testAddUser() {
  console.log('\n🧪 Testing adding a new user...');
  
  try {
    const dbArgs = new DBGatewayArgs(config);
    const dbGateway = new MySQL_DBGateway(dbArgs);
    const queryHolder = new QueryHolder();
    const userFactory = new UserFactory();
    const userRepository = new UserRepository({ dbGateway, queryHolder, userFactory });

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
    const addedUser = await userRepository.addUser(userFactory.createUser(newUserData));
    
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
    const dbArgs = new DBGatewayArgs(config);
    const dbGateway = new MySQL_DBGateway(dbArgs);
    const queryHolder = new QueryHolder();
    const userFactory = new UserFactory();
    const userRepository = new UserRepository({ dbGateway, queryHolder, userFactory });

    // Updated user data
    const updatedUserData = {
      name: 'Updated Test User',
      email: `updated${Date.now()}@example.com`,
      updatedAt: new Date(),
      id: userId
    };

    // Act - Update the user
    const updateResult = await userRepository.updateUser(  updatedUserData);
    
    // Assert
    assert.ok(updateResult, 'User should be updated successfully');
 
    // Verify the update by fetching the user again
    const updatedUser= await userRepository.getUserById(userId);
   
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