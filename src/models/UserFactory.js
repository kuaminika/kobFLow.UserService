
import { User } from './User.js';

function UserFactory() {
const self = this;


    self.createUser = (rawUser) => {
        return new User(rawUser);   
    }

}


export { UserFactory };