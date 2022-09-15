const MusicAppAPI = require('./api');
let api = new MusicAppAPI();

const res = {};
res.status = () => res;
res.json = () => res;

// SONGS GET REQUESTS
test('Getting all songs.', async () => {
    const headers = {
        request_type: 'GetSongs',
    };

    const result = await api.ParseGETRequest(headers, res);
    expect(result.status).toEqual(200);
    expect(result.body.length).toBeGreaterThan(0);
});

test('Getting song by ID.', async () => {
    const headers = {
        request_type: 'GetSongByID',
        song_id: '1',
    };

    const result = await api.ParseGETRequest(headers, res);
    expect(result.status).toEqual(200);
    expect(result.body[0].Song_Name).toEqual("Never Gonna Give You Up");
});

test('Searching song by name.', async () => {
    const headers = {
        request_type: 'SearchSongByName',
        song_name: 'Never Gonna Give',
    };

    const result = await api.ParseGETRequest(headers, res);
    expect(result.status).toEqual(200);
    expect(result.body[0].Song_Name).toEqual("Never Gonna Give You Up");
});

test('Searching song by artist.', async () => {
    const headers = {
        request_type: 'SearchSongByArtist',
        artist: 'Astley',
    };

    const result = await api.ParseGETRequest(headers, res);
    expect(result.status).toEqual(200);
    expect(result.body[0].Song_Name).toEqual("Never Gonna Give You Up");
});

test('Searching song by album.', async () => {
    const headers = {
        request_type: 'SearchSongByAlbum',
        album: 'Xenoblade',
    };

    const result = await api.ParseGETRequest(headers, res);
    expect(result.status).toEqual(200);
    expect(result.body.length).toEqual(7);
});

// SONGS POST REQUESTS
test('Adding a listen to a song', async () => {
    const headers = {
        request_type: 'AddListen',
    };

    const body = {
        song_id: 3,
    };
    
    const result = await api.ParsePOSTRequest(headers, body, res);
    expect(result.status).toEqual(200);
    expect(result.body).toEqual({"Success": "Update successful"});
});

afterAll(async () => {
    await api.Shutdown();
});