function MySqlLogToolExtension({ repository, backUpExtension}) {

    const self = this;

    async function doTheLogging({logItem, formattedMessage}) {
         try {
            
            await repository.addLogItem(logItem);
        } catch (err) {

         
            // Fallback to backup logger if database logging fails
            if (backUpExtension) {
                backUpExtension.error({ formattedMessage:"Error logging to database:"+err.messager });
                console.log("Falling back to backup logger for message:", formattedMessage);
                console.log(err);
            } else {
                console.error("Failed to log to database and no backup logger available:", err);
                console.error("meassage it tried to log", formattedMessage);
            }
        }
    }

    self.log =  doTheLogging;
    self.error =  doTheLogging;
    self.warn=  doTheLogging;    
    self.critical=  doTheLogging;
    self.trace=  doTheLogging;

}

export { MySqlLogToolExtension };