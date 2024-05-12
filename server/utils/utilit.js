class ErrorHandler extends Error {
    constructor(message, statuscode) {
        console.log(message , "3");
        super(message)
        this.statuscode = statuscode
    }
}

export { ErrorHandler }