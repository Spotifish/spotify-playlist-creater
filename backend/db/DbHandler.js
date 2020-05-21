class DbHandler{
    constructor () {
        this.db = require('./db');
    }

    async storeUserAuth (userAuth,cookie) {
        let conn;
        try {
            conn = await this.db.getConnection();
            const storeAuth = await conn.query('INSERT INTO userAuth (code,cookie) VALUES (?,?)',[userAuth,cookie]);
            if (storeAuth.affectedRows === 0) {
                throw new Error('DbHandler - Error when storing UserAuth');
            }
            return {error:null};
        } catch(e) {
            console.error(e);
            return {error:'DbHandler - Error storing user auth'};
        } finally{
            if (conn) conn.release();
        }
    }

    async getAuthCode(cookie) {
        let conn;
        try {
            conn = await this.db.getConnection();
            const storeAuth = await conn.query('SELECT authCode FROM userAuth WHERE cookie=?',[cookie]);
            if (storeAuth.length === 0) {
                throw new Error('DbHandler - Error when storing UserAuth');
            }
            return {
                bearer:storeAuth[0],
                error:null
            };
        } catch(e) {
            console.error(e);
            return {
                error: 'DbHandler - Could not get corrosponding Access Token for Cookie'
            };
        } finally{
            if (conn) conn.release();
        }
    }

    /**
     * @description Saves id,name,artist to db
     * @param {Array} songs - Array of JSON Objects containing id,name,artist (only one artist atm)
     * @returns {Integer} - amount of songs that have been stored
     */
    async saveSongsBasic(songs) {
        let conn;
        try {
            conn = await this.db.getConnection();
            const saveSongs = await conn.query(`INSERT INTO songs (id,name,artist) VALUES ${"(?,?,?),".repeat(songs.length).slice(0,-1)}`,songs.map(song => [song.id,song.name,song.artist]).flat());
            return saveSongs.affectedRows;
        } catch(e) {
            console.error('error when saving basic song information');
            console.error(e);
            return 0;
        } finally{
            if (conn) {
                conn.release();
            }
        }
    }
}

module.exports = DbHandler;
