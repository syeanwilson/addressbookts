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
            this.accessTokens.clear();
            this.accessTokens.add(hash);
            this.logs.set(hash, {email: email, timeIssued: time, accessToken: hash, expire: 900000})
            return hash;
        }        
    }

    public createSession(email: String) {
        let addressBookSession = {
            email: email
        }
        window.sessionStorage.setItem("addressBookSession", JSON.stringify(addressBookSession));
        return addressBookSession;
    }

    public checkSession() {
        let session;
        if(session = window.sessionStorage.getItem("addressBookSession")){
            return JSON.parse(session);
        } else {
            return {error: true, action: "logout"};
        }
    }

    public destroySession() {
        window.sessionStorage.clear();
    }

    public verifyAccess( token: any, email?: String,) {
        return this.getAccessToken(email, token);
    }
}