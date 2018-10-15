import { AddressBook } from './addressbook';
import { Contact } from './contact';
import { User } from './user';
// import * as $ from 'jquery';
// import { isAlpha } from 'validator';

declare var M: any;

let addressbook = new AddressBook();
let user = new User("Syean", "Wilson", "syean15@gmail.com");

let addContactBtn = document.getElementById("addContactBtn");
addContactBtn.addEventListener("click", addContact);

let tableEmptyState = document.getElementById("tableEmptyState");

init();

function init() {
    let bookOwner = document.getElementById("bookOwner");
    bookOwner.innerText = user.getFullName();

    updateAddressBookState();
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

    let newContact = new Contact(firstName.value.trim(), lastName.value.trim(), Number(phoneNumber.value.trim()), addressbook.getNextId());
    addressbook.addContact(newContact);

    addContactToTable(newContact);

    firstName.value = "";
    lastName.value = "";
    phoneNumber.value = null

    updateAddressBookState();

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
    phoneIcon.setAttribute("name", "phone-" + contact.getId().toString());

    let trashIcon = document.createElement("i");
    trashIcon.setAttribute("class", "fas fa-trash-alt");
    trashIcon.setAttribute("name", "trash-" + contact.getId().toString());
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
    let contactId = (contactName.split('-'))[1];
    addressbook.removeContact(contactId);
    deleteContactFromTable(contactId);

    updateAddressBookState();
}

function deleteContactFromTable(id) {

    document.getElementById(id).remove();

}

function toast(msg) {
    M.toast({html: msg, classes: 'rounded'});
}