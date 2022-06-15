import { getAll } from "./User.service";

const getAllUsers = async (req: any, res: any) => {
    try {
        const users = await getAll();
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end(JSON.stringify(users));
    } catch (err: any) {
        res.statusCode = (err.code) ? err.code : 500;
        const message = (err.code) ? err.message : 'Internal Server Error';
        res.end(message);
    }
};

export { getAllUsers }