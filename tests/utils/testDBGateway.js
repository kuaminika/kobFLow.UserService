import { MySQL_DBGateway } from '../../src/utils/DBGateway.js';
import config from '../configs.js';
console.log(config);

// ✅ Replace with your actual MySQL connection info
const args = config;

// Create a gateway instance
const gateway = new MySQL_DBGateway(args);

async function runTests() {
  console.log("🔍 Testing MySQL_DBGateway...");

  try {
    // 1️⃣ Test connection
    console.log("⏳ Testing connection...");
    const conn = await gateway.testConnect();
    
    console.log("✅ Connection successful!");
    await conn.end();

    // 2️⃣ Test a simple query
    console.log("\n⏳ Running test query...");
    const users = await gateway.doQuery({
      queryStr: "SELECT NOW() as `current_time`",
      params: []
    });
    console.log("✅ Query success! Result:", users);

    // 3️⃣ (Optional) Test a stored procedure if you have one
    // const result = await gateway.doProcedure("myProcedureName", [param1, param2]);
    // console.log("✅ Procedure executed:", result);

    console.log("\n🎉 All DB tests completed successfully!");
  } catch (err) {
    console.error("❌ Test failed:", err.message);
    console.error(err);
  }
}

runTests();
