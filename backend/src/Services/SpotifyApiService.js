const fetch = require('node-fetch');
const Queue = require('queue');
const {default: PQueue} = require('p-queue');
const { URLSearchParams }   = require('url');

const API_BASE_URL = 'https://api.spotify.com';

class SpotifyApiService{
    constructor() {
        this.queue = new PQueue();
        console.log('SpotifApiService Instanciated');
    }

    async request(href,body,method,headers,cookie) {
        const url = new URL(href);
        if (!/(spotify.com)$/.test(url.host)) {
            return {error: 'Proxy only allows URL\'s that end with spotify.com in hostname'};
        }

        switch(true) {
            case url.href==="https://accounts.spotify.com/api/token":
                headers['Authorization'] = `Basic ${process.env.BASIC}`
                return await this.queueApiRequest(url.href,method,body,headers);
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

            let error = null;
            let response = null;
            if (sendReq.status === 200) {
                response = await sendReq.json();
            } else if (sendReq.status !== 204 ) {
                error = `Spotify API returned status ${sendReq.status}`
            }

            return {error,response};
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
