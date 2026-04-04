export class CustomError extends Error {
    constructor(status, message) {
        super()

        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return new CustomError(400, message)
    }

    static forbidden(message) {
        return new CustomError(403, message)
    }

    static internalServer(message) {
        return new CustomError(500, message)
    }
}

