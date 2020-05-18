class DbHandler{
    constructor () {
        this.db = require('./db');
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
