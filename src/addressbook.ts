import {Contact} from './contact';
import {ContactDB} from './models/contactsdb.models'

export class AddressBook {
    public contacts;
    public numContacts = 0;
    private db: ContactDB;

    constructor(email: String) {
        this.db = new ContactDB(email);
        this.contacts = this.db.getAllContacts();
    }

    public addContact(key: any, contact: Contact) {
        this.contacts.set(key, contact);
        this.db.insertContact(key, contact);
        this.numContacts++;
    }

    public removeContact(key: any) {
        this.contacts.delete(key);
        this.db.deleteContact(key);
        this.numContacts--;
    }

    public getContacts() {
        console.log("Getting contacts from addrress book...");
        return this.contacts;
    }

    public printBook() {
        console.log(this.contacts);
    }

    public getNumberOfContacts() {
        return this.numContacts;
    }

    public saveBook(email: String) {
        this.db.saveContacts(email);
    }
}