import { Request } from "express";
import fetch from 'node-fetch';

export default async (req: Request): Promise<string> => {
    try {
        const token = req.query.token as string;
        const serverId = req.query.server as string;
        
        if (!token) return "No token provided.";
        if (!serverId) return "No server ID provided.";

        const headers = {
            'cookie': `PHPSESSID=${token};`
        }

        const html = await fetch(`https://playerservers.com/dashboard/?s=${serverId}`, { headers }).then((res) => res.text());
        if (html.includes('<script data-cfasync="false">window.location.replace("/login/");</script>')) return "Invalid token";
        return 'Success';
    } catch (error) {
        return "Invalid token"
    }
}