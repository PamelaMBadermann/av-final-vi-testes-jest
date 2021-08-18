export class DataNotFoundError extends Error {
    constructor() {
        super('Data not found');
        this.name = 'DataNotFoundError';
    }
}