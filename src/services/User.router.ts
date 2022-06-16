import { getAll, create } from "./User.service";
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
            console.log(newUser);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        } catch (err) {
        }
    })

}

export { getAllUsers, createUser }