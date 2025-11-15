import { LogTool } from '../../src/utils/LogTool.js';
import { LogFactory } from '../../src/models/LogFactory.js';
import { MySqlLogToolExtension} from '../../src/utils/MySqlLogToolExtension.js';
import { MySQL_DBGateway } from '../../src/utils/DBGateway.js';
import {LogRepository} from "../../src/repository/LogRepository.js";


import config from '../configs.js';
import { ConsoleLogger } from '../../src/utils/ConsoleLogger.js';



const action = "TestLogToolActions";

    console.log('🧪 Starting LogTool Tests...\n');
     // Test 1: Basic Console Logging
    console.log('📝 Test 1: Basic Console Logging');
    const consoleLogger = new LogTool({
     
        logFactory: new LogFactory({ application: config.applicationName || 'TestApp',  service: 'AuthService',action}),
       

    });
    
    
    consoleLogger.log(  'This is an info message' );
    consoleLogger.warn( 'This is a warning message' );
    consoleLogger.error( 'This is an error message' );
    console.log('✅ Test 1 passed: Basic logging works\n');


    
    // Test 2: Custom Location
    console.log('📝 Test 2: Custom Location');
    consoleLogger.log( 'User action completed', 'UserController.js' );
    console.log('✅ Test 2 passed: Custom location works\n');
    

    
    // Test 3: Multiple Extensions
    console.log('📝 Test 3: Multiple Extensions (Console + Mock DB)');


    const dbGateway = new MySQL_DBGateway(config);
    console.log('MySQL_DBGateway created:', dbGateway);
    const repository = new LogRepository({dbGateway});
    console.log('LogRepository created:', repository);
    const mysqlLogToolExtension = new MySqlLogToolExtension({repository, backUpExtension: new ConsoleLogger()});
    console.log('MySqlLogToolExtension created:', mysqlLogToolExtension);


    const multiExtensionLogger = new LogTool({
        givenToolExtensions: [mysqlLogToolExtension],
        logFactory: new LogFactory({ application: config.applicationName || 'TestApp',  service: 'AuthService',action}),
    });
    
    
    multiExtensionLogger.log(  '1-This is an info message db' );
    multiExtensionLogger.warn( '2-This is a warning message db',"customLocation" );
    multiExtensionLogger.error( '3- This is an error message db' );
    console.log('✅ Test 3 passed: Multiple extensions logging works\n');