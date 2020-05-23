const Assert = require('assert');
const ApiService = require('../../src/Services/SpotifyApiService');
const Sinon = require('sinon');
const fetch = require('node-fetch');


const AUTH_CODE = 'blub';
const COOKIE    = '123456';

describe('SpotifyApiService', async () => {

    before(()=> {
        require('dotenv').config({path: __dirname+'/./../../.env'});
    })

    /*describe('Handle User Auth', () => {
        it('Should store authCode in db', async () => {
            apiService = new ApiService();
            const storeAuth = await apiService.storeUserAuth(AUTH_CODE,COOKIE);
            Assert.equal(storeAuth.error,null);
        });
    });*/

    describe('Get Saved Tracks', () => {
        it('works on happy path', async () => {
            apiService = new ApiService();
            await apiService.refreshBearer();
            const tracks = await apiService.getUsersTracks('/v1/me/tracks',COOKIE);
            Assert.equal(tracks.error,null);
        })
    });
});
