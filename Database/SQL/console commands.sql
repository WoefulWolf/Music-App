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