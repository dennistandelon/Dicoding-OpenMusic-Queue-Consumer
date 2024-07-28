const {Pool} = require('pg');

class PlaylistService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylistSong(playlistId) {
        const playlistQuery = {
          text: `SELECT p.id, p.name FROM playlists p 
          LEFT JOIN users u ON u.id = p.owner 
          LEFT JOIN collaborations c ON c.playlist_id = p.id
          WHERE p.id = $1 OR c.playlist_id = $1`,
          values: [playlistId],
        };

        const playlist = await this._pool.query(playlistQuery);
    
        const songQuery = {
          text: `SELECT s.id, s.title, s.performer FROM songs s 
          LEFT JOIN playlist_songs ps ON ps.song_id = s.id 
          WHERE ps.playlist_id = $1`,
          values: [playlistId],
        };
    
        const song = await this._pool.query(songQuery);
    
        return {
          playlist:{
          ...playlist.rows[0],
          songs: song.rows,
        }};
    }
}

module.exports = PlaylistService;