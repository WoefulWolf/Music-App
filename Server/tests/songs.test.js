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

test('Getting song by ID with no ID passed.', async () => {
    const headers = {
        request_type: 'GetSongByID',
    };

    const result = await api.ParseGETRequest(undefined, headers, res);
    expect(result.status).toEqual(400);
    expect(result.body).toEqual({"Invalid song_id": "The song_id 'undefined' is not valid"});
});

test('Getting song by ID.', async () => {
    const headers = {
        request_type: 'GetSongByID',
        song_id: '1',
    };

    const result = await api.ParseGETRequest(undefined, headers, res);
    expect(result.status).toEqual(200);
    expect(result.body[0].Song_Name).toEqual("Shake It Off");
});

test('Searching song with invalid name.', async () => {
    const headers = {
        request_type: 'SearchSongByName',
        song_name: 420,
    };

    const result = await api.ParseGETRequest(undefined, headers, res);
    expect(result.status).toEqual(400);
    expect(result.body).toEqual({"Invalid song_name": "The song_name '" + headers.song_name + "' is not valid"});
});

test('Searching song by name.', async () => {
    const headers = {
        request_type: 'SearchSongByName',
        song_name: 'shake it',
    };

    const result = await api.ParseGETRequest(undefined, headers, res);
    expect(result.status).toEqual(200);
    expect(result.body[0].Song_Name).toEqual("Shake It Off");
});

test('Searching songs with invalid artist.', async () => {
    const headers = {
        request_type: 'SearchSongByArtist',
        artist_name: 420,
    };

    const result = await api.ParseGETRequest(undefined, headers, res);
    expect(result.status).toEqual(400);
    expect(result.body).toEqual({"Invalid artist_name": "The artist_name '" + headers.artist_name + "' is not valid"});
});

test('Searching song by artist.', async () => {
    const headers = {
        request_type: 'SearchSongByArtist',
        artist_name: 'taylor',
    };

    const result = await api.ParseGETRequest(undefined, headers, res);
    expect(result.status).toEqual(200);
    expect(result.body[0].Song_Name).toEqual("Shake It Off");
});

test('Searching song with invalid album.', async () => {
    const headers = {
        request_type: 'SearchSongByAlbum',
        album_name: 420,
    };

    const result = await api.ParseGETRequest(undefined, headers, res);
    expect(result.status).toEqual(400);
    expect(result.body).toEqual({"Invalid album_name": "The album_name '" + headers.album_name + "' is not valid"});
});

test('Searching song by album.', async () => {
    const headers = {
        request_type: 'SearchSongByAlbum',
        album_name: '1989',
    };

    const result = await api.ParseGETRequest(undefined, headers, res);
    expect(result.status).toEqual(200);
    expect(result.body.length).toBeGreaterThan(0);
});

// SONGS POST REQUESTS
test('Adding a listen to non-existent song', async () => {
    const headers = {
        request_type: 'AddListen',
    };

    const body = {
        song_id: -1,
    };
    
    const result = await api.ParsePOSTRequest(undefined, headers, body, res);
    expect(result.status).toEqual(404);
    expect(result.body).toEqual({"No results": "No results were found"});
});

test('Adding a listen to a song no id', async () => {
    const headers = {
        request_type: 'AddListen',
    };

    const body = {
    };
    
    const result = await api.ParsePOSTRequest(undefined, headers, body, res);
    expect(result.status).toEqual(400);
    expect(result.body).toEqual({"Invalid song_id": "The song_id 'undefined' is not valid"});
});

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