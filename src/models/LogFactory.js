import { LogItem } from './LogItem.js';

function LogFactory({application, service,action}) {
    const self = this;
    self.createLogItem = (data) => { 
        data.application = data.application || application;
        data.service = data.service || service;
        data.action = data.action || action;
        let result= new LogItem(data); 
        return result;
    }

}

export { LogFactory };