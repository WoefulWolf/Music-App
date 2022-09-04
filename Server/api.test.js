const MusicAppAPI = require('./api');
let api = new MusicAppAPI();

const res = {};
res.status = () => res;
res.json = () => res;

// GET REQUEST WITH NO REQUEST TYPE
test('GET request with no request type.', async () => {
    const headers = {
    };
    
    const result = await api.ParseAPIGETRequest(headers, res);
    expect(result.status).toEqual(400);
    expect(result.body["Unknown request type"]).toEqual("No request type was specified");
});

// GET REQUEST WITH INVALID REQUEST TYPE
test('GET request with invalid request type.', async () => {
    const headers = {
        request_type: 'InvalidRequestType',
    };
    
    const result = await api.ParseAPIGETRequest(headers, res);
    expect(result.status).toEqual(400);
    expect(result.body["Unknown request type"]).toEqual("The request type '" + headers.request_type + "' is not recognized");
});

// POST REQUEST WITH NO REQUEST TYPE
test('POST request with no request type.', async () => {
    const headers = {
    };

    const body = {
    };
    
    const result = await api.ParseAPIPOSTRequest(headers, body, res);
    expect(result.status).toEqual(400);
    expect(result.body["Unknown request type"]).toEqual("No request type was specified");
});

// POST REQUEST WITH INVALID REQUEST TYPE
test('POST request with invalid request type.', async () => {
    const headers = {
        request_type: 'InvalidRequestType',
    };

    const body = {
    };
    
    const result = await api.ParseAPIPOSTRequest(headers, body, res);
    expect(result.status).toEqual(400);
    expect(result.body["Unknown request type"]).toEqual("The request type '" + headers.request_type + "' is not recognized");
});


afterAll(async () => {
    await api.Shutdown();
});