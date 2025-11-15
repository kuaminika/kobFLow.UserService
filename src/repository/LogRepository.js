import { QueryHolder_log } from "./QueryHolder_log.js";

function LogRepository({dbGateway,   logFactory}) {
    const self = this;
    const queryHolder = new QueryHolder_log();
    self.addLogItem = async (logItem) => {
        const insertQuery = queryHolder.insertLogQuery;
       
      const result = await dbGateway.doQuery({
            queryStr: insertQuery,
            params: [logItem.level, logItem.location, logItem.message, logItem.timestamp, logItem.action, logItem.service, logItem.application]
        });

        return result.insertId;
        return 1;
    }
}

export { LogRepository };