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

    async storeUserAuth(authCode,cookie) {
        return await this.dbHandler.storeUserAuth(authCode,cookie);
    }

    async getUsersTracks(url,body,cookie) {
        url = API_BASE_URL + url;
        const getAuthCode = await this.dbHandler.getAuthCode(cookie);
        if (getAuthCode.error !== null) {
            return {error:getAuthCode.error};
        }

        // get accessToken either from db or request new one
        let accessToken;
        if (getAuthCode.accessToken === null) {
            // set body params
            const bodyParams = new URLSearchParams();
            bodyParams.append('code',getAuthCode.authCode);
            bodyParams.append('grant_type','authorization_code');
            bodyParams.append('redirect_uri', 'https://example.com/callback');

            const headers = {'Authorization': `Basic ${process.env.BASIC}`};
            const getAccessToken = await this.queueApiRequest(API_BASE_URL + '/api/token','GET',bodyParams,headers);
            if(getAccessToken.status !== 200) {
                console.error(`SpotifyApiService - Received status ${getAccessToken.status} when requesting access token from API`);
                return {error: 'SpotifyApiService - Could not retrieve access token from spotify API'};
            }

            const accessTokenJson = await getAccessToken.json()
            accessToken = accessTokenJson.acccess_token;
        } else {
            accessToken = getAuthCode.accessToken;
        }

        const getUsersTracks = await this.queueApiRequest(url,'GET',body,{'authorization': `Bearer ${accessToken}`});
        if (getUsersTracks.status !== 200) {
            console.error(`SpotifyApiService - Received status ${getUsersTracks.status} when requesting access token from API`);
            return {error: 'SpotifyApiService - Could not retrieve saved tracks from spotify API'};
        }

        return {error:null,response:getUsersTracks};
    }

    async queueApiRequest(url,method,body,headers) {
        return await this.queue.add(async () => {
            const sendReq = await fetch(url,{
                method,
                body,
                headers,
            });
            if (sendReq.status === 429) {
                // do timeout for queue
            }
            return sendReq;
        });
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
