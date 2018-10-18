import { DB } from '../models/userdb.model'

export class UserService {

    constructor() {}

    public getUserByEmail(email: String) {

        let key: String = email;
        const db = new DB();    
        const results = db.getUserByEmail(key);
        return results;
    
    }
}
