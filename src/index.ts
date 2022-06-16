import http from 'http';
import { envConfig } from './common/config';
import { getAllUsers, createUser } from './services/User.router';
import { MethodType } from './Server/Server.types';


const port = envConfig.SERVER_PORT;

const server = http.createServer((req, res) => {
    const method = req.method as MethodType;
    const url: string | undefined = req.url;
    try {
        if (url?.includes('/api/users')) {
            if (method === 'GET' && url === '/api/users') getAllUsers(req, res);
            if (method === 'POST' && url === '/api/users') createUser(req, res);
        } else {
            throw new Error()
        }
    } catch (err: any) {
        res.end('Internal Server error');
    }
})

server.listen(port, () => {
    console.log(`Server running at port ${port}`)
});