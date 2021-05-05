import { Request } from "express";
import fetch from 'node-fetch';
import cheerio from 'cheerio';

export default async (req: Request): Promise<string> => {

    // Getting the query data
    const token = req.query.token as string;
    const rawmotd = req.query.motd as string;

    if (!token) return "No token provided.";
    if (!rawmotd) return "No motd provided.";

    // Constructing headers & data
    const newMotd = rawmotd.replace(/\$/g, '§');
    const headers = {
        'cookie': `PHPSESSID=${token};`
    }

    // Fetching to get the submit token
    const html = await fetch('https://playerservers.com/dashboard/', { headers }).then((response) => response.text());
    if (html.includes('<script data-cfasync="false">window.location.replace("/account/");</script>')) return "No server selected";
    else if (html.includes('<script data-cfasync="false">window.location.replace("/login/");</script>')) return "Invalid session";


    const $ = cheerio.load(html);
    const editToken = $('body > div > div > section > div > div > div.col-md-9 > div > div > form:nth-child(8) > div:nth-child(2) > div > div > input[type=hidden]:nth-child(2)').val();
    if (!token) return "Something went wrong. Edit token was undefined"
    
    const headers2 = {
        'cookie': `PHPSESSID=${token};`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const data = {
        'server-motd': newMotd,
        'action': 'motd',
        'token': editToken,
        'edit-file-sub': 'Save'
    }

    var formBody: string[] = [];
    for (var property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent((data as any)[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    const body = formBody.join("&");
    const response = await fetch('https://playerservers.com/dashboard/', {
        method: 'POST',
        headers: headers2,
        body
    }).then((res) => res.text());

    const $2 = cheerio.load(response);
    const error = $2('body > div > div > section > div > div > div.col-md-9 > div > div > div.alert.alert-danger.alert-dismissible > ul > li').text();
    if (error) return error;
    return "success"
}