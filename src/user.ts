export class User {

    private firstName: String;
    private lastName: String;
    private fullName: String;
    private email: String;

    constructor(firstName: String, lastName: String, email: String){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
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

    private setFullName(firstName: String, lastName: String) {
        this.fullName = `${firstName} ${lastName}`;
    }

}