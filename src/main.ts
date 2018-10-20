import { AddressBook } from './addressbook';
import { Contact } from './contact';
import { User } from './user';
import { Authenticator } from './services/authenticator.service';
import { UserService } from './services/user.service';
// import * as $ from 'jquery';
// import { isAlpha } from 'validator';
declare var M: any;

let auth = new Authenticator();
let userService;
let loggedIn = false;
let accessToken;
let email;

let loginView = document.getElementById("loginView");
let AddressBookView = document.getElementById("addressBookView");
// AddressBookView.style.display = "none";

let addressbook;
let user;

let loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", () => {

    email = (<HTMLInputElement>document.getElementById("username")).value;
    let password = (<HTMLInputElement>document.getElementById("password")).value;
    let results = auth.login(email, password);

    console.log(results);

    if(results.error){
        toast("Could not find an account for you. You may want to register first!");
    } else {
        accessToken = results.accessToken;
        userService = new UserService();
        let response = userService.getUserByEmail(email);
        loggedIn = true;
        user = new User(response.firstName, response.lastName, response.email, response.id);
        loginView.style.display = "none";
        addressbook = new AddressBook(email);
        initApp();        
        document.addEventListener("click", () => {
            if(email && accessToken) {
                // console.log("Making call to verify access...")
                accessToken = auth.verifyAccess(email, accessToken);
                if(accessToken.error) {
                    if(accessToken.code == 401){
                        console.log("Logging you out...");
                        location.reload(true);
                    }
                } else {

                }
                
            }    
        });
    }
});

let logOutBtn = document.getElementById("logOutBtn");
logOutBtn.addEventListener("click", () => {
    addressbook.saveBook(email);
    userService = null;
    user = null;
    email = null;
    addressbook = null;
    loggedIn = false;
    AddressBookView.style.display = "none";
    loginView.style.display = "block";    
    window.location.reload(true);
});

let addContactBtn; 
let tableEmptyState;
let saveBookBtn = document.getElementById("saveBookBtn");
saveBookBtn.addEventListener("click", () => {
    addressbook.saveBook(email);
})

function initApp() {

    if(loggedIn){
        console.log("Initializing app...")
        AddressBookView.style.display = "block";
        addContactBtn = document.getElementById("addContactBtn");
        addContactBtn.addEventListener("click", addContact);
        tableEmptyState = document.getElementById("tableEmptyState");
        let bookOwner = document.getElementById("bookOwner");
        bookOwner.innerText = user.getFullName();

        let savedContacts = addressbook.getContacts();
        for(let contact of savedContacts.values()) {
            addContactToTable(contact);
        }

        updateAddressBookState();
    } 
}

function updateAddressBookState() {

    let numContacts = addressbook.getNumberOfContacts();

    if(numContacts <= 0) {
        tableEmptyState.style.display = "block";
    } else {
        tableEmptyState.style.display = "none";
    }

    let numberOfContacts = document.getElementById("numberOfContacts");
    numberOfContacts.innerText = String(numContacts);

}

function addContact() {

    let firstName = <HTMLInputElement>document.getElementById("firstName");
    let lastName = <HTMLInputElement>document.getElementById("lastName");
    let phoneNumber = <HTMLInputElement>document.getElementById("phoneNumber");

    if(!firstName.value.trim() || !lastName.value.trim() || !phoneNumber.value.trim()) {
        toast("Please fill out all fields!");
        return;
    }

    let contactId = user.getId() + "-" + Number(phoneNumber.value.trim());
    let newContact = new Contact(firstName.value.trim(), lastName.value.trim(), Number(phoneNumber.value.trim()), contactId);
    
    if(addressbook.addContact(contactId, newContact)){
        addContactToTable(newContact);
        updateAddressBookState();
        firstName.value = "";
        lastName.value = "";
        phoneNumber.value = null;
    } else {
        toast("Contact with number already exist. Duplicate number not allowed.");
    } 

}

function addContactToTable(contact: Contact) {
    // console.log(contact);
    let tableBody = document.getElementById("tableBody");
    let newRow = document.createElement("tr")
    let newRowId = document.createAttribute("id"); 
    newRowId.value = contact.getId().toString();
    newRow.setAttributeNode(newRowId);

    let firstNameCell = document.createElement("td");
    firstNameCell.innerHTML = contact.getFirstName().toString();

    let lastNameCell = document.createElement("td");
    lastNameCell.innerHTML = contact.getLastName().toString();

    let phoneNumberCell = document.createElement("td");
    phoneNumberCell.innerHTML = String(contact.getPhoneNumber());

    let iconCell = document.createElement("td");

    let phoneIcon = document.createElement("i");
    phoneIcon.setAttribute("class","fas fa-phone");
    phoneIcon.setAttribute("name", "phone_" + contact.getId().toString());

    let trashIcon = document.createElement("i");
    trashIcon.setAttribute("class", "fas fa-trash-alt");
    trashIcon.setAttribute("name", "trash_" + contact.getId().toString());
    trashIcon.addEventListener("click", ($event) => {
        deleteContact($event);
    })

    iconCell.appendChild(phoneIcon);
    iconCell.appendChild(trashIcon);

    newRow.appendChild(firstNameCell);
    newRow.appendChild(lastNameCell);
    newRow.appendChild(phoneNumberCell);
    newRow.appendChild(iconCell);

    tableBody.appendChild(newRow);

}

function deleteContact(e) {
    let contactName = e.target.attributes.name.nodeValue;
    let contactId = (contactName.split('_'))[1];
    addressbook.removeContact(user.getId() +"-"+ contactId);
    deleteContactFromTable(contactId);

    updateAddressBookState();
}

function deleteContactFromTable(id) {

    document.getElementById(id).remove();

}

function toast(msg) {
    M.toast({html: msg, classes: 'rounded'});
}