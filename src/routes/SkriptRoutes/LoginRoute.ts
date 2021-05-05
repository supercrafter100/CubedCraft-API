import { Request } from "express";
import CubedCraft from 'cubed-api';

export default async (req: Request): Promise<string> => {
    try {
        const username = req.query.username;
        const password = req.query.password;

        if (!username) return "No username provided.";
        if (!password) return "No password provided.";
        
        const session = await CubedCraft.login(username, password);
        return session;
    } catch (error) {
        return "Invalid username / password"
    }
}