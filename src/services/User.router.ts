import { getAll, create, remove, update, searchUser } from "./User.service";
import { RouterCallbackFunc } from "../Server/Server.types";

const getAllUsers: RouterCallbackFunc = async (req, res) => {
    try {
        const users = await getAll();
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end(JSON.stringify(users));
    } catch (err: any) {
        res.statusCode = (err.code) ? err.code : 500;
        const message = (err.code) ? err.message : 'Internal Server Error';
        res.end(message);
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
        }
    })
}

const deleteUser: RouterCallbackFunc = async (req, res) => {
    try {
        const url = req.url;
        const userId = url?.substring('/api/users/'.length);
        remove(userId as string);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end();
    } catch (error) {
        res.end('error');
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
            update(userId as string, userData);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(userData));
        } catch (error) {
            res.end('error');
        }
    })
}

const getUserByID: RouterCallbackFunc = async (req, res) => {
    try {
        const url = req.url;
        const userId = url?.substring('/api/users/'.length);
        const currentUser = searchUser(userId as string);
        console.log(currentUser);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(currentUser));
    } catch (error) {
        res.end('error');
    }
}

export { getAllUsers, createUser, deleteUser, updateUser, getUserByID }