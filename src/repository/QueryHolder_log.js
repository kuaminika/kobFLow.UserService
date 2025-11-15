function QueryHolder_log() {

    const self = this;
    self.insertLogQuery = `INSERT INTO db_log (log_level, location, message, log_time,action,service,application) VALUES (?, ?, ?, ?, ?, ?, ?)`;
}


export { QueryHolder_log };