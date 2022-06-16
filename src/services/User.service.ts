import { IUser } from '../services/User.model';
import { v4, validate as validateUUID } from 'uuid';

let dataBase: IUser[] = []

const searchUser = (id: string) => {
    console.log(id,'\nasdfafasdfasdasdasdasd');
    console.log(dataBase,'bbb');
    const correctUser = dataBase.filter(user => user.id == id);
    if (correctUser.length > 1) return false;
    return (correctUser.length) ? correctUser[0] : false;
}

const getAll = () => dataBase;

const create = (user: IUser): Promise<IUser> => {
    return new Promise((resolve) => {
        const id = v4();
        const newUser = { ...user, id };
        dataBase.push(newUser);
        resolve(newUser)
    })
}

const remove = (id: string) => {
    // if (!validateUUID(id)) throw new Error('айди не валидный')
    const existingUser = searchUser(id);
    console.log(existingUser);
    if (existingUser) {
        const index = dataBase.indexOf(existingUser);
        dataBase.splice(index, 1);
        return true;
    }
    // } else throw new Error('такого юзера нету!');
};

export { getAll, create, remove, dataBase };