export interface IContact {

    firstName: string;
    lastName: string;
    phoneNumber: number;
    type: string;
    dateCreated?: Date;
    id: number | string;

    getId(): number | string;
}