if (process.env.EXEC_MODE !== "PROD") {
    console.log('loading enviroment variables from .env because EXEC_MODE!=="PROD"')
    require('dotenv').config({path:__dirname+'/.env'});
}

const Fetch = require('./DelayedFetch');
const fetch = new Fetch();
const { URLSearchParams } = require('url');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

setTimeout(async () => {
    try {
        await main();
    } catch(e) {
        console.error(e);
    }
},1);

async function main() {
    await getBearer();
    const redirectUri = 'https://example.com/callback';
    console.log(`https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&scope=user-library-read`);

    //rl.question('What was the "code" parameter?', async (authCode) => {
        const authCode = 'AQDMZ2IG0sAaDsOXiWEP6cIrdwMmMsmp74q-yS5zjZqNJiKnB9a7L0_ouZAr4_KRsNCfkzig5jZ3YUVP886XgYTQuPxJQEIR5GwBS73qBA8Pnx45uvTyYSbMm11XODYN06FvDyk5uY8WxMIzfB8pL47to0RNe-KpUUy9ESJgjIgmQA4FEPHx0zalAsJJovdD8F2o6Qi6sdHcSdOC5y-3zGo-U9Mc';
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
            fetchedSongs = savedTracks.items.length;
            totalSongs += fetchedSongs;
            offset += fetchedSongs;
            console.log(`fetchedSongs: ${fetchedSongs}`);
            console.log(savedTracks.items.map(item => `${item.track.name} - ${item.track.artists[0].name}`).join('\n'));
        }
    //});
}

async function getBearer() {
    const getBearer = await fetch.queue(`https://accounts.spotify.com/api/token?grant_type=client_credentials`, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Basic ${process.env.BASIC}`},
    });
    if (getBearer.status !== 200) {
        throw new Error(`could not get Bearer: Error ${getBearer.status}`);
    };

    const bearerJson = await getBearer.json();
    process.env.BEARER = bearerJson.access_token;
}
