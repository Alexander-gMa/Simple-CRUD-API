import { IUser } from '../services/User.model'

let dataBase: IUser[] = []

const getAll = () => dataBase;

const create = (user: IUser) => {
    dataBase.push(user);
}

export { getAll, create };