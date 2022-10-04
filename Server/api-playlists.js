const database = require("./database");
const isValid = require("./validation");

class Playlists {
    // Create a playlist
    CreatePlaylist(user_id, playlist_name) {
        // Check ID
        if (!isValid.String(user_id)) {
            return {
                status: 400,
                body: {"Invalid user_id": "The user_id '" + user_id + "' is not valid"},
            };
        }

        // Check the playlist name is valid
        if (!isValid.String(playlist_name)) {
            return {
                status: 400,
                body: {"Invalid playlist_name": "The playlist_name '" + playlist_name + "' is not valid"},
            };
        }

        const text = 'INSERT INTO playlists("User_ID", "Playlist_Name") VALUES($1, $2)';
        const values = [user_id, playlist_name];
        const res = database.Query(text, values);
        return res;
    }

    // Get all playlist of a user
    GetPlaylists(user_id) {
        // Check ID
        if (!isValid.String(user_id)) {
            return {
                status: 400,
                body: {"Invalid user_id": "The user_id '" + user_id + "' is not valid"},
            };
        }

        const text = 'SELECT "Playlist_ID", "Playlist_Name" FROM playlists WHERE "User_ID" = $1';
        const values = [user_id];
        const res = database.Query(text, values);
        return res;
    }

    // Get the songs on a playlist
    GetPlaylistSongs(playlist_id) {
        // Check ID
        if (!isValid.Defined(playlist_id)) {
            return {
                status: 400,
                body: {"Invalid playlist_id": "The playlist_id '" + playlist_id + "' is not valid"},
            };
        }

        const text = `SELECT songs."Song_ID", songs."Song_URL", songs."Song_Name", songs."Album_ID", albums."Album_Name", albums."Album_Cover", artists."Artist_ID", "Artist_Name", songs."Listens"
        FROM "playlist_songs"
        INNER JOIN "playlists" ON playlist_songs."Playlist_ID" = playlists."Playlist_ID"
        INNER JOIN "songs" ON songs."Song_ID" = playlist_songs."Song_ID"
        INNER JOIN "albums" ON songs."Album_ID" = albums."Album_ID"
        INNER JOIN "artists" ON artists."Artist_ID" = songs."Artist_ID"
        where playlists."Playlist_ID" = $1;`;
        const values = [playlist_id];
        const res = database.Query(text, values);
        return res;
    }

    AddSongToPlaylist(playlist_id, song_id) {
        const text = 'INSERT INTO playlist_songs("Playlist_ID", "Song_ID") VALUES($1, $2)';
        const values = [playlist_id, song_id];
        const res = database.Query(text, values);
        return res;
    }

    DeletePlaylist(playlist_id) {
        let text = `DELETE FROM playlist_songs WHERE "Playlist_ID" = $1`;
        const values = [playlist_id];
        let res = database.Query(text, values);

        text = `DELETE FROM playlists WHERE "Playlist_ID" = $1`;
        res = database.Query(text, values);
        return res;
    }
}

// Create and export the accounts object
const playlists = new Playlists();
module.exports = playlists;