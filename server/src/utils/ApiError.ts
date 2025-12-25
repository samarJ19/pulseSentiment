export class ApiError extends Error {
    statusCode:number;
    name:string;
    isOperational:boolean;
    constructor(name:string,message:string,statusCode=400,isOperational=true){
        super(message);
        this.statusCode = statusCode;
        this.name = name;
        this.isOperational = isOperational
        Error.captureStackTrace(this,this.constructor);
    }
};