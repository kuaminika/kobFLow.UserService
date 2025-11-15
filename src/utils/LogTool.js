import { ConsoleLogger } from "./ConsoleLogger.js";

function LogTool({  givenToolExtensions ,logFactory}) {
    const self = this;   
    console.log("args:",{  givenToolExtensions ,logFactory}  );
    let defaultExtensions = [new ConsoleLogger()];
    self.toolExtensions = givenToolExtensions || [];   
 self.toolExtensions = self.toolExtensions.concat(defaultExtensions);
    console.log('LogTool initialized with extensions:', this.toolExtensions);
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
        const stack = new Error().stack; 
        const stackLines = stack.split('\n'); 
      
        if (stackLines.length >= 4) {
            const callerLine = stackLines[2].trim();
            const match = callerLine.match(/at\s+([^(]+)\s+\(?(.+):(\d+):(\d+)\)?/);
            if (match) {
                const file = match[2];
                const fileName = file.split('/').pop() || file.split('\\').pop();
                return {
                    file: fileName,
                    line: match[3],
                    location: `${fileName}:${match[3]}`
                };
            }
        }
        return { location: 'unknown' };
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
        console.log("Logging message:",formattedMessage);
        self.toolExtensions.forEach(extension  => {
            extension.log({formattedMessage, logItem});
        });
    }


    self.error = (message,customLocation) => {
        
        const callerInfo = this.includeCallerInfo ? this._getCallerInfo() : {};
        let logItem = dressUpLogItem({message,level:levels.Error,location:customLocation || callerInfo.location});
        const formattedMessage = self.formatLogMessage(logItem);
        self.toolExtensions.forEach(extension  => {
            extension.error({formattedMessage, logItem});
        });
    }

    
    self.warn = (message ,customLocation ) => {
        
        const callerInfo = this.includeCallerInfo ? this._getCallerInfo() : {};
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