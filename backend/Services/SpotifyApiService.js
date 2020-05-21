const fetch = require('node-fetch');
const Queue = require('queue');
const DbHandler = require('../db/DbHandler');

class SpotifyApiService{
    constructor() {
        this.queue = new Queue();
        this.dbHandler = new DbHandler();
        console.log('SpotifApiService Instanciated');
    }

    async storeUserAuth(authCode,cookie) {
        return await this.dbHandler.storeUserAuth(authCode,cookie);
    }

    async getUsersTracks(url,body,cookie) {
        const getAuthCode = await this.dbHandler.getAuthCode(cookie);
        if (getAuthCode.error !== null) {
            return {error:getAuthCode.error};
        }

        const getAccessToken



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
