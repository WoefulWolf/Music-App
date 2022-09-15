const database = require("./database");

class Songs {
    // Get all songs
    GetSongs() {
        const text = "SELECT * FROM songs";
        const res = database.Query(text);
        return res;
    }

    // Get a song by ID
    GetSongByID(songId) {
        const text = 'SELECT * FROM songs WHERE "Song_ID" = $1';
        const values = [songId];
        const res = database.Query(text, values);
        return res;
    }

    // Search for song by name
    SearchSongByName(name) {
        const text = 'SELECT * FROM songs WHERE "Song_Name" LIKE $1';
        const values = ["%" + name + "%"];
        const res = database.Query(text, values);
        return res;
    }

    // Search for song by artist
    SearchSongByArtist(artist) {
        const text = 'SELECT * FROM songs WHERE "Artist" LIKE $1';
        const values = ["%" + artist + "%"];
        const res = database.Query(text, values);
        return res;
    }

    // Search for song by albumn
    SearchSongByAlbum(albumn) {
        const text = 'SELECT * FROM songs WHERE "Album_Name" LIKE $1';
        const values = ["%" + albumn + "%"];
        const res = database.Query(text, values);
        return res;
    }

    // Add a song to the database
    AddSong(artist, name, albumn) {
        const text = 'INSERT INTO songs("Artist", "Song_Name", "Album_Name") VALUES($1, $2, $3)';
        const values = [artist, name, albumn];
        const res = database.Query(text, values);
        return res;
    }

    // Add a listen to the song
    AddListen(songId) {
        const text = 'UPDATE songs SET "Listens" = "Listens" + 1 WHERE "Song_ID" = $1';
        const values = [songId];
        const res = database.Query(text, values);
        return res;
    }
}

// Create and export the accounts object
const songs = new Songs();
module.exports = songs;