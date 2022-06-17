import { BadRequestError } from "../Errors/CustomErrors";
import { IUser } from "../services/User.model";

const userValidate = (user: IUser) => {
    const requiredFields = ['username', 'age', 'hobbies'].sort();
    const userFields = Object.keys(user).sort();
    if (JSON.stringify(requiredFields) !== JSON.stringify(userFields)) throw new BadRequestError();

    if (typeof user.username !== 'string') throw new BadRequestError();
    if (typeof user.age !== 'number') throw new BadRequestError();
    if (!Array.isArray(user.hobbies)) throw new BadRequestError();

    for (let i = 0; i < user.hobbies.length; i++) {
        if (typeof user.hobbies[i] !== 'string') throw new BadRequestError()
    }
}

export { userValidate }