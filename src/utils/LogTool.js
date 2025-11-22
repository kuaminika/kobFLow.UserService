import { ConsoleLogger } from "./ConsoleLogger.js";
import callsites from "callsites";

function LogTool({  givenToolExtensions ,logFactory}) {
    const self = this;   
   
    let defaultExtensions = [new ConsoleLogger()];
    self.toolExtensions = givenToolExtensions || [];   
    self.toolExtensions = self.toolExtensions.concat(defaultExtensions);

    self.formatLogMessage = (logItem) => {
        return `[${logItem.timestamp.toISOString()}] [${levelsArr[logItem.level]}] [${logItem.location}] ${logItem.message}`;
    }
    const levels = { 
        Trace: 0, 
        Info: 1, 
        Warning: 2, 
        Error: 3, 
        Critical: 4 
    };
    const levelsArr = Object.keys(levels);

    function dressUpLogItem(rawLogItem) {
        let logItem = logFactory.createLogItem(rawLogItem);
      
        logItem.timestamp = logItem.timestamp || new Date();
        return logItem;
    }
   self._getCallerInfo = () => {
       try{
        const stack = callsites();
        // The caller is typically at index 2 (0 is this function, 1 is the log method, 2 is the caller)
        const caller = stack[2];
         const filePath = caller.getFileName();
        const fileName = filePath ? filePath.split(/[\\/]/).pop() : "unknown";

         return { 
            location: `${fileName}:${caller.getLineNumber()}`
        };
       }catch(err){console.error("Error in _getCallerInfo:",err);
        return { location: "unknown"};

       }
    
    }



    self.trace = (message,customLocation) => {
        const callerInfo =  self._getCallerInfo()  ; 
       let logItem = dressUpLogItem({message,level:levels.Trace,location:customLocation || callerInfo.location});
     
        const formattedMessage = self.formatLogMessage(logItem);
        self.toolExtensions.forEach(extension  => {
            extension .log({formattedMessage, logItem});
        });
    }

    self.log = (message,customLocation) => {
        const callerInfo =  self._getCallerInfo()  ;
        let logItem = dressUpLogItem({message,level:levels.Info,location:customLocation || callerInfo.location});
     
        const formattedMessage = self.formatLogMessage(logItem);
     
        self.toolExtensions.forEach(extension  => {
            extension.log({formattedMessage, logItem});
        });
    }


    self.error = (message,customLocation) => {
        
        const callerInfo =  this._getCallerInfo()  ;
        let logItem = dressUpLogItem({message,level:levels.Error,location:customLocation || callerInfo.location});
        const formattedMessage = self.formatLogMessage(logItem);
        self.toolExtensions.forEach(extension  => {
            extension.error({formattedMessage, logItem});
        });
    }

    
    self.warn = (message ,customLocation ) => {
        
        const callerInfo = this._getCallerInfo()  ;
        let logItem = dressUpLogItem({message,level:levels.Warning,location:customLocation || callerInfo.location});
        const formattedMessage = self.formatLogMessage(logItem);
        self.toolExtensions.forEach(extension  => {
            extension.warn({formattedMessage, logItem});
        });
    }

    self.critical = (message ,customLocation ) => {
        
        const callerInfo = this.includeCallerInfo ? this._getCallerInfo() : {};
        let logItem = dressUpLogItem({message,level:levels.Critical,location:customLocation || callerInfo.location});
        const formattedMessage = self.formatLogMessage(logItem);
        self.toolExtensions.forEach(extension  => {
            extension.critical({formattedMessage, logItem});
        });

    }

    self.info = self.log;
    self.warning = self.warn; 

}





export { LogTool };