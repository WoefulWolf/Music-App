import os
import json
import re
from dotenv import load_dotenv

load_dotenv("../.env")

from ytmusicapi import YTMusic
import pylast

lastfm_network = pylast.LastFMNetwork(
    api_key = os.getenv('LASTFM_API_KEY'),
    api_secret = os.getenv('LASTFM_SECRET'),
)

exit()

def lastfm_get_album_title_thumbnail(artist, track):
    try:
        lastfm_track = pylast.Track(artist, track, lastfm_network)
        lastfm_album = lastfm_track.get_album()
    except:
        print("\tCouldn't find track", track, "by", artist, "on LastFM")
        return None, None

    if lastfm_album == None or lastfm_album.artist.name != artist:
        print("\tCouldn't find album for", track, "by", artist, "on LastFM")
        return None, None
    return lastfm_album.title, lastfm_album.get_cover_image()

def scrape(playlist_id, outfile):
    ytmusic = YTMusic()
    playlist = ytmusic.get_playlist(playlist_id)

    try:
        f = open(outfile, "r")
        data = json.load(f)
        f.close()
        print("Loaded data from existing file!")
    except:
        data = {}
        print("Started new data file!")

    for track in playlist["tracks"]:
        title = track["title"]
        title = re.sub("[\(\[].*?[\)\]]", "", title)
        title = title.strip()

        artist = track["artists"][0]["name"]
        videoId = track["videoId"]
        
        print("[!] Processing", artist, "-", title, "... [!]")

        if track["album"] == None:
            print("\tCouldn't find album on YouTube, trying LastFM...")
            album, thumbnail = lastfm_get_album_title_thumbnail(artist, title)
            if album == None:
                print("\tCouldn't find album on LastFM, skipping...")
                continue
            else:
                print("\tFound album on LastFM!")
            if thumbnail == None:
                print("\tCouldn't find thumbnail on LastFM, skipping...")
                continue
            else:
                print("\tFound thumbnail on LastFM!")
        else:
            print("\tFound album on YouTube!")
            album = track["album"]["name"]
            if "thumbnails" not in track["album"]:
                print("\tCouldn't find album thumbnail on YouTube, trying LastFM...")
                _, thumbnail = lastfm_get_album_title_thumbnail(artist, title)
                if thumbnail == None:
                    print("\tCouldn't find thumbnail on LastFM, skipping...")
                    continue
                else:
                    print("\tFound thumbnail on LastFM!")
            else:
                thumbnail = track["album"]["thumbnails"][-1]["url"]

        if artist not in data:
            data[artist] = {}
            data[artist]["albums"] = []

        # Check if album with name exists in artist albums list
        album_exists = False
        for album_data in data[artist]["albums"]:
            if album_data["name"] == album:
                album_exists = True
                break

        if not album_exists:
            data[artist]["albums"].append({
                "name": album,
                "thumbnail": thumbnail,
                "songs": []
            })

        # Add track to album if it doesn't exist in album already
        
        for album_data in data[artist]["albums"]:
            if album_data["name"] != album:
                continue

            track_exists = False
            for track_data in album_data["songs"]:
                if track_data["title"] == title:
                    track_exists = True
                    print(f"\tTrack already added... ({title} - {artist})")
                    break

            if not track_exists:
                album_data["songs"].append({
                    "title": title,
                    "videoId": videoId
                })
                print("\tAdded new track:")
                print(f"\t{title} - {artist} ({album})")
                print(f"\t\tImage: {thumbnail}")
                print(f"\t\tID: {videoId}")
        
    with open(outfile, "w") as outfile:
        json.dump(data, outfile, indent = 4)

def main():
    input_file = open("playlists.txt", "r")
    playlists = input_file.readlines()
    input_file.close()

    for playlist in playlists:
        playlist = playlist.strip()
        print("Scraping playlist", playlist)
        scrape(playlist, "music_data.json")

if __name__ == "__main__":
    main()