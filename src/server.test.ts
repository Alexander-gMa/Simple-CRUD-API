import request from 'supertest';
import { IUser } from './services/User.model';
import { ERROR_MESSAGES } from './Errors/Error.messages';
import { createServer } from './createServer';
import { BASE_URL } from './utils/constants';

const server = createServer();

const USER: IUser = {
    username: 'Alesha Popovich',
    age: 666,
    hobbies: ["fishing", "running"]
};

describe('Testing CRUD API', () => {
    describe('First scenario', () => {
        afterAll(() => server.close());
        it('Should return all users', async () => {
            const { body, statusCode } = await request(server)
                .get(BASE_URL).set('Accept', 'application/json');
            expect(statusCode).toEqual(200);
            expect(body).toEqual([]);
            expect(Array.isArray(body)).toBe(true);
        });
        it('Should create user', async () => {
            const { body, statusCode } = await request(server)
                .post(BASE_URL)
                .send(USER);
            expect(statusCode).toEqual(201);
            expect(body.username).toEqual(USER.username);
            expect(body.age).toEqual(USER.age);
            expect(JSON.stringify(body.hobbies)).toEqual(
                JSON.stringify(USER.hobbies),
            );
        });
    });
})
