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
        if(this.contacts.has(key)){
            return false;
        }
        this.contacts.set(key, contact);
        this.db.insertContact(key, contact);
        this.numContacts++;
        return true;
    }

    public removeContact(key: any) {
       
       if(this.contacts.delete(key)){
        if(this.db.deleteContact(key)) {
            console.log(`${key} deleted`);
        }else{
            console.log(`Could not delete ${key} from DB`);
        }
       } else {
           console.log(`Could not delete ${key}. Not in loaded keys`);
       }
        
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
        return this.contacts.size;
    }

    public saveBook(email: String) {
        this.db.saveContacts(email);
    }
}