export interface IProduct {
    id: number
    name: string
    type: string
    quantity: number
    created: Date;
    modified: Date;
    status: String;
    supplier: string
}

export class Product {
    public id: number;
    public name: string;
    public type: string;
    public quantity: number
    public created: Date;
    public modified: Date;
    public status: String;
    public supplier: string;

    constructor();
    constructor(obj: IProduct);
    constructor(obj?: any) {
        this.id = obj && obj.id
        this.name = obj && obj.name
        this.type = obj && obj.type
        this.quantity = obj && obj.quantity
        this.created = obj && obj.created
        this.modified = obj && obj.modified
        this.status = obj && obj.status
        this.supplier = obj && obj.supplier
    }
}