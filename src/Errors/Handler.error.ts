import { RouterCallbackFunc } from "../Server/Server.types";
import { BaseError, ServerInternalError } from "./CustomErrors";


const HandleError: RouterCallbackFunc = (req, res, err) => {
    if (err instanceof BaseError) {
        res.statusCode = err.code;
        res.end(err.message);
    } else {
        const { code, message } = new ServerInternalError();
        res.statusCode = code;
        res.end(message);
    }
}

export { HandleError }