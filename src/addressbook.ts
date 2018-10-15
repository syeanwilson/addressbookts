import {Contact} from './contact';

export class AddressBook {
    public contacts: Map<Number, Contact>;
    public nextId;
    public numContacts = 0;

    constructor() {
        this.contacts = new Map<Number, Contact>();
        this.nextId = 1;
    }

    public addContact(contact: Contact) {
        this.contacts.set(this.nextId, contact);
        this.nextId++;
        this.numContacts++;
    }

    public removeContact(id: Number) {
        this.contacts.delete(id);
        this.numContacts--;
    }

    public getContacts() {
        return this.contacts;
    }

    public printBook() {
        console.log(this.contacts);
    }

    public getNextId() {
        return this.nextId;
    }

    public getNumberOfContacts() {
        return this.numContacts;
    }
}