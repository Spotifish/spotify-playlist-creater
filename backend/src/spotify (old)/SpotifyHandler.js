const Fetch                 = require('../utils/DelayedFetch');
const fetch                 = new Fetch();
const { URLSearchParams }   = require('url');
const { promises: fs }      = require("fs");
const readline              = require("readline");
const rl                    = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class SpotifyHandler{

    constructor() {
        console.log('Initialized spotify handler');
    }
    async getSavedTracks() {
        await this.getBearer();
        const redirectUri = 'https://example.com/callback';
        console.log(`https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&scope=user-library-read\n`);

        //rl.question('What was the "code" parameter?', async (authCode) => {
            const authCode = 'AQDoh6eDRXQJSCGRsO7pV7i5kPbemW5Vg0vWt6fTI85OBCUDmr9NsjEA8eDOy-fuizjs86HZi8jW9j1FfIrymcQikH5pSJ2AQv15yss_Co19vhcMUNJshyUFWv9TYeb-_mkrzvIviQz23tt9MAMs0qksO9_CcOK30Yt6KHTMOZXQdrSPbmvXvKkpvwHj7IuG-b5oHr1Hg57WW-eCEMapCQa_6SL1';
            console.log(authCode);

            // get access token
            const params = new URLSearchParams();
            params.append('code',authCode);
            params.append('grant_type','authorization_code');
            params.append('redirect_uri', 'https://example.com/callback');
            const getAccessToken = await fetch.queue('https://accounts.spotify.com/api/token', {
                method: 'POST',
                body:params,
                headers: {'Authorization': `Basic ${process.env.BASIC}`}
            });
            if (getAccessToken.status !== 200) {
                console.error(await getAccessToken.text());
                throw new Error('Could not retrieve access_token for saved tricks');
            }
            const accessTokenJson = await getAccessToken.json();
            const accToken = accessTokenJson.access_token; // await getAccessToken.text();

            const ids = [];
            let offset = 0;
            let fetchedSongs = 0;
            let totalSongs = 0;
            while (offset === 0 || fetchedSongs === 50) {
                const getSavedTracks = await fetch.queue(`https://api.spotify.com/v1/me/tracks?limit=50&offset=${offset}`, {
                    method: 'GET',
                    headers: {'authorization': `Bearer ${accToken}`},
                });

                if (getSavedTracks.status !== 200) {
                    throw new Error('Could not retrieve saved songs');
                }

                const savedTracks = await getSavedTracks.json();
                ids.push(...savedTracks.items.map(item =>item.track.id));
                fetchedSongs = savedTracks.items.length;
                totalSongs += fetchedSongs;
                offset += fetchedSongs;
                console.log(`fetchedSongs: ${fetchedSongs}`);
                const amountSongsSaved = await this.dbHandler.saveSongsBasic(savedTracks.items.map(item =>{ return{id:item.track.id, name:item.track.name, artist: item.track.artists[0].name}}));
                console.log(`spotify - saved ${amountSongsSaved} tracks to db`);
            }
            this.savedTracks = ids;
            await this.saveTracks(JSON.stringify(ids));
        //});
    }

    async getBearer() {
        const getBearer = await fetch.queue(`https://accounts.spotify.com/api/token?grant_type=client_credentials`, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Basic ${process.env.BASIC}`},
        });
        if (getBearer.status !== 200) {
            throw new Error(`could not get Bearer: Error ${getBearer.status}`);
        };

        const bearerJson = await getBearer.json();
        process.env.BEARER = bearerJson.access_token;
        console.log(`current Bearer: ${process.env.BEARER}`);
    }

    async saveTracks(data) {
        const res = await fs.writeFile('savedTracks.json',data);
        if (res) {
            console.error('could not write saved tracks to file');
        }
    }

    async loadTracks() {
        const res = await fs.readFile('savedTracks.json');
        this.savedTracks = JSON.parse(res.toString());
    }

    async analyzeSavedTracks() {
        await this.getBearer();
        const maxSize       = 100;
        let offset          = 0;
        let fetchedSongs    = 0;

        while(offset === 0 || fetchedSongs === maxSize) {
            const nextChunk = this.savedTracks.slice(offset,maxSize);
            offset += maxSize;
            const getSongFeatures = await fetch.queue(`https://api.spotify.com/v1/audio-features/?ids=${nextChunk.join(',')}`, {
                method: 'GET',
                headers: {'Authorization': `Bearer ${process.env.BEARER}`}
            });
            if (getSongFeatures.status !== 200) {
                throw new Error(`spotify - error status ${getSongFeatures.status} getting audio features for saved songs`);
            }

            const songFeatures = await getSongFeatures.json();
            const fetchedSongs = songFeatures.audio_features.length;
            console.log('blub');

        }



    }

}

module.exports = SpotifyHandler;
