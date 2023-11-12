/* eslint-disable no-undef */
import fs from 'fs';
import ftp from "basic-ftp"
import 'dotenv/config'


// Read dist/index.html and replace script and css into index.php
const PHP_FILE = './index.php';
const HTML_FILE = './dist/index.html';

const scriptRegex = /<script[\s\S]*?>[\s\S]*?<\/script>/i;
const linkRegex = /<link rel="stylesheet[\s\S]*?>[\s\S]*?(?:(?!\n).)*/i;
const htmlText = fs.readFileSync(HTML_FILE, 'utf8');
const scriptTag = htmlText.match(scriptRegex)?.[0];
const linkTag = htmlText.match(linkRegex)?.[0];

if (scriptTag !== undefined && linkTag !== undefined) {
    const phpText = fs.readFileSync(PHP_FILE, 'utf8');
    const newPhpText = phpText.replace(scriptRegex, scriptTag).replace(linkRegex, linkTag);
    console.log("newPhpText", newPhpText);
}

console.log("process", process.env.DB_HOST);

// Read last git commit and get the commit hash and file list

// Upload last commited files to production server
if (false) {
    const FILES = [
        "test.txt", //
    ]
    const client = new ftp.Client()
    client.ftp.verbose = true;
    try {
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASS,
            secure: true
        })
        console.log(await client.list())

        for (const file of FILES) {
            await client.uploadFrom(file, "public_html/" + file)
        }
    }
    catch (err) {
        console.log(err)
    }
    client.close()
}