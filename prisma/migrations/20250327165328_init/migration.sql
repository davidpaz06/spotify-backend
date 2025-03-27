-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "artist_id" SERIAL NOT NULL,
    "artist_name" TEXT NOT NULL,
    "artist_description" TEXT,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("artist_id")
);

-- CreateTable
CREATE TABLE "Album" (
    "album_id" SERIAL NOT NULL,
    "album_name" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "artist_id" INTEGER NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("album_id")
);

-- CreateTable
CREATE TABLE "Song" (
    "song_id" SERIAL NOT NULL,
    "song_name" TEXT NOT NULL,
    "artist_id" INTEGER NOT NULL,
    "album_id" INTEGER NOT NULL,
    "streams" INTEGER NOT NULL,
    "song_length" INTEGER NOT NULL,
    "is_explicit" BOOLEAN NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("song_id")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "playlist_id" SERIAL NOT NULL,
    "playlist_name" TEXT NOT NULL,
    "created_by" INTEGER NOT NULL,
    "playlist_length" INTEGER NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("playlist_id")
);

-- CreateTable
CREATE TABLE "UserPlaylist" (
    "user_playlist_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "playlist_id" INTEGER NOT NULL,

    CONSTRAINT "UserPlaylist_pkey" PRIMARY KEY ("user_playlist_id")
);

-- CreateTable
CREATE TABLE "PlaylistSong" (
    "playlist_song_id" SERIAL NOT NULL,
    "playlist_id" INTEGER NOT NULL,
    "song_id" INTEGER NOT NULL,

    CONSTRAINT "PlaylistSong_pkey" PRIMARY KEY ("playlist_song_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("artist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("artist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Album"("album_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlaylist" ADD CONSTRAINT "UserPlaylist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlaylist" ADD CONSTRAINT "UserPlaylist_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "Playlist"("playlist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistSong" ADD CONSTRAINT "PlaylistSong_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "Playlist"("playlist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistSong" ADD CONSTRAINT "PlaylistSong_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("song_id") ON DELETE RESTRICT ON UPDATE CASCADE;
