import { Request } from "express";
import cheerio from 'cheerio';
import fetch from 'node-fetch';

export default async (_req: Request): Promise<string> => {
    const guildPageHtml = await fetch('https://cubedcraft.com/guilds').then((res) => res.text());

	const $ = cheerio.load(guildPageHtml);

	const guilds: { placement: string, name: string, owner: string, xp: string, coins: string, members: string }[] = [];

	$('#page-games > div.pusher > div.ui.container > div > div > div.twelve.wide.column > table > tbody > tr').each((_index, element) => {
		
		const placement = $(element).children('td:nth-child(1)').children('b').text();
		const name = $(element).children('td:nth-child(2)').children('a').text();
		const owner = $(element).children('td:nth-child(3)').children('a').children('span').text();
		const xp = $(element).children('td:nth-child(4)').text();
		const coins = $(element).children('td:nth-child(5)').text();
		const members = $(element).children('td:nth-child(6)').text();

		guilds.push({
			placement: placement,
			name: name,
			owner: owner,
			xp: xp,
			coins: coins,
			members: members
		})
	})

	return(JSON.stringify(guilds, null, 4));
}