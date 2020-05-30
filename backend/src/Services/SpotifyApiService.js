const fetch = require('node-fetch');
const Queue = require('queue');
const {default: PQueue} = require('p-queue');
const DbHandler = require('../db/DbHandler');
const { URLSearchParams }   = require('url');

const API_BASE_URL = 'https://api.spotify.com';

class SpotifyApiService{
    constructor() {
        this.queue = new PQueue();
        this.dbHandler = new DbHandler();
        console.log('SpotifApiService Instanciated');
    }

    async request(href,body,method,headers,cookie) {
        url = new URL(href);
        if (!/(spotify.com)$/.test(url.host)) {
            return {error: 'Proxy only allows URL\'s that end with spotify.com in hostname'};
        }

        switch(true) {
            case url.href==="https://accounts.spotify.com/api/token":
                const basicHeader = {'Authorization': `Basic ${process.env.BASIC}`};
                return await this.queueApiRequest(url,method,body,basicHeader);
                break;
            case url.href==="https://api.spotify.com/v1/audio-features":
                const bearerHeader = {'Authorization': `Bearer ${await this.getBearer()}`};
                return await this.queueApiRequest(url.href,method,body,bearerHeader);
                break;
            break;
            default:
                return await this.queueApiRequest(url.href,method,body,headers);
                break;
        }
    }

    async queueApiRequest(url,method,body,headers) {
        console.log(`APIQueue - Sending ${method} to ${url}`);
        return await this.queue.add(async () => {
            const options = {
                method,
                body,
                headers,
            };
            if (method==='GET') {delete options.body};

            const sendReq = await fetch(url,options);
            if (sendReq.status === 429) {
                // do timeout for queue
            }
            return sendReq;
        });
    }

    async getBearer() {
        await this.refreshBearer();
        return process.env.BEARER;
    }

    async refreshBearer() {
        try {
            const getBearer = await fetch(`https://accounts.spotify.com/api/token?grant_type=client_credentials`, {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Basic ${process.env.BASIC}`},
            });
            if (getBearer.status !== 200) {
                throw new Error(`could not get Bearer: Error ${getBearer.status}`);
            };

            const bearerJson = await getBearer.json();
            process.env.BEARER = bearerJson.access_token;
            console.log(`current Bearer: ${process.env.BEARER}`);
        } catch(e) {
            console.error(e);
        }
    }
}

module.exports = SpotifyApiService;
