export interface IFilterParams {
    name: string;
    type: string;
    created: Date;
    supplier: string;
    status: string;
    quantityMin: number;
    quantityMax: number;
}

export class FilterParams {
    public name: string;
    public type: string;
    public created: Date;
    public supplier: string;
    public status: string;
    public quantityMin: number;
    public quantityMax: number;

    constructor();
    constructor(obj: IFilterParams)
    constructor(obj?: any) {
        this.name = obj && obj.name;
        this.type = obj && obj.type;
        this.created = obj && obj.created;
        this.supplier = obj && obj.supplier;
        this.status = obj && obj.status;
        this.quantityMin = obj && obj.quantityMin;
        this.quantityMax = obj && obj.quantityMax;
    }
}