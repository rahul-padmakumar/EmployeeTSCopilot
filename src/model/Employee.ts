export class Employee{
    firstName: string;
    lastName: string;
    hireDate: Date;
    position: string;
    id: number;
    constructor(firstName: string, lastName: string, hireDate: Date, position: string, id: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.hireDate = hireDate;
        this.position = position;
        this.id = id;
    }
}