import http from 'http';
import { envConfig } from './common/config';
import { getAllUsers, createUser, deleteUser, updateUser, getUserByID } from './services/User.router';
import { MethodType } from './Server/Server.types';
import { BaseError, NotFoundError } from './Errors/CustomErrors';
import { ERROR_MESSAGES } from './Errors/error.messages';


const port = envConfig.SERVER_PORT;

const SERVER_ROUTES = {
    GET: getUserByID,
    POST: createUser,
    DELETE: deleteUser,
    PUT: updateUser
}

const server = http.createServer(async (req, res) => {
    const method = req.method as MethodType;
    const url: string | undefined = req.url;
    try {
        if (url?.startsWith('/api/users')) {
            if (method === 'GET' && url === '/api/users') await getAllUsers(req, res);
            else {
                await SERVER_ROUTES[method](req, res)
            };
        } else {
            throw new NotFoundError();
        }
    } catch (err) {
        if (err instanceof BaseError) {
            res.statusCode = err.code;
            res.end(err.message);
        } else {
            res.statusCode = 500;
            res.end(ERROR_MESSAGES.SERVER_INTERNAL);
        }
    }
})

server.listen(port, () => {
    console.log(`Server running at port ${port}`)
});