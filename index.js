if (process.env.EXEC_MODE !== "PROD") {
    console.log('loading enviroment variables from .env because EXEC_MODE!=="PROD"')
    require('dotenv').config({path:__dirname+'/.env'});
}

const DbHandler = require('./db/DbHandler');
const SpotifyHandler = require('./spotify/SpotifyHandler');
const spotify = new SpotifyHandler(new DbHandler());
const express = require('express');

const PORT = process.env.PORT;

const app = express();
app.listen(PORT,() => {
    console.log(`express - listening to port ${PORT}`);
})

app.get('/analyzeSavedTracks',(req,res) => {

    res.send();
});

setTimeout(async  () => {
    try {
        await spotify.getSavedTracks();
    } catch(e) {
        console.error(e);
    }
},1);

async function main() {

}
