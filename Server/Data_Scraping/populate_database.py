import os
import json
import psycopg2
from dotenv import load_dotenv

load_dotenv("../.env")

# Connect to database
conn = psycopg2.connect(
    host = os.getenv('DATABASE_HOST'),
    database = os.getenv('DATABASE_DB'),
    user = os.getenv('DATABASE_USER'),
    password = os.getenv('DATABASE_PASSWORD'),
)
cur = conn.cursor()

# Load data from file
with open("music_data.json", "r") as f:
    data = json.load(f)

# Insert data into database
for artist_name in data:
    cur.execute(f'INSERT INTO artists("Artist_Name") VALUES(%s) RETURNING "Artist_ID";',(artist_name,))
    artist_id = cur.fetchone()[0]
    print(f"[{artist_id}] {artist_name}")
    for album in data[artist_name]['albums']:
        cur.execute(f'INSERT INTO albums("Album_Name", "Artist_ID", "Album_Cover") VALUES(%s, %s, %s) RETURNING "Album_ID";', (album["name"], artist_id, album["thumbnail"]))
        album_id = cur.fetchone()[0]
        print(f"\t[{album_id}] {album['name']}")
        for song in album['songs']:
            cur.execute(f'INSERT INTO songs("Song_Name", "Album_ID", "Artist_ID", "Song_URL") VALUES(%s, %s, %s, %s);', (song["title"], album_id, artist_id, song["videoId"]))
            print(f"\t\t[{song['title']}] {song['videoId']}")

conn.commit()
cur.close()