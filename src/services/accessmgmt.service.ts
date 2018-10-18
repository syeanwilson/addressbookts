import * as ObjectHash from 'object-hash';

export class AccessMgmt {

    private accessTokens;
    private logs;

    constructor () {
        if(!this.accessTokens){
            this.accessTokens = new Set();
            this.logs = new Map();
        }        
    }

    public getAccessToken(email: String, token?: any) {
        let time = Date.now();
        let hash = ObjectHash.sha1({email:time});

        if(token) {
            if(this.accessTokens.has(token)) {
                let userLog = this.logs.get(token);
                if(time > (userLog.timeIssued + userLog.expire)){
                    return {error: "Session expired", code: 401}
                } else {
                    this.accessTokens.delete(token);
                    this.logs.delete(token);
                    this.accessTokens.add(hash);
                    this.logs.set(hash, {email: email, timeIssued: time, accessToken: hash, expire: 900000});
                    return hash;
                }
            } else {
                return {error: "Authentication failed. No access.", code: 401}
            }
        } else {
            this.accessTokens.add(hash);
            this.logs.set(hash, {email: email, timeIssued: time, accessToken: hash, expire: 900000})
            return hash;
        }        
    }

    public verifyAccess( token: any, email?: String,) {
        
        // console.log("Entered accessmgmt verifyAccess with token: " + token);
        // console.log("Key in accessToken: " + this.accessTokens.keys());
        // return this.accessTokens.has(hash);
        return this.getAccessToken(email, token);
    }
}