const dotenv = require('dotenv');
dotenv.config();

const database = require("./database");

const accounts = require("./api-accounts");
const songs = require("./api-songs");
const playlists = require("./api-playlists");

// API class to handle HTTP requests and their responses
class MusicAppAPI {
    // Parser for GET requests
    async ParseGETRequest(id, headers, response) {
        //console.log("GET request received:", headers);
        let reqType = headers.request_type;
        let res = {};

        // Check request type and run the appropriate function
        switch(reqType) {
            case 'GetAccount':  // Get account info
                res = await accounts.GetAccount(id);
                break;
            case 'GetSongs':     // Get all songs
                res = await songs.GetSongs();
                break;
            case 'GetSongByID':
                res = await songs.GetSongByID(headers.song_id);
                break;
            case 'SearchSongByName':
                res = await songs.SearchSongByName(headers.song_name);
                break;
            case 'SearchSongByArtist':
                res = await songs.SearchSongByArtist(headers.artist_name);
                break;
            case 'SearchSongByAlbum':
                res = await songs.SearchSongByAlbum(headers.album_name);
                break;
            case 'GetPlaylists': // Get all playlists of a user
                res = await playlists.GetPlaylists(id);
                break;
            case 'GetPlaylistSongs': // Get all songs on a playlist
                res = await playlists.GetPlaylistSongs(headers.playlist_id);
                break;
            case undefined: // No request type specified
                res = {
                    status: 400,
                    body: {
                        "Unknown request type": "No request type was specified",
                        "Message": 'I\'ve been running for ' + process.uptime() + ' seconds! :D'
                    },
                };
                break;
            default: // Request type not recognized
                res = {
                    status: 400,
                    body: {"Unknown request type": "The request type '" + reqType + "' is not recognized"},
                };
        }

        // Return the response
        response.status(res.status);
        response.json(res.body);
        return res;
    }

    // Parser for POST requests
    async ParsePOSTRequest(id, headers, body, response) {
        //console.log("POST request received:", headers, body);
        let reqType = headers.request_type;
        let res = {};

        // Check request type and run the appropriate function
        switch(reqType) {
            case 'RegisterAccount': // Register a new account
                res = await accounts.RegisterAccount(id, body.email, body.username);
                break;
            case 'AddListen': // Add a listen to a song
                res = await songs.AddListen(body.song_id);
                break;
            case 'CreatePlaylist': // Create a new playlist
                res = await playlists.CreatePlaylist(id, body.playlist_name);
                break;
            case 'AddSongToPlaylist': // Add a song to a playlist
                res = await playlists.AddSongToPlaylist(body.playlist_id, body.song_id);
                break;
            case 'DeletePlaylist': // Delete a playlist
                res = await playlists.DeletePlaylist(body.playlist_id);
                break;
            /*
            case 'AddSong': // Add a new song
                res = await songs.AddSong(body.artist, body.name, body.albumn);
                break;
            */
            case undefined: // No request type specified
                res = {
                    status: 400,
                    body: {
                        "Unknown request type": "No request type was specified",
                        "Message": 'I\'ve been running for ' + process.uptime() + ' seconds! :D'
                    },
                };
                break;
            default:        // Request type not recognized
                res = {
                    status: 400,
                    body: {"Unknown request type": "The request type '" + reqType + "' is not recognized"},
                };
        }

        // Return the response
        //console.log(res);
        response.status(res.status);
        response.json(res.body);
        return res;
    }

    // Shutdown the database client
    async Shutdown() {
        await database.endClient();
    }
}

module.exports = MusicAppAPI;