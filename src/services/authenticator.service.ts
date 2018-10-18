import { DB } from '../models/userdb.model';
import { AccessMgmt } from '../models/accessmgmt.model';

export class Authenticator {

    private accessMgmt;

    constructor() {
        this.accessMgmt = new AccessMgmt();
    }

    public login(email: String, password: String) {
    
        const db = new DB();
        let results = Object(db.getUserByEmail(email));    
        if(results != null) {
    
            if(results.error) {
                return results;
            } else {
                if(password === results.password) {
                    return {success: true, accessToken: this.accessMgmt.getAccessToken(email)}
                } else {
                    return {error: "Email or password does not match.", code: 401}
                }                
            }
    
        } else {
            console.log("Database connection failed.");
            return 500;
        }
    
    }
    
    public logout() {
    
    }

    public verifyAccess(email: String, token: any) {
        // console.log("Entered verifyAccess in Authenticator with token: "+token);
        let result = this.accessMgmt.verifyAccess(token);
        
        // console.log("Verify access called:" + email + ", " + hash);
        return result;
    }

}