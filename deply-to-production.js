/* eslint-disable no-undef */
import fs from 'fs';
import ftp from "basic-ftp"
import { simpleGit } from 'simple-git';
import 'dotenv/config'


// Read dist/index.html and replace script and css into index.php
const PHP_FILE = './index.php';
const HTML_FILE = './dist/index.html';

const scriptRegex = /<script[\s\S]*?>[\s\S]*?<\/script>/i;
const linkRegex = /<link rel="stylesheet[\s\S]*?>[\s\S]*?(?:(?!\n).)*/i;
const htmlText = fs.readFileSync(HTML_FILE, 'utf8');
const scriptTag = htmlText.match(scriptRegex)?.[0];
const linkTag = htmlText.match(linkRegex)?.[0];

if (scriptTag !== undefined && linkTag !== undefined && false) {
    const phpText = fs.readFileSync(PHP_FILE, 'utf8');
    const newPhpText = phpText.replace(scriptRegex, scriptTag).replace(linkRegex, linkTag);
    console.log("Updating index.php")
    fs.writeFileSync(PHP_FILE, newPhpText);
}

// Read uncommited files
const git = simpleGit();
const data = await git.status('s')

// Upload last commited files to production server
const FILES = data.files.filter(file => file.working_dir !== "D").map(file => file.path)
console.log("Files to be uploaded:", FILES)

if (FILES.length > 0) {
    const client = new ftp.Client()
    client.ftp.verbose = false;
    try {
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASS,
            secure: true
        })
        // console.log(await client.list())

        for (const file of FILES) {
            const folderPath = file.match(/(.*)\//)?.[1];
            if (folderPath !== undefined) {
                await client.ensureDir("public_html/" + folderPath)
            }
            await client.cd("/")
            console.log("Uploading public_html/" + file)
            await client.uploadFrom(file, "public_html/" + file)
        }
    }
    catch (err) {
        console.log(err)
    }
    client.close()
}