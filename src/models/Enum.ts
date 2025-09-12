


export abstract class Enum {
    protected _value: string | number;
    constructor(value: string | number) {
        this._value = value  ;
    }
    get value(): string | number {
        return this._value;
    }
}


