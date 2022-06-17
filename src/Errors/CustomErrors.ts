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

// export class ServerInternalError extends BaseError {
//     constructor(message: string = MESSAGES.SERVER_INTERNAL) {
//       super(message, 500);
//     }
//   }