 function ConsoleLogger() {

    const self = this;

    self.log = ({ formattedMessage }) => {
        console.log(formattedMessage);
    };
    self.error = ({ formattedMessage }) => {
        console.error(formattedMessage);
    };

    self.warn = ({ formattedMessage }) => {
        console.warn(formattedMessage);
    };

    self.critical = ({ formattedMessage }) => {
        console.error(formattedMessage);
    };


    self.trace = ({ formattedMessage }) => {
        console.trace(formattedMessage);
    };

} 

export { ConsoleLogger };