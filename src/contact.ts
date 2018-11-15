import { IContact } from './interfaces/contact.interface';

export class Contact implements IContact {            

    firstName: string;
    lastName: string;
    phoneNumber: number;
    type: string;
    dateCreated: Date; 
    id: number | string;

    constructor(firstName: string, lastName: string, phoneNumber: number, id: any) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.id = id;
    }

    public setFirstName(firstName: string) { this.firstName = firstName; }
    public setLasttName(lastName: string) { this.lastName = lastName; }
    public setPhoneNumber(phoneNumber: number) { this.phoneNumber = phoneNumber; }

    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getPhoneNumber(): number {
        return this.phoneNumber;
    }

    public getId(): number | string {
        return this.id;
    }
}

export let ContactModel: IContact = {
    firstName: "",
    lastName: "",
    phoneNumber: 0,
    type: "",
    id: 0,
    getId: ():number | string => {
        return "This is an id from ContactModel";
    }
}