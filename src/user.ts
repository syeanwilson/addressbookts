export class User {

    private firstName: String;
    private lastName: String;
    private fullName: String;
    private email: String;
    private id: number;

    constructor(firstName: String, lastName: String, email: String, id: number){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.id = id;
        this.setFullName(firstName, lastName);
    }

    public setFirstName(firstName: String) {
        this.firstName =firstName;
    }

    public setLastName(lastName: String) {
        this.lastName = lastName;
    }

    public setEmail(email: String) {
        this.email = email;
    }

    public getFirstName() {
        return this.firstName;
    }

    public getLastName() {
        return this.lastName;
    }

    public getEmail() {
        return this.email;
    }

    public getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    public getId() {
        return this.id;
    }

    private setFullName(firstName: String, lastName: String) {
        this.fullName = `${firstName} ${lastName}`;
    }

}