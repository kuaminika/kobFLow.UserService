import { UserRepository } from './repository/UserRepository.js';
import { UserService } from './UserService.js';
import { LogRepository } from './repository/LogRepository.js';
import { MySqlLogToolExtension } from './utils/MySqlLogToolExtension.js';
import { LogTool } from './utils/LogTool.js';
import { LogFactory } from './models/LogFactory.js';
import { ConsoleLogger } from './utils/ConsoleLogger.js';
import { UserFactory } from './models/UserFactory.js';
import DBGatewayArgs from './utils/DBGatewayArgs.js';
import { MySQL_DBGateway } from './utils/DBGateway.js';
import { Constants } from './Constants.js';
import { QueryHolder } from './repository/QueryHolder.js';

const messageBoard = Constants;

function UserServiceFactory(configs) {
    const self = this;
    const config = configs || {};
 
    self.createUserService = ( ) => {

        const dbArgs = new DBGatewayArgs(config);
        const dbGateway = new MySQL_DBGateway(dbArgs);
        const queryHolder = new QueryHolder();
        const userFactory = new UserFactory();


        const logrepository = new LogRepository({dbGateway});
       
        
        const mysqlLogToolExtension = new MySqlLogToolExtension({logrepository, backUpExtension: new ConsoleLogger()});
        
        const multiExtensionLogger = new LogTool({
            givenToolExtensions: [mysqlLogToolExtension],
            logFactory: new LogFactory({ application: config.applicationName ,  service: config.serviceName  }),
        });


        // Act
        const userRepository = new UserRepository({ dbGateway, queryHolder, userFactory,messageBoard, logTool: multiExtensionLogger });
        const userService = new UserService({ userRepository, logTool: multiExtensionLogger, userFactory,messageBoard });
        return userService;
    }


}


export { UserServiceFactory };