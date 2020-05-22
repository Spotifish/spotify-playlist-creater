const SpotifyApiService = require('../Services/SpotifyApiService');

class ProxyService {
    constructor() {
        this.spotifyApiService = new SpotifyApiService();
    }

    async request(url,body,method,cookie) {

        switch(true) {
            case /\/v1\/me\/tracks/.test(url):
                return await this.spotifyApiService.getUsersTracks(url,body,cookie);
                break;
            default:
                return {
                    error: 'sent url not (yet) supported '
                };
        }
    }

}

module.exports = ProxyService;
