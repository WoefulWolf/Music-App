create table accounts
(
    "Email"       text not null,
    "Username"    text,
    "User_ID"     text not null
        constraint accounts_pk
            primary key,
    "Date_Joined" date
);

alter table accounts
    owner to llawkrxhwlrpjz;

create unique index accounts_user_id_uindex
    on accounts ("User_ID");

create table playlists
(
    "Playlist_ID"   serial
        constraint playlists_pk
            primary key,
    "Playlist_Name" text,
    "User_ID"       text
        constraint playlists_accounts_user_id_fk
            references accounts
);

alter table playlists
    owner to llawkrxhwlrpjz;

create unique index playlists_playlist_id_uindex
    on playlists ("Playlist_ID");

create table artists
(
    "Artist_ID"   serial
        constraint artists_pk
            primary key,
    "Artist_Name" text
);

alter table artists
    owner to llawkrxhwlrpjz;

create table albums
(
    "Album_ID"    serial
        constraint albums_pk
            primary key,
    "Album_Name"  text,
    "Artist_ID"   integer
        constraint albums_artists_artist_id_fk
            references artists,
    "Album_Cover" text
);

alter table albums
    owner to llawkrxhwlrpjz;

create table songs
(
    "Song_Name" text,
    "Album_ID"  integer
        constraint songs_albums_album_id_fk
            references albums,
    "Song_ID"   integer default nextval('"sons_Song_ID_seq"'::regclass) not null
        constraint sons_pk
            primary key,
    "Artist_ID" integer
        constraint songs_artists_artist_id_fk
            references artists,
    "Listens"   integer default 0                                       not null,
    "Song_URL"  text
);

alter table songs
    owner to llawkrxhwlrpjz;

create unique index sons_song_id_uindex
    on songs ("Song_ID");

create unique index songs_song_url_uindex
    on songs ("Song_URL");

create table playlist_songs
(
    "Playlist_ID" integer not null
        constraint playlist_songs_playlists_playlist_id_fk
            references playlists,
    "Song_ID"     integer not null
        constraint playlist_songs_songs_song_id_fk
            references songs,
    primary key ("Playlist_ID", "Song_ID")
);

alter table playlist_songs
    owner to llawkrxhwlrpjz;

create unique index albums_album_id_uindex
    on albums ("Album_ID");

create unique index artists_artist_id_uindex
    on artists ("Artist_ID");

