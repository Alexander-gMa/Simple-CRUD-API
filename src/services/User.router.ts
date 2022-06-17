import { getAll, create, remove, update, searchUser } from "./User.service";
import { RouterCallbackFunc } from "../Server/Server.types";
import { BaseError, ServerInternalError } from "../Errors/CustomErrors";

const getAllUsers: RouterCallbackFunc = async (req, res) => {
    try {
        const users = await getAll();
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end(JSON.stringify(users));
    } catch (err) {
        if (err instanceof BaseError) {
            res.statusCode = err.code;
            res.end(err.message);
        } else {
            const { code, message } = new ServerInternalError();
            res.statusCode = code;
            res.end(message);
        }
    }
};

const createUser: RouterCallbackFunc = async (req, res) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', async () => {
        let userData;
        try {
            userData = JSON.parse(data);
            const newUser = await create(userData);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        } catch (err) {
            if (err instanceof BaseError) {
                res.statusCode = err.code;
                res.end(err.message);
            } else {
                const { code, message } = new ServerInternalError();
                res.statusCode = code;
                res.end(message);
            }
        }
    })
}

const deleteUser: RouterCallbackFunc = async (req, res) => {
    try {
        const url = req.url;
        const userId = url?.substring('/api/users/'.length);
        await remove(userId as string);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end();
    } catch (err) {
        if (err instanceof BaseError) {
            res.statusCode = err.code;
            res.end(err.message);
        } else {
            const { code, message } = new ServerInternalError();
            res.statusCode = code;
            res.end(message);
        }
    }
}

const updateUser: RouterCallbackFunc = async (req, res) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', async () => {
        let userData;
        try {
            userData = JSON.parse(data);
            const url = req.url;
            const userId = url?.substring('/api/users/'.length);
            await update(userId as string, userData);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(userData));
        } catch (err) {
            if (err instanceof BaseError) {
                res.statusCode = err.code;
                res.end(err.message);
            } else {
                const { code, message } = new ServerInternalError();
                res.statusCode = code;
                res.end(message);
            }
        }
    })
}

const getUserByID: RouterCallbackFunc = async (req, res) => {
    try {
        const url = req.url;
        const userId = url?.substring('/api/users/'.length);
        const currentUser = searchUser(userId as string);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(currentUser));
    } catch (err) {
        if (err instanceof BaseError) {
            res.statusCode = err.code;
            res.end(err.message);
        } else {
            const { code, message } = new ServerInternalError();
            res.statusCode = code;
            res.end(message);
        }
    }
}

export { getAllUsers, createUser, deleteUser, updateUser, getUserByID }