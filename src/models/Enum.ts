export abstract class Enum {
    protected value: string | number;
    constructor(value: string | number) {
        this.value = value as any;
    }
}


