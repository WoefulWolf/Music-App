const database = require("./database");
const isValid = require("./validation");

class Songs {
    // Get all songs
    GetSongs() {
        const text = `SELECT songs."Song_ID", songs."Song_Name", songs."Album_ID", albums."Album_Name", albums."Album_Cover", artists."Artist_ID", "Artist_Name", songs."Listens"
        FROM "songs" INNER JOIN "albums" ON songs."Album_ID" = albums."Album_ID" INNER JOIN "artists" ON artists."Artist_ID" = songs."Artist_ID"`;
        const res = database.Query(text);
        return res;
    }

    // Get a song by ID
    GetSongByID(songId) {
        const text = `SELECT songs."Song_ID", songs."Song_Name", songs."Album_ID", albums."Album_Name", albums."Album_Cover", artists."Artist_ID", "Artist_Name", songs."Listens"
        FROM "songs" INNER JOIN "albums" ON songs."Album_ID" = albums."Album_ID" INNER JOIN "artists" ON artists."Artist_ID" = songs."Artist_ID"
        WHERE songs."Song_ID" = $1`;
        const values = [songId];
        const res = database.Query(text, values);
        return res;
    }

    // Search for song by name
    SearchSongByName(name) {
        // Check ID
        if (!isValid.String(name)) {
            return {
                status: 400,
                body: {"Invalid name": "The name '" + name + "' is not valid"},
            };
        }

        const text = `SELECT songs."Song_ID", songs."Song_Name", songs."Album_ID", albums."Album_Name", albums."Album_Cover", artists."Artist_ID", "Artist_Name", songs."Listens"
        FROM "songs" INNER JOIN "albums" ON songs."Album_ID" = albums."Album_ID" INNER JOIN "artists" ON artists."Artist_ID" = songs."Artist_ID"
        WHERE songs."Song_Name" LIKE $1`;
        const values = ["%" + name + "%"];
        const res = database.Query(text, values);
        return res;
    }

    // Search for song by artist
    SearchSongByArtist(artist) {
        // Check artist
        if (!isValid.String(artist)) {
            return {
                status: 400,
                body: {"Invalid artist": "The artist '" + artist + "' is not valid"},
            };
        }

        const text = `SELECT songs."Song_ID", songs."Song_Name", songs."Album_ID", albums."Album_Name", albums."Album_Cover", artists."Artist_ID", "Artist_Name", songs."Listens"
        FROM "songs" INNER JOIN "albums" ON songs."Album_ID" = albums."Album_ID" INNER JOIN "artists" ON artists."Artist_ID" = songs."Artist_ID"
        WHERE artists."Artist_Name" LIKE $1`;
        const values = ["%" + artist + "%"];
        const res = database.Query(text, values);
        return res;
    }

    // Search for song by albumn
    SearchSongByAlbum(album) {
        // Check album
        if (!isValid.String(album)) {
            return {
                status: 400,
                body: {"Invalid album": "The album '" + album + "' is not valid"},
            };
        }

        const text = `SELECT songs."Song_ID", songs."Song_Name", songs."Album_ID", albums."Album_Name", albums."Album_Cover", artists."Artist_ID", "Artist_Name", songs."Listens"
        FROM "songs" INNER JOIN "albums" ON songs."Album_ID" = albums."Album_ID" INNER JOIN "artists" ON artists."Artist_ID" = songs."Artist_ID"
        WHERE albums."Album_Name" LIKE $1`;
        const values = ["%" + album + "%"];
        const res = database.Query(text, values);
        return res;
    }

    // Add a song to the database
    /*
    AddSong(artist, name, album) {
        const text = 'INSERT INTO songs("Artist", "Song_Name", "Album_Name") VALUES($1, $2, $3)';
        const values = [artist, name, album];
        const res = database.Query(text, values);
        return res;
    }
    */

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