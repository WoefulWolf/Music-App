// Get environment Vars
require('dotenv').config();

// Start Node + Express.js Server
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const { expressjwt: expressJwt } = require('express-jwt');
var jwks = require('jwks-rsa');

if (process.env.CI) {
    console.log("Run in CI, let's stop listening and exit!")
    process.exit()
}

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

app.use('/api/private', jwtCheck, (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        console.log('Unauthorized request:');
        console.log(req.headers);
        console.log(req.body);
        res.status(401);
        res.json({"error" : err.name + ": " + err.message});
    }
});

app.use(express.json())

// Auth0 authenticated API requests
app.get('/api/private', function (req, res) {
    console.log('Received authenticated GET request:');
    console.log(req.headers);
    console.log(req.body);
    res.send('Welcome to the dark side. \n I\'ve been running for ' + process.uptime() + ' seconds! :D');
});

app.post('/api/private', function (req, res) {
    console.log('Received authenticated POST request:');
    console.log(req.headers);
    console.log(req.body);
    res.send('Welcome to the dark side. \n I\'ve been running for ' + process.uptime() + ' seconds! :D');
});

// Non-authenticated, public requests
app.get('/', function (req, res) {
    console.log('Received public GET request:');
    console.log(req.headers);
    console.log(req.body);
    res.send('I\'ve been running for ' + process.uptime() + ' seconds! :D');
});

app.post('/', function (req, res) {
    console.log('Received public POST request:');
    console.log(req.headers);
    console.log(req.body);
    res.send('I\'ve been running for ' + process.uptime() + ' seconds! :D');
});

// Start listening
app.listen(port, () => {
    console.log(`Music web app listening on port ${port}`)
})