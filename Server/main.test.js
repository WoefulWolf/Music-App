const MusicAppAPI = require('./api');
let api = new MusicAppAPI();

test('DummyTest', () => {
    expect(api.DummyTest()).toBe(3);
});