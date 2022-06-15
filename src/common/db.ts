import { IUser } from '../services/User.model'

let dataBase: IUser[] = []

const getAll = () => dataBase;

export { getAll };