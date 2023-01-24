export interface IProduct {
    id: number
    name: string
    type: string
    quantity: number
}

export class Product {
    public id: number;
    public name: string;
    public type: string;
    public quantity: number

    constructor();
    constructor(obj: IProduct);
    constructor(obj?: any) {
        this.id = obj && obj.id
        this.name = obj && obj.name
        this.type = obj && obj.type
        this.quantity = obj && obj.quantity
    }
}