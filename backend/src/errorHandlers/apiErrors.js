export class CustomError extends Error {
    constructor(status, message, errors = []) {
        super(message)

        this.status = status
        this.message = message
        this.errors = errors
    }

    static badRequest(message, errors = []) {
        return new CustomError(400, message, errors)
    }

    static unauthorized() {
        return new CustomError(401, 'Unauthorized!')
    }

    static forbidden(message) {
        return new CustomError(403, message)
    }

    static internalServer(message) {
        return new CustomError(500, message)
    }
}

