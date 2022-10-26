const database = require("./database");
const isValid = require("./validation");

const axios = require('axios');

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

    async AddSongByURL(song_url) {
        // Check URL
        if (!isValid.String(song_url)) {
            return {
                status: 400,
                body: {"Invalid song_url": "The song_url '" + song_url + "' is not valid"},
            };
        }

        // Extract ID from URL
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const song_id = song_url.match(regExp)[7];
    
        const response = await axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + song_id + "&key=" + process.env.YT_API_KEY);

        // Check if song exists
        if (response.data.items.length == 0) {
            return {
                status: 400,
                body: {"Invalid song_url": "The song_url '" + song_url + "' is not valid"},
            };
        }

        // Get the channel's profile thumbnail
        const channel_id = response.data.items[0].snippet.channelId;
        const channel_response = await axios.get("https://www.googleapis.com/youtube/v3/channels?part=snippet&id=" + channel_id + "&key=" + process.env.YT_API_KEY);
        const channel_thumbnails = channel_response.data.items[0].snippet.thumbnails;
        // Get thumbnail with highest resolution
        var channel_thumbnail = channel_thumbnails.default.url;
        var current_res = 0;
        for (const thumb in channel_thumbnails) {
            if (channel_thumbnails[thumb].width > current_res) {
                channel_thumbnail = channel_thumbnails[thumb].url;
                current_res = channel_thumbnails[thumb].width;
            }
        }

        let song_name = response.data.items[0].snippet.title;
        song_name = song_name.replace(/ *\([^)]*\) */g, "");    // Remove round brackets
        song_name = song_name.replace(/ *\[[^)]*\] */g, "");    // Remove square brackets
        song_name = song_name.replace(/ *\{[^)]*\} */g, "");    // Remove curly brackets
        song_name = song_name.trim();

        let artist_name = response.data.items[0].snippet.channelTitle;
        artist_name = artist_name.replace("VEVO", "");
        artist_name = artist_name.replace(/ *\([^)]*\) */g, "");    // Remove round brackets
        artist_name = artist_name.replace(/ *\[[^)]*\] */g, "");    // Remove square brackets
        artist_name = artist_name.replace(/ *\{[^)]*\} */g, "");    // Remove curly brackets
        artist_name = artist_name.trim();

        // Check if channel_name exists in artists db
        const artist_text = `SELECT "Artist_ID" FROM "artists" WHERE REPLACE(LOWER("Artist_Name"), ' ', '') = REPLACE(LOWER($1), ' ', '')`;
        const artist_values = [artist_name];
        const artist_res = await database.Query(artist_text, artist_values);
        
        // Check artist_res status and if artist exists use their ID, else create new artist
        let artist_id;
        if (artist_res.status == 200 && artist_res.body.length > 0) {
            artist_id = artist_res.body[0].Artist_ID;
        } else {
            const artist_add_text = `INSERT INTO "artists"("Artist_Name") VALUES($1) RETURNING "Artist_ID"`;
            const artist_add_values = [artist_name];
            const artist_add_res = await database.Query(artist_add_text, artist_add_values);
            artist_id = artist_add_res.body[0].Artist_ID;
        }

        // Check a "User Uploads" album for this artist exists
        const album_text = `SELECT "Album_ID" FROM "albums" WHERE "Album_Name" = $1 AND "Artist_ID" = $2`;
        const album_values = ["User Uploads", artist_id];
        const album_res = await database.Query(album_text, album_values);

        // If it doesn't exist, create it
        let album_id;
        if (album_res.status == 200 && album_res.body.length > 0) {
            album_id = album_res.body[0].Album_ID;
        } else {
            const album_add_text = `INSERT INTO "albums"("Album_Name", "Artist_ID", "Album_Cover") VALUES($1, $2, $3) RETURNING "Album_ID"`;
            const album_add_values = ["User Uploads", artist_id, channel_thumbnail];
            const album_add_res = await database.Query(album_add_text, album_add_values);
            album_id = album_add_res.body[0].Album_ID;
        }

        const text = 'INSERT INTO songs("Song_Name", "Album_ID", "Artist_ID", "Song_URL") VALUES($1, $2, $3, $4)';
        const values = [song_name, album_id, artist_id, song_id];
        const res = database.Query(text, values);
        return res;
    }
}

// Create and export the accounts object
const songs = new Songs();
module.exports = songs;