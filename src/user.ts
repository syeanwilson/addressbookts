import { IUser } from './interfaces/user.interface';

export class User implements IUser {

    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    id: number;

    constructor(firstName: string, lastName: string, email: string, id: number){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.id = id;
        this.setFullName(firstName, lastName);
    }

    public setFirstName(firstName: string) {
        this.firstName =firstName;
    }

    public setLastName(lastName: string) {
        this.lastName = lastName;
    }

    public setEmail(email: string) {
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