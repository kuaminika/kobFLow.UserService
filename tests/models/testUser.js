import { User } from '../../src/models/User.js';

console.log("🔍 Running User model tests...");

// 1️⃣ Test default user
const blankUser = new User();
console.log("Blank user:", blankUser);

console.assert(blankUser.email === "", "❌ Email should be blank by default");
console.assert(blankUser.createdAt instanceof Date, "❌ createdAt should be a Date object");

console.log("✅ Default user test passed.\n");

// 2️⃣ Test custom user
const customData = {
  id: 10,
  email: "test@example.com",
  name: "Test User",
  provider: "google",
  providerId: "12345",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-02")
};

const user = new User(customData);
console.log("Custom user:", user);

console.assert(user.email === "test@example.com", "❌ Email should match input");
console.assert(user.provider === "google", "❌ Provider should match input");
console.assert(user.providerId === "12345", "❌ Provider ID should match input");

console.log("✅ Custom user test passed.\n");

console.log("🎉 All User model tests passed successfully!");
