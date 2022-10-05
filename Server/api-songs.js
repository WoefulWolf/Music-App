const database = require("./database");
const isValid = require("./validation");

class Songs {
    // Get all songs
    GetSongs() {
        const text = `SELECT songs."Song_ID", songs."Song_URL", songs."Song_Name", songs."Album_ID", albums."Album_Name", albums."Album_Cover", artists."Artist_ID", "Artist_Name", songs."Listens"
        FROM "songs" INNER JOIN "albums" ON songs."Album_ID" = albums."Album_ID" INNER JOIN "artists" ON artists."Artist_ID" = songs."Artist_ID"`;
        const res = database.Query(text);
        return res;
    }

    // Get a song by ID
    GetSongByID(song_id) {
        // Check ID
        if (!isValid.Defined(song_id)) {
            return {
                status: 400,
                body: {"Invalid song_id": "The song_id '" + song_id + "' is not valid"},
            };
        }

        const text = `SELECT songs."Song_ID", songs."Song_URL", songs."Song_Name", songs."Album_ID", albums."Album_Name", albums."Album_Cover", artists."Artist_ID", "Artist_Name", songs."Listens"
        FROM "songs" INNER JOIN "albums" ON songs."Album_ID" = albums."Album_ID" INNER JOIN "artists" ON artists."Artist_ID" = songs."Artist_ID"
        WHERE songs."Song_ID" = $1`;
        const values = [song_id];
        const res = database.Query(text, values);
        return res;
    }

    // Search for song by name
    SearchSongByName(song_name) {
        // Check ID
        if (!isValid.String(song_name)) {
            return {
                status: 400,
                body: {"Invalid song_name": "The song_name '" + song_name + "' is not valid"},
            };
        }

        const text = `SELECT songs."Song_ID", songs."Song_URL", songs."Song_Name", songs."Album_ID", albums."Album_Name", albums."Album_Cover", artists."Artist_ID", "Artist_Name", songs."Listens"
        FROM "songs" INNER JOIN "albums" ON songs."Album_ID" = albums."Album_ID" INNER JOIN "artists" ON artists."Artist_ID" = songs."Artist_ID"
        WHERE songs."Song_Name" ILIKE $1`;
        const values = ["%" + song_name + "%"];
        const res = database.Query(text, values);
        return res;
    }

    // Search for song by artist
    SearchSongByArtist(artist_name) {
        // Check artist
        if (!isValid.String(artist_name)) {
            return {
                status: 400,
                body: {"Invalid artist_name": "The artist_name '" + artist_name + "' is not valid"},
            };
        }

        const text = `SELECT songs."Song_ID", songs."Song_URL", songs."Song_Name", songs."Album_ID", albums."Album_Name", albums."Album_Cover", artists."Artist_ID", "Artist_Name", songs."Listens"
        FROM "songs" INNER JOIN "albums" ON songs."Album_ID" = albums."Album_ID" INNER JOIN "artists" ON artists."Artist_ID" = songs."Artist_ID"
        WHERE artists."Artist_Name" ILIKE $1`;
        const values = ["%" + artist_name + "%"];
        const res = database.Query(text, values);
        return res;
    }

    // Search for song by albumn
    SearchSongByAlbum(album_name) {
        // Check album
        if (!isValid.String(album_name)) {
            return {
                status: 400,
                body: {"Invalid album_name": "The album_name '" + album_name + "' is not valid"},
            };
        }

        const text = `SELECT songs."Song_ID", songs."Song_URL", songs."Song_Name", songs."Album_ID", albums."Album_Name", albums."Album_Cover", artists."Artist_ID", "Artist_Name", songs."Listens"
        FROM "songs" INNER JOIN "albums" ON songs."Album_ID" = albums."Album_ID" INNER JOIN "artists" ON artists."Artist_ID" = songs."Artist_ID"
        WHERE albums."Album_Name" ILIKE $1`;
        const values = ["%" + album_name + "%"];
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
    AddListen(song_id) {
        // Check ID
        if (!isValid.Defined(song_id)) {
            return {
                status: 400,
                body: {"Invalid song_id": "The song_id '" + song_id + "' is not valid"},
            };
        }

        const text = 'UPDATE songs SET "Listens" = "Listens" + 1 WHERE "Song_ID" = $1';
        const values = [song_id];
        const res = database.Query(text, values);
        return res;
    }
}

// Create and export the accounts object
const songs = new Songs();
module.exports = songs;