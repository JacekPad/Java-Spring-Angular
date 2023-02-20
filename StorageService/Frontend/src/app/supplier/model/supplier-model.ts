export interface ISupplier {
    id: number
    name: string
    phoneNumber: string
    address: string
    numberOfProducts: number;
}

export class Supplier {
    public id: number;
    public name: string;
    public phoneNumber: string;
    public address: string;
    public numberOfProducts: number;

    constructor();
    constructor(obj: ISupplier);
    constructor(obj?: any) {
        this.id = obj && obj.id;
        this.name = obj && obj.name;
        this.phoneNumber = obj && obj.phoneNumber;
        this.address = obj && obj.address;
        this.numberOfProducts = obj && obj.numberOfProducts;
    }
}