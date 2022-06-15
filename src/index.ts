import http from 'http';
import url from 'url';
import { envConfig } from './common/config';
import { getAllUsers } from './services/User.router';

const port = envConfig.SERVER_PORT;

const server = http.createServer((req, res) => {
    const method: string | undefined = req.method;
    const url: string | undefined = req.url;

    try {
        if (url?.includes('/users')) {
            if (method === 'GET' && url === '/users') getAllUsers(req, res);
        }
    } catch (err: any) {
        res.statusCode = (err.code) ? err.code : 500;
        const message = (err.code) ? err.message : 'Internal Server Error';
        res.end(message);
    }
})

server.listen(port, () => {
    console.log(`Server running at port ${port}`)
});