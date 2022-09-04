const dotenv = require('dotenv');
dotenv.config();

const database = require("./database");

const accounts = require("./api-accounts");
const songs = require("./api-songs");
const playlists = require("./api-playlists");

class MusicAppAPI {
    async ParseGETRequest(headers, response) {
        //console.log("GET request received:", headers);
        let reqType = headers.request_type;
        let res = {};

        switch(reqType) {
            case "GetAccount":
                res = await accounts.GetAccount(headers.id);
                break;
            case undefined:
                res = {
                    status: 400,
                    body: {
                        "Unknown request type": "No request type was specified",
                        "Message": 'I\'ve been running for ' + process.uptime() + ' seconds! :D'
                    },
                };
                break;
            default:
                res = {
                    status: 400,
                    body: {"Unknown request type": "The request type '" + reqType + "' is not recognized"},
                };
        }

        //console.log(res);
        response.status(res.status);
        response.json(res.body);
        return res;
    }

    async ParsePOSTRequest(headers, body, response) {
        //console.log("POST request received:", headers, body);
        let reqType = headers.request_type;
        let res = {};

        switch(reqType) {
            case 'RegisterAccount':
                res = await accounts.RegisterAccount(body.id, body.email, body.username);
                break;
            case 'AddSong':
                res = await songs.AddSong(body.artist, body.name, body.albumn);
                break;
            case undefined:
                res = {
                    status: 400,
                    body: {
                        "Unknown request type": "No request type was specified",
                        "Message": 'I\'ve been running for ' + process.uptime() + ' seconds! :D'
                    },
                };
                break;
            default:
                res = {
                    status: 400,
                    body: {"Unknown request type": "The request type '" + reqType + "' is not recognized"},
                };
        }

        //console.log(res);
        response.status(res.status);
        response.json(res.body);
        return res;
    }

    async Shutdown() {
        await database.endClient();
    }
}

module.exports = MusicAppAPI;