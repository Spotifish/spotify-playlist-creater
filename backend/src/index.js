if (process.env.EXEC_MODE !== "PROD") {
    console.log('loading enviroment variables from .env because EXEC_MODE!=="PROD"')
    require('dotenv').config({path:__dirname+'/./../.env'});
}

const express = require('express');

const SpotifyController = require('./Controllers/SpotifyController');

const PORT = process.env.PORT;

const app = express();
app.listen(PORT,() => {
    console.log(`express - listening to port ${PORT}`);
})

app.use(express.json());
app.post('/proxy',SpotifyController.request);
app.post('/auth',SpotifyController.storeAuth);
