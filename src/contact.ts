export class Contact {            

    private firstName;
    private lastName;
    private phoneNumber;
    private id;

    constructor(firstName: String, lastName: String, phoneNumber: Number, id: any) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.id = id;
    }

    public setFirstName(firstName: String) { this.firstName = firstName; }
    public setLasttName(lastName: String) { this.lastName = lastName; }
    public setPhoneNumber(phoneNumber: String) { this.phoneNumber = phoneNumber; }

    public getFirstName(): String {
        return this.firstName;
    }

    public getLastName(): String {
        return this.lastName;
    }

    public getPhoneNumber(): Number {
        return this.phoneNumber;
    }

    public getId(): Number {
        return this.id;
    }
}