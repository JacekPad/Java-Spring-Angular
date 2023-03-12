export interface ISupplier {
    id: number
    name: string
    phoneNumber: string
    address: string
    numberOfProducts: number;
    supplierCode: string
    created: Date;
    modified: Date;
}

export class Supplier {
    public id: number;
    public name: string;
    public phoneNumber: string;
    public address: string;
    public numberOfProducts: number;
    public supplierCode: string;
    public created: Date;
    public modified: Date;

    constructor();
    constructor(obj: ISupplier);
    constructor(obj?: any) {
        this.id = obj && obj.id;
        this.name = obj && obj.name;
        this.phoneNumber = obj && obj.phoneNumber;
        this.address = obj && obj.address;
        this.numberOfProducts = obj && obj.numberOfProducts;
        this.supplierCode = obj && obj.supplierCode;
        this.created = obj && obj.created
        this.modified = obj && obj.modified
    }
}