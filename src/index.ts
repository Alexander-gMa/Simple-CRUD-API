import http from 'http';
import { envConfig } from './common/config';
import { getAllUsers, createUser, deleteUser } from './services/User.router';
import { MethodType } from './Server/Server.types';


const port = envConfig.SERVER_PORT;

const SERVER_ROUTES = {
    GET: createUser,
    POST: createUser,
    DELETE: deleteUser,
    PUT: deleteUser
}

const server = http.createServer((req, res) => {
    const method = req.method as MethodType;
    const url: string | undefined = req.url;
    try {
        if (url?.includes('/api/users')) {
            if (method === 'GET' && url === '/api/users') getAllUsers(req, res);
            else SERVER_ROUTES[method](req, res);
        } else {
            throw new Error('404 ошибка');
        }
    } catch (err: any) {
        res.end('404 ошибка');
    }
})

server.listen(port, () => {
    console.log(`Server running at port ${port}`)
});