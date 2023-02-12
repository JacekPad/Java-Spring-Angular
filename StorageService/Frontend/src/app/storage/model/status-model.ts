export interface IStatus {
    code: string;
    value: string;
}

export class Status {
    public code: string;
    public value: string;

    constructor();
    constructor(obj: IStatus);
    constructor(obj?: any) {
        this.code = obj && obj.code;
        this.value = obj && obj.value;
    }
}