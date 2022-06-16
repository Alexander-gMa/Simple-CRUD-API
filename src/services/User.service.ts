import { IUser } from '../services/User.model';
import { v4, validate as validateUUID } from 'uuid';

let dataBase: IUser[] = []

const getAll = () => dataBase;

const create = (user: IUser): Promise<IUser> => {
    return new Promise((resolve) => {
        const id = v4();
        const newUser = { ...user, id };
        dataBase.push(newUser);
        resolve(newUser)
    })
}

export { getAll, create };