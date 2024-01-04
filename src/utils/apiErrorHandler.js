class ApiError extends Error{
    constructor(
        statuscode,
        message,
        success
    ){
        super(message)
        this.statuscode = statuscode
        this.message = message
        this.success = success
    }
}

export {
    ApiError
}