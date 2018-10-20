
export class UserDB {

    constructor() {}

    private DB = {
        users: new Map([
            ["syean15@gmail.com", {
                id: 1,
                firstName: "Syean",
                lastName: "Wilson",
                fullName: "Syean Wilson",
                password: "password",
                email: "syean15@gmail.com"
            }],
            ["bdubs@gmail.com", {
                id: 2,
                firstName: "Brandon",
                lastName: "Wilson",
                fullName: "Brandon Wilson",
                password: "bdubs",
                email: "bdubs@gmail.com"    
            }],
            ["syean", {
                id: 3,
                firstName: "CC",
                lastName: "Wilson",
                fullName: "Brandon Wilson",
                password: "pass",
                email: "bdubs@gmail.com"    
            }],
            ["sayed", {
                id: 4,
                firstName: "Sayed",
                lastName: "Hussaini",
                fullName: "Sayed Hussaini",
                password: "pass",
                email: "sayed"    
            }]
        ])
    }    

    public getUserByEmail(email: String) {

        let key = String(email);

        if(this.DB.users.has(key)){
            return this.DB.users.get(key);
        } else {
            return this.notFound();
        }

    }

    public notFound() {

        return {
            error: "User does not exist",
            code: 404
        }
    }

}
