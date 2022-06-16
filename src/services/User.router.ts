import { getAll, create, remove, dataBase } from "./User.service";
import { RouterCallbackFunc } from "../Server/Server.types";
import { v4, validate as validateUUID } from 'uuid';
import parse from 'querystring'
import { URLSearchParams } from 'url';

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
        res.end('aaa');
    }
}

export { getAllUsers, createUser, deleteUser }