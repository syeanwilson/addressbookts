
export class DB {

    constructor() {}

    private DB = {
        users: new Map([
            ["syean15@gmail.com", {
                firstName: "Syean",
                lastName: "Wilson",
                fullName: "Syean Wilson",
                password: "password",
                email: "syean15@gmail.com"
            }],
            ["bdubs@gmail.com", {
                firstName: "Brandon",
                lastName: "Wilson",
                fullName: "Brandon Wilson",
                password: "bdubs",
                email: "bdubs@gmail.com"    
            }],
            ["syean", {
                firstName: "Brandon",
                lastName: "Wilson",
                fullName: "Brandon Wilson",
                password: "pass",
                email: "bdubs@gmail.com"    
            }]
        ])
    }

    private error404 = {
        error: "User does not exist",
        code: 404
    }

    public getUserByEmail(email: String) {

        let key = String(email);

        if(this.DB.users.has(key)){
            return this.DB.users.get(key);
        } else {
            return this.error404;
        }

    }

    public notFound() {
        return this.error404;
    }

}
