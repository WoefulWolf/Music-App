// Start Node + Express.js Server
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const { expressjwt: expressJwt } = require('express-jwt');
var jwks = require('jwks-rsa');

// If we are running in CI, then we close the server instead of listening
if (process.env.CI) {
    console.log("Run in CI, let's not startup the entire server...")
    process.exit()
}

// Set the port
app.set( 'port', ( port ));

// Setup Auth0 Middleware Authentication
var jwtCheck = expressJwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: false,
        jwksUri: 'https://dev-mmmro5b5.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://sdp-music-app.herokuapp.com/',
  issuer: 'https://dev-mmmro5b5.us.auth0.com/',
  algorithms: ['RS256']
});

// Setup the response to unauthorized requests
app.use('/api/private', jwtCheck, (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        console.log('Unauthorized request:');
        console.log(req.headers);
        console.log(req.body);
        res.status(401);
        res.json({"error" : err.name + ": " + err.message});
    }
});

// Turn express requests into JSON
app.use(express.json())

// Import the API
const MusicAppAPI = require('./api');
let api = new MusicAppAPI();

// Auth0 authenticated API requests
// GET
app.get('/api/private', function (req, res) {
    api.ParseGETRequest(req.headers, res);
});

// POST
app.post('/api/private', function (req, res) {
    api.ParsePOSTRequest(req.headers, req.body, res);
});

// Non-authenticated, public requests
// GET
app.get('/', function (req, res) {
    api.ParseGETRequest(req.headers, res);
});

// POST
app.post('/', function (req, res) {
    api.ParsePOSTRequest(req.headers, req.body, res);
});

// Start listening for requests once everything has been setup
app.listen(port, () => {
    console.log(`Music web app listening on port ${port}`)
})