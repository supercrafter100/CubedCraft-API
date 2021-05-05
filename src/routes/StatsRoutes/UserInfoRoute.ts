import fetch from 'node-fetch';
import { Request } from "express";
import UUIDCache from '../../util/UUIDCache';

export default async (req: Request): Promise<any> => {
    const user = req.params.user;

	const uuid = await UUIDCache.get(user);
	const json = await fetch(`https://api.playerservers.com/player/${uuid.id}`).then((res2) => res2.json());

	return json;
}
