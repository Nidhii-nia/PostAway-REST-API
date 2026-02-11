
export default class ApplicationError extends Error{
    constructor(statusCode,errorMesage){
        super(errorMesage);
        this.statusCode = statusCode;
    }
}