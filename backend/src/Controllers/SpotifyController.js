const SpotifyService = require('../Services/SpotifyApiService');
const spotifyService = new SpotifyService();

class SpotifyController{
    constructor() {
        console.log('SpotifyController initialized');
    }
    static async request(req,res,next) {
        const cookie = req.headers.cookie;
        const {url,body,method,headers} = req.body;
        const response = await spotifyService.request(url,body,method,headers,cookie);
        res.send(response);
        next();
    }

    static async storeAuth(req,res,next) {
        const cookie = req.headers.cookie;
        const {authCode} = req.query;
        const response = await spotifyService.storeUserAuth(authCode,cookie);
        res.send(response);
        next();
    }
}

module.exports = SpotifyController;
