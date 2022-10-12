CREATE TABLE playlist_songs (
    Playlist_ID INTEGER,
    Song_ID INTEGER,
    PRIMARY KEY(Playlist_ID, Song_ID)
);
alter table playlists
    alter column "User_ID" type text using "User_ID"::text;

alter table playlists
    add constraint playlists_accounts_user_id_fk
        foreign key ("User_ID") references accounts;

alter table playlists
    alter column "User_ID" type text using "User_ID"::text;

alter table playlist_songs
    rename column playlist_id to "Playlist_ID";

alter table playlist_songs
    rename column song_id to "Song_ID";

alter table playlist_songs
    add constraint playlist_songs_songs_song_id_fk
        foreign key ("Song_ID") references songs;



alter table playlist_songs
    add constraint playlist_songs_playlists_playlist_id_fk
        foreign key ("Playlist_ID") references playlists;


-- test statements:

insert into accounts values(1, 'zidan@gmail.com', 'zidanisme', '2022-09-01');

insert into songs values( 'Deja Vu', 'Bite Me', '2', 'Avril Lavigne', 2000000000);

update playlists set "Playlist_Name" = 'Car Drives' where "Playlist_ID" = 1;

select * from playlist_songs inner join playlists on playlist_songs."Playlist_ID" = playlists."Playlist_ID";

select "Song_ID" from playlist_songs;

insert into accounts values('sonic@hedgehog.com', 'sanic', '666', '2022-09-02');

create table artists
(
    "Artist_ID"   int not null
        constraint artists_pk
            primary key,
    "Artist_Name" text
);

create unique index artists_artist_id_uindex
    on artists ("Artist_ID");

alter table albums
    drop constraint albums_artists_artist_id_fk;

alter table albums
    add constraint albums_artists_artist_id_fk
        foreign key ("Artist_ID") references artists;


select songs."Song_ID", songs."Song_Name", songs."Album_ID", albums."Album_Name", albums."Album_Cover", artists."Artist_ID", "Artist_Name", songs."Listens" from "songs"
    inner join "albums" on songs."Album_ID" = albums."Album_ID"
    inner join "artists" on artists."Artist_ID" = songs."Artist_ID"
    where artists."Artist_Name" =  'ACE';

select songs."Song_ID", songs."Song_Name", songs."Album_ID", albums."Album_Name", albums."Album_Cover", artists."Artist_ID", "Artist_Name", songs."Listens" from "playlist_songs"
    inner join "playlists" on playlist_songs."Playlist_ID" = playlists."Playlist_ID"
    inner join "songs" on songs."Song_ID" = playlist_songs."Song_ID"
    inner join "albums" on songs."Album_ID" = albums."Album_ID"
    inner join "artists" on artists."Artist_ID" = songs."Artist_ID"
    where playlists."Playlist_ID" = '2';

insert into playlists("Playlist_Name", "User_ID") values('Best Songs Ever', 'auth0|63025ffc8d79f7d59581529d')



select food."Food_Name" from "food"
    inner join "subtypes" on food."Subtype" = subtypes."Subtype"
    inner join types on types."Type" = subtypes."Type"
    where types."Supertype" = 'Fruit';

select "Playlist_ID", "Playlist_Name" from "playlists" where "User_ID" = 'auth0|63025ffc8d79f7d59581529d';

insert into playlist_songs values (1, 28);

DELETE FROM playlist_songs WHERE "Playlist_ID" = 4;
DELETE FROM playlists WHERE "Playlist_ID" = 4;


INSERT INTO ARTISTS(20000, 'Sabrina Carpenter');
    -- (ARTIST_ID, ARTIST_NAME)
INSERT INTO ALBUMS VALUES(1300, 'emails i cant send', 20000, 'https://i.discogs.com/D5Ffj9ky6yf2UYkxZnnHq1mxhInyMO9dTb1sLSdOYIw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIzODE4/NzA2LTE2NTcyNjgy/NzItNjkwMy5qcGVn.jpeg');
    -- (ALBUM_ID, ALBUM_NAME, ARTIST_ID, ALBUM_COVER
INSERT INTO SONGS VALUES('Nonsense', 1300, 1051, 20000, 0);
    -- (SONG-NAME, ALBUM-ID, SONG_ID, ARTIST_ID, LISTENS)

INSERT INTO public.artists ("Artist_ID", "Artist_Name") VALUES (20000, 'Sabrina Carpenter');
INSERT INTO public.albums ("Album_ID", "Album_Name", "Artist_ID", "Album_Cover") VALUES (1300, 'emails i cant send', 20000, 'https://i.discogs.com/D5Ffj9ky6yf2UYkxZnnHq1mxhInyMO9dTb1sLSdOYIw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIzODE4/NzA2LTE2NTcyNjgy/NzItNjkwMy5qcGVn.jpeg');
INSERT INTO public.songs ("Song_Name", "Album_ID", "Song_ID", "Artist_ID", "Listens") VALUES ('Nonsense', 1300, 1051, 20000, 0);


