const MusicAppAPI = require('../api');
let api = new MusicAppAPI();

const res = {};
res.status = () => res;
res.json = () => res;

// SONGS GET REQUESTS
test('Getting all songs.', async () => {
    const headers = {
        request_type: 'GetSongs',
    };

    const result = await api.ParseGETRequest(undefined, headers, res);
    expect(result.status).toEqual(200);
    expect(result.body.length).toBeGreaterThan(0);
});

test('Getting song by ID.', async () => {
    const headers = {
        request_type: 'GetSongByID',
        song_id: '1',
    };

    const result = await api.ParseGETRequest(undefined, headers, res);
    expect(result.status).toEqual(200);
    expect(result.body[0].Song_Name).toEqual("Never Gonna Give You Up");
});

test('Searching song with invalid name.', async () => {
    const headers = {
        request_type: 'SearchSongByName',
        song_name: 420,
    };

    const result = await api.ParseGETRequest(undefined, headers, res);
    expect(result.status).toEqual(400);
    expect(result.body).toEqual({"Invalid name": "The name '" + headers.song_name + "' is not valid"});
});

test('Searching song by name.', async () => {
    const headers = {
        request_type: 'SearchSongByName',
        song_name: 'Never Gonna Give',
    };

    const result = await api.ParseGETRequest(undefined, headers, res);
    expect(result.status).toEqual(200);
    expect(result.body[0].Song_Name).toEqual("Never Gonna Give You Up");
});

test('Searching songs with invalid artist.', async () => {
    const headers = {
        request_type: 'SearchSongByArtist',
        artist_name: 420,
    };

    const result = await api.ParseGETRequest(undefined, headers, res);
    expect(result.status).toEqual(400);
    expect(result.body).toEqual({"Invalid artist": "The artist '" + headers.artist_name + "' is not valid"});
});

test('Searching song by artist.', async () => {
    const headers = {
        request_type: 'SearchSongByArtist',
        artist_name: 'Astley',
    };

    const result = await api.ParseGETRequest(undefined, headers, res);
    expect(result.status).toEqual(200);
    expect(result.body[0].Song_Name).toEqual("Never Gonna Give You Up");
});

test('Searching song with invalid album.', async () => {
    const headers = {
        request_type: 'SearchSongByAlbum',
        album_name: 420,
    };

    const result = await api.ParseGETRequest(undefined, headers, res);
    expect(result.status).toEqual(400);
    expect(result.body).toEqual({"Invalid album": "The album '" + headers.album_name + "' is not valid"});
});

test('Searching song by album.', async () => {
    const headers = {
        request_type: 'SearchSongByAlbum',
        album_name: 'Xenoblade',
    };

    const result = await api.ParseGETRequest(undefined, headers, res);
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
    
    const result = await api.ParsePOSTRequest(undefined, headers, body, res);
    expect(result.status).toEqual(200);
    expect(result.body).toEqual({"Success": "Update successful"});
});

afterAll(async () => {
    await api.Shutdown();
});