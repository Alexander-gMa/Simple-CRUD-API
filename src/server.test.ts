import request from 'supertest';
import { IUser } from './services/User.model';
import { ERROR_MESSAGES } from './Errors/Error.messages';
import { createServer } from './createServer';
import { BASE_URL } from './utils/constants';

const server = createServer();

let USER: IUser = {
    username: "Alesha Popovich",
    age: 666,
    hobbies: ["fishing", "running"]
};

const SECOND_USER: IUser = {
    username: "Mitya Fomin",
    age: 19,
    hobbies: ["signing", "dancing"]
}

describe('Simple CRUD API TEST', () => {
    describe('First scenario', () => {
        let id: number = 0;
        afterAll(() => server.close());
        it('Should return all users', async () => {
            const requestServer = await request(server)
                .get(BASE_URL)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);
            expect(requestServer.statusCode).toEqual(200);
            expect(requestServer.body).toEqual([]);
            expect(Array.isArray(requestServer.body)).toBe(true);
        });
        it('Should create user successfully', async () => {
            const requestServer = await request(server)
                .post(BASE_URL)
                .send(USER)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);
            expect(requestServer.statusCode).toEqual(201);
            expect(requestServer.body.username).toEqual(USER.username);
            expect(requestServer.body.age).toEqual(USER.age);
            expect(JSON.stringify(requestServer.body.hobbies))
                .toEqual(
                    JSON.stringify(USER.hobbies),
                );
            id = requestServer.body.id;
        });
        it('Should get a person by id', async () => {
            const requestServer = await request(server)
                .get(`${BASE_URL}/${id}`)
            expect(requestServer.statusCode).toEqual(200);
            expect(requestServer.body).toEqual({ ...USER, id });
            expect(requestServer.body instanceof Object).toBe(true);
        });
        it('Should update a person by id', async () => {
            USER = { ...USER, username: "Mity Fomin" };
            const requestServer = await request(server)
                .put(`${BASE_URL}/${id}`)
                .send(USER)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
            expect(requestServer.statusCode).toEqual(200);
            expect(requestServer.body.username).toEqual(USER.username);
            expect(requestServer.body.age).toEqual(USER.age);
            expect(JSON.stringify(requestServer.body.hobbies))
                .toEqual(
                    JSON.stringify(USER.hobbies),
                );
        });
        it('Should delete a person by id', async () => {
            const requestServer = await request(server)
                .delete(`${BASE_URL}/${id}`)
            expect(requestServer.statusCode).toEqual(204);
        });
        it('Should return error 404, because user is deleted', async () => {
            const requestServer = await request(server)
                .get(`${BASE_URL}/${id}`)
            expect(requestServer.statusCode).toEqual(404);
        });
    });
})
