const MusicAppAPI = require('../api');
let api = new MusicAppAPI();

const res = {};
res.status = () => res;
res.json = () => res;

let test_playlist_id = undefined;

beforeEach(async () => {
    const headers = {
        request_type: 'GetPlaylists',
    };

    const result = await api.ParseGETRequest('1234567890', headers, res);
    if (result.body.length > 0) {
        test_playlist_id = result.body[0].Playlist_ID;
    }
});

// PLAYLISTS GET/POST REQUESTS
test('Create a playlist with invalid ID.', async () => {
    const headers = {
        request_type: 'CreatePlaylist',
    };

    const body = {
        playlist_name: 'Test Playlist',
    }

    const result = await api.ParsePOSTRequest(12, headers, body, res);
    expect(result.status).toEqual(400);
    expect(result.body).toEqual({"Invalid user_id": "The user_id '" + 12 + "' is not valid"});
});

test('Create a playlist with invalid name.', async () => {
    const headers = {
        request_type: 'CreatePlaylist',
    };

    const body = {
        playlist_name: 420,
    }

    const result = await api.ParsePOSTRequest('1234567890', headers, body, res);
    expect(result.status).toEqual(400);
    expect(result.body).toEqual({"Invalid playlist_name": "The playlist_name '" + body.playlist_name + "' is not valid"});
});


test('Create a playlist.', async () => {
    const headers = {
        request_type: 'CreatePlaylist',
    };

    const body = {
        playlist_name: 'Test Playlist',
    }

    const result = await api.ParsePOSTRequest('1234567890', headers, body, res);
    expect(result.status).toEqual(200);
    expect(result.body).toEqual({"Success": "Insertion successful"});
});

test('Get all playlists.', async () => {
    const headers = {
        request_type: 'GetPlaylists',
    };

    const result = await api.ParseGETRequest('1234567890', headers, res);
    expect(result.status).toEqual(200);
    expect(result.body.length).toBeGreaterThan(0);
});

test('Get all playlists with invalid ID.', async () => {
    const headers = {
        request_type: 'GetPlaylists',
    };

    const result = await api.ParseGETRequest(12, headers, res);
    expect(result.status).toEqual(400);
    expect(result.body).toEqual({"Invalid user_id": "The user_id '" + 12 + "' is not valid"});
});

test('Add song to playlist.', async () => {
    const headers = {
        request_type: 'AddSongToPlaylist',
    };

    const body = {
        playlist_id: test_playlist_id,
        song_id: '1',
    }

    const result = await api.ParsePOSTRequest('1234567890', headers, body, res);
    expect(result.status).toEqual(200);
    expect(result.body).toEqual({"Success": "Insertion successful"});
});

test('Get all songs in playlsit with no ID.', async () => {
    const headers = {
        request_type: 'GetPlaylistSongs',
    };

    const result = await api.ParseGETRequest('1234567890', headers, res);
    expect(result.status).toEqual(400);
    expect(result.body).toEqual({"Invalid playlist_id": "The playlist_id 'undefined' is not valid"});
});

test('Get all songs in playlsit.', async () => {
    const headers = {
        request_type: 'GetPlaylistSongs',
        playlist_id: test_playlist_id,
    };

    const result = await api.ParseGETRequest('1234567890', headers, res);
    expect(result.status).toEqual(200);
    expect(result.body.length).toBeGreaterThan(0);
});

test('Delete a playlist.', async () => {
    const headers = {
        request_type: 'DeletePlaylist',
    };

    const body = {
        playlist_id: test_playlist_id,
    }

    if (typeof test_playlist_id === 'undefined') {
        fail('test_playlist_id undefined.');
    } else {
        const result = await api.ParsePOSTRequest('123456789', headers, body, res);
        expect(result.status).toEqual(200);
        expect(result.body).toEqual({"Success": "Delete successful"});
    }
});

afterAll(async () => {
    await api.Shutdown();
});