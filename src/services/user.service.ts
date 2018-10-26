import { UserDB } from '../models/userdb.model'

export class UserService {

    constructor() {}

    public getUserByEmail(email: String) {

        let key: String = email;
        const db = new UserDB();    
        const results = db.getUserByEmail(key);
        return results;
    
    }
}
