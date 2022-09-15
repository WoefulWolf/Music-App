const MusicAppAPI = require('./api');
let api = new MusicAppAPI();

const res = {};
res.status = () => res;
res.json = () => res;

// ACCOUNTS POST REQUESTS
test('Registering user with bad ID.', async () => {
    const headers = {
        request_type: 'RegisterAccount',
    };

    const body = {
    };
    
    const result = await api.ParsePOSTRequest(headers, body, res);
    expect(result.status).toEqual(400);
    expect(result.body).toEqual({"Invalid ID": "The ID 'undefined' is not valid"});
});

test('Registering user with bad email.', async () => {
    const headers = {
        request_type: 'RegisterAccount',
    };

    const body = {
        id: '1234567890',
    };
    
    const result = await api.ParsePOSTRequest(headers, body, res);
    expect(result.status).toEqual(400);
    expect(result.body).toEqual({"Invalid email": "The email 'undefined' is not valid"});
});

test('Registering user with bad username.', async () => {
    const headers = {
        request_type: 'RegisterAccount',
    };

    const body = {
        id: '1234567890',
        email: 'test@test.com',
    };
    
    const result = await api.ParsePOSTRequest(headers, body, res);
    expect(result.status).toEqual(400);
    expect(result.body).toEqual({"Invalid username": "The username 'undefined' is not valid"});
});

test('Registering duplicate user.', async () => {
    const headers = {
        request_type: 'RegisterAccount',
    };

    const body = {
        id: '1234567890',
        email: 'test@test.com',
        username: 'test',
    };
    
    const result = await api.ParsePOSTRequest(headers, body, res);
    expect(result.status).toEqual(500);
    expect(result.body).toEqual({"Database error": "Key (\"User_ID\")=(" + body.id + ") already exists."});
});

// ACCOUNTS GET REQUESTS
test('Getting a user without specified ID.', async () => {
    const headers = {
        request_type: 'GetAccount',
    };
    
    const result = await api.ParseGETRequest(headers, res);
    expect(result.status).toEqual(400);
    expect(result.body).toEqual({"Invalid ID": "The ID 'undefined' is not valid"});
});

test('Getting a non-existent user.', async () => {
    const headers = {
        request_type: 'GetAccount',
        id: 'McDonaldsSprite',
    };
    
    const result = await api.ParseGETRequest(headers, res);
    expect(result.status).toEqual(404);
    expect(result.body).toEqual({"No results": "No results were found"});
});

test('Getting a user.', async () => {
    const headers = {
        request_type: 'GetAccount',
        id: '1234567890',
    };
    
    const result = await api.ParseGETRequest(headers, res);
    expect(result.status).toEqual(200);
    expect(result.body[0].Username).toEqual("test");
});

afterAll(async () => {
    await api.Shutdown();
});