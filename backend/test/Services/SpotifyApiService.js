const Assert     = require('assert');
const ApiService = require('../../src/Services/SpotifyApiService');
const DbHandler  = require('../../src/db/DbHandler');
let dbHandler;
const Sinon      = require('sinon');
const fetch      = require('node-fetch');


const AUTH_CODE = 'blub';
const COOKIE    = '123456';

describe('SpotifyApiService', async () => {

    before(()=> {
        require('dotenv').config({path: __dirname+'/./../../.env'});
        dbHandler = new DbHandler();
    })

    describe('Handle User Auth', () => {
        before(async ()=>{
            //await dbHandler.deleteCookie(COOKIE);
        });

        it('Should store authCode in db', async () => {
            const apiService = new ApiService();
            const storeAuth = await apiService.storeUserAuth(AUTH_CODE,COOKIE);
            Assert.equal(storeAuth.error,null);
        });
    });

    describe('Get Saved Tracks', () => {
        it('works on happy path', async () => {
            const apiService = new ApiService();
            await apiService.refreshBearer();
            const tracks = await apiService.getUsersTracks('/v1/me/tracks',COOKIE);
            Assert.equal(tracks.error,null);
        })
    });
});
