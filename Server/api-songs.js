const database = require("./database");

class Songs {
    AddSong(artist, name, albumn) {
        // Add a song to the database
        const text = "INSERT INTO songs(artist, name, albumn) VALUES($1, $2, $3)";
        const values = [artist, name, albumn];
        const res = database.Query(text, values);
        return res;
    }
}

// Create and export the accounts object
const songs = new Songs();
module.exports = songs;