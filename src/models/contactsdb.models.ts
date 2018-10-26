import {Contact} from '../contact';

export class ContactDB {

    private contacts;
    private contactKeys;

    constructor(email: String) {
        if(!this.contactKeys || !this.contacts){
            this.contacts = new Map();
            this.contactKeys = new Set();
            this.loadContactKeys(email);
            this.loadAllContactsFromStorage();
        }        
    }

    public getContact(key: any) {
        if(this.contactKeys.has(key)){
            return this.contacts.get(key);
        }        
        return {error: "Contact does not exist!"}
    }

    public getAllContacts() {
        return this.contacts;
    }

    public saveContacts(email: String) {
        this.saveContactsToStorage(email);
    }

    public insertContact(key: any, contact: Contact) {         
        if(this.contactKeys.add(key)) {
            this.contacts.set(key, contact);
            return true;
        } 
        return {error: "Failed to add contact. A contact may already exist with that number."}
    }

    public deleteContact(key: any) {
        if(this.contactKeys.has(key)) {
            this.contactKeys.delete(key);
            this.contacts.delete(key);
            return true;
        } else {
            return {error: "Failed to delete contact. Probably did not exist."}
        }
    }

    private loadContactKeys(email: String) {
        
        if(window.localStorage) {
            console.log("Loading contact keys from storage... for " + email)
            let contactKeys;
            if(contactKeys = window.localStorage.getItem(String(email))) {
                this.contactKeys = new Set(JSON.parse(contactKeys));
                console.log("Contact keys are => " + contactKeys);
            }
            console.log("Finished loading keys from storage");
        } else {
            console.log("Local storage not supported");
            return {error: "Local storage not supported"}
        }
    }

    private loadAllContactsFromStorage() {
        if(window.localStorage) {
            console.log("Loading all contacts from storage..." + this.contactKeys.size);
            if(this.contactKeys.size > 0) {
                for (let key of this.contactKeys.keys()) {
                    let contact;
                    console.log("Key is =>" + key.toString());
                    if(contact = window.localStorage.getItem(String(key))){
                        console.log("Loaded contact is " + contact);
                        let loadedContact = JSON.parse(contact);
                        this.contacts.set(key, 
                            new Contact(loadedContact.firstName, loadedContact.lastName, loadedContact.phoneNumber, loadedContact.phoneNumber));
                    }
                }
                console.log("All loaded contacts => " + this.contacts.size);
                return this.contacts;
            } else {
                return new Map();
            }
        } else {
            console.log("Local storage not supported");
            return {error: "Local storage not supported"}
        }
    }

    private saveContactsToStorage(email: String) {

        if(window.localStorage) {
            let keys = [];
            for (let key of this.contactKeys.keys()){
                keys.push(key);
                window.localStorage.setItem(String(key), JSON.stringify(this.contacts.get(key)))
            }            
            window.localStorage.setItem(String(email), JSON.stringify(keys));
            console.log("Contacts saved.");
            //Add return to check if save was successful to notify user 
        } else {
            console.log("Local storage not supported");
            return {error: "Local storage not supported"}
        }       
        
    }

    private autoSave() {

    }

}