import { ERROR_MESSAGES } from "./error.messages";

export class BaseError {
    message: string;
    code: number;

    constructor(message: string, code = 500) {
        this.message = message;
        this.code = code;
    }
}

export class NotFoundError extends BaseError {
    constructor(message: string = ERROR_MESSAGES.NOT_FOUND) {
        super(message, 404);
    }
}

export class ServerInternalError extends BaseError {
    constructor(message: string = ERROR_MESSAGES.SERVER_INTERNAL) {
        super(message, 500);
    }
}

export class InvalidUUIDError extends BaseError {
    constructor(id: string) {
        id === '' ?
            super(`UserID is empty`, 400) :
            super(`UserID = ${id} is invalid (not uuid)`, 400)
    }
}

export class NotExistUserError extends BaseError {
    constructor(id: string) {
        super(`User with UserID = ${id} is not exist`, 404)
    }
}

export class CrashDataBaseError extends BaseError {
    constructor() {
        super(`Data base is corrupted\n. Please reload the App`, 400)
    }
}

export class BadRequestError extends BaseError {
    constructor() {
        super(`${ERROR_MESSAGES.BAD_REQUEST}\nRequst.body does not contain required fields`, 400)
    }
}